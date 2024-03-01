// npm init
// npm i nodemon
let path = require("path");
let fs = require("fs");
let http = require("http");
let crypto = require("crypto");
let url = require("url");
let host = "http://localhost:";
let port = 3000;
let dataPath = path.join(__dirname, "data");

let server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method == "OPTIONS") {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*", // REQUIRED CORS HEADER
            "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, PATCH", // REQUIRED CORS HEADER
            "Access-Control-Allow-Headers": "Origin, apikey, X-Requested-With, Content-Type, Accept" // REQUIRED CORS HEADER
        });
        res.end();
    }
    if (req.url == "/posts" && req.method == "GET") {
        getAllJokes(req, res);
    }
    if (req.url == "/posts" && req.method == "POST") {
        addJoke(req, res);
    }
    if (req.url.startsWith("/like") && req.method == "GET") {
        likeDislike(req, res);
    }
    if (req.url.startsWith("/dislike") && req.method == "GET") {
        likeDislike(req, res);
    }
})

function getAll() {
    let allJokes = [];
    let dirPath = fs.readdirSync(dataPath);

    for (let i = 0; i < dirPath.length; i++) {
        let filePath = path.join(dataPath, dirPath[i]);
        let text = fs.readFileSync(filePath, "utf-8");
        let joke = JSON.parse(text);
        allJokes.push(joke);
    }
    return allJokes;
}

function getAllJokes(req, res) {
    res.writeHead(200, "OK", { "Content-type": "application/json" });
    res.end(JSON.stringify(getAll()));
}
let privateKeyPath = path.join(__dirname, "private.key");
let key = generateKey();
fs.writeFileSync(privateKeyPath, key);

function addJoke(req, res) {
    if (req.headers["apikey"] == key) {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        })
        req.on("end", () => {
            let dir = fs.readdirSync(dataPath);
            let joke = JSON.parse(data);
            console.log(joke);
            joke.id = dir.length + 1;
            joke.likes = 0;
            joke.dislikes = 0;
            let filename = dir.length + ".json";
            let filePath = path.join(dataPath, filename);
            fs.writeFileSync(filePath, JSON.stringify(joke));
            res.writeHead(201, "Created", { "Content-type": "application/json" });
            res.end(JSON.stringify(joke));
            console.log("New data");
        })
    } else {
        res.writeHead(403, "Access denied", {"Content-type": "application/json"});
        res.end(JSON.stringify({
            "error": "Api key is not valid"
        }))
    }
}

function generateKey() {
    return crypto.randomBytes(4).toString("hex");
}

function likeDislike(req, res) {
    let params = url.parse(req.url, true); 
    let jokeId = params.query.id;
    if (jokeId) {
        let filePath = path.join(dataPath, (jokeId - 1) + ".json");
        let jokeText = fs.readFileSync(filePath, "utf-8");
        let joke = JSON.parse(jokeText);
        if (params.pathname == "/like") joke.likes++;
        if (params.pathname == "/dislike") joke.dislikes++;
        fs.writeFileSync(filePath, JSON.stringify(joke));
        res.writeHead(202, "Accepted");
        res.end();
    } else {
        res.writeHead(400, "Bad request");
        res.end();
    }
}



server.listen(port);
console.log(host + port);



// const nodemailer = require('nodemailer');

// // Создаем объект транспортера
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your_email@gmail.com',
//     pass: 'your_email_password'
//   }
// });

// // Определяем параметры письма
// const mailOptions = {
//   from: 'your_email@gmail.com',
//   to: 'recipient_email@example.com',
//   subject: 'Test Email',
//   text: 'Hello, this is a test email from Node.js!'
// };

// // Отправляем письмо
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
