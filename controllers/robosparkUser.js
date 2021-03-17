var progModel = require('../models/prog');
var mecModel = require('../models/mec');
var elexModel = require('../models/elex');

var Model_Value = new Map;
Model_Value.set( 1 ,progModel );
Model_Value.set( 2 ,mecModel );
Model_Value.set( 3 ,elexModel);


module.exports.loginRobosparkUser = async (req,res)=>{
    var domain = parseInt(req.body.username[4]);
    if(domain>0 && domain<4){
        var UserModel =  Model_Value.get(domain);
        const user = await UserModel.login( req.body.username , req.body.password );
        res.send(user);
    }
    else{
        res.send({"Error":"Inavlid Credentials "});
    } 
}