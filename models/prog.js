var RobosparkMemberSchema = require('../models/robosparkUser');
var mongoose = require('mongoose');

var RobosparkMemberModel_Prog = mongoose.model('ROBOSPARK_USERS_PPROG' , RobosparkMemberSchema); 
module.exports = RobosparkMemberModel_Prog; 


