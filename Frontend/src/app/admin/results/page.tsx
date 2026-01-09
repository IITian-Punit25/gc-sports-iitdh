'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Save, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SPORTS = [
    'Athletics',
    'Badminton',
    'Basketball',
    'Chess',
    'Cricket',
    'Football',
    'Squash',
    'Table Tennis',
    'Volleyball',
    'Weightlifting',
    'Powerlifting',
    'Yoga'
];

const CATEGORIES = ['Men', 'Women', 'Mixed'];

export default function ManageResults() {
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
        alert('Results published successfully!');
    };

    const addResult = () => {
        setResults([
            ...results,
            { id: Date.now().toString(), sport: 'Football', category: 'Men', teamA: '', teamB: '', scoreA: 0, scoreB: 0, winner: '', date: '', liveLink: '' },
        ]);
    };

    const updateResult = (index: number, field: string, value: string | number) => {
        const newResults = [...results];
        newResults[index][field] = value;
        setResults(newResults);
    };

    const removeResult = (index: number) => {
        const newResults = [...results];
        newResults.splice(index, 1);
        setResults(newResults);
    };

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-slate-400">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Manage Results</h1>
                        <p className="text-slate-400">Add, edit, and publish match results</p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={addResult}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl flex items-center transition-all border border-white/10"
                        >
                            <Plus className="h-5 w-5 mr-2" /> Add Result
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 rounded-xl flex items-center transition-all shadow-lg shadow-primary/20"
                        >
                            <Save className="h-5 w-5 mr-2" /> Publish Live
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {results.map((result, index) => (
                        <div key={result.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col gap-6 relative group hover:border-white/20 transition-colors">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Sport</label>
                                    <select
                                        value={result.sport}
                                        onChange={(e) => updateResult(index, 'sport', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                                    >
                                        {SPORTS.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Category</label>
                                    <select
                                        value={result.category || 'Men'}
                                        onChange={(e) => updateResult(index, 'category', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                                    >
                                        {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Date</label>
                                    <input
                                        type="date"
                                        value={result.date}
                                        onChange={(e) => updateResult(index, 'date', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Live Stream Link</label>
                                    <input
                                        value={result.liveLink || ''}
                                        onChange={(e) => updateResult(index, 'liveLink', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                <div className="flex-1">
                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Team A</label>
                                    <input
                                        value={result.teamA}
                                        onChange={(e) => updateResult(index, 'teamA', e.target.value)}
                                        className="w-full bg-transparent border-b border-white/10 p-2 text-white focus:border-primary focus:outline-none transition-colors text-lg font-medium"
                                        placeholder="Team Name"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        value={result.scoreA}
                                        onChange={(e) => updateResult(index, 'scoreA', parseInt(e.target.value))}
                                        className="w-16 bg-black/40 border border-white/10 rounded-lg p-2 text-center text-2xl font-bold text-white focus:border-primary focus:outline-none"
                                    />
                                    <span className="text-slate-500 font-bold">-</span>
                                    <input
                                        type="number"
                                        value={result.scoreB}
                                        onChange={(e) => updateResult(index, 'scoreB', parseInt(e.target.value))}
                                        className="w-16 bg-black/40 border border-white/10 rounded-lg p-2 text-center text-2xl font-bold text-white focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div className="flex-1 text-right">
                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Team B</label>
                                    <input
                                        value={result.teamB}
                                        onChange={(e) => updateResult(index, 'teamB', e.target.value)}
                                        className="w-full bg-transparent border-b border-white/10 p-2 text-white focus:border-primary focus:outline-none transition-colors text-lg font-medium text-right"
                                        placeholder="Team Name"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex-1 max-w-xs">
                                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Winner</label>
                                    <input
                                        value={result.winner}
                                        onChange={(e) => updateResult(index, 'winner', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                        placeholder="Winning Team"
                                    />
                                </div>
                                <button
                                    onClick={() => removeResult(index)}
                                    className="p-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                    title="Remove Result"
                                >
                                    <Trash className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
