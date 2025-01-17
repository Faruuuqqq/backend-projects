const { Router } = require("express");
const { authenticated, authorized } = require("../handler");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controller/product.controller");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({
      message: "All products received successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authenticated, authorized("Admin"), async (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !description || !price || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const product = await createProduct({ name, description, price, stock });
    res.status(200).json({ message: "Product saved successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", authenticated, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json({ message: "Product retrieved successfully", product });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", authenticated, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  const data = req.body;
  try {
    const product = await updateProductById(id, data);
    res.status(201).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authenticated, authorized("Admin"), async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    await deleteProductById(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
