var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next){
  res.render('index', { title: '로그인', pageName:'login.ejs'})
});

module.exports = router;
