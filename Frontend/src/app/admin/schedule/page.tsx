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

export default function ManageSchedule() {
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) router.push('/admin/login');

        fetch('http://localhost:5000/api/schedule')
            .then((res) => res.json())
            .then((data) => {
                setSchedule(data);
                setLoading(false);
            });
    }, [router]);

    const handleSave = async () => {
        await fetch('http://localhost:5000/api/schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schedule),
        });
        alert('Schedule saved successfully!');
    };

    const addMatch = () => {
        setSchedule([
            ...schedule,
            { id: Date.now().toString(), sport: 'Football', category: 'Men', teamA: '', teamB: '', date: '', time: '', venue: '' },
        ]);
    };

    const updateMatch = (index: number, field: string, value: string) => {
        const newSchedule = [...schedule];
        newSchedule[index][field] = value;
        setSchedule(newSchedule);
    };

    const removeMatch = (index: number) => {
        const newSchedule = [...schedule];
        newSchedule.splice(index, 1);
        setSchedule(newSchedule);
    };

    if (loading) return <div className="p-8 text-center text-slate-400">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Manage Schedule</h1>
                        <p className="text-slate-400">Create and edit match schedules</p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={addMatch}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl flex items-center transition-all border border-white/10"
                        >
                            <Plus className="h-5 w-5 mr-2" /> Add Match
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 rounded-xl flex items-center transition-all shadow-lg shadow-primary/20"
                        >
                            <Save className="h-5 w-5 mr-2" /> Save
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {schedule.map((match, index) => (
                        <div key={match.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-wrap gap-6 items-end hover:border-primary/30 transition-all">
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Sport</label>
                                <select
                                    value={match.sport}
                                    onChange={(e) => updateMatch(index, 'sport', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                                >
                                    {SPORTS.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                                </select>
                            </div>
                            <div className="flex-1 min-w-[120px]">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Category</label>
                                <select
                                    value={match.category || 'Men'}
                                    onChange={(e) => updateMatch(index, 'category', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Team A</label>
                                <input
                                    value={match.teamA}
                                    onChange={(e) => updateMatch(index, 'teamA', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Team Name"
                                />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Team B</label>
                                <input
                                    value={match.teamB}
                                    onChange={(e) => updateMatch(index, 'teamB', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Team Name"
                                />
                            </div>
                            <div className="flex-1 min-w-[120px]">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Date</label>
                                <input
                                    type="date"
                                    value={match.date}
                                    onChange={(e) => updateMatch(index, 'date', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex-1 min-w-[100px]">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Time</label>
                                <input
                                    type="time"
                                    value={match.time}
                                    onChange={(e) => updateMatch(index, 'time', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Venue</label>
                                <input
                                    value={match.venue}
                                    onChange={(e) => updateMatch(index, 'venue', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Venue"
                                />
                            </div>
                            <button
                                onClick={() => removeMatch(index)}
                                className="bg-red-500/10 text-red-500 p-3 rounded-xl hover:bg-red-500/20 border border-red-500/20 transition-all mb-[1px]"
                            >
                                <Trash className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
