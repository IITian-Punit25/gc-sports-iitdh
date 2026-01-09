'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Save, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ManageTeams() {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) router.push('/admin/login');

        fetch('http://localhost:5000/api/teams')
            .then((res) => res.json())
            .then((data) => {
                setTeams(data);
                setLoading(false);
            });
    }, [router]);

    const handleSave = async () => {
        await fetch('http://localhost:5000/api/teams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teams),
        });
        alert('Teams saved successfully!');
    };

    const updateTeamName = (index: number, name: string) => {
        const newTeams = [...teams];
        newTeams[index].name = name;
        setTeams(newTeams);
    };

    const addMember = (teamIndex: number) => {
        const newTeams = [...teams];
        newTeams[teamIndex].members.push({ name: '', year: '', branch: '' });
        setTeams(newTeams);
    };

    const updateMember = (teamIndex: number, memberIndex: number, field: string, value: string) => {
        const newTeams = [...teams];
        newTeams[teamIndex].members[memberIndex][field] = value;
        setTeams(newTeams);
    };

    const removeMember = (teamIndex: number, memberIndex: number) => {
        const newTeams = [...teams];
        newTeams[teamIndex].members.splice(memberIndex, 1);
        setTeams(newTeams);
    };

    if (loading) return <div className="p-8 text-center text-slate-400">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Manage Teams</h1>
                        <p className="text-slate-400">Add or edit hostel teams and members</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 rounded-xl flex items-center transition-all shadow-lg shadow-primary/20"
                    >
                        <Save className="h-5 w-5 mr-2" />
                        Save Changes
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teams.map((team, teamIndex) => (
                        <div key={team.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all">
                            <input
                                value={team.name}
                                onChange={(e) => updateTeamName(teamIndex, e.target.value)}
                                className="text-2xl font-bold mb-6 bg-transparent border-b border-white/10 w-full focus:outline-none focus:border-primary text-white pb-2"
                                placeholder="Team Name"
                            />

                            <div className="space-y-3">
                                {team.members.map((member: any, memberIndex: number) => (
                                    <div key={memberIndex} className="flex gap-3 items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                        <input
                                            placeholder="Name"
                                            value={member.name}
                                            onChange={(e) => updateMember(teamIndex, memberIndex, 'name', e.target.value)}
                                            className="flex-1 bg-transparent border-b border-white/10 focus:border-primary focus:outline-none text-slate-200 text-sm pb-1"
                                        />
                                        <input
                                            placeholder="Year"
                                            value={member.year}
                                            onChange={(e) => updateMember(teamIndex, memberIndex, 'year', e.target.value)}
                                            className="w-20 bg-transparent border-b border-white/10 focus:border-primary focus:outline-none text-slate-400 text-sm pb-1"
                                        />
                                        <input
                                            placeholder="Branch"
                                            value={member.branch}
                                            onChange={(e) => updateMember(teamIndex, memberIndex, 'branch', e.target.value)}
                                            className="w-20 bg-transparent border-b border-white/10 focus:border-primary focus:outline-none text-slate-400 text-sm pb-1"
                                        />
                                        <button
                                            onClick={() => removeMember(teamIndex, memberIndex)}
                                            className="text-red-500 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-colors"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addMember(teamIndex)}
                                    className="w-full py-3 rounded-xl border border-dashed border-white/20 text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center text-sm font-bold mt-4"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Member
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
