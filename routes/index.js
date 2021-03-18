var express = require('express');
var router = express.Router();
var adminModel = require('../models/admin')
var adminLoginControllers = require('../controllers/login')

router.get('/', function(req, res, next) {
  res.json({msg:"Hey Hommies"});
});

router.post('/registerAdmin', adminLoginControllers.registerAdmin )
router.post('/loginAdmin' , adminLoginControllers.loginAdmin)
router.post('/addRobosparkMember',adminLoginControllers.AddNewRobosparkUser );

router.post('/addComponent', adminLoginControllers.addComponents);
router.post('/entirelyNewComponent' , adminLoginControllers.EntirelyNewComponent);

router.post("/updateComponent", adminLoginControllers.updateExistingComponent)


router.get('/addComponent' , (req,res)=>{
  res.render("index");
})


module.exports = router;
