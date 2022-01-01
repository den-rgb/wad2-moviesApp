import passport from 'passport';
import passportJWT from 'passport-jwt';
import UserModel from './../api/users/userModel';
import dotenv from 'dotenv';


dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var GoogleAuthenticator=require('passport-2fa-totp').GoogeAuthenticator;
var TwoFAStrategy=require('passport-2fa-totp').Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;
const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
  const user = await UserModel.findByUserName(payload);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

const TFAStrategy = new TwoFAStrategy(function (userName,password,done) {
  UserModel.findOne({userName:userName}, function (err,user){
    if(err) { return done(err); }
    if(!user) {return done(null,false);}
    if(!user.comparePassword(password,err)) {return done(null,false);}
    return done(null,user);
  });
},function(user,done){
  if(!user.SECRET){
    done(new Error("Google Auth is not set up yet"));
  }else{
    var secret=GoogleAuthenticator.decodeSecret(user.SECRET);
    done(null,secret,30);
  }
});

passport.use(strategy);

export default passport;