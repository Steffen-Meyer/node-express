var express = require('express'),
    app = express(),
    expressHbs = require('express3-handlebars'),
    port = 8000,
    jf = require('jsonfile'),
    util = require('util');


app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.use("/assets", express.static(__dirname + '/assets'));
app.use("/data", express.static(__dirname + '/data'));
app.use("/views", express.static(__dirname + '/views'));




app.get('/', function (req, res) {
    res.render('home');
});

app.get('/home', function (req, res) {
    var file = './data/home.json'
    jf.readFile(file, function (err, obj) {
        res.render('home', obj);

    })
});


app.get('/about', function (req, res) {
    var file = './data/about.json'
    jf.readFile(file, function (err, obj) {
        res.render('about', obj);

    })
});

app.get('/contact', function (req, res) {
    var file = './data/contact.json'
    jf.readFile(file, function (err, obj) {
        res.render('contact', obj);

    })
});




app.listen(port);

