'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Medal, Trophy } from 'lucide-react';

export default function ResultsPage() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [standings, setStandings] = useState<any[]>([]);

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:5000/api/results').then(res => res.json()),
            fetch('http://localhost:5000/api/standings').then(res => res.json())
        ]).then(([resultsData, standingsData]) => {
            setResults(resultsData);
            setStandings(calculateStandings(standingsData));
            setLoading(false);
        }).catch((err) => {
            console.error('Error fetching data:', err);
            setLoading(false);
        });
    }, []);

    const calculateStandings = (events: any[]) => {
        const scores: any = {};
        // Initialize scores for known hostels (assuming 4 hostels)
        ['Hostel 1', 'Hostel 2', 'Hostel 3', 'Hostel 4'].forEach(h => {
            scores[h] = { name: h, points: 0, gold: 0, silver: 0, bronze: 0 };
        });

        events.forEach(event => {
            const { type, results } = event;
            let pointsMap = { first: 0, second: 0, third: 0, fourth: 0 };

            if (type === 'Standard') pointsMap = { first: 20, second: 12, third: 8, fourth: 4 };
            else if (type === 'Team') pointsMap = { first: 10, second: 6, third: 4, fourth: 2 };
            else if (type === 'Yoga') pointsMap = { first: 5, second: 3, third: 2, fourth: 0 };

            // Assign points
            if (results.first && scores[results.first]) {
                scores[results.first].points += pointsMap.first;
                scores[results.first].gold += 1;
            }
            if (results.second && scores[results.second]) {
                scores[results.second].points += pointsMap.second;
                scores[results.second].silver += 1;
            }
            if (results.third && scores[results.third]) {
                scores[results.third].points += pointsMap.third;
                scores[results.third].bronze += 1;
            }
            if (results.fourth && scores[results.fourth]) {
                scores[results.fourth].points += pointsMap.fourth;
            }
        });

        return Object.values(scores).sort((a: any, b: any) => {
            if (b.points !== a.points) return b.points - a.points;
            return b.gold - a.gold; // Tie-breaker: Gold medals
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 flex items-center justify-center">
                        <Medal className="h-10 w-10 text-primary mr-4" />
                        Results & Standings
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Match results and leaderboard</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Results */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Trophy className="h-6 w-6 text-primary mr-2" />
                            Recent Results
                        </h2>
                        {loading ? (
                            <div className="text-center py-12 text-slate-500">Loading results...</div>
                        ) : results.length === 0 ? (
                            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-slate-400">No results found yet.</p>
                            </div>
                        ) : (
                            results.map((result: any) => (
                                <div
                                    key={result.id}
                                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-primary/50 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase border border-primary/20">
                                            {result.sport} <span className="text-slate-500 ml-1">• {result.category || 'Men'}</span>
                                        </span>
                                        <span className="text-sm text-slate-400">{result.date}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className={`text-xl font-bold ${result.winner === result.teamA ? 'text-primary' : 'text-slate-400'} flex items-center`}>
                                            {result.teamA}
                                            {result.winner === result.teamA && <Trophy className="inline h-5 w-5 ml-2 text-primary" />}
                                        </div>
                                        <div className="text-3xl font-black text-white bg-black/30 px-6 py-3 rounded-xl border border-white/5">
                                            {result.scoreA} - {result.scoreB}
                                        </div>
                                        <div className={`text-xl font-bold ${result.winner === result.teamB ? 'text-primary' : 'text-slate-400'} flex items-center`}>
                                            {result.winner === result.teamB && <Trophy className="inline h-5 w-5 mr-2 text-primary" />}
                                            {result.teamB}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Standings */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Medal className="h-6 w-6 text-primary mr-2" />
                            GC Standings
                        </h2>
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">
                            {standings.map((team, idx) => (
                                <div
                                    key={team.name}
                                    className={`flex items-center justify-between p-6 ${idx !== standings.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors`}
                                >
                                    <div className="flex items-center">
                                        <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${idx === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                                            idx === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/50' :
                                                idx === 2 ? 'bg-amber-700/20 text-amber-700 border border-amber-700/50' :
                                                    'bg-slate-700/50 text-slate-500 border border-slate-600/50'
                                            }`}>
                                            {idx + 1}
                                        </span>
                                        <span className="font-bold text-lg text-white">{team.name}</span>
                                    </div>
                                    <span className="font-black text-2xl text-primary">{team.points} <span className="text-xs font-normal text-slate-500">pts</span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/10 bg-black/50 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-500">© 2025-26 IIT Dharwad Sports Council</p>
                </div>
            </footer>
        </div>
    );
}
