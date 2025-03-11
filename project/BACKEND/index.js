import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';

import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import materialsRoutes from './routes/materials.js';
import paymentRoutes from "./routes/paymentRoutes.js";

// Load environment variables first
dotenv.config();

// Set up MongoDB connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected
  }
  
  return mongoose.connect(process.env.MONGO_URI, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000
  });
};

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://greenfuelmarket.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));

// Handle preflight requests
app.options('*', cors());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Connect to DB before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ message: 'Database connection failed' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/materials', materialsRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Server (for development)
if (process.env.NODE_ENV !== "production") {
  // Connect to MongoDB and start server
  connectDB()
    .then(() => {
      console.log('MongoDB Connected');
      app.listen(5000, () => console.log("Server running on http://localhost:5000"));
    })
    .catch(err => console.error('MongoDB Connection Error:', err));
}

export default app;