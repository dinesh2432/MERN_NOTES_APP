const express = require("express");
const { getAllNotes, postNotes, editNotes, deleteNote } = require("../controllers/notesController");
const authMiddleware = require("../middlewares/usersNotesMiddleware");
const notesRoutes = express.Router()


notesRoutes.get('/', getAllNotes)
notesRoutes.post('/add',postNotes)
notesRoutes.put('/:id',editNotes)
notesRoutes.delete('/:id',deleteNote)


module.exports=notesRoutes;