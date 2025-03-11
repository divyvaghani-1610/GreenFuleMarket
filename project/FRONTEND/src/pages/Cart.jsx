

import React, { useState, useRef } from 'react';
import { Trash2, ShoppingBag, FileText, CreditCard, Download, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { usePDF } from 'react-to-pdf';
import { useEffect } from "react";
import axios from "axios";

export default function Cart({ cartItems, removeFromCart, updateQuantity, setCartItems }) {
  const navigate = useNavigate();


  const [showCheckout, setShowCheckout] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState({});
  const { toPDF, targetRef } = usePDF({ filename: 'greenfuel-invoice.pdf' });
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: ''
  }); 

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);


  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18; // 18% GST
  const companyCharges = subtotal * 0.08; // 8% company charges
  const total = subtotal + gst + companyCharges;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  
      if (!razorpayKey) {
        console.error("Razorpay Key is missing! Please check your .env file.");
        return;
      }
  
      // Ensure amount is properly rounded before sending
      const finalAmount = Math.round(total * 100); 
  
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
        amount: finalAmount, // Send a whole number
        currency: "INR",
      });
  
      const options = {
        key: razorpayKey,
        amount: data.amount,
        currency: data.currency,
        name: "GreenFuel Market",
        description: "GreenFuel Market Purchase Order payment",
        order_id: data.id,
        handler: async function (response) {
          console.log("Payment Successful", response);
          setPaymentResponse(response);
  
          // Proceed with bill saving only if payment is successful
          const billData = {
            customerDetails,
            paymentDetails: {
              transactionId: response.razorpay_payment_id,
            },
            cartItems: cartItems.map((item) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity,
            })),
            subtotal,
            gst,
            companyCharges,
            total,
          };
  
          try {
            const saveBillResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`, {
              ...billData,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
  
            if (saveBillResponse.data.success) {
              toast.success("your order has be sucessfully completed!");
              setShowCheckout(false);
              setShowBill(true);
            } else {
              toast.error("Bill could not be saved.");
            }
          } catch (error) {
            console.error("Error saving bill:", error);
            toast.error("Error processing payment.");
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        theme: {
          color: "#0f9d58",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };
  

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/marketplace/buy')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-6 border-b border-gray-200 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 ml-6">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 mt-1">{item.category}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-600">Quantity:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            updateQuantity(item.id, Math.min(value, item.maxQuantity)); // ✅ Prevent exceeding maxQuantity
                          }}
                          className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded-md"
                        />

                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <p className="text-lg font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-red-600 hover:text-red-700 flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span> ₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span> ₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Charges (8%)</span>
                  <span> ₹{companyCharges.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span> ₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ×
                  </button>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerDetails.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={customerDetails.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={customerDetails.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={customerDetails.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={customerDetails.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={customerDetails.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handlePayment}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay Now ({total.toFixed(2)})
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Bill Modal */}
        {showBill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-4xl">
              <div className="p-6" ref={targetRef}>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">GreenFuel Market</h2>
                    <p className="text-gray-600">Invoice #{Date.now()}</p>
                    <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toPDF()}
                      className="text-green-600 hover:text-green-700 flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg transition-colors"
                    >

                    </button>
                    <button
                      onClick={() => setShowBill(false)}
                      className="text-gray-400 hover:text-gray-500 p-2"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Details:</h3>
                    <div className="text-gray-600 space-y-1">
                      <p className="font-medium">{customerDetails.name}</p>
                      <p>{customerDetails.address}</p>
                      <p>{customerDetails.city}, {customerDetails.state} {customerDetails.pincode}</p>
                      <p>{customerDetails.country}</p>
                      <p>Phone: {customerDetails.phone}</p>
                      <p>Email: {customerDetails.email}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Payment Details:</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Payment Method: Online Payment</p>
                      <p>Status: Paid</p>
                      <p>Transaction ID: {paymentResponse.razorpay_payment_id}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-b border-gray-200 py-4 mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left">
                          <th className="py-2 px-4 font-semibold">Item</th>
                          <th className="py-2 px-4 font-semibold">Quantity</th>
                          <th className="py-2 px-4 text-right font-semibold">Price</th>
                          <th className="py-2 px-4 text-right font-semibold">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id} className="border-t border-gray-100">
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.quantity}</td>
                            <td className="py-2 px-4 text-right"> ₹{item.price.toFixed(2)}</td>
                            <td className="py-2 px-4 text-right"> ₹{(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium"> ₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%):</span>
                      <span className="font-medium"> ₹{gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Charges (8%):</span>
                      <span className="font-medium"> ₹{companyCharges.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                      <span>Total:</span>
                      <span> ₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Payment Status</h4>
                      <p className="text-green-600">✓ Payment Successful</p>
                      <p className="text-sm text-green-600">Your order has been confirmed</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center text-gray-600">
                  <p className="text-sm">Thank you for shopping with GreenFuel Market!</p>
                  <p className="text-sm">For any queries, please contact support@greenfuelmarket.com</p>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => toPDF()}
                    className="bg-white border-2 border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Bill
                  </button>
                  <button
                    onClick={() => {
                      setShowBill(false);
                      navigate('/marketplace');
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



