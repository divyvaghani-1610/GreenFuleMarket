import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                        const newQuantity = parseInt(e.target.value);
                        if (newQuantity > 0) {
                          updateQuantity(item.id, newQuantity);
                        }
                      }}
                      className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="text-right ml-6">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
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
          
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => navigate('/marketplace/buy')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  // Handle checkout logic here
                  alert('Proceeding to checkout...');
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}