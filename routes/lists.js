const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils')
const { List } = require('../db/models')

router.get('/', asyncHandler(async (req, res) => {
    const lists = await List.findAll({
        order: [["createdAt", "DESC"]],
        attributes: ["description"]
    })
    res.render('lists', { lists })
}))

router.post('/', asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const list = await List.create({
        name: req.name,
        description: req.description
    });
    res.json({ list });
}))

router.get("/:id", asyncHandler(async (req, res, next) => {
    const list = await List.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (list) {
        res.json({ list });
    } else {
        //  next(listNotFoundError(req.params.id)); ? create a listNotFoundError validation and pass it into error handler in app.js
    }
})
);

module.exports = router;