// Import json-server using ES Modules syntax
import jsonServer from 'json-server';
// import { create } from 'json-server';

// Import statements for ES modules
// import jsonServer from 'json-server';
import bodyParser from 'body-parser';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.json());

server.post('/api/google-auth', (req, res) => {
  const { code } = req.body;
  if (code) {
    res.jsonp({
      success: true,
      access_token: "mock_access_token_12345",
      refresh_token: "mock_refresh_token_67890",
      expires_in: 3600
    });
  } else {
    res.status(400).jsonp({
      success: false,
      message: "Invalid authorization code"
    });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
