var RobosparkUserModel = require('../models/robosparkUser');

module.exports.loginRobosparkUser = async (req,res)=>{
    const user = await RobosparkUserModel.login( req.body.username , req.body.password );
    res.send(user);
}