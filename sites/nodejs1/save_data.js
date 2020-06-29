const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
    fname: String,
    lname: String
});
var User = mongoose.model("User", nameSchema);

app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/example', (req, res) => {
    res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


app.listen(port, () => {
  console.log(`Server running on port${port}`);
});