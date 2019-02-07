'use strict'

var mongoose = require("mongoose");

var student_schema = mongoose.Schema({
	nombre: String,
	edad: Number,
});

module.exports = mongoose.model("Student", student_schema);
