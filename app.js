const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const mm = require('mammoth');

const storage = multer.diskStorage({
  destination: 'uploads/',
   filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: multer.memoryStorage()
});

app.post('/extraer', upload.single('file'), async(req, res) => {

  const buffer = req.file.buffer;

  const result = await mm.extractRawText({buffer});

  return res.json({ text: result.value });
});


app.listen(3000, () => {
  console.log('Server listen on port 3000');
});
