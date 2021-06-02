const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('../utils');
const { User } = require('../db/models');
const cookieParser = require('cookie-parser');

router.get(
  '/',
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    // const {username, fullName, } = req.body
  })
);

module.exports = router;
