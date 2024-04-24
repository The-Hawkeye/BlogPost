const express = require("express");

const router = express.Router();

const commentsController = require("../controllers/comments.controller");


router.post("/getAll", commentsController.getAll);
router.post("/create/:id", commentsController.create);


module.exports = router;