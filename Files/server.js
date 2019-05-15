'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var fs = require('fs');     // file sytem
var ejs = require('ejs');   // Embedded JavaScript templates

var index_page = fs.readFileSync('./index.ejs', 'utf8');    // テンプレートを読み込む

var server = http.createServer(getHtml);    // サーバーを作る
server.listen(port);    // 通信を待ち受ける

/*
 * html を返す処理 
 */
function getHtml(req, res) {
    var titleString = 'タイトル';
    var moment = require('moment');
    titleString = moment().format('YYYY-MM-DD hh:mm:ss');
    var contentString = getPrimes();
    var html = ejs.render(index_page, {
        title: titleString,
        content: contentString
    }); // 変数を渡しながら html を生成する
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.end();
}

function getPrimes() {
    var ret = '';
    for (var i = 2; i < 100; i++) {
        if (isPrime(i)) {
            ret += String(i) + ',';
        }
    }
    return ret;
}

function isPrime(num) {
    for (var i = 2; i < num; i++) {
        if (num % i == 0) {
            return false;
        } 
    }
    return true;
}
