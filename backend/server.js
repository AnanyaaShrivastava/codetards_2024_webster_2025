const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// Note: Your protected dashboard route is good for testing, but the new apiRoutes.js will handle the app's data.
// const authMiddleware = require('./middleware/authMiddleware'); 

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // This is important! It allows your frontend to talk to your backend.
app.use(express.json());

// A simple route to check if the server is running
app.get('/', (req, res) => {
  res.send('Cureverse API is running...');
});

// --- Define API Routes ---

// Your existing route for user authentication (login, signup)
app.use('/api/auth', require('./routes/auth'));

// Add this line to include the new routes for potions, wellness arc, etc.
app.use('/api', require('./routes/apiroutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

