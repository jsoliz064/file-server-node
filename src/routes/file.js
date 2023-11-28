const express = require("express");
const FileController = require("../controllers/FileController");
const { validateFileUpload, validateFields } = require("../middlewares");
const { check } = require('express-validator');

const router = express.Router();

router.post("/files", [
    check('postulante_id').not().isEmpty().withMessage('postulante_id es obligatorio').isInt().withMessage('postulante_id debe ser de tipo entero'),
    check('cargo_id').not().isEmpty().withMessage('cargo_id es obligatorio').isInt().withMessage('cargo_id debe ser de tipo entero'),
    validateFields,
    validateFileUpload
],FileController.create);

router.get("/files", FileController.getAll);

router.get("/files/:id", FileController.getOne);

router.delete("/files/:id", FileController.destroy);

router.put("/files/:id", FileController.update);

module.exports = router;
