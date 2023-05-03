const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter the Infura API key: ', (apiKey) => {
  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
  });

  const options = {
    host: 'mainnet.infura.io',
    port: 443,
    path: '/v3/' + apiKey,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      const response = JSON.parse(d);
      const blockNumber = parseInt(response.result, 16);
      console.log(`Block number: ${blockNumber}`);
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()

  rl.close();
});