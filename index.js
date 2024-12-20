const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // สำหรับรับ JSON จาก Client

// เส้นทางหลัก
app.get('/', (req, res) => {
    res.send('Welcome to Tarot Backend');
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
