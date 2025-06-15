// src/app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parses JSON requests
app.use(cors());         // Enables CORS
app.use(helmet());       // Secures HTTP headers
app.use(morgan('dev'));  // Logs HTTP requests

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route files
const authRoutes = require('./routes/auth.routes');
// Add more route imports here when ready (e.g., userRoutes, methodRoutes)

// Use routes
app.use('/api/auth', authRoutes);
// Example: app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is alive ✨' });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route Not Found' });
});

module.exports = app;
