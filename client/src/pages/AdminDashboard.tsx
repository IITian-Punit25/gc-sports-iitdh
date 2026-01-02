import React from 'react';
import { Plus, Play, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data
const UPCOMING_MATCHES = [
    { id: '1', sport: 'Football', teamA: 'Hostel 1', teamB: 'Hostel 2', date: '2025-10-15', status: 'SCHEDULED' },
];

const LIVE_MATCHES = [
    { id: '2', sport: 'Basketball', teamA: 'Hostel 1', teamB: 'Hostel 3', status: 'LIVE' },
];

export default function AdminDashboard() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Match
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Live Matches Control */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                        <Play className="h-5 w-5 text-red-500 mr-2" />
                        Live Matches
                    </h2>
                    {LIVE_MATCHES.length > 0 ? (
                        <div className="space-y-4">
                            {LIVE_MATCHES.map((match) => (
                                <div key={match.id} className="border border-slate-200 rounded p-4 flex justify-between items-center">
                                    <div>
                                        <div className="font-semibold text-slate-900">{match.sport}</div>
                                        <div className="text-sm text-slate-600">{match.teamA} vs {match.teamB}</div>
                                    </div>
                                    <Link to={`/admin/live/${match.id}`} className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded text-sm font-medium transition-colors">
                                        Manage Live
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500">No live matches.</p>
                    )}
                </div>

                {/* Scheduled Matches */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                        <Edit className="h-5 w-5 text-indigo-500 mr-2" />
                        Manage Schedule
                    </h2>
                    <div className="space-y-4">
                        {UPCOMING_MATCHES.map((match) => (
                            <div key={match.id} className="border border-slate-200 rounded p-4 flex justify-between items-center">
                                <div>
                                    <div className="font-semibold text-slate-900">{match.sport}</div>
                                    <div className="text-sm text-slate-600">{match.teamA} vs {match.teamB}</div>
                                    <div className="text-xs text-slate-400">{match.date}</div>
                                </div>
                                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
