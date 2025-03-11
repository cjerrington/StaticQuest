const dns = require('dns');
const { readFileSync } = require('fs');

const data = readFileSync('./_site/assets/members.json');
sites = JSON.parse(data);

sites.forEach(site => {
    dns.resolve4(site.host, (err,
        addresses) => console.log('A records for '+site.host+': %j', addresses));
});