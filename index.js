const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db");
const routes = require("./src/routes");
const cloudinaryConfig = require("./src/config/cloudinary");
// const Transactions = require("./src/models/Transactions");

dotenv.config();

const app = express();

const port = process.env.PORT;

db.authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(cloudinaryConfig)

app.use(express.static(__dirname));

// Transactions.sync().then(() => {
//     console.log(`Transactions is synchorize`);
// }).catch(err => {
//     console.log(err);
// })

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my simple API");
});

app.listen(port, () => {
  console.log(`APP is running on PORT ${port}`);
});

const data = () => {
  data;
};
