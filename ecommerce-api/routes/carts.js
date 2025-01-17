const express = require('express');
const { Router } = require('express');
const { 
  createCart,
  getAllCarts,
  getCartById,
  updateCartById,
} = require('../controller/cart.controller');
const { authenticated } = require('../handler');

const router = express.Router();

router.get('/', authenticated, async (req, res) => {
  try {
    const carts = await getAllCarts();
    res.status(200).json({ message: 'All carts received succesfully', carts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticated, async (req, res) => {
  try {
    const cart = await createCart(data);
    res.status(201).json({ message: 'Cart created succesfully', cart })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticated, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  try {
    const cart = await getCartById(id);
    res.status(200).json({ message: 'Cart viewed succesfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => { 
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID is required'});
  }
  const data = req.body;
  try {
    const cart = await updateCartById(id, data);
    res.status(201).json({ message: 'Carts'})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticated, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID is required '});
  }
  try {
    await deleteCartById(id);
    res.status(201).json({ message: 'Cart deleted '});
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

module.exports = router;