// basic-server.js
// How to run: npm run mock-server
// How to test without front end: curl -G http://localhost:3001/api/google-auth   --data-urlencode "code=test_code"   --data-urlencode "scope=email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"   --data-urlencode "authuser=0"   --data-urlencode "prompt=consent"
import express from 'express';

import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'  // Allow your front end to make requests
}));


app.use(express.json());

app.get('/api/google-auth', (req, res) => {
    const { code } = req.query;
    console.log("Received code:", code);

    // Instead of checking for 'test_code', accept any non-empty code
    if (code) {
        console.log("Received a non-empty code, responding with success.");
        // res.json({
        //     success: true,
        //     access_token: "mock_access_token",
        //     refresh_token: "mock_refresh_token",
        //     expires_in: 3600,
        //     redirect: '/main_dashboard'  // Assuming your Vue app handles this route
        // });
        res.redirect(`http://localhost:5173/main_dashboard?code=${code}`);
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

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});