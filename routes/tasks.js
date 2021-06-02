const express = require('express');
const taskRouter = express.Router();
const { asyncHandler, csrfProtection } = require('./utils.js')
const { Task, List } = require('../db/models')



taskRouter.get('/', asyncHandler(async(req,res)=>{
    const tasks = await Task.findAll({
      include: List
    });
    res.render('tasksTable',{tasks})
  }))


taskRouter.get('/tasks', csrfProtection,asyncHandler(async(req,res)=>{
    const tasks= await Task.findAll();
    res.render('tasks',{csrfToken: req.csrfToken(),tasks})
  }))

///create task
taskRouter.post('/tasks/new', csrfProtection,asyncHandler(async(req,res)=>{
    const {  name, due, completionStatus, description } = req.body
    const newTask = await Task.create({
      name,
      due,
      completionStatus,
      description,
    })
    res.redirect('/tasks')
  }))



  module.exports = taskRouter;
