const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('../utils');
const { Task } = require('../db/models');
const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator');

router.use(cookieParser());

const taskNotFoundError = (id) => {
  const error = Error('Task not found');
  error.errors = [`Tast with id ${id} not found`];
  error.title = `Task not found`;
  error.status = 404;
  return error;
};

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (task) {
      res.json({ task });
    } else {
      next(taskNotFoundError(taskId));
    }
  })
);
