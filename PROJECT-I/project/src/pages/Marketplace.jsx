import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Tag, TrendingUp, Package, Truck } from 'lucide-react';

export default function Marketplace() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Raw Materials Marketplace</h1>
            <p className="text-xl text-green-100 mb-8">Connect with buyers and sellers of sustainable raw materials</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/marketplace/buy')}
                className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Start Buying</span>
              </button>
              <button
                onClick={() => navigate('/marketplace/sell')}
                className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors flex items-center space-x-2"
              >
                <Tag className="h-5 w-5" />
                <span>Start Selling</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Analytics</h3>
            <p className="text-gray-600">Access real-time market trends and pricing data</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">Verified suppliers and quality certifications</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Logistics Support</h3>
            <p className="text-gray-600">Integrated shipping and delivery solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
}