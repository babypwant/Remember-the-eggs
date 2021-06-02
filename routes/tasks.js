const express = require('express');
const taskRouter = express.Router();
const { asyncHandler, csrfProtection } = require('../utils');
const { Task, List } = require('../db/models');
const cookieParser = require('cookie-parser');
const { check } = require('express-validator');

taskRouter.use(cookieParser());

const taskNotFoundError = (taskId)=>{
    const error = Error(`Task At ID ${taskId} Not Found`);
    error.title = "Task Not Found";
    error.status = 404;
    return error
}

const taskValidators = [
    check("name")
        .exists({checkFalsy:true})
        .withMessage("PLEASE PROVIDE A NAME")
        .isLength({ max:50 })
        .withMessage("NAME CANNOT EXCEED 50 CHARACTERS")
];

taskRouter.get("/", asyncHandler(async(req,res)=>{
    const tasks = await Task.findAll({
      include: List
    });
    res.render('tasks-table',{tasks})
  }))

// With csrfProtection
// taskRouter.get("/", csrfProtection,asyncHandler(async(req,res)=>{
//     const tasks= await Task.findAll({
//         include: List
//     });
//     res.render('tasks',{csrfToken: req.csrfToken(),tasks})
//   }))


taskRouter.get("/:id", asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    console.log(taskId);
    const task = await Task.findByPk(parseInt(taskId, 10));

    if (task) {
         res.json({ task });
    } else {
         next(taskNotFoundError(taskId))
    }
}));

///create task
taskRouter.post("/", taskValidators, csrfProtection, asyncHandler(async(req,res)=>{
    const {  name, due, completionStatus, description, listId } = req.body
    const newTask = await Task.create({
      name,
      due,
      completionStatus,
      description,
      listId
    })
    res.json({newTask}) //res.redirect("/")
  }));


taskRouter.put("/:id", taskValidators, asyncHandler(async(req, res)=>{
    const taskId = parseInt(req.params.id,10);
    const task = await Task.findByPk(taskId);

    if(task){
        console.log(task)
        await task.update({
            name:req.body.name,
            due:req.body.due,
            completionStatus:req.body.completionStatus,
            description:req.description
        })
        res.json({task})
    }else{
        next(taskNotFoundError(taskId))
    }
}))

taskRouter.delete('/:id', asyncHandler(async (req, res, next) => {
    const taskId = parseInt(req.params.id,10);
    const task = await Task.findByPk(taskId);

    if (task) {
        await task.destroy();
        res.status(204).end();
    } else {
        next(taskNotFoundError(taskId));
    }
}));


  module.exports = taskRouter;
