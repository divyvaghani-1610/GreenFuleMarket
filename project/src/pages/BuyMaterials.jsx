
import React, { useState } from 'react';
import { Search, Filter, Package, Truck, DollarSign, Tag as TagIcon, Phone, Mail, MapPin, X } from 'lucide-react';

export default function BuyMaterials({ addToCart, listedMaterials }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const defaultMaterials = [
    {
      id: 1,
      name: "Recycled Plastic Pellets",
      price: 450,
      location: "California, USA",
      quantity: "20 tons available",
      image: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=500",
      category: "Plastics",
      description: "High-quality recycled plastic pellets suitable for manufacturing. ASTM certified.",
      seller: {
        name: "Green Recycling Co.",
        phone: "+182 82546 21548",
        email: "sales@greenrecycling.com",
        address: "123 Eco Street, San Francisco, CA",
        rating: 4.8,
        yearsActive: 5,
        certifications: ["ISO 9001", "Green Business Certified"]
      }
    },
    {
      id: 2,
      name: "Organic Waste Biomass",
      price: 200,
      location: "Texas, USA",
      quantity: "50 tons available",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=500",
      category: "Organic",
      description: "Clean organic waste suitable for biofuel production. Moisture content <10%.",
      seller: {
        name: "BioMass Solutions",
        phone: "+1 (555) 987-6543",
        email: "info@biomass-solutions.com",
        address: "456 Energy Drive, Houston, TX",
        rating: 3,
        yearsActive: 3,
        certifications: ["Organic Materials Review Institute", "USDA Organic"]
      }
    },
    {
      id: 3,
      name: "Used Cooking Oil",
      price: 0.75,
      location: "Florida, USA",
      quantity: "10,000 gallons available",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500",
      category: "Organic",
      description: "Filtered used cooking oil, ideal for biodiesel production.",
      seller: {
        name: "EcoOil Collectors",
        phone: "+1 (555) 789-0123",
        email: "contact@ecooil.com",
        address: "789 Sustainable Ave, Miami, FL",
        rating: 4.9,
        yearsActive: 7,
        certifications: ["FDA Registered", "ISCC Certified"]
      }
    }
  ];

  const allMaterials = [...defaultMaterials, ...listedMaterials];

  const categories = ['Plastics', 'Metals', 'Paper', 'Glass', 'Organic', 'Textile'];

  const filteredMaterials = allMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (material) => {
    addToCart({
      id: material.id,
      name: material.name,
      price: material.price,
      image: material.image,
      category: material.category
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Search Section */}
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Available Materials</h1>
            <p className="text-xl text-green-100">Find and purchase sustainable raw materials</p>
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for materials..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600 whitespace-nowrap">Filter by:</span>
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={material.image}
                alt={material.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{material.name}</h3>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
                    {material.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{material.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    ${material.price}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Package className="h-4 w-4 mr-2" />
                    {material.quantity}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck className="h-4 w-4 mr-2" />
                    {material.location}
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleAddToCart(material)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedMaterial(material)}
                    className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seller Details Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Seller Information</h2>
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedMaterial.seller.name}</h3>
                  <div className="flex items-center text-yellow-400 mb-2">
                    {"★".repeat(Math.floor(selectedMaterial.seller.rating))}
                    <span className="ml-2 text-gray-600">
                      {selectedMaterial.seller.rating} / 5.0
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {selectedMaterial.seller.yearsActive} years in business
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3" />
                    <span>{selectedMaterial.seller.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3" />
                    <span>{selectedMaterial.seller.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>{selectedMaterial.seller.address}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMaterial.seller.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => {
                      window.location.href = `mailto:${selectedMaterial.seller.email}`;
                    }}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}