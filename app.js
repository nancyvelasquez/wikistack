var express = require('express');
var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')
var logger = require('morgan')
var models = require('./models');
var routes = require('./routes');

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.static('public'));
app.use(routes);

app.get('/', function(req, res){
    res.render('index');
});

models.User.sync({ force: false })  //
    .then(function(){
        return models.Page.sync({ force: false });
    })
    .then(function() {
        app.listen(3000, function(){
            console.log('Server is listening on port 3000');
        });
    })
    .catch(console.error);
