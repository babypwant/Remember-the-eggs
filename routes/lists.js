const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { asyncHandler } = require('../utils')
const db = require("../db/models");
const { List } = require('../db/models')


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

const listValidators = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("List name can't be empty."),
    handleValidationErrors,
    check('userId')
        .exists({ checkFalsy: true })
        .withMessage("userId can't be empty."),
];

//GET
router.get('/', asyncHandler(async (req, res) => {
    res.render('lists')
}))


//POST
router.post('/', listValidators, asyncHandler(async (req, res) => {
    const { name, description, userId } = req.body;
    const list = await db.List.build({
        name: name,
        description: description,
        userId: userId
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await list.save();
        res.redirect(`/`);
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
    const list = await List.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (list) {
        res.render('list-edit', { list });
    } else {
        const err = Error("List not found");
        err.errors = [`List with id of ${id} could not be found.`];
        err.title = "List not found.";
        err.status = 404;
        return err;
        //next(listNotFoundError(req.params.id));
        // ? create a listNotFoundError validation and pass it into error handler in app.js
    }
}));

//PUT:id

router.put('/:id', asyncHandler(async (req, res) => {
    const list = await List.findOne({
        where: {
            id: req
        }
    })


}));


//DELETE ID


module.exports = router;