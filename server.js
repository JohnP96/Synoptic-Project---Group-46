/*
    Server side javascript
    Run "npm i" in terminal to install dependancies
*/

let express = require("express");
let app = express();
app.set('view engine', 'ejs');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use ("/", express.static("./app"));

app.get("/", (req, res) => res.render("index"));

app.listen(1337, (console.log('Server running on local host 1337')));