const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { asyncHandler } = require('../utils')
const db = require("../db/models");
const { List, User } = require('../db/models')
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());

//Integrate users so you can assign list to user
//Ommit csrfToken for now but put it in later, having issues implementing it

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.status = 400;
        err.title = "Bad request.";
        err.errors = errors;
        return next(err);
    }
    next();
};

const listNotFoundError = (id) => {
    const err = Error("List not found");
    err.errors = [`List with id of ${id} could not be found.`];
    err.title = "List not found.";
    err.status = 404;
    return err;
};

// const listValidators = [
//     check("name")
//         .exists({ checkFalsy: true })
//         .withMessage("List name can't be empty."),
//     handleValidationErrors,
//     check('userId')
//         .exists({ checkFalsy: true })
//         .withMessage("userId can't be empty."),
// ];

//GET
router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    if (!req.session.auth) {
        res.redirect('/login')
    }
    const users = await User.findAll();
    res.render('lists', { users, token: req.csrfToken() })
}))


//POST
router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const { name, description, userId } = req.body;
    const list = await db.List.build({
        name: name,
        description: description,
        userId: userId
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await list.save();
        res.redirect(`/tasks`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('index', {
            title: 'Add a list',
            name,
            description,
            errors,
            //remember to put in csrfToken();
        });
    };

}))


//GET:ID

router.get("/:id", asyncHandler(async (req, res, next) => {
    if (!req.session.auth) {
        res.redirect('/login')
    }
    const list = await List.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (res.locals.user.id !== list.userId) {
        const err = new Error("Unauthorized");
        res.redirect('/')
        err.status = 401;
        err.message = "You are not authorized to edit this tweet.";
        err.title = "Unauthorized";
        throw err;
    }
    if (list) {
        res.render('edit', { list });
    } else {
        next(listNotFoundError(req.params.id));
    }
}));

//PUT:id

router.put('/:id', asyncHandler(async (req, res) => {
    console.log('hello')
    const list = await List.findOne({
        where: {
            id: req.params.id
        }
    })
    if (res.locals.user.id !== list.userId) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to edit this tweet.";
        err.title = "Unauthorized";
        throw err;
    }
    if (list) {
        await list.update({ description: req.body.description });
        res.json({ list })
    } else {
        next(listNotFoundError(req.params.id));
    }
}));


//DELETE ID

router.delete("/:id", asyncHandler(async (req, res, next) => {
    console.log('top of route')
    const list = await List.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (res.locals.user.id !== list.userId) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to delete this tweet.";
        err.title = "Unauthorized";
        throw err;
    }
    if (list) {
        await list.destroy();
        await res.json({ message: `List ${req.params.id} is gone forever, poooof.` });
    } else {
        next(listNotFoundError(req.params.id));
    }
}));

module.exports = router;
