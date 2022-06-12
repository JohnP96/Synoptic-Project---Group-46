/*
    Server side javascript
    Run "npm i" in terminal to install dependancies
*/

// //"echo \"Error: no test specified\" && exit 1", - "package.json changed to mocha test"

const fs = require('fs');
const bodyParser = require('body-parser');

let express = require("express");
let app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use ("/", express.static("./app"));

app.get("/", (req, res) => res.render("index"));

app.listen(1337, (console.log('Server running on local host 1337')));



//test function for test api 

const add = (a = 0,b = 0) =>{
    if (typeof a !== 'number' || typeof b !== 'number'){
        return 0;
    }
    return a+b;
};

module.exports = {
    add,
};

// end of test function 