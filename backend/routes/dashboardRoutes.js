const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Make sure this path is correct

// For now, we will use mock data. Later, you can replace this with real database queries.
const mockData = {
    adherenceOverview: {
        rate: 78,
    },
    adherenceTrends: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [80, 75, 90, 85, 95, 70, 100],
    },
    dailyAdherence: [
        { name: "Solar Elixir (AM)", time: "7:00 AM", status: "Taken" },
        { name: "Starfire Brew (AM)", time: "7:00 AM", status: "Missed" },
        { name: "Dreamwater Draught", time: "8:00 AM", status: "Missed" }
    ]
};

// @route   GET /api/dashboard/overview
// @desc    Get data for the adherence overview card
// @access  Private
router.get('/overview', authMiddleware, (req, res) => {
    try {
        console.log(`SUCCESS: User ${req.user.id} accessed /overview`);
        res.json(mockData.adherenceOverview);
    } catch (error) {
        console.error('ERROR in /overview route:', error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/dashboard/trends
// @desc    Get data for the adherence trends chart
// @access  Private
router.get('/trends', authMiddleware, (req, res) => {
    try {
        console.log(`SUCCESS: User ${req.user.id} accessed /trends`);
        res.json(mockData.adherenceTrends);
    } catch (error) {
        console.error('ERROR in /trends route:', error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/dashboard/daily
// @desc    Get the list of elixirs for the daily adherence cards
// @access  Private
router.get('/daily', authMiddleware, (req, res) => {
    try {
        console.log(`SUCCESS: User ${req.user.id} accessed /daily`);
        res.json(mockData.dailyAdherence);
    } catch (error) {
        console.error('ERROR in /daily route:', error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

