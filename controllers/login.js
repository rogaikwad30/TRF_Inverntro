var adminModel = require('../models/admin')
var emailSetup = require('../emailSetup/email');

var progModel = require('../models/prog');
var mecModel = require('../models/mec');
var elexModel = require('../models/elex');

var Model_Value = new Map;
Model_Value.set( 1 ,progModel );
Model_Value.set( 2 ,mecModel );
Model_Value.set( 3 ,elexModel);

 
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
    var userName_Std_Format = "TRF-";
    var domain = req.body.domain;
    var newRoboSparkUsername = userName_Std_Format + domain + "-" + req.body.username; 
    if( domain<=0 ||  domain>=4 ){
        return res.send({"Error" : "Invalid Credentials"})
    }
    var userModel = Model_Value.get(req.body.domain);
    const user = await userModel.findOne( { $or: [ { "USERNAME" : req.body.username }, { "EMAIL" : req.body.email } ] } );
    
    if(!user){
        var temp = await userModel.create({"USERNAME" : newRoboSparkUsername , "EMAIL" : req.body.email  , "PASSWORD" : "trf@1234"});

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