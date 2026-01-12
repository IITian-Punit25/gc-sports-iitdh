import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Get all matches
router.get('/', async (req, res) => {
    try {
        // const { rows } = await query('SELECT * FROM matches ORDER BY date ASC');
        // res.json(rows);

        // Mock Response for now
        res.json([
            { id: '1', sport: 'Football', teamA: 'Hostel 1', teamB: 'Hostel 2', date: '2025-10-15', status: 'SCHEDULED' }
        ]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create a match
router.post('/', async (req, res) => {
    const { sport, teamA, teamB, date } = req.body;
    try {
        // const { rows } = await query(
        //   'INSERT INTO matches (sport, team_a, team_b, date) VALUES ($1, $2, $3, $4) RETURNING *',
        //   [sport, teamA, teamB, date]
        // );
        // res.json(rows[0]);
        res.json({ id: 'new', sport, teamA, teamB, date, status: 'SCHEDULED' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default router;
