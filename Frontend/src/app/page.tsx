import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Trophy, Calendar, Medal, Image as ImageIcon, Users } from 'lucide-react';
import Image from 'next/image';

const STANDINGS = [
  { id: '1', name: 'Hostel 1', points: 45, gold: 2, silver: 1, bronze: 3 },
  { id: '2', name: 'Hostel 3', points: 38, gold: 1, silver: 2, bronze: 2 },
  { id: '3', name: 'Hostel 2', points: 32, gold: 1, silver: 1, bronze: 2 },
  { id: '4', name: 'Hostel 4', points: 28, gold: 0, silver: 2, bronze: 3 },
];

const QUICK_LINKS = [
  { href: '/teams', label: 'View Teams', icon: Users },
  { href: '/schedule', label: 'Match Schedule', icon: Calendar },
  { href: '/results', label: 'Results', icon: Medal },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40 md:w-56 md:h-56 animate-float">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <Image
                src="/logo.png"
                alt="GC Logo"
                fill
                className="object-contain drop-shadow-2xl relative z-10"
                priority
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            General Championship <br />
            <span className="text-primary">2025-2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
            IIT Dharwad's Premier Inter-Hostel Sports Tournament
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-primary/80 to-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                <link.icon className="h-8 w-8 text-black" />
              </div>
              <span className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Standings Table */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Trophy className="h-6 w-6 text-primary mr-3" />
              GC Standings
            </h2>
            <div className="text-sm text-slate-400">Live Updates</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-slate-400 uppercase bg-white/5">
                <tr>
                  <th className="px-8 py-4 font-semibold tracking-wider">Rank</th>
                  <th className="px-8 py-4 font-semibold tracking-wider">Team</th>
                  <th className="px-8 py-4 text-center font-semibold tracking-wider">🥇 Gold</th>
                  <th className="px-8 py-4 text-center font-semibold tracking-wider">🥈 Silver</th>
                  <th className="px-8 py-4 text-center font-semibold tracking-wider">🥉 Bronze</th>
                  <th className="px-8 py-4 text-right font-semibold tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {STANDINGS.map((team, index) => (
                  <tr key={team.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 font-bold text-white text-lg">
                      {index === 0 ? <span className="text-3xl">🏆</span> :
                        index === 1 ? <span className="text-2xl text-slate-300">🥈</span> :
                          index === 2 ? <span className="text-2xl text-amber-700">🥉</span> :
                            <span className="text-slate-500">#{index + 1}</span>}
                    </td>
                    <td className="px-8 py-6 font-bold text-lg text-white group-hover:text-primary transition-colors">{team.name}</td>
                    <td className="px-8 py-6 text-center text-slate-300 font-medium">{team.gold}</td>
                    <td className="px-8 py-6 text-center text-slate-300 font-medium">{team.silver}</td>
                    <td className="px-8 py-6 text-center text-slate-300 font-medium">{team.bronze}</td>
                    <td className="px-8 py-6 text-right font-black text-2xl text-primary">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500">© 2025-26 IIT Dharwad Sports Council</p>
        </div>
      </footer>
    </div>
  );
}
