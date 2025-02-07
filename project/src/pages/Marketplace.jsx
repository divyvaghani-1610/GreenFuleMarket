// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ShoppingBag, Tag, TrendingUp, Package, Truck } from 'lucide-react';

// export default function Marketplace() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       {/* Hero Section */}
//       <div className="bg-green-600 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold mb-4">Raw Materials Marketplace</h1>
//             <p className="text-xl text-green-100 mb-8">Connect with buyers and sellers of sustainable raw materials</p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => navigate('/marketplace/buy')}
//                 className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-2"
//               >
//                 <ShoppingBag className="h-5 w-5" />
//                 <span>Start Buying</span>
//               </button>
//               <button
//                 onClick={() => navigate('/marketplace/sell')}
//                 className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors flex items-center space-x-2"
//               >
//                 <Tag className="h-5 w-5" />
//                 <span>Start Selling</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//               <TrendingUp className="h-6 w-6 text-green-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Market Analytics</h3>
//             <p className="text-gray-600">Access real-time market trends and pricing data</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//               <Package className="h-6 w-6 text-green-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
//             <p className="text-gray-600">Verified suppliers and quality certifications</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//               <Truck className="h-6 w-6 text-green-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Logistics Support</h3>
//             <p className="text-gray-600">Integrated shipping and delivery solutions</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, Recycle, Truck, Users, Globe, Shield, CheckCircle, Leaf, Mail } from 'lucide-react';

// Reusable Card Component with hover animation
const CategoryCard = ({ category, navigate }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
    <div className="relative h-48">
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-30">
        <category.icon className="h-12 w-12 text-white transform transition-transform duration-300 hover:scale-110" />
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
      <p className="text-gray-600 mb-4">{category.description}</p>
      <ul className="space-y-2 mb-6">
        {category.items.map((item) => (
          <li key={item} className="flex items-center text-gray-600 transform transition-all duration-300 hover:translate-x-2">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> {item}
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/marketplace/buy')}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
      >
        <ShoppingBag className="h-5 w-5 mr-2" /> Browse Category
      </button>
    </div>
  </div>
);

export default function Marketplace() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Raw Materials",
      description: "High-quality recycled materials for manufacturing",
      image: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=500",
      icon: Package,
      items: ["Recycled Plastics", "Metal Scraps", "Wood Materials", "Glass"]
    },
    {
      title: "Organic Waste",
      description: "Sustainable biomass and organic materials",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=500",
      icon: Recycle,
      items: ["Food Waste", "Agricultural Waste", "Compostable Materials"]
    },
    {
      title: "Industrial Materials",
      description: "Certified industrial grade materials",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500",
      icon: Truck,
      items: ["Chemical Products", "Construction Materials", "Manufacturing Waste"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative bg-green-600 py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20 transform scale-110 motion-safe:animate-[slowZoom_20s_ease-in-out_infinite]"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-8 animate-fadeIn">
            The Future of Sustainable Material Trading
          </h1>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto animate-slideUp">
            Connect with verified suppliers and buyers worldwide. Trade sustainably sourced materials with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slideUp">
            <button
              onClick={() => navigate('/marketplace/buy')}
              className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
            >
              <ShoppingBag className="h-5 w-5 mr-2" /> Buy Materials
            </button>
            <button
              onClick={() => navigate('/marketplace/sell')}
              className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
            >
              <Package className="h-5 w-5 mr-2" /> Sell Materials
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section with Staggered Animation */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeIn">
            Explore Our Categories
          </h2>
          <p className="text-xl text-gray-600 animate-slideUp">
            Find the sustainable materials you need
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <div key={category.title} className={`animate-[slideUp_500ms_ease-out_${index * 200}ms]`}>
              <CategoryCard category={category} navigate={navigate} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section with Floating Animation */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 shadow-xl text-center max-w-3xl mx-auto transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Join the Sustainable Revolution?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start trading sustainable materials today and be part of the circular economy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/marketplace/buy')}
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                <ShoppingBag className="h-5 w-5 mr-2" /> Start Trading
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" /> Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}