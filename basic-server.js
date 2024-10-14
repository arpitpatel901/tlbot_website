// basic-server.js
// How to run: npm run mock-server
// How to test without front end: curl -G http://localhost:3001/api/google-auth   --data-urlencode "code=test_code"   --data-urlencode "scope=email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"   --data-urlencode "authuser=0"   --data-urlencode "prompt=consent"

import express from 'express';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import mongoose from 'mongoose';
import Channel from './src/models/Channel.js';
import Message from './src/models/Message.js';
import Organization from './src/models/Organization.js';
import connectMongo from 'connect-mongo';

// Import the User model from src/stores
import User from './src/models/User.js'; // Adjusted import path
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

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tlabs_website_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

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

// Use express-session middleware
const MongoStore = connectMongo.create({
  mongoUrl: 'mongodb://localhost:27017/tlabs_website_db',
  collectionName: 'sessions',
});
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use a secure secret in production
  resave: false,
  saveUninitialized: false,
  store: MongoStore, // Use MongoDB to store sessions
  cookie: {
    secure: NODE_ENV === 'production', // Use HTTPS in production
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in milliseconds
  },
}));

// Axios Retry Configuration
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'EAI_AGAIN';
  }
});

// ROUTES
// Unprotected route
// basic-server.js

// ... [Existing imports and setup code]
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
          // Check if any organization exists
          const existingOrganizations = await Organization.find();
          console.log("Existing Organizations Count:", existingOrganizations.length);
          let organization;
          if (existingOrganizations.length === 0) {
            // Create a new organization if none exist
            organization = new Organization({ name: 'Default Organization' });
            await organization.save();
            console.log('Default organization created:', organization);
          } else {
            // Assign the user to the first existing organization
            organization = existingOrganizations[0];
            console.log('Assigned to existing organization:', organization);
          }

          // Count users in the organization
          const userCount = await User.countDocuments({ organizationId: organization._id });
          console.log(`Users in organization ${organization.id}: ${userCount}`);

          // Create the new user and associate with the organization
          user = new User({
            name: userResponse.data.name,
            email: userEmail,
            avatar: userResponse.data.picture,
            organizationId: organization._id, // Use _id instead of id
            role: userCount === 0 ? 'admin' : 'member', // Assign admin if no users yet
          });
          await user.save();
          console.log('New user created:', user);
        }

        // Create a session
        req.session.userId = user.id;
        console.log(`User authenticated: ${user.email}`);
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
app.get('/api/protected/user', authenticateUser, async (req, res) => {
  try {
    console.log(`GET /api/protected/user: Returning user data for user ID ${req.user.id}`);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      organizationId: req.user.organizationId,
      role: req.user.role,
    });
  } catch (error) {
    console.error('Error in /api/protected/user:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// GET /api/users: Returns the list of users in the authenticated user's organization
app.get('/api/users', authenticateUser, async (req, res) => {
  try {
    console.log(`GET /api/users: Fetching users for organization ID ${req.user.organizationId}`);
    const users = await User.find({ organizationId: req.user.organizationId }).select('-password');
    res.json(users); // Removed .toJSON()
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/organizations: Create a new organization
app.post('/api/organizations', authenticateUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Only admins can create organizations' });
  }
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Organization name is required' });
  }

  try {
    // Check if organization already exists
    const existingOrg = await Organization.findOne({ name });
    if (existingOrg) {
      return res.status(400).json({ error: 'Organization already exists' });
    }

    const newOrg = new Organization({ name });
    await newOrg.save();

    // Optionally, assign the user to the new organization
    await User.findByIdAndUpdate(req.user.id, { organizationId: newOrg.id });

    res.status(201).json(newOrg);
  } catch (error) {
    console.error('Error creating organization:', error);
    res.status(500).json({ error: 'Failed to create organization' });
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

// Logout
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

// GET /api/channels: Returns the list of channels the user is a member of.
// POST /api/channels: Creates a new channel.
// GET /api/channels/:channelId/messages: Returns messages in a channel.
// POST /api/channels/:channelId/messages: Sends a new message in a channel.
// Get all channels that the user is a member of
app.post('/api/channels', authenticateUser, async (req, res) => {
  const { name, description } = req.body;
  console.log("Received request to create channel:", name, description);

  try {
    const newChannel = new Channel({
      name,
      description,
      organizationId: req.user.organizationId // Set organizationId from authenticated user
    });
    await newChannel.save();
    console.log("Channel saved to database:", newChannel);
    res.status(201).json(newChannel);
  } catch (error) {
    console.error('Error creating channel:', error);
    res.status(500).json({ error: 'Failed to create channel' });
  }
});
app.get('/api/channels', authenticateUser, async (req, res) => {
  try {
    let channels;
    if (req.user.role !== 'admin') {
      // Fetch channels belonging to the user's organization and not archived
      channels = await Channel.find({
        organizationId: req.user.organizationId,
        archived: false
      });
    } else {
      // Admins can see all channels, including archived
      channels = await Channel.find({
        organizationId: req.user.organizationId,
      });
    }
    res.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Failed to fetch channels' });
  }
});


// Get messages in a specific channel
app.get('/api/channels/:channelId/messages', authenticateUser, async (req, res) => {
  const { channelId } = req.params;
  try {
    console.log(`GET /api/channels/${channelId}/messages: Fetching messages for channel ID ${channelId}`);
    // Verify that the channel belongs to the user's organization
    const channel = await Channel.findOne({ _id: channelId, organizationId: req.user.organizationId });
    if (!channel) {
      console.log('Channel not found or does not belong to the user\'s organization');
      return res.status(404).json({ error: 'Channel not found' });
    }

    const messages = await Message.find({ channelId });
    res.json(messages); // Removed .toJSON()
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});
// Send a new message in a channel
app.post('/api/channels/:channelId/messages', authenticateUser, async (req, res) => {
  const { channelId } = req.params;
  const { content } = req.body;

  try {
    const newMessage = new Message({
      channelId,
      userId: req.user.id,
      content,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});
// DELETE /api/channels/:channelId - Permanently delete a channel (Admin only)
app.delete('/api/channels/:channelId', authenticateUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Only admins can delete channels' });
  }

  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    // Optionally, delete all messages associated with the channel
    await Message.deleteMany({ channelId: channel.id });

    await Channel.findByIdAndDelete(channelId);
    console.log(`Channel deleted: ${channelId}`);
    res.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error('Error deleting channel:', error);
    res.status(500).json({ error: 'Failed to delete channel' });
  }
});
// PATCH /api/channels/:channelId/archive - Archive or unarchive a channel (Admin only)
app.patch('/api/channels/:channelId/archive', authenticateUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Only admins can archive channels' });
  }

  const { channelId } = req.params;
  const { archived } = req.body; // Boolean: true to archive, false to unarchive

  if (typeof archived !== 'boolean') {
    return res.status(400).json({ error: 'Invalid value for archived' });
  }

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    channel.archived = archived;
    await channel.save();

    console.log(`Channel ${channelId} archived: ${archived}`);
    res.json({ message: `Channel ${archived ? 'archived' : 'unarchived'} successfully` });
  } catch (error) {
    console.error('Error archiving/unarchiving channel:', error);
    res.status(500).json({ error: 'Failed to archive/unarchive channel' });
  }
});


// Other
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
