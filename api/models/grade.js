'use strict'

var mongoose = require("mongoose");

var grade_schema = mongoose.Schema({
	student_id: String,
	course_id: String,
	name: String,
	grade_number: Number

});

grade_schema.statics.studentNotes = function(student_id) {
	var grade_numbers = [];
	//var grade_numbers = new Array();

	const cursor = this.find({student_id: student_id}).cursor();

	cursor.on('data', function(doc) {
		console.log(doc.grade_number);
		grade_numbers.push(doc.grade_number);
		console.log(grade_numbers);
	})
	.on('error', function (err) {
		console.log(err);
	}).on('end', function () {
		console.log("Aui")
		return_fn(grade_numbers);
	})

	function return_fn(data) {
		return data;
	}


	// this.find({student_id: student_id}).stream()
	// .on('data', function(doc){
	// 	console.log(doc.grade_number);
	// 	grade_numbers.push(doc.grade_number);
	// 	console.log(grade_numbers);
	// })
	// .on('error', function(err){
	// 	console.log(err);
	// })
	// .on('end', function(){
	// 	console.log("final");
	// 	//return grade_numbers;	
	// 	return [4,7,8];
	// });
	

	
};


module.exports = mongoose.model("Grade", grade_schema);
