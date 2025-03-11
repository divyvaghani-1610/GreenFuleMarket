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
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


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

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

app.use("/api/payment", paymentRoutes);


// Server
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => console.log("Server running on http://localhost:5000"));
}

export default app; // Required for Vercel
