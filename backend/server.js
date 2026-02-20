const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Smart Mirror Backend Running 🚀");
});

const { errorHandler } = require('./middleware/errorMiddleware');

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/wardrobe', require('./routes/wardrobeRoutes'));
app.use('/api/moodboards', require('./routes/moodBoardRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Accessible locally at http://localhost:${PORT}`);
    console.log(`Accessible on network at http://0.0.0.0:${PORT}`);
});
