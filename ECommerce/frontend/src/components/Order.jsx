import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, Calendar, User, DollarSign, Package, 
  ShoppingBag, Trash2, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

function Order() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    // Decode current user details from token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
            return;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUser(payload);
        } catch (e) {
            console.error("Failed to parse token:", e);
        }
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/order/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setOrders(data.orders || []);
            } else {
                console.error('Failed to load orders');
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Format ISO string date to human readable format
    const formatDate = (isoString) => {
        if (!isoString) return 'Recent';
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate sum of order amounts
    const totalSpent = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
            {/* Header */}
            <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                            <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            NovaMarket
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => window.location.href = '/products'}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4 text-indigo-400" />
                            <span>Catalog</span>
                        </button>
                        <button 
                            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                            className="px-4 py-2 bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/35 rounded-xl text-sm font-medium transition-all cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Order History</h2>
                    <p className="text-slate-400 text-sm mt-1.5">Track your purchases and sales invoices</p>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/80 flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/10">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 uppercase font-medium">Total Orders</span>
                            <h4 className="text-2xl font-black text-white mt-1">{orders.length}</h4>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/80 flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 uppercase font-medium">Accumulated Value</span>
                            <h4 className="text-2xl font-black text-white mt-1">${totalSpent.toFixed(2)}</h4>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/80 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/10">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 uppercase font-medium">Account Role</span>
                            <h4 className="text-base font-bold text-white mt-1 uppercase tracking-wider">{currentUser?.userType || 'Customer'}</h4>
                        </div>
                    </div>
                </div>

                {/* Orders Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <span className="w-12 h-12 border-4 border-indigo-600/30 border-t-indigo-500 rounded-full animate-spin"></span>
                        <p className="text-slate-400 font-medium">Fetching orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-850">
                        <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-lg font-semibold text-white">No orders placed yet</h3>
                        <p className="text-slate-500 text-sm mt-1">Go to the catalog to buy your first product.</p>
                        <button 
                            onClick={() => window.location.href = '/products'}
                            className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/15"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="bg-slate-900/40 border border-slate-800/85 rounded-2xl overflow-hidden shadow-xl">
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-850 bg-slate-900/80 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        <th className="py-4 px-6">Product Details</th>
                                        <th className="py-4 px-6 text-center">Qty</th>
                                        <th className="py-4 px-6">Total Amount</th>
                                        <th className="py-4 px-6">Order Date</th>
                                        <th className="py-4 px-6">Parties</th>
                                        <th className="py-4 px-6 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-850">
                                    {orders.map((order) => {
                                        const product = order.products[0]?.productID;
                                        return (
                                            <tr key={order._id} className="hover:bg-slate-900/30 transition-all group">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        {product?.productImage ? (
                                                            <img 
                                                                src={product.productImage} 
                                                                alt={product.productName} 
                                                                className="w-10 h-10 object-cover rounded-lg bg-slate-950"
                                                                onError={(e) => {
                                                                    e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&auto=format&fit=crop&q=80";
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                                                                <Package className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                                                                {product?.productName || "Product Deleted"}
                                                            </span>
                                                            <span className="text-[10px] text-slate-500 block mt-0.5 line-clamp-1">
                                                                ID: {order._id}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center text-sm font-semibold text-slate-200">
                                                    {order.products[0]?.quantity || 1}
                                                </td>
                                                <td className="py-4 px-6 font-extrabold text-white text-sm">
                                                    ${(order.amount || 0).toFixed(2)}
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-400">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                                                        <span>{formatDate(order.createdAt)}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-400 space-y-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-slate-500 w-12 font-medium">Seller:</span>
                                                        <span className="text-slate-300 font-semibold">{order.sellerID?.name || "NovaMarket Seller"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-slate-500 w-12 font-medium">Buyer:</span>
                                                        <span className="text-slate-300">{order.customerID?.name || "Anonymous customer"}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5">
                                                        <CheckCircle className="w-3 h-3" />
                                                        <span>Completed</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile List View */}
                        <div className="block md:hidden divide-y divide-slate-850">
                            {orders.map((order) => {
                                const product = order.products[0]?.productID;
                                return (
                                    <div key={order._id} className="p-5 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-3">
                                                {product?.productImage ? (
                                                    <img 
                                                        src={product.productImage} 
                                                        alt={product.productName} 
                                                        className="w-12 h-12 object-cover rounded-lg bg-slate-950"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-slate-850 flex items-center justify-center text-slate-500">
                                                        <Package className="w-6 h-6" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-white text-sm">{product?.productName || "Product Deleted"}</h4>
                                                    <p className="text-[10px] text-slate-500 mt-0.5">ID: {order._id}</p>
                                                </div>
                                            </div>
                                            <span className="bg-emerald-950/85 text-emerald-400 border border-emerald-800/40 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                                                <CheckCircle className="w-2.5 h-2.5" />
                                                <span>Completed</span>
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-xs">
                                            <div>
                                                <span className="text-slate-500 block">Quantity</span>
                                                <span className="font-semibold text-slate-200">{order.products[0]?.quantity || 1} units</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">Total Amount</span>
                                                <span className="font-bold text-indigo-400">${(order.amount || 0).toFixed(2)}</span>
                                            </div>
                                            <div className="col-span-2 pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-400">
                                                <span>{formatDate(order.createdAt)}</span>
                                                <span>Buyer: {order.customerID?.name || "Guest"}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Order;