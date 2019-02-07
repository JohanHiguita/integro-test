const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Student = require ('../models/student');

//Show all students
router.get("/", (req, res, next) => {
	Student.find()
	.exec()
	.then(docs => {
		console.log(docs);    
      	res.status(200).json(docs); //endpoint
      })
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err + "hero"
		});
	});
});

//show one student
router.get("/:studentId", (req, res, next) => {
	const id = req.params.studentId;
	Student.findById(id)
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

//Create Student
router.post("/", (req, res, next) => {
	const student = new Student({
		nombre: req.body.nombre,
		edad: req.body.edad
	});
	student
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: "Handling POST requests to /students",
			createdProduct: result
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

// Edit Student
router.put("/:studentId", (req, res, next) => {
	const id = req.params.studentId;
	const student = {
		nombre: req.body.nombre,
		edad: req.body.edad
	};
	// const updateOps = {};
	// for (const ops of req.body) {
	// 	updateOps[ops.propName] = ops.value;
	// }
	Student.update({ _id: id }, student)
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

router.delete("/:studentId", (req, res, next) => {
	const id = req.params.studentId;
	Student.remove({ _id: id })
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


module.exports = router;
