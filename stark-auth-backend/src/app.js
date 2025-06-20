const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser'); // Added for handling cookies

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parses JSON requests
app.use(cookieParser()); // Enables cookie parsing
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow frontend origin
    credentials: true,               // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(helmet());       // Secures HTTP headers
app.use(morgan('dev'));  // Logs HTTP requests
app.use(passport.initialize()); 

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route files
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is alive ✨' });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route Not Found' });
});

module.exports = app;
