const fileSchema = require("../models/file");
const { uploadFile, deleteFile, ResponseErrorHelper, getFileBase64 } = require("../helpers");

const create = async (req, res) => {
    const { postulante_id, cargo_id } = req.body
    const { cv } = req.files;
    const cvFile = await uploadFile(cv);

    const fileData = {
        postulante_id: postulante_id,
        cargo_id: cargo_id,
        file_path: cvFile.filePath,
        created_at: new Date()
    }
    const file = fileSchema(fileData);

    file
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}

const getAll = (req, res) => {
    fileSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}

const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        // const file = await fileSchema.findById(id);
        const file = await fileSchema.findOne({ postulante_id: id });

        const base64 = await getFileBase64(file.file_path);

        const data = {
            _id: file._id,
            postulante_id: file.postulante_id,
            cargo_id: file.cargo_id,
            created_at: file.created_at,
            cvBase64: base64
        }
        res.json(data)
    } catch (error) {
        res.json({ message: error })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        // const file = await fileSchema.findById(id);
        const file = await fileSchema.findOne({ postulante_id: id });

        if (!file) {
            return ResponseErrorHelper.handle400({ res, msg: 'File no encontrado' })
        }
        await deleteFile(file.file_path);
        await file.remove();
        return res.json({ message: "file eliminado" })
    } catch (error) {
        return ResponseErrorHelper.handle500({ res, error, msg: error.message })
    }
}

const update = (req, res) => {
    const { id } = req.params;
    const { postulante_id, cargo_id, file_path } = req.body;
    fileSchema
        .updateOne({ _id: id }, { $set: { postulante_id, cargo_id, file_path } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}

module.exports = {
    create,
    getAll,
    getOne,
    destroy,
    update
};
