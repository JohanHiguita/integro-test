var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

// ****Student****
var student_schema = mongoose.Schema({
	nombre: String,
	edad: Number,

});
// definimos el modelo
var Student = mongoose.model("Student", student_schema);

// ****Course****
var course_schema = mongoose.Schema({
	nombre: String,
});
// definimos el modelo
var Course = mongoose.model("Course", course_schema);

// ****Notas****
var grade_schema = mongoose.Schema({
	student_id: String,
	course_id: String,  
	nombreEvaluacion: String,
	calificación: Number 
});
// definimos el modelo
var Grade = mongoose.model("Grade", grade_schema);



//********************* ROUTING ************************************//

//**** Student **** //

app.get("/api/estudiantes", async (req, res) => {
	const students = await Student.find({});
	res.json(students);
});

app.post("/api/estudiantes", (req, res) => {
	Student.create({ nombre: req.body.nombre, edad: req.body.edad }, function(err) {
		if (err) return console.error(err);
	});
	//const students = await Student.find({});
  //res.json(students);
});




app.get('/', (req, res) => {
	res.send('<h1>Hola Mundo</h1>');
});

app.get('/student', (req, res) => {
	Student.create({ nombre: "Johan", edad: 26 }, function(err) {
		if (err) return console.error(err);
		res.send('<h1>Hola Mundo creado</h1>');
	});
	
});

app.listen(3000, () => console.log('Listening on port 3000!'));