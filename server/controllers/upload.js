const Image = require('../models/image')
const fs = require('fs')
const path = require('path')

class UploadController {
  async uploadImage(file) {
    const name = Date.now();
    const ext = file.name.split('.').pop();
    const reader = fs.createReadStream(file.path);
    let uploadPath = `../public/images/${name}.${ext}`;
    let filePath = path.join(__dirname, uploadPath);
    const savePath = `/images/${name}.${ext}`
    const upSteam = fs.createWriteStream(filePath);
    reader.pipe(upSteam);
    const image = new Image({
      savePath
    });
    const res = await image.save();
    if (res) {
      return savePath
    } else {
      return null
    }
  }
}

module.exports = UploadController