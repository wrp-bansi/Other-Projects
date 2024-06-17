const express = require('express');
const { Op } = require('sequelize');
const User = require('../model/users');
const userRoutes = express();
const sequelize = require('../connection/database');


userRoutes.get('/users', async (req, res) => {
    try {
      const users = await User.findAll({raw:true});
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  userRoutes.post('/users/post', async (req, res) => {
    try {
      const { firstName, latName, email,password } = req.body;

      if (!firstName || !latName || !email || !password) {
        return res.status(400).json({ error: "Please provide users data" });
      }
      const newUser = await User.create({ firstName, latName, email,password });
      res.status(201).json(newUser);

    } catch (error) {
      console.error("Error creating users:", error);
      res.status(500).json({ error: "Failed to create users" });
    }


  });

  userRoutes.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });


  userRoutes.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, latName, email,password } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      await user.update({  firstName, latName, email,password});
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });


  userRoutes.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      await user.destroy();
      res.json({ message: "user deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });





  module.exports = userRoutes