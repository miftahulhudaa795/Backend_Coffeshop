const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db");
const routes = require("./src/routes");
// const Promos = require("./src/models/Promos");
// const Transactions = require("./src/models/Transactions");
// const Users = require('./src/models/Users');
// const Products = require('./src/models/Products');
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

app.use(express.static(__dirname));

// Products.sync().then(() => {
//     console.log(`Products is synchorize`);
// }).catch(err => {
//     console.log(err);
// })

// Users.sync().then(() => {
//     console.log(`Users is Syincrorize`);

// }).catch(err => {
//     console.log(err);

// })

// Transactions.sync().then(()=> {
//   console.log(`Transaction is synchrorize`);
  
// }).catch(err => {
//   console.log(err);
  
// }) 

// Promos.sync().then(()=> {
//   console.log('Promos is synchrorize');
  
// }).catch(err=> {
//   console.log(err);
  
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
