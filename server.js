

const http = require('http');
const request = require('request');
require('dotenv').config();

const clientId = process.env.REACT_APP_CLIENT_ID;
const secretKey = process.env.REACT_APP_SECRET_KEY; 

console.log(process.env.REACT_APP_CLIENT_ID)
console.log(process.env.REACT_APP_SECRET_KEY)

console.log('started server on port 5000');

http.createServer((req, res) => {
  var code = req.url.split("=")[1];
  if (code) {
    request.post('https://github.com/login/oauth/access_token', {
      form: {
        client_id: clientId,
        client_secret: secretKey,
        code: code
      }
    }, (err, r, body) => {
      res.writeHead(301, {
        'Location': 'https://friendly-morse-b87fc8.netlify.com?' + body
      });
      res.end();
    })
    
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(5000);