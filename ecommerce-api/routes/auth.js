const express = require('express');
const { authenticate } = require('../auth');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required!'});
  }
  try {
    const token = await authenticate(email, password);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'Authenticate successfully', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out'});
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;