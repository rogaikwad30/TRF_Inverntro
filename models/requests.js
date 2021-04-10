var mongoose  = require("mongoose");
mongoose.connect("mongodb+srv://abcd:abcd@cluster0.mejos.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true , useCreateIndex:true, useUnifiedTopology: true});



var Request_Schema = new mongoose.Schema({
    "NAME" : {
        type : String
    },
    "subCategory" : {
        type : String,
    },
    "quantity" : {
        type : Number,
        default : 0
    },
    "time" : {
        type : Date,
        default : Date.now
    },
    "RequestedBy" : {
        type : String,
    },
    "status" : {
        type : String,
    },
});



var Requests_Model = mongoose.model('Requests' , Request_Schema);
module.exports = Requests_Model;
