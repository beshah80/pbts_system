const http = require('http');

const testData = {
  username: 'DRV001',
  password: 'password123'
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3004,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Sending request to:', `http://${options.hostname}:${options.port}${options.path}`);
console.log('Request data:', testData);

const req = http.request(options, (res) => {
  console.log(`\n=== RESPONSE ===`);
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  res.setEncoding('utf8');
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response body:`, data);
    try {
      const parsed = JSON.parse(data);
      console.log(`Parsed response:`, parsed);
    } catch (e) {
      console.log(`Response is not valid JSON`);
    }
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req.write(postData);
req.end();

console.log('Request sent, waiting for response...');
