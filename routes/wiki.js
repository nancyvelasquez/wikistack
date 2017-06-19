var express = require('express');
var app = express()
var router = express.Router();
var userRouter = require('./user');

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
  Page.findAll({}).then(function (pages) {
    res.render('index', {
      pages: pages
    })
  });
});

// router.post('/', function(req, res, next) {

//   console.log('Body ', req.body)
//   // STUDENT ASSIGNMENT:
//   // add definitions for `title` and `content`
//   console.log('Hey here')

//   var page = Page.build({
//     title: req.body.title,
//     content: req.body.content
//   });

//   // STUDENT ASSIGNMENT:
//   // make sure we only redirect *after* our save is complete!
//   // note: `.save` returns a promise or it can take a callback.
//   page.save().then(res.redirect('/'));
//   // -> after save -> res.redirect('/');
// });

router.get('/', function (req, res, next) {
  User.findAll({}).then(function (users) {
    res.render('users', {
      users: users
    });
  }).catch(next);
});

router.post('/', function (req, res, next) {
  User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(function (values) {
      var user = values[0];
      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });
      return page.save().then(function (page) {
        return page.setAuthor(user);
      });

    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);
});

router.get('/add', function (req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function (foundPage) {
      res.render('wikipage', {
        page: foundPage
      });
    })
    .catch(next);
});

module.exports = router;