const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'bansi name',
  resave: false,
  saveUninitialized: false
}));

// Sample user database (replace with your actual user database)
const users = [
  { id: 1, username: 'admin', password: '123' }
];
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = users.find(user => user.username === username);

    if (!user) { return done(null, false); }
    if (user.password !== password) { return done(null, false); }

    return done(null, user);
  }
));



passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    const user = users.find(user => user.id === id);
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  });

  app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {

    res.send(req.user);
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
