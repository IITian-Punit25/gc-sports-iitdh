const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow frontend to connect
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Load data files
const loadData = (filename) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', filename), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
    }
};

// Save data files
const saveData = (filename, data) => {
    try {
        fs.writeFileSync(path.join(__dirname, 'data', filename), JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error saving ${filename}:`, error);
        return false;
    }
};

// API Routes
app.get('/api/teams', (req, res) => {
    const teams = loadData('teams.json');
    res.json(teams);
});

app.post('/api/teams', (req, res) => {
    if (saveData('teams.json', req.body)) {
        io.emit('dataUpdate', { type: 'teams' }); // Notify clients
        res.json({ success: true, message: 'Teams saved successfully' });
    } else {
        res.status(500).json({ success: false, message: 'Error saving teams' });
    }
});

app.get('/api/schedule', (req, res) => {
    const schedule = loadData('schedule.json');
    res.json(schedule);
});

app.post('/api/schedule', (req, res) => {
    if (saveData('schedule.json', req.body)) {
        io.emit('dataUpdate', { type: 'schedule' }); // Notify clients
        res.json({ success: true, message: 'Schedule saved successfully' });
    } else {
        res.status(500).json({ success: false, message: 'Error saving schedule' });
    }
});

app.get('/api/results', (req, res) => {
    const results = loadData('results.json');
    res.json(results);
});

app.post('/api/results', (req, res) => {
    if (saveData('results.json', req.body)) {
        io.emit('dataUpdate', { type: 'results' }); // Notify clients
        res.json({ success: true, message: 'Results saved successfully' });
    } else {
        res.status(500).json({ success: false, message: 'Error saving results' });
    }
});

app.get('/api/gallery', (req, res) => {
    const gallery = loadData('gallery.json');
    res.json(gallery);
});

app.post('/api/gallery', (req, res) => {
    if (saveData('gallery.json', req.body)) {
        io.emit('dataUpdate', { type: 'gallery' }); // Notify clients
        res.json({ success: true, message: 'Gallery saved successfully' });
    } else {
        res.status(500).json({ success: false, message: 'Error saving gallery' });
    }
});

app.get('/api/contact', (req, res) => {
    const contact = loadData('contact.json');
    res.json(contact);
});

app.post('/api/contact', (req, res) => {
    if (saveData('contact.json', req.body)) {
        io.emit('dataUpdate', { type: 'contact' }); // Notify clients
        res.json({ success: true, message: 'Contact saved successfully' });
    } else {
        res.status(500).json({ success: false, message: 'Error saving contact' });
    }
});

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === 'admin123') {
        res.json({ success: true, token: 'admin-token-secret' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// Change app.listen to server.listen
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
