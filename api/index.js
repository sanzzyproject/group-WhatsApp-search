const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
    // Mengambil query dari frontend (misal: ?q=ramadhan)
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ 
            status: false, 
            message: 'Masukkan kata kunci pencarian' 
        });
    }

    try {
        // PERBAIKAN DI SINI:
        // Mengubah parameter dari 'query=' menjadi 'q=' sesuai CURL user
        const apiUrl = `https://zelapioffciall.koyeb.app/search/groupwa?q=${encodeURIComponent(query)}`;
        
        const response = await axios.get(apiUrl);

        // Debugging: Cek di log server apa yang dikembalikan
        console.log("Response dari API Zelapio:", response.data);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));

module.exports = app;
