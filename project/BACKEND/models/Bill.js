import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  customerDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    phone: String,
    email: String,
  },
  paymentDetails: {
    method: { type: String, default: "Online Payment" },
    status: { type: String, default: "Paid" },
    transactionId: { type: String, required: true },
  },
  cartItems: [
    {
      name: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  subtotal: Number,
  gst: Number,
  companyCharges: Number,
  total: Number,
});

export default mongoose.model("Bill", BillSchema);
