const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Cureverse API is running...');
});

app.use('/api/auth', require('./routes/auth'));

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, user ${req.user.id}!`,
    secretData: 'This is protected information.'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));