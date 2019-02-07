'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var app = express();

var student_routes = require('./api/routes/students'); 

mongoose.connect(
	'mongodb://localhost:27017/mydatabase',
	{ useNewUrlParser: true }
	);
mongoose.connection.on("error", function(e) { console.error(e); });


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/estudiantes', student_routes);

module.exports = app;

app.listen(3000, () => console.log('Listening on port 3000!'));