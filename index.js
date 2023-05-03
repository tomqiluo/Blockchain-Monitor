const https = require('https');
const projectId = 'de1247bd2ff24166a1c4622def323c50';
const data = JSON.stringify({
    "jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1
  })
const options = {
    host: 'mainnet.infura.io',
    port: 443,
    path: '/v3/' + projectId,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
};
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()