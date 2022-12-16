const express = require('express');
const app = express();
const port = 3000; // port 번호 설정

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const mysql = require('mysql');

// sql 연동
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Gusdn3648!',
    database: 'condb',
});

// 잘 연동 되었는지 확인
db.connect(function (err) {
    if (err) throw err;
    console.log('DB is Connected!');
});
