const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const PORT = process.env.port || 8000;
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'q1w2e3r4!',
    database: 'my_db',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Root');
});

//전체 blog_content 불러오기
app.get('/post', (req, res) => {
    const sqlQuery = 'SELECT * FROM blog_content;';
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

//특정 게시물 데이터 가져오기
app.get('/post/:no', (req, res) => {
    db.query(
        `SELECT * from blog_content where postId=${req.params.no}`,
        (error, rows) => {
            if (error) console.log(error);
            console.log('Post: ', rows);
            res.send(rows);
        }
    );
});

//특정 게시물 삭제
app.get('/post/delete/:no', (req, res) => {
    db.query(
        `DELETE FROM blog_content WHERE postId=${req.params.no}`,
        (error, rows) => {
            if (error) console.log(error);
            console.log('Post: ', rows);
            res.send(rows);
        }
    );
});

//특정 게시물 수정하기
app.post('/post/edit/', (req, res) => {
    db.query(
        `UPDATE blog_content SET title = "${req.body.title}", body="${req.body.body}" WHERE postId=${req.body.postId}`,
        (error, rows) => {
            if (error) console.log(error);
            console.log('Post: ', rows);
            res.send([rows, req.body]);
        }
    );
});
//특정 게시물 생성하기
app.post('/create', (req, res) => {
    console.log(req.body);
    db.query(
        `INSERT INTO blog_content(title,body,time) values('${req.body.title}','${req.body.body}','${req.body.time}') `,
        (error, rows) => {
            if (error) console.log(error);
            console.log('edit: ', rows);
            res.send(rows);
        }
    );
});
//특정 댓글 지우기
app.get('/comment/delete/:no', (req, res) => {
    db.query(
        `DELETE FROM comment WHERE commentId=${req.params.no}`,
        (error, rows) => {
            if (error) console.log(error);
            console.log('Post: ', rows);
            res.send(rows);
        }
    );
});
//특정 게시물의 댓글 다 지우기
app.get('/comment/deleteAll/:no', (req, res) => {
    db.query(
        `DELETE FROM comment WHERE postId=${req.params.no}`,
        (error, rows) => {
            if (error) console.log(error);
            console.log('Post: ', rows);
            res.send(rows);
        }
    );
});
//특정 게시물의 댓글 가져오기
app.get('/comment/:no', (req, res) => {
    db.query(
        `SELECT * FROM comment where postId=${req.params.no}`,
        (error, rows) => {
            if (error) console.log(error);
            console.log('Post: ', rows);
            res.send(rows);
        }
    );
});
//특정 게시물의 댓글 달기
app.post('/commentcreate', (req, res) => {
    db.query(
        `INSERT INTO comment(body,postId) values("${req.body.body}",${req.body.postId})`,
        (error, rows) => {
            if (error) console.log(error);
            console.log('edit: ', rows);
            res.send(rows);
        }
    );
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
