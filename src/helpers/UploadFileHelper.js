const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const getFileBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return resolve(null);
    }

    fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};


const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      resolve('File deleted successfully');
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      }
      resolve('File deleted successfully');
    });
  });
};

const uploadFile = (file, validExtensions = ['pdf'], fileName = null) => {

  return new Promise((resolve, reject) => {

    const shortname = file.name.split('.');
    const extension = shortname[shortname.length - 1];

    // Validar la extension
    if (!validExtensions.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${validExtensions}`);
    }

    const uploadFolderPath = path.join(__dirname, `../../uploads/`);
    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath);
    }

    if (!fileName) {
      fileName = uuidv4() + '.' + extension;
    } else {
      fileName = fileName + '.' + extension;
    }
    const filePath = `./uploads/${fileName}`;
    const uploadPath = path.join(__dirname, '../../', filePath);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve({ fileName, filePath });
    });

  });

}

const validateFileExtension = (file, extension) => {
  if (!file) {
    return false;
  }
  const shortname = file.originalname.split('.');
  const fileExtension = shortname[shortname.length - 1];
  return fileExtension === extension;
}

module.exports = {
  uploadFile,
  validateFileExtension,
  deleteFile,
  getFileBase64
}