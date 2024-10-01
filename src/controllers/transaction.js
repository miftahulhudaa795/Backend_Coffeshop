// const { Op } = require("sequelize");
const Transactions = require("../models/Transactions");
const Users = require("../models/Users");
const Products = require("../models/Products");



// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const { id } = req.payload;
    const { product_id, payment_method, delivery_cost } = req.body;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    const product = await Products.findByPk(product_id, {});

    if (!product) {
      return res.status(404).json({ msg: "Product Not Found" });
    }
    const priceProduct = product.getDataValue("price");
    const amount = priceProduct + Number(delivery_cost);
    const data = await Transactions.create({
      user_id: id,
      product_id,
      payment_method,
      delivery_cost,
      amount,
      status: "PENDING",
    });
    res.status(201).json({ msg: "Success Create Transaction", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Internal Server Error",
      error,
    });
  }
};

// // Read All Transaction
const findAllTransaction = async (req, res) => {
  //   const { search, orderBy, sortBy, limit, page } = req.query;
  //   const offset = (page - 1) * limit;
  //   let where = {};
  //   let order = [];

  //   if (search) {
  //     where = {
  //       productName: { [Op.iLike]: "%" + search + "%" },
  //     };
  //   }
  //   if (orderBy && sortBy) {
  //     order = [[orderBy, `${sortBy}`]];
  //   }

  try {
    const data = await Transactions.findAll({
      include: [
        {
          model: Products,
          as: "product",
        },
        {
          model: Users,
          as: "user",
          attributes: ["username", "email", "role"],
        },
      ],
    });
    res.status(200).json({
      msg: "Success find all Transactions",
      data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// // Read One Transaction
const findOneTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Transactions.findByPk(id, {
      include: [
        {
          model: Products,
          as: "product",
        },
        {
          model: Users,
          as: "user",
          attributes: ["username", "email", "role"],
        },
      ],
    });
    if (!data) {
      return res.status(404).json({ msg: `Transaction Not Found` });
    }
    res.status(200).json({
      msg: "Succes Find One Transaction",
      data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// // Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      unitPrice,
      quantity,
      subtotal,
      taxAndFees,
      total,
      addressDetails,
      paymentMethod,
    } = req.body;
    const transaction = await Transactions.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ msg: `Transaction Not Found` });
    }
    await transaction.update({
      productName,
      unitPrice,
      quantity,
      subtotal,
      taxAndFees,
      total,
      addressDetails,
      paymentMethod,
    });
    await transaction.save();
    res.status(200).json({
      msg: "Success Update Transaction",
      data: transaction,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

// // Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transactions.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ msg: `Transaction Not Found` });
    }
    await transaction.destroy();
    await transaction.save();
    res.status(200).json({
      msg: "Success Delete Transaction",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createTransaction,
  findAllTransaction,
  findOneTransaction,
  updateTransaction,
  deleteTransaction,
};
