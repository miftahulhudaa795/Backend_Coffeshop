const { Op } = require("sequelize");
const Products = require("../models/Products");

// Create Product
const createProduct = async (req, res) => {
  try { 
    const { name, stock, price, description, size, category } = req.body;

    const file = req.file ? req.file?.path : null;

    const data = await Products.create({
      name,
      stock,
      price,
      image : file,
      description,
      size,
      category
    });
    res.status(201).json({
      msg: "Success create product",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Failed create product",
      error,
    });
  }
};

// Read All Product
const findAllProduct = async (req, res) => {
  const { search, orderBy, sortBy, limit, page, category } = req.query
  const offset = (page - 1) * limit;
  let where = {}
  let order = []
  if (search) {
    where = {
      name: { [Op.iLike]: "%" + search + "%" }
    }
  }
  if (orderBy && sortBy) {
    order = [[orderBy, `${sortBy}`]];
  }
  if (category) {
    where = {
        category : category,
    }
  }
  if (search && category) {
    where = {
        [Op.and] : {
            name: { [Op.iLike]: "%" + search + "%" },
            category : {[Op.iLike] : "%" + category + "%"}
        }
    }
  }
  try {
    const data = await Products.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json({
      msg: "Success find all Product",
      data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

// Read One Product
const findOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Products.findByPk(id);
    if (!data) {
      return res.status(404).json({ msg: `Product Not Found` });
    }
    res.status(200).json({
      msg: "Success",
      data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, price, description, size, category } = req.body;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: `Product Not Found` });
    }

    if (req.file) {
      await product.update({
        name,
        stock,
        price,
        description,
        size,
        category,
        image: req?.file?.path,
      });
      return res.status(200).json({
        msg: "Success Update Product with image",
        data: product,
      });
    }
    await product.update({ name, stock, price, description, size, category });
    await product.save();
    res.status(200).json({
      msg: "Success Update Product",
      data: product,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: `Product Not Found` });
    }
    await product.destroy();
    await product.save();
    res.status(200).json({
      msg: "Success Delete Product",
    });
  } catch (error) {
    console.log(error);
    res.status(error);
  }
};

module.exports = {
  createProduct,
  findAllProduct,
  findOneProduct,
  updateProduct,
  deleteProduct,
};
