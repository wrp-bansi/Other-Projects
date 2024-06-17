
const express = require('express');

const Note = require('../model/app');
const notesRoutes = express();
const User=require('../model/users')


notesRoutes.get('/', async (req, res) => {
  const user=req.user

    try {
      const notes=await user.getNotes({
        where:{
          stastus:"online"
        }
      })
      res.json(notes);
      // const notes = await Note.findAll({raw:true});
      // res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  notesRoutes.post('/notes', async (req, res) => {
    try {
      const { Title, description, stastus} = req.body;
      const user=req.user

      // Check if all required fields are provided
      if (!Title || !description || !stastus) {
        return res.status(400).json({ error: "Please provide title, description, and status" });
      }
      const newNote = await user.createNote({
        Title,
        description,
        stastus
      });

      res.status(201).json(newNote);
      // const newNote = await Note.create({ Title, description, stastus});
      // res.status(201).json(newNote);

    } catch (error) {
      console.error("Error creating note:", error);
      res.status(500).json({ error: "Failed to create note" });
    }


  });

  notesRoutes.get('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const note = await Note.findByPk(id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(note);
    } catch (error) {
      console.error("Error fetching note:", error);
      res.status(500).json({ error: "Failed to fetch note" });
    }
  });

  // Update a note
  notesRoutes.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { Title, description, stastus  } = req.body;
    try {
      const note = await Note.findByPk(id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      // Update the note
      await note.update({  Title, description, stastus });
      res.json(note);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ error: "Failed to update note" });
    }
  });

  // Delete a note
  notesRoutes.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const note = await Note.findByPk(id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      // Delete the note
      await note.destroy();
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Failed to delete note" });
    }
  });

  module.exports = notesRoutes