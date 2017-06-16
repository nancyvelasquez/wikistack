var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.get('/', function(res, req){
    console.log('html', 'index');
});
