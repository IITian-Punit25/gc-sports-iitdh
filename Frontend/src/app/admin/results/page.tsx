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
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedResultId, setSelectedResultId] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) router.push('/admin/login');

        const fetchData = async () => {
            try {
                const [resultsRes, teamsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/results'),
                    fetch('http://localhost:5000/api/teams')
                ]);

                const resultsData = await resultsRes.json();
                const teamsData = await teamsRes.json();

                setResults(resultsData);
                setTeams(teamsData);
                if (resultsData.length > 0) {
                    setSelectedResultId(resultsData[0].id);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleSave = async () => {
        for (const result of results) {
            if (!result.teamA || !result.teamB) {
                alert("Both Team A and Team B must be selected for all matches.");
                return;
            }
            if (result.teamA === result.teamB) {
                alert("Team A and Team B cannot be the same.");
                return;
            }
            if (result.scoreA < 0 || result.scoreB < 0) {
                alert("Scores cannot be negative.");
                return;
            }
            if (!result.winner) {
                alert("Please select a Winner (or Draw) for all matches.");
                return;
            }
        }

        await fetch('http://localhost:5000/api/results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(results),
        });
        alert('Results published successfully!');
    };

    const addResult = () => {
        const newId = Date.now().toString();
        const newResult = {
            id: newId,
            sport: 'Football',
            category: 'Men',
            teamA: teams[0]?.name || '',
            teamB: teams[1]?.name || '',
            scoreA: 0,
            scoreB: 0,
            winner: '',
            date: '',
            liveLink: ''
        };

        setResults([newResult, ...results]);
        setSelectedResultId(newId);
    };

    const updateResult = (index: number, field: string, value: string | number) => {
        const newResults = [...results];
        newResults[index][field] = value;
        setResults(newResults);
    };

    const removeResult = (index: number) => {
        if (confirm('Are you sure you want to delete this result?')) {
            const newResults = [...results];
            newResults.splice(index, 1);
            setResults(newResults);
            if (newResults.length > 0) {
                setSelectedResultId(newResults[0].id);
            } else {
                setSelectedResultId("");
            }
        }
    };

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-slate-400">Loading...</div>;

    const selectedResultIndex = results.findIndex(r => r.id === selectedResultId);
    const selectedResult = results[selectedResultIndex];

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

                {/* Result Selection Dropdown */}
                <div className="mb-8">
                    <label className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2 block">Select Match to Edit</label>
                    <select
                        value={selectedResultId}
                        onChange={(e) => setSelectedResultId(e.target.value)}
                        className="w-full md:w-1/3 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none appearance-none cursor-pointer text-lg font-medium"
                    >
                        <option value="" disabled>Select a Match</option>
                        {results.map(result => (
                            <option key={result.id} value={result.id} className="bg-slate-900">
                                {result.sport} - {result.teamA} vs {result.teamB}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedResult ? (
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col gap-6 relative group hover:border-white/20 transition-colors">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Sport</label>
                                <select
                                    value={selectedResult.sport}
                                    onChange={(e) => updateResult(selectedResultIndex, 'sport', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                                >
                                    {SPORTS.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Category</label>
                                <select
                                    value={selectedResult.category || 'Men'}
                                    onChange={(e) => updateResult(selectedResultIndex, 'category', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Date</label>
                                <input
                                    type="date"
                                    value={selectedResult.date}
                                    onChange={(e) => updateResult(selectedResultIndex, 'date', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="lg:col-span-1">
                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Live Stream Link</label>
                                <input
                                    value={selectedResult.liveLink || ''}
                                    onChange={(e) => updateResult(selectedResultIndex, 'liveLink', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Team A</label>
                                <select
                                    value={selectedResult.teamA}
                                    onChange={(e) => updateResult(selectedResultIndex, 'teamA', e.target.value)}
                                    className="w-full bg-transparent border-b border-white/10 p-2 text-white focus:border-primary focus:outline-none transition-colors text-lg font-medium appearance-none"
                                >
                                    <option value="" className="bg-slate-900">Select Team</option>
                                    {teams.map(t => <option key={t.id} value={t.name} className="bg-slate-900">{t.name}</option>)}
                                </select>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    value={selectedResult.scoreA}
                                    onChange={(e) => updateResult(selectedResultIndex, 'scoreA', parseInt(e.target.value))}
                                    className="w-16 bg-black/40 border border-white/10 rounded-lg p-2 text-center text-2xl font-bold text-white focus:border-primary focus:outline-none"
                                />
                                <span className="text-slate-500 font-bold">-</span>
                                <input
                                    type="number"
                                    value={selectedResult.scoreB}
                                    onChange={(e) => updateResult(selectedResultIndex, 'scoreB', parseInt(e.target.value))}
                                    className="w-16 bg-black/40 border border-white/10 rounded-lg p-2 text-center text-2xl font-bold text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex-1 text-right">
                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Team B</label>
                                <select
                                    value={selectedResult.teamB}
                                    onChange={(e) => updateResult(selectedResultIndex, 'teamB', e.target.value)}
                                    className="w-full bg-transparent border-b border-white/10 p-2 text-white focus:border-primary focus:outline-none transition-colors text-lg font-medium text-right appearance-none"
                                    dir="rtl"
                                >
                                    <option value="" className="bg-slate-900">Select Team</option>
                                    {teams.map(t => <option key={t.id} value={t.name} className="bg-slate-900">{t.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="flex-1 max-w-xs">
                                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Winner</label>
                                <select
                                    value={selectedResult.winner}
                                    onChange={(e) => updateResult(selectedResultIndex, 'winner', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                                >
                                    <option value="" className="bg-slate-900">Select Winner</option>
                                    <option value="Draw" className="bg-slate-900">Draw</option>
                                    {selectedResult.teamA && <option value={selectedResult.teamA} className="bg-slate-900">{selectedResult.teamA}</option>}
                                    {selectedResult.teamB && <option value={selectedResult.teamB} className="bg-slate-900">{selectedResult.teamB}</option>}
                                </select>
                            </div>
                            <button
                                onClick={() => removeResult(selectedResultIndex)}
                                className="p-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2"
                                title="Remove Result"
                            >
                                <Trash className="h-5 w-5" /> Delete Result
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500 bg-white/5 rounded-2xl border border-white/10">
                        {results.length === 0 ? "No results found. Click 'Add Result' to start." : "Select a match from the dropdown to edit."}
                    </div>
                )}
            </main>
        </div>
    );
}
