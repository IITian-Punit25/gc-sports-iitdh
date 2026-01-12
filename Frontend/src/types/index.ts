export interface Team {
    id: string;
    name: string;
    members?: string[];
    captain?: string;
    logo?: string;
}

export interface Match {
    id: string;
    sport: string;
    category: string;
    teamA: string;
    teamB: string;
    date: string;
    time: string;
    venue: string;
    status?: 'Scheduled' | 'Live' | 'Completed';
}

export interface Result {
    id: string;
    sport: string;
    category: string;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    winner: string;
    date?: string;
    streamStatus?: 'Live' | 'Upcoming' | 'Ended';
    liveLink?: string;
}

export interface StandingEvent {
    id: string;
    sport: string;
    type: 'Standard' | 'Team' | 'Tug of War';
    category: string;
    results: {
        first: string;
        second: string;
        third: string;
        fourth: string;
    };
}

export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
    coordinators: Coordinator[];
}

export interface Coordinator {
    id: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    image?: string;
}

export interface GalleryItem {
    id: string;
    title: string;
    url: string;
    date?: string;
}
