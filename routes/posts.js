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

// 게시글 정보 페이지 (get)
router.get('/:id', async function(req, res) {
    const id = req.params.id;

    var con;

    try{
        con = await getConnection();

        var sql = 'select * from view_posts where id=:id';

        var result = await con.execute(sql, {id}, {outFormat:oracledb.OUT_FORMAT_OBJECT});

        var post = result.rows[0];
        
        res.render('index', {title: '게시글 정보', pageName: 'posts/read.ejs', post});
    }catch(err){
        console.log(err);
    }finally{
        if(con) await con.close();
    }
})

// 게시글 삭제 
router.post('/delete', async function(req, res) {
    const id = req.body.id;

    var con;

    try{
        con = await getConnection();

        var sql = 'delete from posts where id=:id';

        await con.execute(sql, {id}, {autoCommit:true});

        res.sendStatus(200);
    }catch(err){
        console.log(err);
    }finally{
        if(con) await con.close();
    }
})

// 게시글 수정 페이지
router.get('/update/:id', async function(req, res) {
    const id = req.params.id;

    var con;

    try{
        con = await getConnection();

        var sql = 'select * from view_posts where id = :id';

        var result = await con.execute(sql, {id}, {outFormat:oracledb.OUT_FORMAT_OBJECT});

        var post = result.rows[0];

        res.render('index', {title: '글수정', pageName: 'posts/update.ejs', post});
    }catch(err){
        console.log(err);
    }finally{
        if(con) await con.close();
    }
});

module.exports = router;