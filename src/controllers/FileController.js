const fileSchema = require("../models/file");
const {
  uploadFile,
  deleteFile,
  getFileBase64,
  getMime,
} = require("../helpers");

const validExtensions = ["pdf", "docx", "png", "jpg", "jpeg", "gif"];

const create = async (req, res) => {
  try {
    const { fileName } = req.files;
    if (fileName == null) {
      return res.status(400).json({ message: "fileName is required" });
    }

    const file = await uploadFile(fileName, validExtensions);

    const fileData = {
      fileName: file.fileName,
      fileExtension: file.fileExtension,
      filePath: file.filePath,
      createdAt: new Date(),
    };

    const fileModel = fileSchema(fileData);

    fileModel
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ message: error }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = (req, res) => {
  fileSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await fileSchema.findById(id);
    if (!file) {
      return res
        .status(400)
        .json({ message: `File with id: ${id} no encontrado` });
    }
    const base64 = await getFileBase64(file.filePath);
    const fileBuffer = Buffer.from(base64, "base64");
    const mimeType = await getMime(file.filePath);
    res.writeHead(200, {
      "Content-Type": mimeType,
      "Content-Length": fileBuffer.length,
    });
    res.end(fileBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await fileSchema.findById(id);

    if (!file) {
      return res
        .status(400)
        .json({ message: `File with id: ${id} no encontrado` });
    }

    await deleteFile(file.filePath);
    await file.remove();
    res.json({ message: `file with id: ${id} delelted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  destroy,
};
