var express = require('express');
var app = express();
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;
