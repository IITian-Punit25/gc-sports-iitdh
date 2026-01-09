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

const schedule = [
    { id: '1', sport: 'Cricket', teamA: 'Hostel 1', teamB: 'Hostel 2', date: '2025-10-15', time: '10:00 AM', venue: 'Main Ground', status: 'Upcoming' },
    { id: '2', sport: 'Football', teamA: 'Hostel 3', teamB: 'Hostel 4', date: '2025-10-16', time: '04:00 PM', venue: 'Football Field', status: 'Upcoming' },
    { id: '3', sport: 'Badminton', teamA: 'Hostel 1', teamB: 'Hostel 3', date: '2025-10-17', time: '09:00 AM', venue: 'Indoor Court', status: 'Upcoming' }
];

const results = [
    { id: '1', sport: 'Volleyball', teamA: 'Hostel 2', teamB: 'Hostel 4', scoreA: '2', scoreB: '1', winner: 'Hostel 2', date: '2025-10-10', liveLink: '' },
    { id: '2', sport: 'Basketball', teamA: 'Hostel 1', teamB: 'Hostel 3', scoreA: '45', scoreB: '40', winner: 'Hostel 1', date: '2025-10-12', liveLink: 'https://youtube.com/live/dummy' }
];

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
