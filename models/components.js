var mongoose  = require("mongoose");
mongoose.connect("mongodb+srv://abcd:abcd@cluster0.mejos.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true , useCreateIndex:true, useUnifiedTopology: true});



var Components_Schema = new mongoose.Schema({
    "NAME" : {
        type : String
    },
    "CATEGORY" : {
        type : String
    },
    "AVALABILITY" : [{
        "subCategory" : {
            type : String,
        },
        "availability" : {
            type : Number,
            default : 0
        },
        "lastUpdated" : {
            type : Date,
            default : Date.now
        }
    }]
});



var Components_Model = mongoose.model('Component' , Components_Schema);
module.exports = Components_Model;
