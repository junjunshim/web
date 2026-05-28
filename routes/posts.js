var express = require('express');
var router = express.Router();
const { getConnection } = require('../connect');
const oracledb = require('oracledb');

/* 게시글 목록 */
router.get('/', function (req, res, next) {
    res.render('index', { title: '게시글', pageName: 'posts/list.ejs' });
});

//게시글 목록 데이터
router.get('/list.json', async function(req, res){
    const page=parseInt(req.query.page) || 1;
    const size=parseInt(req.query.size) || 10;

    const startRow = (page-1) * size + 1;
    const endRow = page * size;
    
    var con;
    
    try{
        con = await getConnection();
        
        var sql="select * from view_posts where rn between :startRow and :endRow";
        var result=await con.execute(sql, {startRow, endRow}, {outFormat:oracledb.OUT_FORMAT_OBJECT});
        const list=result.rows;
        
        sql="select count(*) from view_posts";
        result=await con.execute(sql);
        const total=result.rows[0][0];
        
        res.send({list, total});
    }catch(err){
        console.log(err);
    }finally{
        if(con) await con.close();
    }
});

// 게시글 등록 페이지(get)
router.get('/insert', function(req, res, next){
    res.render('index', {title:'글쓰기', pageName:'posts/insert.ejs'});
});

// 게시글 등록 (post)
router.post('/insert', async function(req, res) {
    const title=req.body.title;
    const content=req.body.content;
    const writer=req.body.writer;

    var con;

    try{
        con = await getConnection();

        var sql = "insert into posts(id, title, content, writer) values(post_id.nextval, :title, :content, :writer)";

        con.execute(sql, {title, content, writer}, {autoCommit:true});
        res.sendStatus(200);
    }catch(err){
        console.log(err);
    }finally{
        if(con) await con.close();
    }
});

module.exports = router;