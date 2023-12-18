const uploadImage = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }
  
    const imageSample = req.files.imageSample;
  
    const imageUpload = 'path/to/upload/directory/' + imageSample.name;
  
    imageSample.mv(imageUpload, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      req.imageUpload = imageUpload;
      next();
    });
};

module.exports = {uploadImage}


