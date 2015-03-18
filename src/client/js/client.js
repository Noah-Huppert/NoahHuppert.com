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
Template.SelectedPageIndex = 0;
Template.Routes = ["projects", "skills", "contact"];

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

Template.NavRoute = function(route){
  console.log(route, Template.Routes[route]);
  window.location.hash = Template.Routes[route];
};

function LoadingComplete(){
  console.log("Loading complete");

  routie({
    "projects": function(){
      Template.SelectedPageIndex = 0;
    },
    "skills": function(){
      Template.SelectedPageIndex = 1;
    },
    "contact": function(){
      Template.SelectedPageIndex = 2;
    }
  });

  $("#toolbar-tab-0").click(function(){
    Template.NavRoute(0);
  });

  $("#toolbar-tab-1").click(function(){
    Template.NavRoute(1);
  });

  $("#toolbar-tab-2").click(function(){
    Template.NavRoute(2);
  });
}

if(!Template.UserConnected){
  Template.CompleteLoading();
}
