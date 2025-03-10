
// import React, { useState } from 'react';
// import { Search, Filter, Package, Truck, DollarSign, Tag as TagIcon, Phone, Mail, MapPin, X } from 'lucide-react';
// import toast from 'react-hot-toast';

// export default function BuyMaterials({ addToCart, listedMaterials, availableMaterials }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedSection, setSelectedSection] = useState('raw');
//   const [selectedMaterial, setSelectedMaterial] = useState(null);


//   // Initialize materials state with listed materials
//   const materials = React.useMemo(() => ({
//     raw: [...availableMaterials.raw, ...listedMaterials.filter(m => m.section === 'raw')],
//     sustainable: [...availableMaterials.sustainable, ...listedMaterials.filter(m => m.section === 'sustainable')]
//   }), [availableMaterials, listedMaterials]);

//   const categories = {
//     raw: ['Plastics', 'Metals', 'Paper', 'Glass', 'Organic', 'Textile'],
//     sustainable: ['Energy', 'Packaging', 'Building', 'Agriculture']
//   };

//   const filteredMaterials = materials[selectedSection].filter(material => {
//     const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       material.description?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleAddToCart = (material) => {
//     // Check if quantity is available
//     if (material.quantity <= 0) {
//       toast.error('This material is out of stock!');
//       return;
//     }

//     // Add to cart
//     addToCart({
//       id: material.id,
//       name: material.name,
//       price: material.price,
//       image: material.image,
//       category: material.category,
//       maxQuantity: material.quantity
//     });

//     toast.success('Added to cart!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       {/* Search Section */}
//       <div className="bg-green-600 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold mb-4">Available Materials</h1>
//             <p className="text-xl text-green-100">Find and purchase sustainable raw materials</p>
//           </div>

//           <div className="mt-8 max-w-2xl mx-auto">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search for materials..."
//                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section Tabs */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//         <div className="flex space-x-4 mb-6">
//           <button
//             onClick={() => setSelectedSection('raw')}
//             className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${selectedSection === 'raw'
//               ? 'bg-green-600 text-white shadow-lg transform -translate-y-1'
//               : 'bg-white text-gray-600 hover:bg-green-50'
//               }`}
//           >
//             Raw Materials
//           </button>
//           <button
//             onClick={() => setSelectedSection('sustainable')}
//             className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${selectedSection === 'sustainable'
//               ? 'bg-green-600 text-white shadow-lg transform -translate-y-1'
//               : 'bg-white text-gray-600 hover:bg-green-50'
//               }`}
//           >
//             Sustainable Products
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-4">
//           <div className="flex items-center space-x-2">
//             <Filter className="h-5 w-5 text-gray-400" />
//             <span className="text-gray-600 whitespace-nowrap">Filter by:</span>
//           </div>
//           <button
//             onClick={() => setSelectedCategory('all')}
//             className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === 'all'
//               ? 'bg-green-600 text-white'
//               : 'bg-white text-gray-600 hover:bg-green-50'
//               }`}
//           >
//             All Categories
//           </button>
//           {categories[selectedSection].map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category
//                 ? 'bg-green-600 text-white'
//                 : 'bg-white text-gray-600 hover:bg-green-50'
//                 }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Materials Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredMaterials.map((material) => (
//             <div key={material.id} className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//               <img
//                 src={material.image}
//                 alt={material.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-lg font-semibold">{material.name}</h3>
//                   <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
//                     {material.category}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-4">{material.description}</p>
//                 <div className="space-y-2">
//                   <div className="flex items-center text-gray-600">
//                     <DollarSign className="h-4 w-4 mr-2" />
//                     ${material.price}
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Package className="h-4 w-4 mr-2" />
//                     <span className={material.quantity <= 0 ? 'text-red-500 font-semibold' : ''}>
//                       {material.quantity <= 0 ? 'Out of Stock' : `${material.quantity} ${material.unit} available`}
//                     </span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Truck className="h-4 w-4 mr-2" />
//                     {material.location}
//                   </div>
//                 </div>
//                 <div className="mt-4 flex space-x-3">
//                   <button
//                     onClick={() => handleAddToCart(material)}
//                     className={`flex-1 py-2 rounded-lg flex items-center justify-center ${material.quantity <= 0
//                       ? 'bg-gray-300 cursor-not-allowed'
//                       : 'bg-green-600 text-white hover:bg-green-700 transition-colors'
//                       }`}
//                     disabled={material.quantity <= 0}
//                   >
//                     {material.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
//                   </button>
//                   <button
//                     onClick={() => setSelectedMaterial(material)}
//                     className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors"
//                   >
//                     Contact Seller
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Seller Details Modal */}
//       {selectedMaterial && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">Seller Information</h2>
//                 <button
//                   onClick={() => setSelectedMaterial(null)}
//                   className="text-gray-400 hover:text-gray-500"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2">{selectedMaterial.seller.name}</h3>
//                   <div className="flex items-center text-yellow-400 mb-2">
//                     {"★".repeat(Math.floor(selectedMaterial.seller.rating))}
//                     <span className="ml-2 text-gray-600">
//                       {selectedMaterial.seller.rating} / 5.0
//                     </span>
//                   </div>
//                   <p className="text-gray-600">
//                     {selectedMaterial.seller.yearsActive} years in business
//                   </p>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center text-gray-600">
//                     <Phone className="h-5 w-5 mr-3" />
//                     <span>{selectedMaterial.seller.phone}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Mail className="h-5 w-5 mr-3" />
//                     <span>{selectedMaterial.seller.email}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <MapPin className="h-5 w-5 mr-3" />
//                     <span>{selectedMaterial.seller.address}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold mb-2">Certifications</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedMaterial.seller.certifications.map((cert, index) => (
//                       <span
//                         key={index}
//                         className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
//                       >
//                         {cert}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t">
//                   <button
//                     onClick={() => {
//                       window.location.href = `mailto:${selectedMaterial.seller.email}`;
//                     }}
//                     className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                     Send Message
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Search, Filter, Package, Truck, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

<<<<<<< HEAD
export default function BuyMaterials({ addToCart }) {
=======
export default function BuyMaterials({ addToCart, cartItems }) {
>>>>>>> master
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSection, setSelectedSection] = useState("raw");

  // Fetch materials from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/materials");
        setMaterials(response.data); // Store fetched data
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  const categories = {
    raw: ["Plastics", "Metals", "Paper", "Glass", "Organic", "Textile"],
    sustainable: ["Energy", "Packaging", "Building", "Agriculture"]
  };

  // Filter materials based on section & category
  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSection = material.section === selectedSection;
      const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSection && matchesCategory && matchesSearch;
    });
  }, [materials, searchTerm, selectedCategory, selectedSection]);

  const handleAddToCart = (material) => {
<<<<<<< HEAD
    if (material.quantity <= 0) {
      toast.error("This material is out of stock!");
      return;
    }

    addToCart({
      id: material._id,
      name: material.name,
      price: material.price,
      image: material.image, // Cloudinary URL
      category: material.category,
      maxQuantity: material.quantity
    });

    toast.success("Added to cart!");
  };
=======
    // Ensure cartItems is available
    if (!cartItems) return;

    // Find current quantity in cart
    const existingItem = cartItems.find(item => item.id === material._id);
    const currentCartQuantity = existingItem ? existingItem.quantity : 0;

    // Prevent adding more than available stock
    if (currentCartQuantity >= material.quantity) {
        toast.error(`Only ${material.quantity} ${material.unit} available in stock.`);
        return;
    }

    // Proceed to add/update in cart
    addToCart({
        id: material._id,
        name: material.name,
        price: material.price,
        image: material.image, // Cloudinary URL
        category: material.category,
        quantity: (existingItem ? existingItem.quantity + 1 : 1), // Update quantity
        maxQuantity: material.quantity, // Store max quantity for reference
    });

    toast.success("Added to cart!");
};

>>>>>>> master

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Search Section */}
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Available Materials</h1>
          <p className="text-xl text-green-100">Find and purchase sustainable raw materials</p>

          <div className="mt-8 max-w-2xl mx-auto relative">
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

      {/* Section Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex space-x-4 mb-6">
          {["raw", "sustainable"].map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${selectedSection === section ? "bg-green-600 text-white shadow-lg transform -translate-y-1" : "bg-white text-gray-600 hover:bg-green-50"
                }`}
            >
              {section === "raw" ? "Raw Materials" : "Sustainable Products"}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600">Filter by:</span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full ${selectedCategory === "all" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-green-50"}`}
          >
            All Categories
          </button>
          {categories[selectedSection].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-green-50"}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div key={material._id} className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                    <span className={material.quantity <= 0 ? "text-red-500 font-semibold" : ""}>
                      {material.quantity <= 0 ? "Out of Stock" : `${material.quantity} ${material.unit} available`}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck className="h-4 w-4 mr-2" />
                    {material.location}
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleAddToCart(material)}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center ${material.quantity <= 0 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 transition-colors"
                      }`}
                    disabled={material.quantity <= 0}
                  >
                    {material.quantity <= 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No materials found.</p>
        )}
      </div>
    </div>
  );
}
