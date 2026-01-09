'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Users, Crown } from 'lucide-react';
import { io } from 'socket.io-client';

export default function TeamsPage() {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTeams = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/teams');
            const data = await res.json();
            setTeams(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching teams:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();

        const socket = io('http://localhost:5000');

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('dataUpdate', (data: { type: string }) => {
            if (data.type === 'teams') {
                console.log('Teams update received, refreshing data...');
                fetchTeams();
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 flex items-center justify-center">
                        <Users className="h-10 w-10 text-primary mr-4" />
                        Hostel Teams
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">All hostel members participating in GC 25-26</p>
                </div>

                {loading ? (
                    <div className="text-center text-slate-400 py-12">Loading teams...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all group"
                            >
                                <div className="bg-gradient-to-r from-primary/20 to-transparent px-8 py-6 border-b border-white/10">
                                    <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{team.name}</h2>
                                    <p className="text-slate-400 text-sm">{team.members.length} members</p>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {team.members.map((member: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                                            >
                                                <div>
                                                    <div className="font-bold text-slate-200 flex items-center gap-2">
                                                        {member.name}
                                                        {member.isCaptain && (
                                                            <Crown className="h-4 w-4 text-yellow-400" fill="currentColor" />
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                                                        {member.year} • {member.branch}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="border-t border-white/10 bg-black/50 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-500">© 2025-26 IIT Dharwad Sports Council</p>
                </div>
            </footer>
        </div>
    );
}
