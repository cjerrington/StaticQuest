//const fs = require("fs");
// 👇️ if you use CommonJS imports, use this instead
// const fs = require('fs');

fetch('/members.json')
    .then((response) => response.json())
    .then((json) => window.location.href = (json[parseInt(Math.random() * json.length)]).url);