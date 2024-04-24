const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blogs.controller");


router.get("/getAll", blogController.getAll);
router.post("/create", blogController.create);
router.delete("/delete/:id", blogController.delete);
router.patch("/update/:id", blogController.update);

module.exports = router;