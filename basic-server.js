// basic-server.js
// How to run: npm run mock-server
// How to test without front end: curl -G http://localhost:3001/api/google-auth   --data-urlencode "code=test_code"   --data-urlencode "scope=email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"   --data-urlencode "authuser=0"   --data-urlencode "prompt=consent"
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: ['http://localhost:5173']  // Adjust CORS if your frontend is served from a different port or URL
}));
app.use(express.json());

app.get('/api/google-auth', (req, res) => {
  const { code } = req.query;
  console.log("Received Google auth code:", code);
  if (code) {
    // Simulate sending code to Google for validation and getting tokens
    console.log("Processing received Google auth code.");
    res.redirect(`http://localhost:5173/main_dashboard?code=${code}`);
  } else {
    console.error("No code received, or code was empty.");
    res.status(400).json({ error: "Invalid authorization code" });
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
