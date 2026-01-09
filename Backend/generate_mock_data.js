const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Mock Data
const branches = ['CSE', 'EE', 'ME', 'ECE', 'EEE', 'M&C', 'EP', 'C&IE', 'C&BE', 'BS-MS'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

const firstNames = [
    "Aarav", "Vihaan", "Aditya", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya",
    "Ananya", "Diya", "Saanvi", "Aadhya", "Pari", "Kiara", "Myra", "Riya", "Anika", "Navya",
    "Rohan", "Vikram", "Rahul", "Neha", "Sneha", "Priya", "Amit", "Suresh", "Kavya", "Rohit"
];

const lastNames = [
    "Sharma", "Verma", "Gupta", "Malhotra", "Bhat", "Patel", "Reddy", "Nair", "Iyer", "Singh",
    "Kumar", "Das", "Roy", "Chopra", "Desai", "Joshi", "Mehta", "Jain", "Saxena", "Tiwari"
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateName = () => `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;

const generateMembers = (count) => {
    const members = [];
    for (let i = 1; i <= count; i++) {
        members.push({
            name: generateName(),
            year: getRandomElement(years),
            branch: getRandomElement(branches),
            isCaptain: i === 1 // First member is captain
        });
    }
    return members;
};

const teams = [
    { id: '1', name: 'Hostel 1', members: generateMembers(8) },
    { id: '2', name: 'Hostel 2', members: generateMembers(8) },
    { id: '3', name: 'Hostel 3', members: generateMembers(7) },
    { id: '4', name: 'Hostel 4', members: generateMembers(7) }
];

const sports = ['Cricket', 'Football', 'Badminton', 'Volleyball', 'Basketball', 'Table Tennis', 'Chess', 'Athletics', 'Squash', 'Tennis'];
const venues = ['Main Ground', 'Football Field', 'Indoor Court', 'Volleyball Court', 'Basketball Court', 'TT Hall', 'Chess Room', 'Athletics Track', 'Squash Court', 'Tennis Court'];

const generateSchedule = (count) => {
    const schedule = [];
    const startDate = new Date('2025-10-15');

    for (let i = 1; i <= count; i++) {
        const sportIndex = Math.floor(Math.random() * sports.length);
        const sport = sports[sportIndex];
        const venue = venues[sportIndex];

        let teamAIndex = Math.floor(Math.random() * 4);
        let teamBIndex = Math.floor(Math.random() * 4);
        while (teamAIndex === teamBIndex) {
            teamBIndex = Math.floor(Math.random() * 4);
        }
        const teamA = `Hostel ${teamAIndex + 1}`;
        const teamB = `Hostel ${teamBIndex + 1}`;

        const date = new Date(startDate);
        date.setDate(startDate.getDate() + Math.floor(Math.random() * 14));
        const dateString = date.toISOString().split('T')[0];

        const hour = 9 + Math.floor(Math.random() * 8);
        const minute = Math.random() < 0.5 ? '00' : '30';
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        const time = `${displayHour}:${minute} ${ampm}`;

        schedule.push({
            id: i.toString(),
            sport,
            teamA,
            teamB,
            date: dateString,
            time,
            venue,
            status: 'Upcoming'
        });
    }
    return schedule;
};

const schedule = generateSchedule(25);

const generateResults = (count) => {
    const results = [];
    const startDate = new Date('2025-10-01');

    for (let i = 1; i <= count; i++) {
        const sportIndex = Math.floor(Math.random() * sports.length);
        const sport = sports[sportIndex];

        let teamAIndex = Math.floor(Math.random() * 4);
        let teamBIndex = Math.floor(Math.random() * 4);
        while (teamAIndex === teamBIndex) {
            teamBIndex = Math.floor(Math.random() * 4);
        }
        const teamA = `Hostel ${teamAIndex + 1}`;
        const teamB = `Hostel ${teamBIndex + 1}`;

        const date = new Date(startDate);
        date.setDate(startDate.getDate() + Math.floor(Math.random() * 10));
        const dateString = date.toISOString().split('T')[0];

        let scoreA, scoreB;
        if (['Cricket', 'Basketball'].includes(sport)) {
            scoreA = Math.floor(Math.random() * 100) + 50;
            scoreB = Math.floor(Math.random() * 100) + 50;
        } else if (['Football', 'Volleyball', 'Tennis', 'Badminton', 'Table Tennis', 'Squash'].includes(sport)) {
            scoreA = Math.floor(Math.random() * 5);
            scoreB = Math.floor(Math.random() * 5);
        } else {
            scoreA = Math.floor(Math.random() * 10);
            scoreB = Math.floor(Math.random() * 10);
        }

        const winner = scoreA > scoreB ? teamA : scoreB > scoreA ? teamB : 'Draw';

        results.push({
            id: i.toString(),
            sport,
            teamA,
            teamB,
            scoreA: scoreA.toString(),
            scoreB: scoreB.toString(),
            winner,
            date: dateString,
            liveLink: '',
            streamStatus: 'Ended'
        });
    }
    return results;
};

const results = generateResults(20);

const standings = [
    {
        id: '1',
        sport: 'Cricket',
        type: 'Team',
        results: { first: 'Hostel 1', second: 'Hostel 2', third: 'Hostel 3', fourth: 'Hostel 4' }
    },
    {
        id: '2',
        sport: '100m Sprint',
        type: 'Standard',
        results: { first: 'Hostel 3', second: 'Hostel 1', third: 'Hostel 4', fourth: 'Hostel 2' }
    },
    {
        id: '3',
        sport: 'Yoga',
        type: 'Yoga',
        results: { first: 'Hostel 2', second: 'Hostel 4', third: 'Hostel 1', fourth: '' }
    }
];

// Write to files
fs.writeFileSync(path.join(dataDir, 'teams.json'), JSON.stringify(teams, null, 2));
fs.writeFileSync(path.join(dataDir, 'schedule.json'), JSON.stringify(schedule, null, 2));
fs.writeFileSync(path.join(dataDir, 'results.json'), JSON.stringify(results, null, 2));
fs.writeFileSync(path.join(dataDir, 'standings.json'), JSON.stringify(standings, null, 2));

console.log('Mock data generated successfully!');
