var Template = document.querySelector('#template');
Template.addEventListener("loading-complete", LoadingComplete);

Template.addEventListener("template-bound", function(){
  Template.Loaded = true;
});

/* Setup */
Template.User = {
  id: undefined,
  name: undefined,
  avatar: undefined
};

Template.LoginSession = {
  accessToken: $.cookie("accessToken")
};

Template.SelectedPageIndex = 0;
var routeCalled = false;

routie("projects", function(){
  Template.SelectedPageIndex = 0;
  routeCalled = true;
});

routie("skills", function(){
  Template.SelectedPageIndex = 1;
  routeCalled = true;
});

routie("contact", function(){
  Template.SelectedPageIndex = 2;
  routeCalled = true;
});

if(!routeCalled){
  routie("projects");
}

UpdateUserAuthStates();

Template.Loaded = false;

if(!Template.UserConnected){
  CompleteLoading();
}

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
    ErrorLoading();
    console.error(response.error);
    return;
  }

  Template.User.name = response.name;
  Template.User.avatar = response.avatar;

  CompleteLoading();
};

Template.UpdateLoginSession = function(e){
  var response = e.detail.response;
  var request = e.detail.xhr;

  if(request.status !== 200){
    ErrorLoading();
    console.error(response.error);
    return;
  }

  Template.User.id = response.userId;
  Template.LoginSession.created = new Date(response.created);

  var getUserInfoRequest = document.querySelector("#ajax-getUserInfo");
  getUserInfoRequest.url = "/api/v1/users/" + Template.User.id;
};

/* Event Specific Methods */
function ErrorLoading(){
  if(Template.Loaded){
    _ErrorLoading();
  } else {
    Template.addEventListener("template-bound", function(){
      _ErrorLoading();
    });
  }
}

function _ErrorLoading(){
  $("#loading-message").text("Error");
  $("#loading-message").attr("error", true);
  $("#loading paper-progress").attr("value", 100);
  $("#loading paper-progress").removeAttr("indeterminate");
}

function CompleteLoading(){
  if(Template.Loaded){
    _CompleteLoading();
  } else {
    Template.addEventListener("template-bound", function(){
      _CompleteLoading();
    });
  }
}

function _CompleteLoading(){
  UpdateUserAuthStates();
  Template.dispatchEvent(new Event("loading-complete"));
  $("#loading").attr("done", true);
}

function LoadingComplete(){
  
}
