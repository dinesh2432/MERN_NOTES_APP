const express = require('express')
const app= express()
const cors = require('cors')
const cookieParser=require('cookie-parser')
const connectDb = require('./config/db')
const { register } = require('./controllers/authControllers')
const PORT = process.env.PORT || 5000
const authrouter = require('./routes/authRoutes')
const notesRoutes = require('./routes/noteRoutes')
const { authMiddleware, authUserDetails } = require('./middlewares/usersNotesMiddleware')

app.use(cors({
    origin:true,  
    credentials: true                 
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello everyone")
})


app.use('/api/auth',authrouter)
app.use('/api/notes',authUserDetails, authMiddleware, notesRoutes)

connectDb()


app.listen(PORT, ()=>{
    console.log(`Server running on the port ${PORT}`)
})