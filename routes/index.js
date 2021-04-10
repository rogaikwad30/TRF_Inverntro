var express = require('express');
var router = express.Router();
var adminModel = require('../models/admin')
var adminLoginControllers = require('../controllers/login')
var requests = require('../models/requests');
const { request } = require('express');

router.get('/', function(req, res, next) {
  res.json({msg:"Hey Hommies"});
});

router.post('/registerAdmin', adminLoginControllers.registerAdmin )
router.post('/loginAdmin' , adminLoginControllers.loginAdmin)
router.post('/addRobosparkMember',adminLoginControllers.AddNewRobosparkUser );

router.post('/addComponent', adminLoginControllers.addComponents);
router.post('/entirelyNewComponent' , adminLoginControllers.EntirelyNewComponent);
router.post('/checkorder' , adminLoginControllers.checkorder);
router.post("/updateComponent", adminLoginControllers.updateExistingComponent)
router.post('/searchcomponents', adminLoginControllers.searchcomponents);
router.post('/varifyorder', adminLoginControllers.varifyorder);

router.get('/addComponent' , (req,res)=>{
  res.render("index");
})
router.get('/placeorders' , (req,res)=>{
  res.render("placeorder");
})
router.get('/showorders' , async (req,res)=>{
  var list=await requests.find({status:"open"})
  res.render("show",{list1:list})
})

module.exports = router;
