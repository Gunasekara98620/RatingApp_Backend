// const express = require('express');
// const sql = require('mssql');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// const {
//     getRatings,
//     saveRating,
//     updateRating,
//     deleteRating,
// } = require('./controllers/ratingController');


// // SQL Server configuration
// const config = {
//     user: 'sa',
//     password: 'password',
//     server: 'localhost',
//     database: 'ratingapp',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         port: 1433,
//     },
// };

// // Connect to SQL Server
// sql.connect(config, (err) => {
//     if (err) {
//         console.error('Error connecting to SQL Server:', err);
//     } else {
//         console.log('Connected to SQL Server');
//     }
// });

// // Example API endpoint
// app.get('/api/data', async (req, res) => {
//     try {
//         const request = new sql.Request();
//         const result = await request.query('SELECT * FROM your_table');
//         res.json(result.recordset);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Server error');
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const {
    getRatings,
    saveRating,
    updateRating,
    deleteRating,
} = require('./ratingController');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/ratings', getRatings); // Get all ratings
app.post('/api/ratings', saveRating); // Save a new rating
app.put('/api/ratings/:id', updateRating); // Update a rating
app.delete('/api/ratings/:id', deleteRating); // Delete a rating

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});