'use strict'

var mongoose = require("mongoose");

var course_schema = mongoose.Schema({
	nombre: String
});

module.exports = mongoose.model("Course", course_schema);
