"use strict";

// Setup
var path = require("path");

var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var app = express();

var uuid = require("node-uuid");
var mongoose = require("mongoose");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var secrets = require("./secrets.js");

//Config
var port = process.env.PORT || 9000;
var url = process.env.PORT !== undefined ? "https://noahhuppert.com" : "http://127.0.0.1:9000";
var paths = {
  client: path.resolve(__dirname, "../client"),
  bower: path.resolve(__dirname, "../../bower_components")
};

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  name: String,
  avatar: String
});

UserSchema.statics.dump = function(user){
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar
  };
};

var LoginSessionSchema = new Schema({
  userId: String,
  created: {type: Date, default: new Date(), expires: 1209600 },//Expires after 2 weeks
  accessToken: String
});

LoginSessionSchema.statics.dump = function(loginSession){
  return {
    userId: loginSession.userId,
    created: loginSession.created,
    accessToken: loginSession.accessToken
  };
};

LoginSessionSchema.statics.belongsToUser = function(userId, accessToken, callback){
  LoginSession.find({accessToken: accessToken}, function(err, loginSessions){
    var loginSession = loginSessions[0];

    if(err !== null){
      callback(false);
      return;
    }

    if(loginSession === undefined){
      callback(false);
      return;
    }

    callback(loginSession.userId === userId);
  });
};

var User = mongoose.model("User", UserSchema);
var LoginSession = mongoose.model("LoginSession", LoginSessionSchema);

mongoose.connect(secrets.db.url);

app.use(cookieParser());
app.use(session({
  secret: secrets.session.secret,
  resave: false,
  saveUninitialized: false
}));

passport.serializeUser(function(user, done) {
  if(user.id === undefined){
    done("No user", null);
    return;

  }
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
  User.find({id: userId}, function(err, users){
    if(err !== null){
      done(err, null);
      return;
    }

    var user = users[0];
    if(user === undefined){
      done("Failed to find user", null);
      return;
    }

    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: secrets.google.clientId,
  clientSecret: secrets.google.clientSecret,
  callbackURL: url + "/api/v1/auth/google/callback"
}, PassportFlow));

function PassportFlow(accessToken, refreshToken, profile, done){
  var userId = profile.id;
  var userName = profile.displayName;
  var userAvatar = profile.photos[0].value;

  User.find({id: userId}, function(err, users){
    var user = users[0];

    if(user === undefined){
      user = new User();
      user.id = userId;
    }

    user.name = userName;
    user.avatar = userAvatar;

    user.save(function(err){
      if(err !== null){
        console.log(err);
        return done("Failed to update user", false);
      }

      PassportFlowLoginSession(user, done);
    });
  });
}

function PassportFlowLoginSession(user, done){
  LoginSession.find({userId: user.id}, function(err, loginSessions){
    var loginSession = loginSessions[0];

    if(loginSession === undefined){
      loginSession = new LoginSession();
      loginSession.userId = user.id;
      loginSession.accessToken = uuid.v4();
    }

    loginSession.created = new Date();

    loginSession.save(function(err){
      if(err !== null){
        console.log(err);
        return done("Failed to save login session", false);
      }

      return done(null, user);
    });
  });
}

app.use(passport.initialize());
app.use(passport.session());

app.use("/client", express.static(paths.client));
app.use("/bower", express.static(paths.bower));

//Routes
app.get("/", function(req, res){
  res.sendFile(paths.client + "/index.html");
});

app.get("/api/v1/auth/google/connect", passport.authenticate("google", {scope: "profile"}));

app.get("/api/v1/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/?error=Failed to login"}),//Fail
  function(req, res){//Success
    LoginSession.find({userId: req.user.id}, function(err, loginSessions){
      var loginSession = loginSessions[0];

      if(loginSession === undefined){
        res.redirect("/?error=No Login Session");
        return;
      }

      res.cookie("accessToken", loginSession.accessToken);
      res.redirect("/");
    });
});

app.get("/api/v1/accessTokens/:accessToken", function(req, res){
  var accessToken = req.params.accessToken;

  LoginSession.find({accessToken: accessToken}, function(err, loginSessions){
    var loginSession = loginSessions[0];

    if(err !== null){
      res.status(500);
      res.send({error: "Internal error"});
      return;
    }

    if(loginSession === undefined){
      res.status(404);
      res.send({error: "No such user"});
      return;
    }

    res.send(LoginSession.dump(loginSession));
  });
});

app.get("/api/v1/users/:userId", function(req, res){
  var accessToken = req.query.accessToken;
  var userId = req.params.userId;

  LoginSession.belongsToUser(userId, accessToken, function(belongsTo){
    if(!belongsTo){
      res.status(401);
      res.send({error: "Unauthorized"});
      return;
    }

    User.find({id: userId}, function(err, users){
      var user = users[0];

      if(err !== null){
        res.status(500);
        res.send({error: "Internal error"});
        return;
      }

      if(user === undefined){
        res.status(404);
        res.send({error: "No such user"});
        return;
      }

      res.send(User.dump(user));
    });
  });
});

//Launch
app.listen(port, function(){
  console.log("Server running on 127.0.0.1:" + port);
});
