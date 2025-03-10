import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Bill from "../models/Bill.js"; // Import Bill model
import Material from "../models/Material.js";
dotenv.config();
const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route 1: Create an Order
router.post("/create-order", async (req, res) => {
    try {
        let { amount, currency } = req.body;

        // Ensure amount is a whole number
        amount = Math.round(amount);

        const options = {
            amount, // No need to multiply by 100, frontend already sent the correct value
            currency,
            receipt: `order_rcptid_${Math.random()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route 2: Verify Payment and Save Bill
router.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            customerDetails,
            paymentDetails,
            cartItems,
            subtotal,
            gst,
            companyCharges,
            total,
        } = req.body;

        // Validate Razorpay signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            // Save the bill to MongoDB
            const newBill = new Bill({
                invoiceNumber: `INV-${Date.now()}`,
                customerDetails,
                paymentDetails,
                cartItems,
                subtotal,
                gst,
                companyCharges,
                total,
            });

            console.log('cartItems:', cartItems);

            await newBill.save();

            try {
                await Promise.all(
                    cartItems.map(async (item) => {
                        await Material.findByIdAndUpdate(
                            item.id,
                            { $inc: { quantity: -item.quantity } }, // Decrement quantity based on purchase
                            { new: true }
                        );
                    })
                );
            } catch (error) {
                console.error("Error updating stock:", error);
            }            

            return res.json({ success: true, message: "Payment verified & bill saved successfully!" });
        } else {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router
