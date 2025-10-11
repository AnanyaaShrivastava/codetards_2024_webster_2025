const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Assuming your middleware is named this
const Potion = require('../models/Potion');

// @route   GET /api/potions
// @desc    Get potions for the logged-in user
// @access  Private
router.get('/potions', auth, async (req, res) => {
    try {
        // Find potions that belong to the logged-in user (req.user.id comes from authMiddleware)
        const potions = await Potion.find({ user: req.user.id }).sort({ type: 'asc' });
        res.json(potions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/wellness-arc
// @desc    Get the wellness adherence percentage
// @access  Public (or Private with 'auth' if it's user-specific)
router.get('/wellness-arc', (req, res) => {
    // This is a mock calculation.
    res.json({ adherence: 78 });
});

// @route   GET /api/oracle
// @desc    Get the daily oracle quote
// @access  Public
router.get('/oracle', (req, res) => {
    const quotes = ["The greatest wealth is health.", "A healthy outside starts from the inside."];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: quote });
});

module.exports = router;