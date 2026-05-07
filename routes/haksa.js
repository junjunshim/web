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
        const sql="select p.*, to_char(p.hiredate, 'YYYY-MM-DD') fdate, to_char(salary, '99,999,999') fsalary from professors p";
        const result = await con.execute(sql, {}, {outFormat:oracledb.OUT_FORMAT_OBJECT});
        res.send(result.rows);
    }catch(err){

    }finally{
        if(con) await con.close();
    }
});

// 학사관리의 교수 등록 라우터
router.get('/pro/insert', async function(req, res, next){
    var con;
    var code;
    try {
        con = await getConnection();

        const sql = "select max(pcode)+1 newcode from professors";
        const result = await con.execute(sql);
        code = result.rows[0][0];
    }catch(err){

    }finally{
        if(con) await con.close();
    }
    res.render('index', {title: '교수등록', pageName: 'haksa/professors_insert', code})
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