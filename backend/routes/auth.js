const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    // ... your existing signup logic remains here ...
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    // ... your existing login logic remains here ...
});

// --- NEW: FORGOT PASSWORD ROUTE ---
router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // To prevent user enumeration, we send a success-like response even if user not found
            return res.status(200).json({ msg: 'Email sent if user exists' });
        }

        // Generate a random reset token (unhashed version)
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash the token and set it on the user model
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        
        // Set an expiration time (10 minutes)
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Create the reset URL (points to your frontend)
        const resetUrl = `http://127.0.0.1:5500/frontend/reset-password.html?token=${resetToken}`;

        // Create email message
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password:</p>
            <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
            <p>This link will expire in 10 minutes.</p>
        `;

        // Configure Nodemailer to send the email
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        
        await transporter.sendMail({
            from: `Cureverse Support <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Password Reset Request',
            html: message,
        });
        
        res.status(200).json({ msg: 'Email sent successfully' });

    } catch (error) {
        // Clear token fields on error to allow user to try again
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// --- NEW: RESET PASSWORD ROUTE ---
router.put('/resetpassword/:resettoken', async (req, res) => {
    // Hash the token from the URL to match the one in the DB
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }, // Check if token is not expired
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        // Set new password
        user.password = req.body.password;
        // Invalidate the token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;