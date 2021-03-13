var mongoose  = require("mongoose")
var bcryptjs = require('bcryptjs')
mongoose.connect("mongodb+srv://abcd:abcd@cluster0.mejos.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true , useCreateIndex:true, useUnifiedTopology: true})
var connection = mongoose.connection;


var AdminSchema = new mongoose.Schema({
    USERNAME :  {
        type: String,
    },
    PASSWORD : {
        type: String,
    },
})


AdminSchema.pre('save', function (next) {
    this.PASSWORD = bcryptjs.hashSync(this.PASSWORD, 10);
    next();
});
  
// call login function on obj in db directly 
AdminSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ "USERNAME" :  username });
    if (user) {
      const auth = await bcryptjs.compareSync(password , user.PASSWORD)
      if (auth) {
        return user;
      }
      return {"Error" : "Incorrect Password"};
    }
    return {"Error" : "Incorrect Email"};
};


var adminModel = mongoose.model('LOGIN_DATA' , AdminSchema)
module.exports= adminModel;

