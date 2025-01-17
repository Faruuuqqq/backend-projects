const { Router } = require("express");
const { 
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById 
  } = require("../controller/category.controller");
const { authenticated, authorized } = require("../handler");

const router = Router()

router.get("/", authenticated, async (req, res) => {
  try {
    const categories = await getAllCategory();
    res
      .status(200)
      .json({ message: "All categories received successfully", categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/",
  authenticated,
  authorized("Admin"),
  async (req, res) => {
    const { name, description } = req.body;

    // Check if all fields are filled
    if (!name || !description) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    // create the category
    try {
      const category = await createCategory({
        name,
        description,
      });
      res.status(201).json({ message: "Category created successfully", category });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/:id", authenticated, async (req, res) => {
  const id = req.params.id;

  // Check if id was provided
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    const category = await getCategoryById(id);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res
        .status(200)
        .json({ message: "Category gotten successfully", category });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  const data = req.body;
  try {
    const category = await updateCategoryById(id, data);
    res
      .status(201)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete(
  "/:id",
  authenticated,
  authorized("Admin"),
  async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
    try {
      await deleteCategoryById(id);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router

