const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById
} = require ('../controller/user.controller')
const { authenticated } = require('../handler');

const router = express.Router();

router.post('/', authenticated, async (req, res) => {
  try {
    const user = await createUser(data);
    res.status(201).json({ message: 'User created succesfully', user })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticated, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ message: 'All users received succesfully'})
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
    const user = await getUserById(id);
    res.status(200).json({ message: 'User viewed succesfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  const data = req.body;
  try {
    const cart = await updateUserById(id, data);
    res.status(201).json({ message: 'Users' })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
