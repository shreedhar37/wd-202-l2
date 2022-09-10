const http = require("http");
const fs = require("fs");
let args = require("minimist")(process.argv.slice(2), {});

// console.log(args.port);

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let cssContent = "";
let mainScriptContent = "";

let port;
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

fs.readFile("style.css", (err, css) => {
  if (err) {
    throw err;
  }
  cssContent = css;
});

fs.readFile("main.js", (err, mainScript) => {
  if (err) {
    throw err;
  }
  mainScriptContent = mainScript;
});
http
  .createServer((request, response) => {
    let url = request.url;
    // console.log(url);

    response.writeHeader(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      case "/style.css":
        response.writeHeader(200, { "Content-Type": "text/css" });
        response.write(cssContent);
        response.end();
        break;

      case "/main.js":
        response.writeHead(200, { "Content-Type": "text/script" });
        response.write(mainScriptContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args.port);
