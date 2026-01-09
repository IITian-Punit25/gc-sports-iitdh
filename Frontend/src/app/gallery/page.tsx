'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Image } from 'lucide-react';
import { io } from 'socket.io-client';

export default function GalleryPage() {
    const [gallery, setGallery] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchGallery = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/gallery');
            const data = await res.json();
            setGallery(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching gallery:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();

        const socket = io('http://localhost:5000');

        socket.on('dataUpdate', (data: { type: string }) => {
            if (data.type === 'gallery') {
                console.log('Gallery update received, refreshing data...');
                fetchGallery();
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
                        <Image className="h-10 w-10 text-primary mr-4" />
                        Gallery
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Photos from GC 25-26 events</p>
                </div>

                {loading ? (
                    <div className="text-center text-slate-400 py-12">Loading gallery...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gallery.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden group cursor-pointer hover:border-primary/50 transition-all"
                            >
                                <div className="aspect-video overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{item.title}</h3>
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
