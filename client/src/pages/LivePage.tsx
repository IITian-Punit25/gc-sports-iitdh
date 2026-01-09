import React from 'react';
import { Video } from 'lucide-react';

// Mock Live Data
const LIVE_MATCH = {
    id: '1',
    sport: 'Basketball',
    gender: 'MEN',
    teamA: 'Hostel 1',
    teamB: 'Hostel 3',
    scoreA: 45,
    scoreB: 42,
    quarter: 'Q3',
    time: '04:23',
    stream_link: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
};

export default function LivePage() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex items-center space-x-3">
                <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Live Match Center</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Live Match */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        {/* Scoreboard Header */}
                        <div className="bg-slate-900 text-white p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">{LIVE_MATCH.sport} • {LIVE_MATCH.gender}</span>
                                <span className="px-2 py-1 bg-red-600 text-xs font-bold rounded animate-pulse">LIVE</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-center flex-1">
                                    <h2 className="text-2xl font-bold mb-1">{LIVE_MATCH.teamA}</h2>
                                    <div className="text-5xl font-black text-white">{LIVE_MATCH.scoreA}</div>
                                </div>

                                <div className="text-center px-4">
                                    <div className="text-sm text-slate-400 font-mono mb-1">{LIVE_MATCH.quarter}</div>
                                    <div className="text-xl font-bold text-yellow-400">{LIVE_MATCH.time}</div>
                                </div>

                                <div className="text-center flex-1">
                                    <h2 className="text-2xl font-bold mb-1">{LIVE_MATCH.teamB}</h2>
                                    <div className="text-5xl font-black text-white">{LIVE_MATCH.scoreB}</div>
                                </div>
                            </div>
                        </div>

                        {/* Stream Embed */}
                        <div className="aspect-video bg-black relative">
                            {LIVE_MATCH.stream_link ? (
                                <iframe
                                    src={LIVE_MATCH.stream_link}
                                    className="w-full h-full"
                                    allowFullScreen
                                    title="Live Stream"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500">
                                    <Video className="h-12 w-12 mb-2 opacity-50" />
                                    <p>Stream waiting to start...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Other Live / Recent */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700">Other Matches</h3>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-center py-8">No other live matches right now.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
