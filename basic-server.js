// basic-server.js
// How to run: npm run mock-server
// How to test without front end: curl -G http://localhost:3001/api/google-auth   --data-urlencode "code=test_code"   --data-urlencode "scope=email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"   --data-urlencode "authuser=0"   --data-urlencode "prompt=consent"

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import mongoose from 'mongoose';

// Import the User model from src/stores
import User from './src/stores/User.js'; // Adjusted import path
import { authenticateUser } from './src/middleware/auth.js';

// If using ES modules, set __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine the current environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Load base .env first
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Load environment-specific .env and override base variables
const envFile = `.env.${NODE_ENV}`;
dotenv.config({ path: path.resolve(__dirname, envFile), override: true });
console.log("Redirect URI is", process.env.REDIRECT_URI)

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const authorizedEmails = process.env.AUTHORIZED_EMAILS.split(',');
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
const siteURL = process.env.SITE_URL;

const app = express();

// Use express-session middleware
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
app.use(session({
  secret: process.env.SESSION_SECRET, // Ensure this is defined
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // Session expires after 1 day
  },
}));

// CORS
app.use(cors({
  origin: function (origin, callback) {
    console.log('Incoming request from origin:', origin);
    console.log('Allowed Origins:', allowedOrigins);
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tlabs_website_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// ROUTES

// Unprotected route
app.get('/api/google-auth', async (req, res) => {
  const { code } = req.query;
  console.log("Received code:", code);

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    if (tokenResponse.data) {
      const accessToken = tokenResponse.data.access_token;

      // Fetch user details using the access token
      const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (userResponse && userResponse.data) {
        const userEmail = userResponse.data.email;
        console.log('User Email:', userEmail);

        // Check if the user exists in MongoDB
        let user = await User.findOne({ email: userEmail });

        if (!user) {
          // Create a new user
          user = new User({
            name: userResponse.data.name,
            email: userEmail,
            avatar: userResponse.data.picture,
          });
          await user.save();
        }

        // Create a session
        req.session.userId = user._id;

        // Redirect to the frontend application
        res.redirect(`${siteURL}/auth/callback?status=success`);
      } else {
        console.error('Failed to fetch user data');
        res.status(500).json({ error: "Failed to fetch user data" });
      }
    }
  } catch (error) {
    console.error('Error during Google Auth process:', error);
    res.status(500).json({ error: "Server error during the auth process" });
  }
});

// Apply authentication middleware to routes that require authentication
app.use('/api/protected', authenticateUser);

// Example protected route
app.get('/api/protected/user', (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
  });
});

// Add a new route for processing the code
app.get('/api/process-code', (req, res) => {
  const { code } = req.query;
  console.log("Processing code:", code);

  // Simulate processing the code and returning a dummy success response
  if (code) {
    console.log("Code processed successfully.");
    res.json({
      success: true,
      message: "Code processed successfully.",
      // Add any additional dummy data you want to return
    });
  } else {
    console.error("No code received, or code was empty.");
    res.status(400).json({ error: "Invalid code received" });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid'); // Replace 'connect.sid' with your session cookie name if different
    res.json({ message: 'Logged out successfully' });
  });
});

app.post('/api/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Forward the data to Google Apps Script
    const response = await axios.post('https://script.google.com/macros/s/AKfycbzACQnXXQnFhJ-rpUpKHAAykfGLgAFxduiDdGE81dcR42-EmGABewQMRIgGXqcmYZM/exec', {
      name,
      email,
      message
    });

    if (response.status === 200) {
      res.json({ result: 'Success' });
    } else {
      res.status(response.status).json({ error: 'Failed to submit form' });
    }
  } catch (error) {
    console.error('Error forwarding form data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
