const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('../utils');
const { User } = require('../db/models');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { loginUser } = require('../auth');

router.use(cookieParser());

const validations = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username')
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another account');
        }
      });
    }),
  check('hashedPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.hashedPassword) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
];

router.get(
  '/',
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const user = await User.build({
      username: null,
      fullName: null,
      email: null,
      hashedPassword: null,
    });
    res.render('signup', { user, token: req.csrfToken() });
  })
);

router.post(
  '/',
  validations,
  asyncHandler(async (req, res, next) => {
    const { username, fullName, email, hashedPassword } = req.body;
    const user = await User.build({
      username,
      fullName,
      email,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const actualHashedPassword = await bcrypt.hash(hashedPassword, 10);
      user.hashedPassword = actualHashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('signup', {
        user,
        errors,
      });
    }
  })
);

module.exports = router;
