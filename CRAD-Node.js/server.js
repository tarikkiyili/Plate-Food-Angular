const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 3000;
const dataFile = "./products.json";

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Statik dosya yolu

// uploads dizininin var olup olmadığını kontrol et ve yoksa oluştur
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const readData = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, "[]");
  }
  const rawData = fs.readFileSync(dataFile);
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

app.get("/products", (req, res) => {
  const products = readData();
  res.json(products);
});

app.post("/products", upload.single("image"), (req, res) => {
  const products = readData();
  const product = {
    id: parseInt(req.body.id),
    name: req.body.name,
    price: parseFloat(req.body.price),
    Description: req.body.Description,
    image: req.file
      ? `http://localhost:${port}/uploads/${req.file.filename}`
      : "",
  };
  products.push(product);
  writeData(products);
  res.status(201).send(product);
});

app.put("/products/:id", upload.single("image"), (req, res) => {
  const id = parseInt(req.params.id);
  let products = readData();
  products = products.map((p) => {
    if (p.id === id) {
      return {
        id,
        name: req.body.name,
        price: parseFloat(req.body.price),
        Description: req.body.Description,
        image: req.file
          ? `http://localhost:${port}/uploads/${req.file.filename}`
          : p.image,
      };
    }
    return p;
  });
  writeData(products);
  res.send(products.find((p) => p.id === id));
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let products = readData();
  products = products.filter((p) => p.id !== id);
  writeData(products);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
