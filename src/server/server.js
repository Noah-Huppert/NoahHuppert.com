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

/* User Schema */
var UserSchema = new Schema({
  id: String,
  name: String,
  avatar: String,
  admin: Boolean
});

UserSchema.statics.dump = function(user){
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    admin: user.admin
  };
};

/* Login Session Schema */
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
  LoginSession.findOne({accessToken: accessToken}, function(err, loginSession){
    if(err !== null){
      callback(false);
      return;
    }

    if(loginSession === null){
      callback(false);
      return;
    }

    callback(loginSession.userId === userId, loginSession.userId);
  });
};

LoginSessionSchema.statics.userIsAdmin = function(accessToken, callback){//callback(Boolean isAdmin, LoginSession loginSession, User user)
  LoginSession.findOne({accessToken: accessToken}, function(err, loginSession){
    if(err !== null){
      callback(false);
      return;
    }

    if(loginSession === null){
      callback(false);
      return;
    }

    User.findOne({id: loginSession.userId}, function(err, user){
      if(err !== null){
        callback(false);
        return;
      }

      if(user === null){
        callback(false);
        return;
      }

      callback(user.admin, loginSession, user);
    });
  });
};

LoginSessionSchema.statics.userIsAdminMiddleware = function(req, res, next){
  var accessTokenParam = req.query.accessToken;

  LoginSession.userIsAdmin(accessTokenParam, function(isAdmin){
    if(isAdmin){
      next();
      return;
    } else {
      res.status(403);
      res.send({error: "Forbidden"});
      return;
    }
  });
};

/* Project Schema */
var ProjectSchema = new Schema({
  id: String,
  date: Date,
  title: String,
  content: String
});

ProjectSchema.statics.dump = function(project){
  return {
    id: project.id,
    date: project.date,
    title: project.title,
    content: project.content
  };
};

/* Setup Mongoose */
var User = mongoose.model("User", UserSchema);
var LoginSession = mongoose.model("LoginSession", LoginSessionSchema);
var Project = mongoose.model("Project", ProjectSchema);

mongoose.connect(secrets.db.url);

/* Setup Passport */
passport.serializeUser(function(user, done) {
  if(user.id === undefined){
    done("No user", null);
    return;

  }
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
  User.findOne({id: userId}, function(err, user){
    if(err !== null){
      done(err, null);
      return;
    }

    if(user === null){
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

  User.findOne({id: userId}, function(err, user){
    if(err !== null){
      return done("Internal error", false);
    }

    if(user === null){
      user = new User();
      user.id = userId;
      user.admin = false;
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
  LoginSession.findOne({userId: user.id}, function(err, loginSession){
    if(err !== null){
      return done("Internal error", false);
    }

    if(loginSession === null){
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

/* Setup Express */
app.use(cookieParser("", {
  maxAge: 1209600//2 Weeks
}));

app.use(session({
  secret: secrets.session.secret,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/client", express.static(paths.client));
app.use("/bower", express.static(paths.bower));

/* Routes */
app.get("/", function(req, res){
  res.sendFile(paths.client + "/index.html");
});

//Api Authorization
app.get("/api/v1/auth/google/connect", passport.authenticate("google", {scope: "profile"}));

app.get("/api/v1/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/?error=Failed to login"}),//Fail
  function(req, res){//Success
    LoginSession.findOne({userId: req.user.id}, function(err, loginSession){
      if(err !== null){
        res.status(500);
        res.redirect("/?error=Internal error");
        return;
      }

      if(loginSession === null){
        res.redirect("/?error=No Login Session");
        return;
      }

      res.cookie("accessToken", loginSession.accessToken);
      res.redirect("/");
    });
});

app.get("/api/v1/auth/disconnect", function(req, res){
  var accessToken = req.query.accessToken;
  var returnTo = req.query.returnTo;

  LoginSession.findOneAndRemove({accessToken: accessToken}, function(err, loginSession){
    if(err !== null){
      res.status(500);
      res.send({error: "Internal error"});
      return;
    }

    if(loginSession === null){
      res.status(404);
      res.send({error: "No such login session"});
      return;
    }

    res.clearCookie("accessToken");

    if(returnTo !== undefined && returnTo.length !== 0){
      res.redirect(returnTo);
    } else {
      res.status(200);
      res.send("Ok");
    }
  });
});

app.get("/api/v1/accessTokens/:accessToken", function(req, res){
  var accessToken = req.params.accessToken;

  LoginSession.findOne({accessToken: accessToken}, function(err, loginSession){
    if(err !== null){
      res.status(500);
      res.send({error: "Internal error"});
      return;
    }

    if(loginSession === null){
      res.status(404);
      res.send({error: "No such user"});
      return;
    }

    res.send(LoginSession.dump(loginSession));
  });
});

//Api User
app.get("/api/v1/users/:userId", function(req, res){
  var accessToken = req.query.accessToken;
  var userId = req.params.userId;

  LoginSession.belongsToUser(userId, accessToken, function(belongsTo){
    if(!belongsTo){
      res.status(401);
      res.send({error: "Unauthorized"});
      return;
    }

    User.findOne({id: userId}, function(err, user){
      if(err !== null){
        res.status(500);
        res.send({error: "Internal error"});
        return;
      }

      if(user === null){
        res.status(404);
        res.send({error: "No such user"});
        return;
      }

      res.send(User.dump(user));
    });
  });
});

//Api Projects
app.get("/api/v1/projects", function(req, res){
  Project.find(function(err, projects){
    var projectsDump = [];

    if(err !== null){
      res.status(500);
      res.send({error: "Internal error"});
      return;
    }

    for(var i = 0; i < projects.length; i++){
      projectsDump.push(projects[i]);
    }

    res.send({projects: projectsDump});
  });
});

app.post("/api/v1/projects", LoginSession.userIsAdminMiddleware, function(req, res){
  var project = req.project;

  if(project === undefined){
    res.status(400);
    res.send({error: "New project data must be include in request"});
    return;
  }

  if(project.date === undefined ||
     project.content === undefined){
       res.status(400);
       res.send({error: "New project data must include all keys"});
       return;
   }

   project.id = uuid.v4();

   Project.insert(project, function(err){
     if(err !== null){
       res.status(500);
       res.send({error: "Internal error"});
       return;
     }

     res.send("Ok");
   });
});

app.put("/api/v1/projects/:projectId", LoginSession.userIsAdminMiddleware, function(req, res){
  var project = req.project;
  var projectId = req.params.projectId;

  if(project === undefined){
    res.status(400);
    res.send({error: "Project to update must be included in request"});
    return;
  }

  if(projectId === undefined){
    res.status(400);
    res.send({error: "Project Id to update must be included"});
    return;
  }

  Project.findOneAndUpdate({id: projectId}, {$set: project}, function(err, project){
    if(err !== null){
      res.status(500);
      res.send({error: "Internal error"});
      return;
    }

    if(project === null){
      res.status(404);
      res.send({error: "Project not found"});
      return;
    }

    res.send(project);
  });
});

app.delete("/api/v1/projects/:projectId", LoginSession.userIsAdminMiddleware, function(req, res){
  var projectId = req.params.projectId;

  if(projectId === undefined){
    res.status(400);
    res.send({error: "Project Id to delete must be included"});
    return;
  }

  Project.findOneAndRemove({id: projectId}, function(err, project){
    if(err !== null){
      res.status(500);
      res.send({error: "Internal error"});
      return;
    }

    if(project === null){
      res.status(404);
      res.send({error: "Project not found"});
      return;
    }

    res.send("Ok");
  });
});

/* Launch */
app.listen(port, function(){
  console.log("Server running on 127.0.0.1:" + port);
});
