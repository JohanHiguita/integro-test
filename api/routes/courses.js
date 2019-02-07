const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Course = require ('../models/course');

//Show all courses
router.get("/", (req, res, next) => {
	Course.find()
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

//show one course
router.get("/:courseId", (req, res, next) => {
	const id = req.params.courseId;
	Course.findById(id)
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
	const course = new Course({
		name: req.body.Nombre
	});
	course
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: "Handling POST requests to /courses",
			createdCourse: result
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

// Edit Course
router.put("/:courseId", (req, res, next) => {
	const id = req.params.courseId;
	const course = {
		name: req.body.Nombre
	};
	// const updateOps = {};
	// for (const ops of req.body) {
	// 	updateOps[ops.propName] = ops.value;
	// }
	Course.update({ _id: id }, course)
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

//DElete Course
router.delete("/:courseId", (req, res, next) => {
	const id = req.params.courseId;
	Course.remove({ _id: id })
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
