/*
    Server side javascript
    Run "npm i" in terminal to install dependancies
*/

const { exec } = require("child_process");

var path = require('path')
var nodeMailer = require('nodemailer')

const fs = require('fs');

let express = require("express");
let app = express();
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static("./app"));

app.get("/", (req, res) => res.render("index"));
app.get("/send_alert", (req, res) => res.render("send"));

app.listen(1337, (console.log('Server running on local host 1337')));

// start of email functionality --------|

app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'hero42069poon@gmail.com',
            pass: 'salccifdqrmcocaf'
        }
    });
    let mailOptions = {
        from: '"MAS TEST" <hero42069poon@gmail.com>', // sender address
        to: 'hero42069poon@gmail.com', // list of receivers
        subject: 'ALERT', // Subject line
        text: 'THIS IS AN EXAMPLE ALERT', // plain text body
        html: '<b>Node JS ALERT EXAMPLE</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
});

// end of email functionality   --------|

// start of speed test   --------|

app.post("/speed-test", (req, res) => {
    console.log("Speed Test Requested")
    exec("speed-test --json", (err, stdout, stderr) => {
        if (err || stderr) {
            console.log(err, stderr)
        }
        const result = JSON.parse(stdout);
        const response = `<center>
                      <h2>Ping : ${result.ping}</h2>
                      <h2>Download Speed : ${result.download}</h2>
                      <h2>Upload Speed : ${result.upload}</h2>
                      </center>`;
        console.log(response);


        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hero42069poon@gmail.com',
                pass: 'salccifdqrmcocaf'
            }
        });
        let mailOptions = {
            from: '"MAS TEST" <hero42069poon@gmail.com>', // sender address
            to: 'hero42069poon@gmail.com', // list of receivers
            subject: 'Bandwidth Test', // Subject line
            text: 'This is a badwidth test', // plain text body
            html: response // html body
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
        

    });
    res.render("index")
});

// end of speed test   --------|

// test function for test api 

const add = (a = 0, b = 0) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return 0;
    }
    return a + b;
};

module.exports = {
    add,
};

// end of test function 