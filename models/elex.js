var RobosparkMemberSchema = require('../models/robosparkUser');
var mongoose = require('mongoose');

var RobosparkMemberModel_Elex = mongoose.model('ROBOSPARK_USERS_ELEX' , RobosparkMemberSchema); 
module.exports = RobosparkMemberModel_Elex; 
