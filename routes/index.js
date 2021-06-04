var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../utils.js');
const { User, List, Task } = require('../db/models');
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth');

/* GET home page. */

router.get('/', asyncHandler(async (req, res) => {
  if (!req.session.auth) {
    res.redirect('/login')
  }
  const { userId } = req.session.auth


  const user = await User.findByPk(userId)
  const lists = await List.findAll({ where: { userId }, include: { model: Task } })
  res.render('home', { user, lists })
}))

router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    logoutUser(req, res);
    res.redirect('/');
  })
);

module.exports = router;
