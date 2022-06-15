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

app.get("/AT", (req, res) => res.render("AlertTracking"));
app.get("/AT-M", (req, res) => res.render("AT-Mainenance"));
app.get("/AT-T", (req, res) => res.render("AT-Tsunamis"));
app.get("/AT-TOR", (req, res) => res.render("AT-Tornadoes"));
app.get("/AT-F", (req, res) => res.render("AT-Floods"));
app.get("/AT-E", (req, res) => res.render("AT-Earth"));
app.get("/AT-W", (req, res) => res.render("AT-Wildfires"));

app.get("/map", (req, res) => res.render("map"));
app.get("/alerts", (req, res) => res.json(getAlerts()));

//Adds new alert to the alerts file
app.post("/send_alert", function(req,res){
    let alertFile = fs.readFileSync("alerts.json");
    let alerts = JSON.parse(alertFile);
    let date = new Date(); //Gets the current date and time
    let alert = {
        id:date.getMilliseconds(),
        type:req.body.type,
        level:req.body.level,
        details:req.body.details,
        date:date,
        coords:req.body.coords
    };
    alerts.push(alert)
    //console.log(JSON.stringify(alerts));
    fs.writeFileSync("alerts.json", JSON.stringify(alerts));
    sendEmail(alert);
    res.redirect("/");
});

function getAlerts() { // Returns all alerts in json format
    let alertFile = fs.readFileSync("alerts.json");
    let alerts = JSON.parse(alertFile);
    return alerts;
}


app.listen(1337, (console.log('Server running on local host 1337')));

// start of email functionality --------|

function sendEmail(alert) {
    console.log(alert);
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
        to: 'john.p.p@hotmail.co.uk', // list of receivers
        subject: 'ALERT #' + alert.id, // Subject line
        text: 'Type: ' + alert.type +
            '\nPriority: ' + alert.level + 
            '\nDetails: ' + alert.details, // plain text body
        html: '<b>Type: ' + alert.type + '</b><br>' +
                '<b>Priority: ' + alert.level + '</b>' +
                '<p>Details: ' + alert.details + '</p>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    
}

/*app.post('/send-email', function (req, res) {
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
        res.redirect('/');
    });
});*/

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
            res.redirect('/');
        });
    });
});

// end of speed test   --------|

// test function for test api 

// const add = (a = 0, b = 0) => {
//     if (typeof a !== 'number' || typeof b !== 'number') {
//         return 0;
//     }
//     return a + b;
// };

module.exports = {
    getAlerts,
    sendEmail
};

// end of test function 