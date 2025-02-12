
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, ShoppingCart, Phone, Mail, MapPin, Globe, Users, Recycle, Award } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import BuyMaterials from './pages/BuyMaterials';
import SellMaterial from './pages/SellMaterial';
import Cart from './pages/Cart';
import AuthWrapper from './components/AuthWrapper';
import Logout from './pages/logout';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [listedMaterials, setListedMaterials] = useState([]);
  const [availableMaterials, setAvailableMaterials] = useState({
    // raw: [
    //   {
    //     id: 1,
    //     name: "Recycled Plastic Pellets",
    //     price: 450,
    //     location: "California, USA",
    //     quantity: 20,
    //     unit: "tons",
    //     image: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=500",
    //     category: "Plastics",
    //     description: "High-quality recycled plastic pellets suitable for manufacturing. ASTM certified.",
    //     seller: {
    //       name: "Green Recycling Co.",
    //       phone: "+1 (555) 123-4567",
    //       email: "sales@greenrecycling.com",
    //       address: "123 Eco Street, San Francisco, CA",
    //       rating: 4.8,
    //       yearsActive: 5,
    //       certifications: ["ISO 9001", "Green Business Certified"]
    //     }
    //   },
    // ],
    raw: [
      {
        id: 1,
        name: "Recycled Plastic Pellets",
        price: 450,
        location: "California, USA",
        quantity: 20,
        unit: "tons",
        image: "https://images.pexels.com/photos/7767738/pexels-photo-7767738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Updated URL
        category: "Plastics",
        description: "High-quality recycled plastic pellets suitable for manufacturing. ASTM certified.",
        seller: {
          name: "Green Recycling Co.",
          phone: "+1 (555) 123-4567",
          email: "sales@greenrecycling.com",
          address: "123 Eco Street, San Francisco, CA",
          rating: 4.8,
          yearsActive: 5,
          certifications: ["ISO 9001", "Green Business Certified"]
        }
      },
      {
        id: 2,
        name: "Recycled Aluminum Cans",
        price: 800,
        location: "Texas, USA",
        quantity: 50,
        unit: "tons",
        image: "https://images.pexels.com/photos/4113684/pexels-photo-4113684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Updated URL
        category: "Metal",
        description: "High-quality recycled aluminum cans for new product manufacturing.",
        seller: {
          name: "Metal Recyclers Inc.",
          phone: "+1 (555) 987-6543",
          email: "contact@metalrecyclers.com",
          address: "456 Steel St, Houston, TX",
          rating: 4.7,
          yearsActive: 10,
          certifications: ["ISO 14001", "Recycled Aluminum Certified"]
        }
      },
      {
        id: 3,
        name: "Recycled Paper Rolls",
        price: 350,
        location: "New York, USA",
        quantity: 100,
        unit: "rolls",
        image: "https://images.pexels.com/photos/25300276/pexels-photo-25300276/free-photo-of-close-up-of-paper-rolls.jpeg?auto=compress&cs=tinysrgb&w=600", // Updated URL
        category: "Paper",
        description: "Eco-friendly recycled paper rolls for packaging and printing.",
        seller: {
          name: "Eco Paper Solutions",
          phone: "+1 (555) 321-4321",
          email: "sales@ecopapersolutions.com",
          address: "789 Green Paper Ave, New York, NY",
          rating: 4.6,
          yearsActive: 7,
          certifications: ["FSC Certified", "Compostable"]
        }
      },
      {
        id: 4,
        name: "Recycled Glass Bottles",
        price: 600,
        location: "Florida, USA",
        quantity: 30,
        unit: "tons",
        image: "https://images.pexels.com/photos/8286624/pexels-photo-8286624.jpeg?auto=compress&cs=tinysrgb&w=600", // Updated URL
        category: "Glass",
        description: "Recycled glass bottles for repurposing in new packaging and manufacturing.",
        seller: {
          name: "Glass Recycle Corp.",
          phone: "+1 (555) 543-9876",
          email: "info@glassrecycle.com",
          address: "123 Recycle Rd, Miami, FL",
          rating: 4.9,
          yearsActive: 6,
          certifications: ["Recycled Glass Certified", "LEED Compliant"]
        }
      },
      {
        id: 5,
        name: "Organic Compost",
        price: 200,
        location: "California, USA",
        quantity: 50,
        unit: "bags",
        image: "https://images.pexels.com/photos/5479034/pexels-photo-5479034.jpeg?auto=compress&cs=tinysrgb&w=600", // Updated URL
        category: "Organic",
        description: "Premium organic compost made from plant-based waste materials.",
        seller: {
          name: "Green Earth Organics",
          phone: "+1 (555) 789-1234",
          email: "contact@greenearthorganics.com",
          address: "987 Green Lane, San Diego, CA",
          rating: 4.8,
          yearsActive: 9,
          certifications: ["USDA Organic", "Certified Compostable"]
        }
      },
      {
        id: 6,
        name: "Recycled Textile Fabric",
        price: 400,
        location: "Georgia, USA",
        quantity: 150,
        unit: "meters",
        image: "https://images.pexels.com/photos/6044416/pexels-photo-6044416.jpeg?auto=compress&cs=tinysrgb&w=600", // Updated URL
        category: "Textile",
        description: "Recycled textile fabric for use in fashion and interior design projects.",
        seller: {
          name: "Sustainable Fabrics Ltd.",
          phone: "+1 (555) 654-3210",
          email: "info@sustainablefabrics.com",
          address: "678 Fabric St, Atlanta, GA",
          rating: 4.7,
          yearsActive: 8,
          certifications: ["GOTS Certified", "Fair Trade"]
        }
      }
    ],

    sustainable: [
      {
        id: 1,
        name: "Solar Roof Tiles",
        price: 1200,
        location: "Texas, USA",
        quantity: 60,
        unit: "sq meters",
        image: "https://images.pexels.com/photos/8853504/pexels-photo-8853504.jpeg",
        category: "Energy",
        description: "Efficient solar roof tiles for sustainable energy production, with a 25-year warranty.",
        seller: {
          name: "SunTech Innovations",
          phone: "+1 (555) 567-8901",
          email: "info@suntech.com",
          address: "789 Renewable Ave, Austin, TX",
          rating: 4.9,
          yearsActive: 6,
          certifications: ["LEED Certified", "Energy Star"]
        }
      },
      {
        id: 2,
        name: "Biodegradable Packaging Film",
        price: 300,
        location: "New York, USA",
        quantity: 100,
        unit: "rolls",
        image: "https://images.pexels.com/photos/8015709/pexels-photo-8015709.jpeg",
        category: "Packaging",
        description: "Eco-friendly, biodegradable packaging film made from plant-based materials.",
        seller: {
          name: "EcoPack Solutions",
          phone: "+1 (555) 234-5678",
          email: "sales@ecopack.com",
          address: "432 Greenway Blvd, New York, NY",
          rating: 4.7,
          yearsActive: 4,
          certifications: ["Compostable Certified", "USDA BioPreferred"]
        }
      },
      {
        id: 3,
        name: "Reclaimed Wood Flooring",
        price: 900,
        location: "Washington, USA",
        quantity: 40,
        unit: "sq meters",
        image: "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg",
        category: "Building",
        description: "Sustainably sourced reclaimed wood flooring, pre-treated and ready for installation.",
        seller: {
          name: "Timber Revival",
          phone: "+1 (555) 654-3210",
          email: "sales@timberrevival.com",
          address: "567 Eco Timber Ln, Seattle, WA",
          rating: 4.8,
          yearsActive: 10,
          certifications: ["FSC Certified", "LEED Compliant"]
        }
      },
      {
        id: 4,
        name: "Organic Compost Fertilizer",
        price: 200,
        location: "Florida, USA",
        quantity: 30,
        unit: "bags",
        image: "https://images.pexels.com/photos/2987081/pexels-photo-2987081.jpeg",
        category: "Agriculture",
        description: "Nutrient-rich organic compost made from food waste and plant materials.",
        seller: {
          name: "Green Earth Organics",
          phone: "+1 (555) 345-6789",
          email: "support@greenearth.com",
          address: "321 Eco Farms Rd, Miami, FL",
          rating: 4.6,
          yearsActive: 8,
          certifications: ["USDA Organic", "Certified Compostable"]
        }
      },
      {
        id: 5,
        name: "Bamboo-Based Packaging Containers",
        price: 150,
        location: "California, USA",
        quantity: 500,
        unit: "units",
        image: "https://images.pexels.com/photos/3735184/pexels-photo-3735184.jpeg",
        category: "Packaging",
        description: "Durable and compostable bamboo-based packaging containers, ideal for food storage.",
        seller: {
          name: "Sustainable Pack Co.",
          phone: "+1 (555) 678-9012",
          email: "info@sustainablepack.com",
          address: "910 Eco Lane, Los Angeles, CA",
          rating: 4.8,
          yearsActive: 5,
          certifications: ["BPI Compostable", "USDA Certified BioBased"]
        }
      },
      {
        id: 6,
        name: "Energy-Efficient Insulation Panels",
        price: 850,
        location: "Colorado, USA",
        quantity: 60,
        unit: "panels",
        image: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
        category: "Building",
        description: "High-performance insulation panels made from recycled materials, reducing energy loss.",
        seller: {
          name: "EcoBuild Innovations",
          phone: "+1 (555) 789-1234",
          email: "support@ecobuild.com",
          address: "123 Green Street, Denver, CO",
          rating: 4.9,
          yearsActive: 7,
          certifications: ["LEED Certified", "Energy Star Rated"]
        }
      }
    ]
  });

  const navigate = useNavigate();



  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    setAvailableMaterials(prev => ({
      raw: prev.raw.map(material =>
        material.id === item.id
          ? { ...material, quantity: material.quantity - 1 }
          : material
      ),
      sustainable: prev.sustainable.map(material =>
        material.id === item.id
          ? { ...material, quantity: material.quantity - 1 }
          : material
      )
    }));

    setListedMaterials(prev =>
      prev.map(material =>
        material.id === item.id
          ? { ...material, quantity: material.quantity - 1 }
          : material
      )
    );

    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };


  const removeFromCart = (itemId) => {
    const removedItem = cartItems.find(item => item.id === itemId);
    if (removedItem) {
      setAvailableMaterials(prev => ({
        raw: prev.raw.map(material =>
          material.id === itemId
            ? { ...material, quantity: material.quantity + removedItem.quantity }
            : material
        ),
        sustainable: prev.sustainable.map(material =>
          material.id === itemId
            ? { ...material, quantity: material.quantity + removedItem.quantity }
            : material
        )
      }));
    }
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    const currentItem = cartItems.find(item => item.id === itemId);
    if (!currentItem) return;

    const quantityDifference = currentItem.quantity - newQuantity;

    if (newQuantity < 1) return;

    setAvailableMaterials(prev => ({
      raw: prev.raw.map(material =>
        material.id === itemId
          ? { ...material, quantity: material.quantity + quantityDifference }
          : material
      ),
      sustainable: prev.sustainable.map(material =>
        material.id === itemId
          ? { ...material, quantity: material.quantity + quantityDifference }
          : material
      )
    }));

    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const addListedMaterial = (material) => {
    setListedMaterials([...listedMaterials, material]);
  };


  const HomePage = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);


    const slides = [
      {
        image: "https://images.pexels.com/photos/1933382/pexels-photo-1933382.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Green Fuel Marketplace",
        subtitle: "Buy and sell biofuels, hydrogen, and other renewable energy sources."
      },
      {
        image: "https://images.pexels.com/photos/1192032/pexels-photo-1192032.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Sustainable Energy Trading",
        subtitle: "Connect with suppliers and buyers of eco-friendly fuels."
      },
      {
        image: "https://images.pexels.com/photos/2387818/pexels-photo-2387818.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Biofuel Innovations",
        subtitle: "Discover cutting-edge developments in biodiesel and ethanol."
      },
      {
        image: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Hydrogen Fuel Solutions",
        subtitle: "Invest in the future of clean hydrogen energy."
      },
      {
        image: "https://images.pexels.com/photos/3735207/pexels-photo-3735207.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Eco-Friendly Logistics",
        subtitle: "Support green transportation with alternative fuels."
      },
      {
        image: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "AI-Driven Fuel Pricing",
        subtitle: "Leverage smart analytics for efficient fuel trading."
      },
      {
        image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Carbon Credit Integration",
        subtitle: "Offset emissions with carbon credit exchange options."
      },
      {
        image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Solar-Powered Fuel Stations",
        subtitle: "Explore renewable-powered refueling stations."
      },
      {
        image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Green Energy Policies",
        subtitle: "Stay updated with global regulations on sustainable fuel."
      },
      {
        image: "https://images.pexels.com/photos/4919714/pexels-photo-4919714.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Waste-to-Fuel Innovations",
        subtitle: "Convert organic waste into valuable biofuels."
      },
      {
        image: "https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Next-Gen Fuel Technologies",
        subtitle: "Explore breakthroughs in synthetic and algae-based fuels."
      },
      {
        image: "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: "Investment Opportunities",
        subtitle: "Support and fund the future of green fuel innovations."
      }
    ];




    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 2000);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="bg-gray-50">
        {/* Hero Section with Slider */}
        {/* <div className="relative bg-green-600 h-[600px] overflow-hidden"> */}
        <div className="relative h-[600px] overflow-hidden" style={{ backgroundColor: "RGB( 28, 33, 27)" }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-20 absolute"
              />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-5xl font-bold mb-6">{slide.title}</h1>
                  <p className="text-xl mb-8">{slide.subtitle}</p>
                  <div className="space-x-4">
                    <button
                      onClick={() => navigate('/marketplace')}
                      className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      Explore Marketplace
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-400 transition-colors"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/75'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose GreenFuel Market?</h2>
              <p className="text-xl text-gray-600">We're revolutionizing the way sustainable materials are traded</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Global Network</h3>
                <p className="text-gray-600">Connect with verified buyers and sellers worldwide</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality Assured</h3>
                <p className="text-gray-600">All materials meet strict quality standards</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Recycle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Sustainable Impact</h3>
                <p className="text-gray-600">Contribute to circular economy goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About GreenFuel Market</h1>
          <p className="text-xl text-gray-600">Building a sustainable future through circular economy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At GreenFuel Market, we're committed to accelerating the transition to a circular economy by creating the most efficient marketplace for sustainable materials.
            </p>
            <p className="text-lg text-gray-600">
              We believe that every material has value, and our platform makes it easier than ever to buy and sell recycled materials, reducing waste and environmental impact.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80"
              alt="Sustainable Materials"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-12 mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Tons Materials Traded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
              <div className="text-gray-600">Carbon Reduction</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300"
              },
              {
                name: "Michael Chen",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
              },
              {
                name: "Emma Williams",
                role: "Sustainability Director",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
              }
            ].map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We're here to help and answer any questions you might have</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">123 Green Street, Eco City, EC 12345</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+91 99298 94585</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">greenfuelmarket@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <nav className="bg-green-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Leaf className="h-8 w-8 text-white" />
                <span className="ml-2 text-white text-xl font-bold">GreenFuel Market</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium">Home</Link>
              <Link to="/marketplace" className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium">Marketplace</Link>
              <Link to="/about" className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium">About</Link>
              <Link to="/contact" className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium">Contact</Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center text-white hover:text-green-200 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate('/logout')}
                className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-green-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-green-600 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block text-white hover:bg-green-500 px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link to="/marketplace" className="block text-white hover:bg-green-500 px-3 py-2 rounded-md text-base font-medium">
                Marketplace
              </Link>
              <Link to="/about" className="block text-white hover:bg-green-500 px-3 py-2 rounded-md text-base font-medium">
                About
              </Link>
              <Link to="/contact" className="block text-white hover:bg-green-500 px-3 py-2 rounded-md text-base font-medium">
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<HomePage />  } />
        <Route path="/about" element={<AuthWrapper><AboutPage /></AuthWrapper>} />
        <Route path="/contact" element={<AuthWrapper><ContactPage /></AuthWrapper>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/marketplace" element={<AuthWrapper><Marketplace /></AuthWrapper>} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/marketplace/buy"
          element={
          <AuthWrapper>
            <BuyMaterials
              addToCart={addToCart}
              listedMaterials={listedMaterials}
              availableMaterials={availableMaterials}
              />
          </AuthWrapper>
          }
          />
        <Route
          path="/marketplace/sell"
          element={
          <AuthWrapper>
          <SellMaterial 
            onListMaterial={addListedMaterial} />
          </AuthWrapper>
          }
          />
        <Route
          path="/cart"
          element={
          <AuthWrapper>
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateCartItemQuantity}
          />
        </AuthWrapper>
        }
        />
      </Routes>
     
    </div>
  );
}

export default App;








