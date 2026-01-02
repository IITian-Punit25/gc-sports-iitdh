import React from 'react';

// Mock Data
const MATCHES = [
    { id: '1', sport: 'Football', gender: 'MEN', teamA: 'Hostel 1', teamB: 'Hostel 2', date: '2025-10-15', time: '17:00', status: 'SCHEDULED' },
    { id: '2', sport: 'Badminton', gender: 'WOMEN', teamA: 'House 1', teamB: 'House 2', date: '2025-10-15', time: '18:00', status: 'COMPLETED', scoreA: '2', scoreB: '1' },
    { id: '3', sport: 'Cricket', gender: 'MEN', teamA: 'Hostel 3', teamB: 'Hostel 4', date: '2025-10-16', time: '09:00', status: 'SCHEDULED' },
];

export default function MatchesPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Schedule & Results</h1>

                <div className="mt-4 md:mt-0 flex space-x-2">
                    <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All Sports</option>
                        <option>Football</option>
                        <option>Cricket</option>
                        <option>Badminton</option>
                    </select>
                    <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All Genders</option>
                        <option>Men</option>
                        <option>Women</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {MATCHES.map((match) => (
                        <div key={match.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex-1 mb-4 md:mb-0">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{match.sport}</span>
                                    <span className="text-xs text-slate-400">•</span>
                                    <span className="text-xs font-semibold text-slate-500 uppercase">{match.gender}</span>
                                </div>
                                <div className="text-sm text-slate-500">{match.date} at {match.time}</div>
                            </div>

                            <div className="flex-1 flex items-center justify-center md:justify-start space-x-8">
                                <div className={`text-lg font-semibold ${match.scoreA && Number(match.scoreA) > Number(match.scoreB) ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {match.teamA}
                                </div>
                                <div className="flex flex-col items-center">
                                    {match.status === 'COMPLETED' ? (
                                        <div className="bg-slate-100 px-3 py-1 rounded text-lg font-bold text-slate-800">
                                            {match.scoreA} - {match.scoreB}
                                        </div>
                                    ) : (
                                        <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">VS</div>
                                    )}
                                    <span className="text-[10px] uppercase mt-1 font-medium text-slate-400">{match.status}</span>
                                </div>
                                <div className={`text-lg font-semibold ${match.scoreB && Number(match.scoreB) > Number(match.scoreA) ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {match.teamB}
                                </div>
                            </div>

                            <div className="flex-1 flex justify-end">
                                {/* Placeholder for future actions */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
