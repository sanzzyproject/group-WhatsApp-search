const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Mengaktifkan CORS agar bisa diakses dari frontend
app.use(cors());
app.use(express.json());

// Endpoint Search Group
app.get('/api/search', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ 
            status: false, 
            message: 'Masukkan kata kunci pencarian (parameter ?q=)' 
        });
    }

    try {
        // Request ke API eksternal
        const apiUrl = `https://zelapioffciall.koyeb.app/search/groupwa?query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        // Mengembalikan data ke frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ 
            status: false, 
            message: 'Gagal mengambil data dari server pusat.',
            error: error.message
        });
    }
});

// Menjalankan server (untuk local development)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server SANN404 berjalan di port ${PORT}`));

module.exports = app;
