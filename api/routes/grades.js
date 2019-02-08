const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Grade = require ('../models/grade');
const Course = require ('../models/course');

//Show all grades
router.get("/", (req, res, next) => {
	Grade.find()
	.exec()
	.then(docs => {
		console.log(docs);    
      	res.status(200).json(docs); //endpoint
      })
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

//show one grade
router.get("/show/:gradeId", (req, res, next) => {
	const id = req.params.gradeId;
	Grade.findById(id)
	.exec()
	.then(doc => {
		console.log("From database", doc);
		if (doc) {
			res.status(200).json(doc);
		} else {
			res
			.status(404)
			.json({ message: "No valid entry found for provided ID" });
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	});
});

//Create Grade
router.post("/", (req, res, next) => {
	const grade = new Grade({
		student_id: req.body.IdEstudiante,
		course_id: req.body.IdCurso,
		name: req.body.NombreEvaluacion,
		grade_number: req.body.Calificacion
	});
	grade
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: "Handling POST requests to api/notas",
			createdGrade: result
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

// Edit Grade
router.put("/:gradeId", (req, res, next) => {
	const id = req.params.gradeId;
	const grade = {
		student_id: req.body.IdEstudiante,
		course_id: req.body.IdCurso,
		name: req.body.NombreEvaluacion,
		grade_number: req.body.Calificacion
	};
	// const updateOps = {};
	// for (const ops of req.body) {
	// 	updateOps[ops.propName] = ops.value;
	// }
	Grade.update({ _id: id }, grade)
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.delete("/:gradeId", (req, res, next) => {
	const id = req.params.gradeId;
	Grade.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

//Get students grades
//Get students grades
router.get("/:studentId", (req, res, next) => {
	const student_id = req.params.studentId;

	//Obtener las notas del student_id:
	var grade_numbers = [];
	const cursor = Grade.find({student_id: student_id}).cursor();
	cursor.on('data', function(doc) {
		grade_numbers.push(doc.grade_number);
	})
	.on('error', function (err) {
		console.log(err);
	}).on('end', function () {
		res.status(200).json(grade_numbers);
	})
	
	
});


});

module.exports = router;
