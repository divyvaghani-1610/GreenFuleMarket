

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, Recycle, Truck, Users, Globe, Shield, CheckCircle, Leaf, Mail, X } from 'lucide-react';

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

// Feature Card Component
const FeatureCard = ({ feature, onClick }) => (
  <div
    onClick={onClick}
    className="text-center p-6 rounded-xl bg-green-50 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
  >
    <div className="text-4xl mb-4">{feature.emoji}</div>
    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
    <p className="text-gray-600">{feature.shortDescription}</p>
    <div className="mt-4 text-green-600 flex items-center justify-center">
      <span className="text-sm">Learn More</span>
      <span className="ml-2">→</span>
    </div>
  </div>
);

export default function Marketplace() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      emoji: "🌍",
      title: "Global Network",
      shortDescription: "Connect with verified partners worldwide",
      longDescription: "Access our extensive network of verified suppliers and buyers across the globe. Our platform connects you with trusted partners in over 150 countries, enabling seamless international trade of sustainable materials.",
      stats: [
        { value: "150+", label: "Countries" },
        { value: "10K+", label: "Active Users" },
        { value: "50K+", label: "Successful Trades" }
      ],
      benefits: [
        "Real-time market insights from global trading activities",
        "Verified international suppliers and buyers",
        "Multi-currency support and secure transactions",
        "Local market expertise and support"
      ]
    },
    {
      emoji: "⭐",
      title: "Quality Assured",
      shortDescription: "All materials meet strict standards",
      longDescription: "Our rigorous quality assurance process ensures that all materials traded on our platform meet international standards and specifications. Every supplier undergoes thorough verification and regular audits.",
      stats: [
        { value: "99.9%", label: "Quality Rate" },
        { value: "24/7", label: "Quality Support" },
        { value: "100%", label: "Satisfaction Guarantee" }
      ],
      benefits: [
        "Independent quality verification process",
        "Regular supplier audits and ratings",
        "Detailed material specifications and testing",
        "Quality dispute resolution support"
      ]
    },
    {
      emoji: "♻️",
      title: "Eco-Friendly",
      shortDescription: "Support sustainable practices",
      longDescription: "Join the circular economy revolution. Our platform promotes sustainable practices by facilitating the trade of recycled and eco-friendly materials, helping reduce environmental impact across industries.",
      stats: [
        { value: "1M+", label: "Tons CO₂ Saved" },
        { value: "30%", label: "Average Cost Savings" },
        { value: "85%", label: "Waste Reduction" }
      ],
      benefits: [
        "Carbon footprint tracking and reporting",
        "Sustainable material certification",
        "Environmental impact assessment",
        "Green supply chain optimization"
      ]
    },
    {
      emoji: "🔒",
      title: "Secure Trading",
      shortDescription: "Safe and transparent transactions",
      longDescription: "Experience worry-free trading with our secure platform. We offer escrow services, verified payments, and comprehensive transaction protection to ensure safe and transparent dealings.",
      stats: [
        { value: "100%", label: "Secure Payments" },
        { value: "0%", label: "Fraud Rate" },
        { value: "24/7", label: "Support" }
      ],
      benefits: [
        "Secure payment processing",
        "Escrow services for large transactions",
        "Dispute resolution system",
        "Transaction insurance options"
      ]
    },
    {
      emoji: "📊",
      title: "Market Intelligence",
      shortDescription: "Data-driven insights and analytics",
      longDescription: "Make informed decisions with our comprehensive market intelligence. Access real-time pricing data, market trends, and predictive analytics to optimize your trading strategy.",
      stats: [
        { value: "Real-time", label: "Price Updates" },
        { value: "90%", label: "Prediction Accuracy" },
        { value: "Daily", label: "Market Reports" }
      ],
      benefits: [
        "Real-time market pricing and trends",
        "Predictive analytics for market movements",
        "Customized market reports and alerts",
        "Competitor analysis tools"
      ]
    },
    {
      emoji: "🤝",
      title: "Expert Support",
      shortDescription: "Dedicated assistance at every step",
      longDescription: "Get personalized support from our team of industry experts. From onboarding to complex transactions, we're here to help you succeed in sustainable material trading.",
      stats: [
        { value: "15min", label: "Avg Response Time" },
        { value: "98%", label: "Resolution Rate" },
        { value: "24/7", label: "Availability" }
      ],
      benefits: [
        "Dedicated account managers",
        "Technical support and consultation",
        "Trading strategy assistance",
        "Regulatory compliance guidance"
      ]
    }
  ];

  const categories = [
    {
      title: "Raw Materials",
      description: "High-quality recycled materials for manufacturing",
      image: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=500",
      icon: Package,
      items: ["Recycled Plastics", "Metal Scraps", "Wood Materials"]
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

          {/* Enhanced Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Buy Materials Card */}
            <div
              onClick={() => navigate('/marketplace/buy')}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-opacity-20 border border-white border-opacity-20"
            >
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-white text-xl font-semibold mb-2">Buy Materials</h3>
              <p className="text-green-100 text-sm">
                Browse our marketplace for sustainable materials
              </p>
              <div className="mt-4 flex items-center justify-center text-white">
                <span className="text-sm">Explore Now</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Sell Materials Card */}
            <div
              onClick={() => navigate('/marketplace/sell')}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-opacity-20 border border-white border-opacity-20"
            >
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-white text-xl font-semibold mb-2">Sell Materials</h3>
              <p className="text-green-100 text-sm">
                List your sustainable materials for sale
              </p>
              <div className="mt-4 flex items-center justify-center text-white">
                <span className="text-sm">Start Selling</span>
                <span className="ml-2">→</span>
              </div>
            </div>
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

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose GreenFuel Market? 🌱</h2>
            <p className="text-xl text-gray-600">Experience the future of sustainable trading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                onClick={() => setSelectedFeature(feature)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{selectedFeature.emoji}</span>
                  <h3 className="text-2xl font-bold">{selectedFeature.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-600 text-lg mb-8">
                {selectedFeature.longDescription}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {selectedFeature.stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Key Benefits:</h4>
                <ul className="space-y-3">
                  {selectedFeature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 shadow-xl text-center max-w-3xl mx-auto transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <div className="text-4xl mb-6">🚀</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Join the Sustainable Revolution?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start trading sustainable materials today and be part of the circular economy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div
                onClick={() => navigate('/marketplace/buy')}
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center cursor-pointer"
              >
                <span className="mr-2">🛍️</span> Start Trading
              </div>
              <div
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center cursor-pointer"
              >
                <span className="mr-2">💌</span> Contact Sales
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}