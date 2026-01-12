import React, { useEffect, useState } from 'react';
import { Trophy, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data for Standings (keep for now)
const STANDINGS_DATA = [
    { id: '1', name: 'Hostel 1', points: 45.5, gold: 2, silver: 1, bronze: 3 },
    { id: '2', name: 'Hostel 2', points: 45.5, gold: 1, silver: 3, bronze: 0 },
    { id: '3', name: 'Hostel 3', points: 32.0, gold: 1, silver: 1, bronze: 2 },
];

const STANDINGS = [...STANDINGS_DATA].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gold !== a.gold) return b.gold - a.gold;
    if (b.silver !== a.silver) return b.silver - a.silver;
    return b.bronze - a.bronze;
});

interface Match {
    id: string;
    sport: string;
    teamA: string;
    teamB: string;
    date: string;
    time?: string;
    status: string;
}

export default function Dashboard() {
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

    useEffect(() => {
        fetch('/api/matches')
            .then(res => res.json())
            .then(data => setUpcomingMatches(data))
            .catch(err => console.error('Failed to fetch matches:', err));
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">General Championship 25-26</h1>
                <p className="text-slate-600 mt-2">Inter-Hostel Sports Tournament</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Standings Table */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                            GC Standings
                        </h2>
                        <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded">Live Updates</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Rank</th>
                                    <th className="px-6 py-3">Team</th>
                                    <th className="px-6 py-3 text-center">Gold</th>
                                    <th className="px-6 py-3 text-center">Silver</th>
                                    <th className="px-6 py-3 text-center">Bronze</th>
                                    <th className="px-6 py-3 text-right">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {STANDINGS.map((team, index) => (
                                    <tr key={team.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">#{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{team.name}</td>
                                        <td className="px-6 py-4 text-center text-slate-600">{team.gold}</td>
                                        <td className="px-6 py-4 text-center text-slate-600">{team.silver}</td>
                                        <td className="px-6 py-4 text-center text-slate-600">{team.bronze}</td>
                                        <td className="px-6 py-4 text-right font-bold text-indigo-600">{team.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Matches */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                                <Flame className="h-5 w-5 text-orange-500 mr-2" />
                                Upcoming Matches
                            </h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {upcomingMatches.map((match) => (
                                <div key={match.id} className="p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{match.sport}</span>
                                        <span className="text-xs text-slate-500">{match.date}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium text-slate-900">{match.teamA}</div>
                                        <div className="text-xs text-slate-400 px-2">VS</div>
                                        <div className="font-medium text-slate-900">{match.teamB}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
                            <Link to="/matches" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Full Schedule &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
