const sql = require('mssql');

// SQL Server configuration with sql server auth
const config = {
    user: 'sa',
    password: 'password',
    server: 'localhost',
    database: 'ratingapp',
    options: {
        encrypt: true,
        trustServerCertificate: true,
        port: 1433,
    },
    
};

// // SQL Server configuration with wndows auth
// const config = {
//     server: 'localhost',
//     database: 'ratingapp',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         port: 1433,
//     },
//     authentication: {
//         type: 'ntlm', // Use NTLM for Windows Authentication
//         options: {
//             domain: '', // Leave empty if not using a domain
//             userName: '', // Leave empty for the currently logged-in user
//             password: '', // No password needed for Windows Auth
//         },
//     },
// };


// Connect to SQL Server
sql.connect(config, (err) => {
    if (err) {
        console.error('Error connecting to SQL Server:', err);
    } else {
        console.log('Connected to SQL Server');
    }
});

// Get all ratings
const getRatings = async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM Rating');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).send('Server error');
    }
};

// Save a new rating
const saveRating = async (req, res) => {
    try {
        const { empId, ratingScore } = req.body;

        if (!empId || !ratingScore) {
            return res.status(400).send('empId and ratingScore are required');
        }

        const request = new sql.Request();
        const query = `
            INSERT INTO Rating (empId, ratingScore)
            VALUES (@empId, @ratingScore)
        `;
        request.input('empId', sql.NVarChar, empId);
        request.input('ratingScore', sql.Int, ratingScore);

        await request.query(query);
        res.status(201).send('Rating saved successfully');
    } catch (error) {
        console.error('Error saving rating:', error);
        res.status(500).send('Server error');
    }
};

// Update a rating
const updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { empId, ratingScore } = req.body;

        if (!empId || !ratingScore) {
            return res.status(400).send('empId and ratingScore are required');
        }

        const request = new sql.Request();
        const query = `
            UPDATE Rating
            SET empId = @empId, ratingScore = @ratingScore
            WHERE Id = @id
        `;
        request.input('id', sql.Int, id);
        request.input('empId', sql.NVarChar, empId);
        request.input('ratingScore', sql.Int, ratingScore);

        await request.query(query);
        res.status(200).send('Rating updated successfully');
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).send('Server error');
    }
};

// Delete a rating
const deleteRating = async (req, res) => {
    try {
        const { id } = req.params;

        const request = new sql.Request();
        const query = `
            DELETE FROM Rating
            WHERE Id = @id
        `;
        request.input('id', sql.Int, id);

        await request.query(query);
        res.status(200).send('Rating deleted successfully');
    } catch (error) {
        console.error('Error deleting rating:', error);
        res.status(500).send('Server error');
    }
};

// // Get average rating
// const getAverageRating = async (req, res) => {
//     try {
//         const request = new sql.Request();
//         const result = await request.query('SELECT AVG(ratingScore) AS averageRating FROM Rating');
//         res.json(result.recordset[0]);
//     } catch (error) {
//         console.error('Error fetching average rating:', error);
//         res.status(500).send('Server error');
//     }
// };

// // Get ratings for a single employee
// const getEmployeeRatings = async (req, res) => {
//     try {
//         const { empId } = req.params;

//         const request = new sql.Request();
//         const query = `
//             SELECT * FROM Rating
//             WHERE empId = @empId
//         `;
//         request.input('empId', sql.NVarChar, empId);

//         const result = await request.query(query);
//         res.json(result.recordset);
//     } catch (error) {
//         console.error('Error fetching employee ratings:', error);
//         res.status(500).send('Server error');
//     }
// };

module.exports = {
    getRatings,
    saveRating,
    updateRating,
    deleteRating,
};