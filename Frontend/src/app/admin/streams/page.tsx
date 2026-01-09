'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Save, Play, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ManageStreams() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) router.push('/admin/login');

        fetch('http://localhost:5000/api/results')
            .then((res) => res.json())
            .then((data) => {
                setResults(data);
                setLoading(false);
            });
    }, [router]);

    const handleSave = async () => {
        await fetch('http://localhost:5000/api/results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(results),
        });
        alert('Streams saved successfully!');
    };

    const updateLiveLink = (index: number, field: string, value: string) => {
        const newResults = [...results];
        newResults[index][field] = value;
        setResults(newResults);
    };

    if (loading) return <div className="p-8 text-center text-slate-400">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Manage Streams</h1>
                        <p className="text-slate-400">Add or update live stream links for matches</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 rounded-xl flex items-center transition-all shadow-lg shadow-primary/20"
                    >
                        <Save className="h-5 w-5 mr-2" />
                        Save Changes
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {results.map((match, index) => (
                        <div key={match.id || index} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded uppercase">{match.sport}</span>
                                    <span className="text-slate-400 text-sm">{match.date}</span>
                                </div>
                                <div className="text-xl font-bold text-white">
                                    {match.teamA} <span className="text-slate-500 mx-2">vs</span> {match.teamB}
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 space-y-4">
                                <div>
                                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block flex items-center">
                                        <Play className="h-3 w-3 mr-1" /> Live Stream URL
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LinkIcon className="h-4 w-4 text-slate-500" />
                                        </div>
                                        <input
                                            value={match.liveLink || ''}
                                            onChange={(e) => updateLiveLink(index, 'liveLink', e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                            placeholder="https://youtube.com/..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">
                                        Stream Status
                                    </label>
                                    <select
                                        value={match.streamStatus || 'Ended'}
                                        onChange={(e) => updateLiveLink(index, 'streamStatus', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="Ended" className="bg-black">Ended / Not Live</option>
                                        <option value="Live" className="bg-black">Live Now</option>
                                        <option value="Upcoming" className="bg-black">Starting Soon</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                    {results.length === 0 && (
                        <div className="text-center py-12 text-slate-500 bg-white/5 rounded-2xl border border-white/10">
                            No matches found in results. Add matches in "Manage Results" first.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
