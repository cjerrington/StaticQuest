const dns = require('dns');

dns.resolveTxt('claytonerrington.com', (err,
    addresses) => console.log('TXT records: %j', addresses));
