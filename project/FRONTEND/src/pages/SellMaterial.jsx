import React, { useState } from 'react';
import { Upload, Package, MapPin, DollarSign, FileText, Tag as TagIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";


export default function SellMaterial({ onListMaterial }) {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [section, setSection] = useState('raw');
  const [formData, setFormData] = useState({
    category: "",
    materialName: "",
    price: "",
    quantity: "",
    unit: "",
    location: "",
    description: "",
  });

  const materialOptions = {
    raw: {
      "Plastics": ["PET Bottles", "HDPE Containers", "PP Pellets", "Mixed Plastic Waste"],
      "Metals": ["Aluminum Scrap", "Copper Wire", "Steel Scrap", "Mixed Metal Waste"],
      "Paper": ["Cardboard", "Mixed Paper", "Newspaper", "Office Paper"],
      "Glass": ["Clear Glass", "Mixed Glass", "Glass Cullet"],
      "Organic": ["Food Waste", "Agricultural Waste", "Wood Chips", "Green Waste"],
      "Textile": ["Cotton Waste", "Mixed Textile", "Synthetic Fibers"]
    },
    sustainable: {
      "Energy": ["Solar Panels", "Wind Turbine Parts", "Battery Components"],
      "Packaging": ["Biodegradable Containers", "Eco-friendly Wrapping", "Sustainable Boxes"],
      "Building": ["Recycled Construction Materials", "Eco-friendly Insulation", "Sustainable Wood"],
      "Agriculture": ["Organic Fertilizers", "Sustainable Seeds", "Eco-friendly Tools"]
    }
  };

  const [materialOptions2, setMaterialOptions2] = useState([]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "imageupload"); // Your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/drpyjhhsu/image/upload", // Your Cloudinary cloud name
          formData
        );

        if (response.data.secure_url) {
          setImagePreview(response.data.secure_url); // Store the Cloudinary image URL
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };


  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({ ...formData, category, materialName: "" });
    setMaterialOptions2(category ? materialOptions[section][category] : []);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!formData.category || !formData.materialName || !formData.price || !formData.quantity || !formData.unit || !formData.location || !formData.description) {
  //     toast.error('Please fill in all fields');
  //     return;
  //   }

  //   const newMaterial = {
  //     id: Date.now(),
  //     name: formData.materialName,
  //     category: formData.category,
  //     price: parseFloat(formData.price),
  //     quantity: parseInt(formData.quantity),
  //     unit: formData.unit,
  //     location: formData.location,
  //     description: formData.description,
  //     section: section,
  //     image: imagePreview || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80",
  //     seller: {
  //       name: "Your Company",
  //       rating: 5.0,
  //       yearsActive: 1,
  //       phone: "+1 (555) 000-0000",
  //       email: "contact@yourcompany.com",
  //       address: "Your Address",
  //       certifications: ["ISO 9001"]
  //     }
  //   };

  //   onListMaterial(newMaterial);
  //   toast.success('Material listed successfully!');
  //   navigate('/marketplace/buy');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.materialName || !formData.price || !formData.quantity || !formData.unit || !formData.location || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const newMaterial = {
      name: formData.materialName,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      location: formData.location,
      description: formData.description,
      section: section,
      image: imagePreview || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80",
      seller: {
        name: "Your Company",
        rating: 5.0,
        yearsActive: 1,
        phone: "+1 (555) 000-0000",
        email: "contact@yourcompany.com",
        address: "Your Address",
        certifications: ["ISO 9001"]
      }
    };

    try {
      const response = await axios.post("http://localhost:5000/api/materials", newMaterial);

      if (response.status === 201) {
        toast.success("Material listed successfully!");
        navigate("/marketplace/buy");
      }
    } catch (error) {
      console.error("Error listing material:", error);
      toast.error("Failed to list material. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">List Your Material</h1>

          {/* Section Selection */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setSection('raw')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${section === 'raw'
                ? 'bg-green-600 text-white shadow-lg transform -translate-y-1'
                : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
            >
              Raw Materials
            </button>
            <button
              onClick={() => setSection('sustainable')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${section === 'sustainable'
                ? 'bg-green-600 text-white shadow-lg transform -translate-y-1'
                : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
            >
              Sustainable Products
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Material Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-64 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Material Details */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <TagIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    value={formData.category}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a category</option>
                    {Object.keys(materialOptions[section]).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Material Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    disabled={!formData.category}
                    value={formData.materialName}
                    onChange={(e) => setFormData({ ...formData, materialName: e.target.value })}
                  >
                    <option value="">Select material type</option>
                    {materialOptions2.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price per Unit</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      placeholder="Quantity"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    >
                      <option value="">Select unit</option>
                      <option value="tons">Tons</option>
                      <option value="kg">Kilograms</option>
                      <option value="pieces">Pieces</option>
                      <option value="sets">Sets</option>
                      <option value="gallons">Gallons</option>
                      <option value="liters">Liters</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute top-3 left-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    required
                    rows={4}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe your material, including quality, specifications, and any certifications..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/marketplace')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                List Material
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
