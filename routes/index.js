var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../utils.js');
const { User } = require('../db/models');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session);
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
