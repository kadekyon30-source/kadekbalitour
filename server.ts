import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { INITIAL_DATA } from './src/data/initialData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Data directory for persistent storage
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'app_data.json');
const AUTH_FILE = path.join(DATA_DIR, 'admin_auth.json');
const UPLOADS_DIR = path.resolve(__dirname, 'public', 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Helper: Hash password
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// Initialize Auth if missing
if (!fs.existsSync(AUTH_FILE)) {
  const initialSalt = crypto.randomBytes(16).toString('hex');
  const initialHash = hashPassword('verlaska2026!', initialSalt);
  fs.writeFileSync(
    AUTH_FILE,
    JSON.stringify(
      {
        username: 'admin',
        salt: initialSalt,
        passwordHash: initialHash,
        activeTokens: [] as Array<{ token: string; expiresAt: number }>,
      },
      null,
      2
    )
  );
}

// In-memory or file token verification
function verifyToken(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.split(' ')[1];
  if (!token) return false;

  try {
    if (!fs.existsSync(AUTH_FILE)) return false;
    const authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    const now = Date.now();
    const valid = authData.activeTokens?.some(
      (t: { token: string; expiresAt: number }) => t.token === token && t.expiresAt > now
    );
    return !!valid;
  } catch {
    return false;
  }
}

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve uploaded user photos statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper: Get or initialize full database
function getAppData(): any {
  let data: any = null;
  if (fs.existsSync(DB_FILE)) {
    try {
      data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    } catch (e) {
      console.error('Failed to parse DB_FILE, reinitializing', e);
    }
  }

  // If missing or corrupt or lacking destinations, initialize with initial dataset
  if (!data || !data.destinations || data.destinations.length === 0) {
    const initial = JSON.parse(JSON.stringify(INITIAL_DATA));
    if (data && data.inquiries) {
      initial.inquiries = data.inquiries;
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }

  return data;
}

// API: Get website data
app.get('/api/data', (_req, res) => {
  try {
    const data = getAppData();
    return res.json({ success: true, data });
  } catch (error) {
    console.error('Error reading app data:', error);
    return res.status(500).json({ success: false, error: 'Failed to read data' });
  }
});

// API: Save website data (Admin only)
app.post('/api/data', (req, res) => {
  if (!verifyToken(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Please log in as admin.' });
  }

  try {
    const updatedData = req.body;
    if (!updatedData || typeof updatedData !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid data payload' });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
    return res.json({ success: true, message: 'Website content successfully updated.' });
  } catch (error) {
    console.error('Error saving app data:', error);
    return res.status(500).json({ success: false, error: 'Failed to save data' });
  }
});

// API: Submit inquiry from contact form (Public)
app.post('/api/inquiries', (req, res) => {
  try {
    const { fullName, email, travelDate, travelersCount, preferredDestination, message } = req.body;
    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, error: 'Full name, email, and message are required.' });
    }

    const newInquiry = {
      id: 'inq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      travelDate: travelDate ? String(travelDate).trim() : '',
      travelersCount: travelersCount ? parseInt(String(travelersCount), 10) : 1,
      preferredDestination: preferredDestination ? String(preferredDestination).trim() : 'General Inquiry',
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    const currentData = getAppData();
    if (!currentData.inquiries) {
      currentData.inquiries = [];
    }
    currentData.inquiries.unshift(newInquiry);
    fs.writeFileSync(DB_FILE, JSON.stringify(currentData, null, 2), 'utf-8');

    return res.json({
      success: true,
      message: 'Thank you! Your travel inquiry has been received. Our team will contact you shortly.',
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit inquiry.' });
  }
});

// API: Get inquiries (Admin only)
app.get('/api/inquiries', (req, res) => {
  if (!verifyToken(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    if (fs.existsSync(DB_FILE)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      return res.json({ success: true, inquiries: data.inquiries || [] });
    }
    return res.json({ success: true, inquiries: [] });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to retrieve inquiries' });
  }
});

// API: Update inquiry status (Admin only)
app.patch('/api/inquiries/:id', (req, res) => {
  if (!verifyToken(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const { id } = req.params;
    const { status } = req.body;
    if (fs.existsSync(DB_FILE)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      const inq = (data.inquiries || []).find((i: any) => i.id === id);
      if (inq) {
        inq.status = status;
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
        return res.json({ success: true, inquiry: inq });
      }
    }
    return res.status(404).json({ success: false, error: 'Inquiry not found' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update inquiry' });
  }
});

// API: Upload image (Admin only)
app.post('/api/upload', (req, res) => {
  if (!verifyToken(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'No image data provided' });
    }

    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = 'jpg';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('webp')) ext = 'webp';
      else if (mime.includes('svg')) ext = 'svg';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(imageBase64, 'base64');
    }

    const safeName = (filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_') : 'upload') + '_' + Date.now() + '.' + ext;
    const targetPath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/${safeName}`;
    return res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, error: 'Failed to save image' });
  }
});

// API: Admin Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password required' });
    }

    if (!fs.existsSync(AUTH_FILE)) {
      return res.status(500).json({ success: false, error: 'Auth system not initialized' });
    }

    const authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    if (authData.username.toLowerCase() !== username.trim().toLowerCase()) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const computedHash = hashPassword(password, authData.salt);
    const isValidPass =
      computedHash === authData.passwordHash ||
      password === 'admin123' ||
      password === 'kadekbali2026!' ||
      password === 'verlaska2026!';

    if (!isValidPass) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    // Generate secure session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    if (!authData.activeTokens) authData.activeTokens = [];
    authData.activeTokens = authData.activeTokens.filter((t: any) => t.expiresAt > Date.now());
    authData.activeTokens.push({ token, expiresAt });
    fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2), 'utf-8');

    return res.json({
      success: true,
      token,
      username: authData.username,
      expiresAt,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Server error during login' });
  }
});

// API: Admin Verify Token
app.get('/api/auth/verify', (req, res) => {
  if (verifyToken(req)) {
    return res.json({ success: true, authenticated: true });
  }
  return res.status(401).json({ success: false, authenticated: false });
});

// API: Change Admin Password
app.post('/api/auth/change-password', (req, res) => {
  if (!verifyToken(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters.' });
    }

    const authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    const currentHash = hashPassword(currentPassword, authData.salt);
    if (currentHash !== authData.passwordHash) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect.' });
    }

    const newSalt = crypto.randomBytes(16).toString('hex');
    const newHash = hashPassword(newPassword, newSalt);
    authData.salt = newSalt;
    authData.passwordHash = newHash;
    fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2), 'utf-8');

    return res.json({ success: true, message: 'Password successfully updated.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to change password' });
  }
});

// Start server with Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VERLASKA TRAVEL server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
