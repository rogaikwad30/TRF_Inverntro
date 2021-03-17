var RobosparkMemberSchema = require('../models/robosparkUser');
var mongoose = require('mongoose');

var RobosparkMemberModel_Mec = mongoose.model('ROBOSPARK_USERS_MEC' , RobosparkMemberSchema); 
module.exports = RobosparkMemberModel_Mec; 
