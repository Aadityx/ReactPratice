import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Shield, CheckCircle, AlertCircle, UserPlus, ArrowLeft } from "lucide-react";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer'); // Default to customer
    const [isRegistered, setRegistered] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = async () => {
        if (!name || !email || !password || !userType) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    userType
                })
            });

            const data = await response.json();

            if (response.ok) {
                setRegistered(true);
                setError('');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setRegistered(false);
                setError(data.message || 'Registration Failed');
            }
        } catch (error) {
            setError('Error occurred. Please verify your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
            {/* Background glowing blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-4 animate-bounce">
                        <UserPlus className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                    <p className="text-slate-400 text-sm mt-2">Get started with our e-commerce platform</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); register(); }} className="space-y-5">
                    {/* Name input */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300 block">Full Name</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                                <User className="w-4 h-4" />
                            </span>
                            <input 
                                type="text" 
                                placeholder="John Doe" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Email input */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300 block">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                                <Mail className="w-4 h-4" />
                            </span>
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Password input */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300 block">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* User Type Selection */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300 block">Choose Account Type</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                userType === 'customer' 
                                    ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 font-semibold' 
                                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-900/70'
                            }`}>
                                <input 
                                    type="radio" 
                                    name="userType" 
                                    value="customer" 
                                    checked={userType === 'customer'}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="sr-only"
                                />
                                <User className="w-4 h-4" />
                                <span className="text-sm">Customer</span>
                            </label>

                            <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                userType === 'seller' 
                                    ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 font-semibold' 
                                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-900/70'
                            }`}>
                                <input 
                                    type="radio" 
                                    name="userType" 
                                    value="seller" 
                                    checked={userType === 'seller'}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="sr-only"
                                />
                                <Shield className="w-4 h-4" />
                                <span className="text-sm">Seller</span>
                            </label>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 flex items-center gap-3 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {isRegistered && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-3 flex items-center gap-3 text-sm">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            <span>Account created successfully! Navigating...</span>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                        {loading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <UserPlus className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="flex flex-col items-center mt-6 space-y-4">
                    <Link to="/" className="text-slate-400 hover:text-slate-200 text-sm flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;