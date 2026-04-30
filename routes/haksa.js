var express = require('express');
var router = express.Router();

// 학사관리의 교수 라우터
router.get('/pro', function(req, res, next){
    res.render('index', {title: '교수관리', pageName: 'haksa/professors.ejs'})
});

// 학사관리의 학생 라우터
router.get('/stu', function(req, res, next){
    res.render('index', {title: '학생관리', pageName: 'haksa/students.ejs'})
});

// 학사관리의 강좌 라우터
router.get('/cou', function(req, res, next){
    res.render('index', {title: '강좌관리', pageName: 'haksa/courses.ejs'})
});

module.exports = router;