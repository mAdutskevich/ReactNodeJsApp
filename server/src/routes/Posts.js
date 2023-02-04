const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get('/', async (req, res) => {
    const postList = await Posts.findAll();
    res.json(postList);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.post('/', async (req, res) => {
    const post = req.body;

    try {
        await Posts.create(post);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
