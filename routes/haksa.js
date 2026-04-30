var express = require('express');
var router = express.Router();
const { getConnection } = require('../connect');
const oracledb = require('oracledb');

// 학사관리의 교수 라우터
router.get('/pro', function(req, res, next){
    res.render('index', {title: '교수관리', pageName: 'haksa/professors.ejs'})
});

// 학사 관리 - 교수 리스트 라우터
router.get('/pro/list.json', async function(req, res, next){
    var con;
    try{
        con = await getConnection();
        const sql="select * from professors";
        const result = await con.execute(sql, {}, {outFormat:oracledb.OUT_FORMAT_OBJECT});
        res.send(result.rows);
    }catch(err){

    }finally{
        if(con) await con.close();
    }
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