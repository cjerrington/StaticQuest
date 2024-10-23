fetch('/assets/members.json')
    .then((response) => response.json())
    .then((json) => window.location.href = "https://" + (json[parseInt(Math.random() * json.length)]).host);