'use strict'

var mongoose = require("mongoose");

var grade_schema = mongoose.Schema({
	student_id: String,
	course_id: String,
	name: String,
	grade_number: Number
});

module.exports = mongoose.model("Grade", grade_schema);
