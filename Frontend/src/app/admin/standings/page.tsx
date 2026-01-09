'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Save, Plus, Trash, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ManageStandings() {
    const [standings, setStandings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) router.push('/admin/login');

        Promise.all([
            fetch('http://localhost:5000/api/standings').then(res => res.json()),
            fetch('http://localhost:5000/api/teams').then(res => res.json())
        ]).then(([standingsData, teamsData]) => {
            setStandings(standingsData);
            setTeams(teamsData);
            setLoading(false);
        }).catch((err) => {
            console.error("Failed to fetch data:", err);
            setLoading(false);
            alert("Failed to load data. Ensure backend is running.");
        });
    }, [router]);

    const handleSave = async () => {
        await fetch('http://localhost:5000/api/standings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(standings),
        });
        alert('Standings saved successfully!');
    };

    const addEvent = () => {
        setStandings([
            ...standings,
            {
                id: Date.now().toString(),
                sport: '',
                type: 'Team', // Standard, Team, Yoga
                results: { first: '', second: '', third: '', fourth: '' }
            },
        ]);
    };

    const updateEvent = (index: number, field: string, value: any) => {
        const newStandings = [...standings];
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            newStandings[index][parent][child] = value;
        } else {
            newStandings[index][field] = value;
        }
        setStandings(newStandings);
    };

    const removeEvent = (index: number) => {
        if (confirm('Delete this event?')) {
            const newStandings = [...standings];
            newStandings.splice(index, 1);
            setStandings(newStandings);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-400">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Manage Standings</h1>
                        <p className="text-slate-400">Enter final results for GC Points Calculation</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={addEvent}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl flex items-center transition-all border border-white/10"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Add Event
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 rounded-xl flex items-center transition-all shadow-lg shadow-primary/20"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {standings.map((event, index) => (
                        <div key={event.id || index} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                <div className="md:col-span-3 space-y-2">
                                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sport Name</label>
                                    <input
                                        value={event.sport}
                                        onChange={(e) => updateEvent(index, 'sport', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        placeholder="e.g. Cricket"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Type</label>
                                    <select
                                        value={event.type}
                                        onChange={(e) => updateEvent(index, 'type', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="Team">Team Sport</option>
                                        <option value="Standard">Standard (Athletics)</option>
                                        <option value="Yoga">Yoga</option>
                                    </select>
                                </div>

                                <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {['first', 'second', 'third', 'fourth'].map((pos, i) => (
                                        <div key={pos} className="space-y-2">
                                            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                                {i === 0 && <Trophy className="h-3 w-3 text-yellow-400" />}
                                                {i === 1 && <Trophy className="h-3 w-3 text-slate-400" />}
                                                {i === 2 && <Trophy className="h-3 w-3 text-amber-700" />}
                                                {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}
                                            </label>
                                            <select
                                                value={event.results[pos]}
                                                onChange={(e) => updateEvent(index, `results.${pos}`, e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-primary focus:outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="">Select</option>
                                                {teams.map(t => (
                                                    <option key={t.id} value={t.name}>{t.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>

                                <div className="md:col-span-1 flex justify-end pb-2">
                                    <button
                                        onClick={() => removeEvent(index)}
                                        className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {standings.length === 0 && (
                        <div className="text-center py-12 text-slate-500 bg-white/5 rounded-2xl border border-white/10">
                            No events added. Click "Add Event" to start.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
