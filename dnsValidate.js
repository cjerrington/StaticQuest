const dns = require('dns');
const http = require('http');
const https = require('https');
const { readFileSync } = require('fs');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function colorizeStatus(statusCode) {
  if (statusCode >= 200 && statusCode < 300) return `${colors.green}${statusCode}${colors.reset}`;
  if (statusCode >= 300 && statusCode < 400) return `${colors.yellow}${statusCode}${colors.reset}`;
  return `${colors.red}${statusCode}${colors.reset}`;
}

function getStatusCode(hostname, useHttps = false) {
  return new Promise((resolve, reject) => {
    const client = useHttps ? https : http;
    const options = {
      hostname,
      port: useHttps ? 443 : 80,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Host': hostname,
      },
      timeout: 5000,
    };
    const req = client.request(options, (res) => {
      resolve(res.statusCode);
      res.resume();
    });
    req.on('error', reject);
    req.end();
  });
}

function resolveDns(hostname) {
  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, (err, addresses) => {
      if (err) reject(err);
      else resolve(addresses);
    });
  });
}

const data = readFileSync('./_site/assets/members.json');
const sites = JSON.parse(data);

const checks = sites.map(site => {
  const host = site.host.replace("/", "");
  const name = site.name ?? host;

  return Promise.all([getStatusCode(host, true), resolveDns(host)])
  .then(([statusCode, addresses]) => {
    const coloredStatus = colorizeStatus(statusCode);
    const warning = statusCode >= 400 ? ` ${colors.red}⚠ Needs attention!${colors.reset}` : '';
    console.log(`${name} (${coloredStatus}): ${addresses.join(', ')}${warning}`);
  })
  .catch(err => {
    console.log(`${name} (${colors.red}ERROR${colors.reset}): ${colors.red}⚠ ${err.message}${colors.reset}`);
  });
});

Promise.all(checks).then(() => console.log('Done.'));
