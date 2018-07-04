const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
      try{
          const user = await User.findById(id);
          done(null, user.id);
      }catch(error){
          done(error, null);
      }
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
}, async (email, password, done)=>{
  try{
    // 1) Check if the email already exists
      const user = await User.findOne({ 'email': email});
      if (!user){
        return done(null,false,{ message: 'Unknown User' })
      }
      // 2) Check if the password is correct
      const isValit = User.comparePasswords(password,user.password);
      if(isValit){
        return done(null, user);
      }else{
        return done(null, false,{ message: 'Unknown Password'});
      }
  }catch(error){
    return done(error, false);
  }
}));