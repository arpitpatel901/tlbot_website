// How to emulate google response locally:
// curl -G http://localhost:5173/api/google-auth   --data-urlencode "code=test_code"   --data-urlencode "scope=email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"   --data-urlencode "authuser=0"   --data-urlencode "prompt=consent"

export default [
  {
    url: "/api/google-auth",
    method: "get",
    response: ({ query }) => {
      console.log("Received GET request at /api/google-auth");
      console.log("Query parameters:", query);

      // Corrected line to access the code from the query parameters
      const code = query.code;
      if (code) {
        const response = {
          status: 200,
          body: {
            success: true,
            access_token: "mock_access_token_12345",
            refresh_token: "mock_refresh_token_67890",
            expires_in: 3600,
            redirect: '/main_dashboard'  // Assuming your Vue app handles this route
          },
        };
        console.log("Responding with success:", response);
        return response;
      } else {
        const response = {
          status: 400,
          body: {
            success: false,
            message: "Invalid authorization code",
          },
        };
        console.log("Responding with error:", response);
        return response;
      }
    },
  },
];
