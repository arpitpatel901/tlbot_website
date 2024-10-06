// basic-server.js
// How to run: npm run mock-server
// How to test without front end: curl -G http://localhost:3001/api/google-auth   --data-urlencode "code=test_code"   --data-urlencode "scope=email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"   --data-urlencode "authuser=0"   --data-urlencode "prompt=consent"
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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
console.log("Redirect URI is",process.env.REDIRECT_URI)

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const authorizedEmails = process.env.AUTHORIZED_EMAILS.split(',');
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
const siteURL = process.env.SITE_URL;

const app = express();
app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl)
    if(!origin) return callback(null, true);
    if(!allowedOrigins.includes(origin)){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

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

        // Check if the email is authorized
        if (authorizedEmails.includes(userEmail)) {
          // User is authorized
          console.log('User is authorized. Redirecting to callback.');
          res.redirect(`${siteURL}/auth/callback?status=success&userData=${encodeURIComponent(JSON.stringify(userResponse.data))}`);
        } else {
          // User is not authorized
          console.warn('Unauthorized user attempted to log in.');
          res.redirect(`${siteURL}auth/callback?status=unauthorized`);
        }
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
