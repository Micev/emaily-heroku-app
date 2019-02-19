
const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
      console.log('profileId: ' + profile.id)
      User.findOne({googleId: profile.id}).then(existingUser => {
        if (existingUser) {
          // return data for that user
          // first argument is error
          console.log('get existing user: ' + existingUser.id)
          done(null, existingUser);
        } else {
          console.log('Create user ')
          new User({googleId: profile.id})
          .save()
          .then(user => done(null, user))
        }
      })
    }
  )
);
