// node index.js
// de1247bd2ff24166a1c4622def323c50


const https = require('https');
const readline = require('readline');
const ping = require('ping');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function pingESP32() {
  const subnet = '192.168.1';
  const esp32Identifier = 'Espressif';

  for (let i = 1; i <= 254; i++) {
    const ip = `${subnet}.${i}`;
    const res = await ping.promise.probe(ip, { timeout: 2 });

    if (res.alive && res.host && res.host.startsWith(esp32Identifier)) {
      console.log(`ESP32 found at IP address: ${ip}`);
      break;
    }
  }
}

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

  pingESP32(); // Pinging ESP32

  rl.close();
});