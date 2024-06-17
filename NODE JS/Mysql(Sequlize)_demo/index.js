const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./connection/database');
const Note = require('./model/app');
const Users = require('./model/users');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Custom middleware to fetch user by ID
app.use((req, res, next) => {
  console.log("Running middleware");
  Users.findByPk(8)
    .then((user) => {
      req.user = user;
      console.log(req.user);
      next();
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      next(err);
    });
});

// app.use((req, res, next) => {
//   const userId = req.params.userId; // Assuming userId is passed in the URL
//   console.log("Running middleware for user ID:", userId);
//   Users.findByPk(userId)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       req.user = user;
//       console.log("Fetched user:", req.user);
//       next();
//     })
//     .catch((err) => {
//       console.error("Error fetching user:", err);
//       next(err);
//     });
// });

// Routes
const notesRoutes = require('./controller/notes');
const userRoutes = require('./controller/user');
app.use(notesRoutes);
app.use(userRoutes);

// Define associations
Users.hasMany(Note);
Note.belongsTo(Users, {
  constraints: true,
  onDelete: 'CASCADE'
});

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(8000, () => {
      console.log("Server started on port 8000.");
    });
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });
