<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const materialsRoutes = require('./routes/materials');  // ⬅️ Import materials route

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Session Configuration (with fallback secret for development)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback_secret', // Fallback for dev
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },  // change to true in production (https)
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/materials', materialsRoutes);  // ⬅️ Add the materials route

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
=======
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';

import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import materialsRoutes from './routes/materials.js';  // ⬅️ Import materials route
import paymentRoutes from "./routes/paymentRoutes.js"; // Import paymentRoutes

const app = express();
dotenv.config()
// Middleware
app.use(express.json());
app.use(cors());

// Session Configuration (with fallback secret for development)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback_secret', // Fallback for dev
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },  // change to true in production (https)
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/materials', materialsRoutes);  // ⬅️ Add the materials route

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

app.use("/api/payment", paymentRoutes);


// Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));

app.get("/", (req, res) => {
  res.send("Server is running!");
});
>>>>>>> master
