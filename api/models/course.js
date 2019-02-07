'use strict'

var mongoose = require("mongoose");

var course_schema = mongoose.Schema({
	name: String
});

module.exports = mongoose.model("Course", course_schema);
