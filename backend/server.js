const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${+new Date()}_${file.originalname}`),
});
const upload = multer({ storage: storage });

const db = require("./db");

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan("short"));
app.use(require("cors")());
app.use(express.json());

app.post("/investor", upload.array("files", 3), (req, res) => {
  const { firstName, lastName, dob, phone, street, state, zipCode } = req.body;

  db.Investor.create({
    firstName,
    lastName,
    dob: new Date(dob), // moment.js (sequelize) doesn't understand mm/dd/yyyy
    phone,
    street,
    state,
    zipCode,
  })
    .then(({ id }) => {
      res.status(200).send(JSON.stringify({ status: 200, id }));
    })
    .catch((err) => {
      console.log("DB :: Error ::", err);
      res
        .status(500)
        .send(
          JSON.stringify({ status: 500, message: "Investor not created." })
        );
    });
});

app.listen(port, () => {
  console.log(`Express :: App started on port ${port}`);
});
