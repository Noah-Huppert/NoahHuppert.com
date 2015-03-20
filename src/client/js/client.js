var Template = document.querySelector('#template');

Template.addEventListener("template-bound", function(){
  Template.TemplateLoaded = true;
});

/* Models */
Template.User = {
  id: undefined,
  name: undefined,
  avatar: undefined,
  admin: undefined
};

Template.LoginSession = {
  accessToken: $.cookie("accessToken")
};

Template.Projects = [];

/* Setup */
Template.SelectedPageIndex = 0;
Template.ShouldShowCreateProjectBox = false;
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

Template.TemplateLoaded = false;

/* Load */
if(Template.UserConnected){
  Load();
} else {
  CompleteLoading();
}

function Load(){
  LoadAccessTokenInfo();
}

function LoadAccessTokenInfo(){
  $.ajax({
    url: "/api/v1/accessTokens/" + Template.LoginSession.accessToken,
    data: {accessToken: Template.LoginSession.accessToken}
  })
    .done(function(accessToken){
      Template.User.id = accessToken.userId;

      LoadUserInfo();
    })
    .fail(function(err){
      ErrorLoading();
      console.error("Failed to load AccessToken info", err);
    });
}

function LoadUserInfo(){
  $.ajax({
    url: "/api/v1/users/" + Template.User.id,
    data: {accessToken: Template.LoginSession.accessToken}
  })
    .done(function(user){
      Template.User.name = user.name;
      Template.User.avatar = user.avatar;
      Template.User.admin = user.admin;

      LoadProjects();
    })
    .fail(function(err){
      ErrorLoading();
      console.error("Failed to load User info", err);
    });
}

function LoadProjects(){
  $.ajax("/api/v1/projects")
    .done(function(projects){
      Template.Projects = projects;

      CompleteLoading();
    })
    .fail(function(err){
      ErrorLoading();
      console.error("Failed to load projects", err);
    });
}


function ErrorLoading(){
  if(Template.TemplateLoaded){
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
  if(Template.TemplateLoaded){
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


/* Model Specific Methods */
Template.GetLogoutUrl = function(){
    return "/api/v1/auth/disconnect?accessToken=" + Template.LoginSession.accessToken + "&returnTo=" + window.location;
};

function UpdateUserAuthStates(){
  Template.UserAuthenticated = Template.User.id !== undefined &&
                               Template.User.name !== undefined &&
                               Template.User.avatar !== undefined &&
                               Template.User.admin !== undefined;

 Template.UserConnected = Template.LoginSession.accessToken !== undefined;
}

Template.ShowCreateProjectBox = function(){
  Template.ShouldShowCreateProjectBox = true;
};
