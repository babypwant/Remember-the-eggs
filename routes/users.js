var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../utils.js')
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require('../db/models')
const bcrypt = require('bcryptjs');

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

async function getHash(password, saltRounds) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function isPassword(password, hash) {
  const isPassword = await bcrypt.compare(password, hash);
  console.log(isPassword);
  return isPassword;
};

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
