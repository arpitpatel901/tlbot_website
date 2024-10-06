// basic-server.js
// How to run: npm run mock-server
// How to test without front end: curl -G http://localhost:3001/api/google-auth   --data-urlencode "code=test_code"   --data-urlencode "scope=email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"   --data-urlencode "authuser=0"   --data-urlencode "prompt=consent"
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const authorizedEmails = process.env.AUTHORIZED_EMAILS.split(',');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'  // Allow your front end to make requests
}));

app.use(express.json());


app.get('/api/google-auth', async (req, res) => {
  const { code } = req.query;
  console.log("Received code:", code);

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  if (code) {
    try {
      // Exchange the authorization code for an access token
      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
        code: code,
        client_id: CLIENT_ID, // Use environment variables to keep credentials secure
        client_secret: CLIENT_SECRET,
        redirect_uri: "http://localhost:3001/api/google-auth",
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
            // You can create a session or generate a JWT here if needed
            res.redirect(`http://localhost:5173/auth/callback?status=success&userData=${encodeURIComponent(JSON.stringify(userResponse.data))}`);
          } else {
            // User is not authorized
            console.warn('Unauthorized user attempted to log in.');
            res.redirect(`http://localhost:5173/auth/callback?status=unauthorized`);
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
  } else {
    console.error("No code received, or code was empty.");
    res.status(400).json({ error: "Invalid authorization code" });
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

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});