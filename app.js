'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var app = express();

var student_routes = require('./api/routes/students'); 
var course_routes = require('./api/routes/courses'); 
var grade_routes = require('./api/routes/grades');
var average_route = require('./api/routes/average'); 

mongoose.connect(
	'mongodb://johan-higuita:'+ process.env.MONGO_ATLAS_PW +'@integro-test-shard-00-00-zdcy8.mongodb.net:27017,integro-test-shard-00-01-zdcy8.mongodb.net:27017,integro-test-shard-00-02-zdcy8.mongodb.net:27017/test?ssl=true&replicaSet=integro-test-shard-0&authSource=admin&retryWrites=true',
	{ useNewUrlParser: true }
	);
mongoose.connection.on("error", function(e) { console.error(e); });


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/estudiantes', student_routes);
app.use('/api/cursos', course_routes);
app.use('/api/notas', grade_routes);
app.use('/api/promedioCurso', average_route);

module.exports = app;

app.listen(3000, () => console.log('Listening on port 3000!'));