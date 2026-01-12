import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Video, FileText, Shield } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Trophy className="h-8 w-8 text-yellow-400" />
                            <span className="font-bold text-xl tracking-tight">IIT Dh Sports GC</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Dashboard
                            </Link>
                            <Link to="/matches" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Matches</span>
                            </Link>
                            <Link to="/live" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
                                <Video className="h-4 w-4 text-red-500" />
                                <span>Live Center</span>
                            </Link>
                            <Link to="/rules" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
                                <FileText className="h-4 w-4" />
                                <span>Rules</span>
                            </Link>
                            <Link to="/admin" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 text-slate-400">
                                <Shield className="h-4 w-4" />
                                <span>Admin</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
