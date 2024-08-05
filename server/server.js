const express = require("express");
const cors = require("cors");
const multer = require("multer");
const excel = require("fast-xlsx-reader");
const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());

app.post("/upload", upload.single("file"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  const reader = excel.createReader({
    input: req.file.path,
  });
  let row = reader.readNext();
  console.log(`Row #${reader.rowIndex + 1}: `, row);
  res.send(row);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
