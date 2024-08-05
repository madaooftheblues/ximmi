const express = require("express");
const cors = require("cors");
const multer = require("multer");
const excel = require("fast-xlsx-reader");
const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());
app.use(express.json());

const meta = {
  heads: [],
  rowCount: 0,
  path: "",
};

app.post("/upload", upload.single("file"), function (req, res, next) {
  const path = req.file.path;
  const reader = excel.createReader({
    input: req.file.path,
  });
  let heads = reader.readNext();
  console.log(`Row #${reader.rowIndex + 1}: `, heads);

  const rowCount = reader.readAll(false);

  reader.destroy();

  Object.assign(meta, { heads, rowCount, path });

  res.send(meta);
});

app.post("/cols", function (req, res, next) {
  const reader = excel.createReader({
    input: meta.path,
  });

  const selected = req.body.selected;
  const cols = [];
  selected.forEach((element) => {
    const colIdx = meta.heads.findIndex((head) => head === element);
    const colData = [];
    for (let rowIdx = 1; rowIdx < meta.rowCount; rowIdx++) {
      const cell = reader.readCell(colIdx, rowIdx);
      colData.push(cell.v);
    }
    cols.push(colData);
  });

  reader.destroy();

  res.send({ heads: selected, cols });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
