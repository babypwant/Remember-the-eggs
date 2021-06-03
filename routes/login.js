var express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
var router = express.Router();
const { asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models');
const bcrypt = require('bcryptjs');
const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());
const{loginUser, logoutUser, requireAuth, restoreUser} = require('../auth')

const loginValidators = [
  check('email').exists({ checkFalsy: true }).withMessage('Please provide a value for Email Address'),
  check('password').exists({ checkFalsy: true }).withMessage('Please provide a value for Password'),
];

const validateEmailAndPassword = [
  check('email').exists({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email.'),
  check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.'),
];

async function getHash(password, saltRounds) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function isPassword(password, hash) {
  const isPassword = await bcrypt.compare(password, hash);
  return isPassword;
}

/* GET users listing. */
router.get('/',  function (req, res, next) {
  res.render('user-login');
});

router.post(
  '/',
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let errors = [];
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatch) {
          loginUser(req, res, user);
          return res.redirect('/',);
        }
      }
      errors.push('Login failed for the provided email address and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render('user-login', {});
  })
);

module.exports = router;
