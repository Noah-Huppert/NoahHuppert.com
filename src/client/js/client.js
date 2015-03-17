var LoginSession = {
  userId: undefined,
  created: undefined,
  accessToken: $.cookie("accessToken")
};

var User = {
  id: undefined,
  name: undefined,
  avatar: undefined,
  authed: function(){
    return User.id !== undefined &&
           User.name !== undefined &&
           User.avatar !== undefined;
  },
  getLogoutUrl: function(){
    return "/api/v1/auth/disconnect?accessToken=" + LoginSession.accessToken;
  }
};

//Load
Load();

function LoadingDone(err){
  if(err !== undefined){
    $("#loading-error").text(err);
    $("#loading paper-progress").attr("indeterminate", false);
    $("#loading paper-progress").attr("value", 100);
    return;
  }

  $("#header-avatar").attr("src", User.avatar);
  $("#loading").css({
    "top": "-100%"
  });
}

function Load(){
  getAccessTokenInfo();
}

function getAccessTokenInfo(){
  if(LoginSession.accessToken === undefined){
    LoadingDone();
    return;
  }

  $.getJSON("/api/v1/accessTokens/" + LoginSession.accessToken, getAccessTokenInfoCallback);
}

function getAccessTokenInfoCallback(data){
  if(data.userId === undefined || data.created === undefined || data.accessToken === undefined){
    LoadingDone("Error: Invalid credentials");
    return;
  }

  LoginSession.userId = data.userId;
  LoginSession.created = new Date(data.created);
  LoginSession.accessToken = data.accessToken;

  User.id = LoginSession.userId;

  getUserData();
}

function getUserData(){
  $.getJSON("/api/v1/users/" + User.id + "?accessToken=" + LoginSession.accessToken, getUserDataCallback);
}

function getUserDataCallback(data){
  if(data.id === undefined || data.name === undefined || data.avatar === undefined){
    LoadingDone("Error: Invalid user");
    return;
  }

  User.name = data.name;
  User.avatar = data.avatar;

  LoadingDone();
}
