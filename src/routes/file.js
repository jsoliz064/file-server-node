const express = require("express");
const FileController = require("../controllers/FileController");
const { validateFileUpload } = require("../middlewares");

const router = express.Router();

router.get("/files", FileController.getAll);

router.post("/files", [validateFileUpload], FileController.create);

router.get("/files/:id", FileController.getOne);

router.delete("/files/:id", FileController.destroy);

module.exports = router;
