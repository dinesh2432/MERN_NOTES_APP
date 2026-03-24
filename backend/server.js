require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const authRouter = require('./routes/authRoutes');
const notesRoutes = require('./routes/noteRoutes');
const { authMiddleware, authUserDetails } = require('./middlewares/usersNotesMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:3000", "https://mern-notes-app-wine.vercel.app"],
    credentials: true  
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello everyone");
});

app.use('/api/auth', authRouter);
app.use('/api/notes', authUserDetails, authMiddleware, notesRoutes);

// Wait for DB to connect BEFORE starting Express
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on the port ${PORT}`);
    });
}).catch(err => {
    console.error("Database connection failed. Server not started.", err);
});