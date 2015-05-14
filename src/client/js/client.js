"use strict";

try{
  var Template = document.getElementById('template');

  /* Error Reporting */
  Template.TriggerErrorState = function(error){
    document.getElementById("loading").removeAttribute("done");
    document.getElementById("loading").setAttribute("error", true);
    document.querySelector("#loading paper-progress").setAttribute("value", 100);
    document.querySelector("#loading paper-progress").removeAttribute("indeterminate");
  };

  Template.ShowLoadingReportErrorInstructions = function(){
    document.getElementById("loading-report-error-button").style.display = "none";
    document.getElementById("loading-report-error-instructions").style.display = "block";
  };

  Template.ReportErrorMailto = 
    "mailto:noah.programmer@gmail.com?" +
     "subject=NoahHuppert.com Error&" +
     "body=Browser Name: ?%0D%0A %0D%0A" +
          "Browser Version: ?%0D%0A %0D%0A" +
          "Error Message: ?%0D%0A %0D%0A" +
          "Contents of developer console: ?%0D%0A %0D%0A" +
          "Other:";

  console._error = console.error;
  console.error = function(){
    Template.TriggerErrorState();
    console._error.apply(this, arguments);
  };
} catch(e) {
  alert("A fatal error has occured, please email noah.programmer@gmail.com with your browser name, browser version");
}

try{

Template.addEventListener("template-bound", function(){
  console.log("Template Bound");
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

Template.NewProjectError = "";

Template.NewProject = {
  title: undefined,
  content: undefined,
  date: undefined,
  github: undefined,
  website: undefined
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
      $.removeCookie("accessToken");
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

  $.ajax({
    url: "/api/v1/projects",
    data: {
      content_as_html: true
    }
  })
    .done(function(projects){
      Template.Projects = projects.projects;

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
  Template.TriggerErrorState();
}

function CompleteLoading(){
  if(Template.TemplateLoaded){
    _CompleteLoading();
  } else {
    Template.addEventListener("template-bound", function(){
      _CompleteLoading();
    });

    setTimeout(_CompleteLoading, 1000);
  }
}

function _CompleteLoading(){
  UpdateUserAuthStates();
  Template.dispatchEvent(new Event("loading-complete"));
  $("#loading").attr("done", true);
  Template.LoadingProgressMessage = "Error";

  console.log(Template.Projects);
}

/* Helpers */
function MakeNumber2DigitString(num){
  if(num >= 10){
    return num.toString();
  }

  return "0" + num;
}

function DateToString(date){
  var month = MakeNumber2DigitString(date.getMonth() + 1);
  var dDate = MakeNumber2DigitString(date.getDate() + 1);
  var year = date.getFullYear();

  return month + "/" + dDate + "/" + year;
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

Template.GetProjectDateString = function(project){
  var date = new Date(project.date);
  return DateToString(date);
};

/* Project Creation */
Template.ShowCreateProjectBox = function(){
  Template.ShouldShowCreateProjectBox = true;
};

Template.HideCreateProjectBox = function(){
  Template.ShouldShowCreateProjectBox = false;
};

Template.GetNewProjectDateString = function(){
  var date = Template.NewProject.date;

  if(date === undefined){
    date = new Date();
  }

  return DateToString(date);  
};

Template.CreateProject = function(){
  if(Template.NewProject.title === undefined || Template.NewProject.title.length === 0){
    Template.NewProjectError = "New project must have a title";
    return;
  }

  if(Template.NewProject.content === undefined || Template.NewProject.content.length === 0){
    Template.NewProjectError = "New project must have content";
    return;
  }

  if(Template.NewProject.date === undefined || Template.NewProject.date.length === 0){
    Template.NewProjectError = "New project must have a date";
    return;
  }

  $.ajax({
    url: "/api/v1/projects",
    data: {
      access_token: Template.LoginSession.accessToken,
      project: Template.NewProject
    },
    method: "POST"
  })
  .done(function(data){
    console.log("done", data);
  })
  .fail(function(err){
    console.log("error", err);
  });
};

} catch(e){
  console.error(e);
  Template.LoadingProgressMessage = e.toString();
}