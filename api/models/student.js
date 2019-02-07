'use strict'

var mongoose = require("mongoose");

var student_schema = mongoose.Schema({
	name: String,
	age: Number,
});

module.exports = mongoose.model("Student", student_schema);
