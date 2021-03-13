var adminModel = require('../models/admin')
var RobosparkUserModel = require('../models/robosparkUser');
var emailSetup = require('../emailSetup/email');
 
module.exports.registerAdmin = async (req,res)=>{
        var user = await adminModel.findOne({"USERNAME" : req.body.username })
        if(!user){
            user = await adminModel.create({ "USERNAME" : req.body.username , "PASSWORD" :    req.body.password });
            res.send(user);
        }
        else{
            res.json(
                {error : "UserName already taken"}
            );
        }
}

module.exports.loginAdmin = async (req , res)=>{
    const user = await adminModel.login(req.body.username , req.body.password);
    res.send(user);
}

module.exports.AddNewRobosparkUser = async (req,res)=>{
    var newRoboSparkUsername = req.body.username; 
    const user = await RobosparkUserModel.findOne({"USERNAME" : newRoboSparkUsername});
    if(!user){
        var temp = await RobosparkUserModel.create({"USERNAME" : newRoboSparkUsername , "PASSWORD" : "trf@1234"});

        // emailSetup.mailOptions.to = newRoboSparkUsername;
        // emailSetup.mailOptions.subject = "Login Credentials for Inventro";
        // emailSetup.mailOptions.text = "Username " + newRoboSparkUsername+ " Password  : trf@1234" ;
        // emailSetup.transporter.sendMail( emailSetup.mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //       res.send(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });

        res.send({"Message" : "Email that user the Crdentials such as " , "Username" : temp.USERNAME , "Password" : "trf@1234" ,"_id" : temp.id })
    }
    else{
        res.send({"Message" : "This is Already Registered Robospark Member."})
    }
}