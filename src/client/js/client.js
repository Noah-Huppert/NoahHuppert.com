var Template = document.querySelector('#template');
Template.addEventListener("loading-complete", LoadingComplete);

/* General Methods */
Template.Error = function(error){
  console.error(error);
};

/* Models */
Template.User = {
  id: undefined,
  name: undefined,
  avatar: undefined
};

Template.LoginSession = {
  accessToken: $.cookie("accessToken")
};

Template.UserAuthenticated = Template.User.id !== undefined &&
                             Template.User.name !== undefined &&
                             Template.User.avatar !== undefined;

Template.UserConnected = Template.LoginSession.accessToken !== undefined;

Template.ScreenWidth = $(window).width();

$(window).resize(function(){
  Template.ScreenWidth = $(window).width();
});

/* Model Specific Methods */
Template.GetLogoutUrl = function(){
    return "/api/v1/auth/disconnect?accessToken=" + Template.LoginSession.accessToken + "&returnTo=" + window.location;
};

function UpdateUserAuthStates(){
  Template.UserAuthenticated = Template.User.id !== undefined &&
                               Template.User.name !== undefined &&
                               Template.User.avatar !== undefined;

 Template.UserConnected = Template.LoginSession.accessToken !== undefined;
}

Template.UpdateUser = function(e){
  var response = e.detail.response;
  var request = e.detail.xhr;

  if(request.status !== 200){
    Template.Error(response.error);
    return;
  }

  Template.User.name = response.name;
  Template.User.avatar = response.avatar;

  Template.CompleteLoading();
};

Template.UpdateLoginSession = function(e){
  var response = e.detail.response;
  var request = e.detail.xhr;

  if(request.status !== 200){
    Template.Error(response.error);
    return;
  }

  Template.User.id = response.userId;
  Template.LoginSession.created = new Date(response.created);

  var getUserInfoRequest = document.querySelector("#ajax-getUserInfo");
  getUserInfoRequest.url = "/api/v1/users/" + Template.User.id;
};

/* Event Specific Methods */
Template.CompleteLoading = function(){
  UpdateUserAuthStates();
  Template.dispatchEvent(new Event("loading-complete"));
};

Template.ToggleDrawer = function(){
  document.querySelector("#drawer").togglePanel();
};

function LoadingComplete(){
  console.log("Loading complete");
}

if(!Template.UserConnected){
  Template.CompleteLoading();
}
/*var LoginSession = {
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

  $("#toolbar-avatar").attr("src", User.avatar);
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
*/
