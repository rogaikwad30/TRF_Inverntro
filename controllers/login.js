var adminModel = require('../models/admin')
var emailSetup = require('../emailSetup/email');
var inventryComponents =  require('../models/components');

var progModel = require('../models/prog');
var mecModel = require('../models/mec');
var elexModel = require('../models/elex');
var reqModel = require('../models/requests');

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

module.exports.addComponents = async (req,res)=>{
    var {name} = req.body;
    var Component = await inventryComponents.findOne({"NAME":name});
    if(Component){ 
        res.send(Component.AVALABILITY);
    }
    else{ 
        console.log("here");
        res.send({"Error" : "Looks new Component please Provide additional info"});
    }
}
module.exports.searchcomponents = async (req,res)=>{
    var {name} = req.body;
    var Component = await inventryComponents.findOne({"NAME":name});
    if(Component){ 
        res.send(Component.AVALABILITY);
    }
    else{ 
        console.log("here");
        res.send({"Error" : "Looks new Component please Provide additional info"});
    }
}

module.exports.EntirelyNewComponent = async (req, res)=>{
    var test = await inventryComponents.findOne({"NAME" : req.body.name});
    if(!test){
        var obj = await inventryComponents.create({"NAME":req.body.name,"CATEGORY":req.body.category , "AVALABILITY" : [{
            "subCategory" : req.body.subCategory,
            "availability" :  req.body.availability,
        }]});
        res.send(obj);
    }
    else{
        res.send({"Error" : "Already Present Components"})
    }
}

module.exports.updateExistingComponent = async (req, res)=>{
    var obj = await inventryComponents.update({"NAME":req.body.name,"AVALABILITY._id":req.body.id},
    {$inc:{"AVALABILITY.availability": 1}});
    console.log(obj);
}

module.exports.checkorder = async (req, res)=>{
    var obj = await inventryComponents.find({"NAME":req.body.name , "AVALABILITY._id":req.body.id})
    var stock = obj[0].AVALABILITY.find(element => element._id==req.body.id);
    if(stock.availability>=parseInt(req.body.num))
    {
       res.json({"msg":"Your order is placed"})
       var newreq = await reqModel.create({"NAME":req.body.name,"subCategory":stock.subCategory,"quantity":req.body.num,"time":new Date(),"RequestedBy":"Dummy User","status":"open"})
    }
    else
    {
        res.json({"msg":"Insufficient Stock"})
    }
}
module.exports.varifyorder = async (req, res)=>{
    var id= req.body.id.slice(0,(req.body.id.length-6))
    if(req.body.id.includes("accept"))
    {
        var order =await reqModel.findOne({_id:id})
        order.status="accepted"
        // order.save()
        // var obj = await inventryComponents.find({"NAME":order.NAME})
        var obj = await inventryComponents.updateOne({"NAME":order.NAME,"AVALABILITY.subCategory":order.subCategory},
        {$inc:{"AVALABILITY.availability": 1}});
        // var stock =  await inventryComponents.find({"NAME":order.NAME}).obj[0].AVALABILITY.find(element => element.subCategory==order.subCategory);
        console.log(obj)
        // stock.availability=stock.availability-order.quantity
        // obj.save()
    }
    else if(req.body.id.includes("reject"))
    {
        var order =await reqModel.findOne({_id:id})
        order.status="rejected"
        order.save()
    }
}