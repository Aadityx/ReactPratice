import React, { useEffect, useState } from 'react';
import { 
  Search, LogOut, Plus, Trash2, ShoppingCart, 
  User, Grid, Filter, Check, X, Tag, AlertCircle, ShoppingBag
} from 'lucide-react';

// Premium high-quality dummy products with realistic data
const DUMMY_PRODUCTS = [
  {
    _id: "dummy-1",
    productName: "AeroSound Max Headphones",
    description: "Premium noise-canceling over-ear wireless headphones with high-fidelity spatial audio and 40h battery life.",
    price: 199.99,
    inventoryCount: 15,
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
    category: "Electronics",
    sellerID: { name: "System Store" }
  },
  {
    _id: "dummy-2",
    productName: "Apex Pro Mechanical Keyboard",
    description: "Ultra-fast mechanical switches with customizable RGB backlighting, aircraft-grade aluminum frame, and magnetic wrist rest.",
    price: 149.99,
    inventoryCount: 8,
    productImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80",
    category: "Electronics",
    sellerID: { name: "System Store" }
  },
  {
    _id: "dummy-3",
    productName: "Nomad Canvas Backpack",
    description: "Waterproof canvas and genuine leather travel backpack featuring a padded 15-inch laptop sleeve and hidden utility pockets.",
    price: 89.50,
    inventoryCount: 12,
    productImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
    category: "Fashion",
    sellerID: { name: "System Store" }
  },
  {
    _id: "dummy-4",
    productName: "Chrono Elite Steel Watch",
    description: "Classic chronograph wrist watch built with Japanese quartz movement, sapphire glass, and dark brown Italian leather strap.",
    price: 299.00,
    inventoryCount: 5,
    productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
    category: "Fashion",
    sellerID: { name: "System Store" }
  },
  {
    _id: "dummy-5",
    productName: "Ceramic Pour-Over Coffee Set",
    description: "Minimalist artisan ceramic coffee dripper with matte charcoal finish, matching server pot, and wooden base stand.",
    price: 34.00,
    inventoryCount: 22,
    productImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
    category: "Home & Kitchen",
    sellerID: { name: "System Store" }
  },
  {
    _id: "dummy-6",
    productName: "HydroSport Vacuum Flask",
    description: "Double-walled vacuum insulated stainless steel flask that keeps beverages ice-cold for 24 hours or steaming hot for 12 hours.",
    price: 24.95,
    inventoryCount: 40,
    productImage: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80",
    category: "Sports & Outdoors",
    sellerID: { name: "System Store" }
  }
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Buy Modal State
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Add Product Modal State (For Sellers)
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newInventory, setNewInventory] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newCategory, setNewCategory] = useState('Electronics');

  // Alert State
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  // Decode user token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch (e) {
      console.error("Failed to decode token", e);
      localStorage.clear();
      window.location.href = '/';
    }
  }, []);

  const triggerAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 4000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/products/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.products && data.products.length > 0) {
        setProducts(data.products);
      } else {
        // Fallback to DUMMY products if database yields empty list
        setProducts(DUMMY_PRODUCTS);
      }
    } catch (error) {
      console.error('Error fetching products, falling back to dummy products:', error);
      setProducts(DUMMY_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search query & category selection
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()) ||
      // Fallback categorization for database items that don't have category set
      (selectedCategory === 'Electronics' && !product.category);

    return matchesSearch && matchesCategory;
  });

  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowBuyModal(true);
  };

  const buyProduct = async () => {
    if (quantity < 1) {
      triggerAlert("Please select a quantity of 1 or more", "danger");
      return;
    }
    
    // Prevent ordering more than in stock
    if (quantity > selectedProduct.inventoryCount) {
      triggerAlert(`Only ${selectedProduct.inventoryCount} items left in stock`, "danger");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          products: [
            {
              productID: selectedProduct._id,
              quantity: parseInt(quantity)
            }
          ]
        })
      });

      if (response.ok) {
        triggerAlert("Purchase completed successfully!", "success");
        setShowBuyModal(false);
        // Refresh product list to see updated inventories
        fetchProducts();
      } else {
        const errData = await response.json();
        triggerAlert(errData.message || "Purchase failed", "danger");
      }
    } catch (error) {
      // In case we are using frontend-only dummy fallbacks and backend fails
      if (selectedProduct._id.startsWith("dummy-")) {
        triggerAlert("Purchase simulated successfully (Local Mock Mode)!", "success");
        // Update local state to simulate sale
        setProducts(prev => prev.map(p => 
          p._id === selectedProduct._id 
            ? { ...p, inventoryCount: p.inventoryCount - quantity } 
            : p
        ));
        setShowBuyModal(false);
      } else {
        triggerAlert("Failed to complete purchase. Server unavailable.", "danger");
      }
    }
  };

  // Add product handler (sellers only)
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProductName || !newDescription || !newPrice || !newInventory || !newImage) {
      triggerAlert("All fields are required", "danger");
      return;
    }

    const payload = {
      productName: newProductName,
      description: newDescription,
      price: parseFloat(newPrice),
      inventoryCount: parseInt(newInventory),
      productImage: newImage,
      category: newCategory
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        triggerAlert("New product added successfully!", "success");
        setShowAddModal(false);
        // Clear inputs
        setNewProductName('');
        setNewDescription('');
        setNewPrice('');
        setNewInventory('');
        setNewImage('');
        fetchProducts();
      } else {
        const data = await response.json();
        triggerAlert(data.message || "Failed to add product", "danger");
      }
    } catch (error) {
      // Offline fallback
      const mockNewProduct = {
        _id: `dummy-${Date.now()}`,
        ...payload,
        sellerID: { name: user?.name || "You" }
      };
      setProducts(prev => [mockNewProduct, ...prev]);
      triggerAlert("Product added successfully (Local Mock Mode)!", "success");
      setShowAddModal(false);
      setNewProductName('');
      setNewDescription('');
      setNewPrice('');
      setNewInventory('');
      setNewImage('');
    }
  };

  // Delete product handler (sellers only)
  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/products/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        triggerAlert("Product deleted successfully!", "success");
        fetchProducts();
      } else {
        triggerAlert("Failed to delete product. Unauthorised.", "danger");
      }
    } catch (error) {
      // Local fallback deletion
      setProducts(prev => prev.filter(p => p._id !== productId));
      triggerAlert("Product deleted (Local Mock Mode)!", "success");
    }
  };

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Sports & Outdoors'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Dynamic Alert */}
      {alert.show && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border animate-bounce ${
          alert.variant === 'success' 
            ? 'bg-emerald-950/90 border-emerald-500/35 text-emerald-400' 
            : 'bg-red-950/90 border-red-500/35 text-red-400'
        }`}>
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">{alert.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              NovaMarket
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* User Profile Badge */}
            {user && (
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-slate-900/80 rounded-full border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-300">{user.name}</span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  user.userType === 'seller' ? 'bg-purple-950 text-purple-400 border border-purple-800' : 'bg-blue-950 text-blue-400 border border-blue-800'
                }`}>
                  {user.userType}
                </span>
              </div>
            )}

            <button 
              onClick={() => window.location.href = '/order'}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-indigo-400" />
              <span>Orders</span>
            </button>

            <button 
              onClick={() => { localStorage.clear(); window.location.href = '/'; }}
              className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Controls Section (Search, Category Filter, and Add Button) */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Seller's Add Product Button */}
          {user?.userType === 'seller' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="w-12 h-12 border-4 border-indigo-600/30 border-t-indigo-500 rounded-full animate-spin"></span>
            <p className="text-slate-400 font-medium">Loading catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/10 rounded-2xl border border-dashed border-slate-850">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">No products found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.inventoryCount <= 0;
              const isLowStock = product.inventoryCount > 0 && product.inventoryCount <= 5;
              const isUserSeller = user && product.sellerID && (product.sellerID === user.userID || product.sellerID.name === user.name);

              return (
                <div 
                  key={product._id} 
                  className="bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-md hover:shadow-xl hover:border-slate-700/60 transition-all duration-300 flex flex-col group relative overflow-hidden"
                >
                  {/* Stock Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    {isOutOfStock ? (
                      <span className="bg-red-950/90 text-red-400 border border-red-800/50 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="bg-amber-950/90 text-amber-400 border border-amber-800/50 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        Only {product.inventoryCount} Left
                      </span>
                    ) : (
                      <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* Product Image */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative">
                    <img 
                      src={product.productImage} 
                      alt={product.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">
                          {product.category || 'General'}
                        </span>
                        <span className="text-xs text-slate-500">
                          Seller: {product.sellerID?.name || 'Local'}
                        </span>
                      </div>
                      
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {product.productName}
                      </h4>
                      
                      <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Price</span>
                        <span className="text-lg font-extrabold text-white">${product.price.toFixed(2)}</span>
                      </div>

                      {user?.userType === 'customer' ? (
                        <button
                          onClick={() => handleBuyProduct(product)}
                          disabled={isOutOfStock}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-850 disabled:text-slate-600 disabled:border-slate-800 disabled:cursor-not-allowed border border-transparent text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Buy Now</span>
                        </button>
                      ) : (
                        // If user is a seller and owns this product, allow deletion
                        isUserSeller && (
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© 2026 NovaMarket E-Commerce Project. Styled using Tailwind CSS v4.</p>
      </footer>

      {/* BUY PRODUCT MODAL */}
      {showBuyModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowBuyModal(false)}></div>
          
          {/* Modal Content */}
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-zoomIn">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-indigo-400" />
                <span>Confirm Purchase</span>
              </h3>
              <button 
                onClick={() => setShowBuyModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <img 
                  src={selectedProduct.productImage} 
                  alt={selectedProduct.productName} 
                  className="w-20 h-20 object-cover rounded-xl bg-slate-950"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedProduct.productName}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{selectedProduct.description}</p>
                  <p className="text-indigo-400 text-sm font-semibold mt-1">${selectedProduct.price.toFixed(2)} each</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-400">Order Quantity</label>
                  <div className="flex items-center gap-2.5">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-white w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => Math.min(selectedProduct.inventoryCount, q + 1))}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Available stock</span>
                  <span>{selectedProduct.inventoryCount} units</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Bill</span>
                <span className="text-xl font-black text-indigo-400">${(selectedProduct.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex gap-3">
              <button 
                onClick={() => setShowBuyModal(false)}
                className="flex-1 py-2.5 border border-slate-850 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={buyProduct}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Buy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL (SELLERS ONLY) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-zoomIn">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>List New Product</span>
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addProduct}>
              <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Product Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mechanical Keyboard" 
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                      <option value="Sports & Outdoors">Sports & Outdoors</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Description</label>
                  <textarea 
                    placeholder="Provide details about specs, features, size, etc." 
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="99.99" 
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Inventory Stock</label>
                    <input 
                      type="number" 
                      placeholder="10" 
                      value={newInventory}
                      onChange={(e) => setNewInventory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Product Image URL</label>
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..." 
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                  <p className="text-[10px] text-slate-500">Provide a direct link to an image (Unsplash recommended).</p>
                </div>
              </div>

              <div className="p-5 border-t border-slate-800 bg-slate-900/50 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-slate-850 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>List Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;