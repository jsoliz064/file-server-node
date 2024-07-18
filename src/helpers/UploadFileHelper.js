const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const getFileBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return resolve(null);
    }

    fs.readFile(filePath, { encoding: "base64" }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const deleteFile = (filePath) => {
  filePath = path.join(process.cwd(), `/public/${filePath}`);
  console.log(filePath);
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      resolve("File deleted successfully");
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      }
      resolve("File deleted successfully");
    });
  });
};

const uploadFile = (file, validExtensions = ["*"], fileName = null) => {
  return new Promise((resolve, reject) => {
    const shortname = file.name.split(".");
    const fileExtension = shortname[shortname.length - 1];

    if (
      !validExtensions.includes("*") &&
      !validExtensions.includes(fileExtension)
    ) {
      return reject(
        new Error(
          `Invalid extension: ${fileExtension}. only: ${validExtensions}`
        )
      );
    }

    const uploadFolderPath = path.join(process.cwd(), `/public/uploads`);
    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath);
    }

    if (!fileName) {
      fileName = uuidv4() + "." + fileExtension;
    } else {
      fileName = fileName + "." + fileExtension;
    }
    const filePath = `uploads/${fileName}`;
    const uploadPath = path.join(process.cwd(), "/public/", filePath);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve({ fileName, fileExtension, filePath });
    });
  });
};

const validateFileExtension = (file, extension) => {
  if (!file) {
    return false;
  }
  const shortname = file.originalname.split(".");
  const fileExtension = shortname[shortname.length - 1];
  return fileExtension === extension;
};

const getMime = async (filePath) => {
  const mime = await import("mime");
  return mime.default.getType(filePath);
};

module.exports = {
  uploadFile,
  validateFileExtension,
  deleteFile,
  getFileBase64,
  getMime,
};
