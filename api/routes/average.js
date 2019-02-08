const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//const Course = require ('../models/course');
const Grade = require ('../models/grade');

//Show course grades average
router.get("/:courseId", (req, res, next) => {

	const course_id = req.params.courseId;

	
	// calculate average
	var sum_grades = 0;
	var counter = 0;
	const cursor = Grade.find({course_id: course_id}).cursor();
	cursor.on('data', function(doc) {
		counter ++; // how many grades in the course
		sum_grades += doc.grade_number;
	
	})
	.on('error', function (err) {
		console.log(err);
	}).on('end', function () {
		var grades_avg = sum_grades / counter;
		res.status(200).json(grades_avg);
	})
});


module.exports = router;
