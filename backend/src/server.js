// server.js - Main Express server entry point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());

app.use('/api', userRoutes);   
app.use('/api', taskRoutes);   

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
