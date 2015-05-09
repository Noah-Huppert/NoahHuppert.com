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

Template.NewProject = {
  title: undefined,
  content: undefined,
  date: undefined
};

/* Setup */
Template.SelectedPageIndex = 0;
Template.CreateProjectTab = 0;
Template.ShouldShowCreateProjectBox = false;
Template.LoadingProgressMessage = "";
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

routie("about", function(){
  Template.SelectedPageIndex = 3;
  routeCalled = true;
});

if(!routeCalled){
  routie("projects");
}

UpdateUserAuthStates();

Template.TemplateLoaded = false;

/* Load */
Load();

function Load(){
  if(Template.UserConnected){
    LoadAccessTokenInfo();
  } else {
    LoadProjects();
  }
}

function LoadAccessTokenInfo(){
  Template.LoadingProgressMessage = "Authenticating";

  $.ajax({
    url: "/api/v1/accessTokens/" + Template.LoginSession.accessToken,
    data: {access_token: Template.LoginSession.accessToken}
  })
    .done(function(accessToken){
      Template.User.id = accessToken.userId;

      LoadUserInfo();
    })
    .fail(function(err){
      ErrorLoading();
      Template.LoadingProgressMessage = "Failed To Autheticate";
      console.error("Failed to load AccessToken info", err);
    });
}

function LoadUserInfo(){
  Template.LoadingProgressMessage = "Getting User Info";

  $.ajax({
    url: "/api/v1/users/" + Template.User.id,
    data: {access_token: Template.LoginSession.accessToken}
  })
    .done(function(user){
      Template.User.name = user.name;
      Template.User.avatar = user.avatar;
      Template.User.admin = user.admin;

      LoadProjects();
    })
    .fail(function(err){
      ErrorLoading();
      Template.LoadingProgressMessage = "Failed To Get User Info";
      console.error("Failed to load User info", err);
    });
}

function LoadProjects(){
  Template.LoadingProgressMessage = "Getting Projects";

  $.ajax("/api/v1/projects")
    .done(function(projects){
      Template.Projects = projects;

      Template.LoadingProgressMessage = "Done";
      CompleteLoading();
    })
    .fail(function(err){
      ErrorLoading();
      Template.LoadingProgressMessage = "Failed to Get Projects";
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
  $("#loading").attr("error", true);
  $("#loading-title-message").text("Error");
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

/* Helpers */
function MakeNumber2DigitString(num){
  if(num >= 10){
    return num.toString();
  }

  return "0" + num;
}

/* Model Specific Methods */
Template.ShowLoadingReportErrorInstructions = function(){
  $("#loading-report-error-button").hide();
  $("#loading-report-error-instructions").show();
};

Template.GetReportErrorMailto = function(){
  return "mailto:noah.programmer@gmail.com?" +
         "subject=NoahHuppert.com Error&" +
         "body=Browser Name: ?%0D%0A %0D%0A" +
              "Browser Version: ?%0D%0A %0D%0A" +
              "Error Message: ?%0D%0A %0D%0A" +
              "Contents of developer console: ?%0D%0A %0D%0A" +
              "Other:";
}

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

Template.GetNewProjectDateString = function(){
  var date = Template.NewProject.date;

  if(date === undefined){
    date = new Date();
  }

  return MakeNumber2DigitString(date.getMonth()) + "/" + MakeNumber2DigitString(date.getDate()) + "/" + MakeNumber2DigitString(date.getFullYear()).substr(2, 2);
};
