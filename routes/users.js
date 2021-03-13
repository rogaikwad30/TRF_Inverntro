var express = require('express');
var router = express.Router();
var robosparkControllers = require('../controllers/robosparkUser');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/robosparkUser', robosparkControllers.loginRobosparkUser)

module.exports = router;
