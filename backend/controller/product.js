import { Products, validateProduct } from "../models/productSchema.js";

class ProductController {
  async createProduct(req, res) {
    try {
      const { error } = validateProduct(req.body);
      if (error)
        return res
          .status(400)
          .json({ msg: error.details[0].message, status: "error" });

      const fileUrls = req?.files?.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );

      const newProduct = {
        ...req.body,
        urls: fileUrls,
        userId: req.user._id,
      };

      const product = await Products.create(newProduct);

      res
        .status(200)
        .json({ msg: "Product created", status: "success", payload: product });
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Server error", status: "error", error: err.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await Products.find().populate([
        { path: "userId", select: ["fname", "username"] },
      ]);
      res
        .status(200)
        .json({ msg: "All Products", status: "success", payload: products });
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Server error", status: "error", error: err.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);
      if (!product)
        return res
          .status(404)
          .json({ msg: "Product not found", status: "error", payload: null });

      res
        .status(200)
        .json({ msg: "Product deleted", status: "success", payload: product });
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Server error", status: "error", error: err.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { error } = validateProduct(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          status: "error",
          payload: null,
        });

      const product = await Products.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!product)
        return res
          .status(404)
          .json({ msg: "Product not found", status: "error" });

      res
        .status(200)
        .json({ msg: "Product updated", status: "success", payload: product });
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Server error", status: "error", error: err.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await Products.findById(req.params.id).populate([
        { path: "userId", select: ["fname", "username"] },
      ]);
      if (!product)
        return res
          .status(404)
          .json({ msg: "Product not found", status: "error" });

      res
        .status(200)
        .json({ msg: "Product found", status: "success", payload: product });
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Server error", status: "error", error: err.message });
    }
  }

  async getProductsBySearch(req, res) {
    try {
      const { value = "", limit = 3 } = req.query;
      const text = value.trim();

      if (!text)
        return res
          .status(400)
          .json({ msg: "Please provide a search term", status: "error" });

      const products = await Products.find({
        $or: [
          { title: { $regex: text, $options: "i" } },
          { desc: { $regex: text, $options: "i" } },
        ],
      }).limit(parseInt(limit, 10));

      if (products.length === 0)
        return res
          .status(404)
          .json({ msg: "No products found", status: "error" });

      res
        .status(200)
        .json({ msg: "Products found", status: "success", payload: products });
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Server error", status: "error", error: err.message });
    }
  }
}

export default new ProductController();
