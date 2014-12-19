$(document).ready(function () {
    var githubController: GithubController = new GithubController();
    var appController: AppController = new AppController();

    var donePromise = new Promise();

    githubController.entryPoints.repos.get.call({ "owner": "Noah-Huppert", "repo": "NoahHuppert.com" }, "GET").onDone((data) => {
        //Log.d(data.responseJSON, "main.repo.get.onDone");
    });

    //Add tabs
    appController.addTab(new Tab("projects", "Projects", true));
    appController.addTab(new Tab("skills", "Skills"));
    appController.addTab(new Tab("contact", "Contact Me"));

    //Setup tabs
    appController.getTabById("projects").loadJsonContentFromUrl("/data/projects.json", "projects")
        .onDone((tab) => {
            var newData: KnockoutObservableArray<Project> = ko.observableArray<Project>();

            //Convert body to markdown and data to ko.observableArray
            _.each(tab.data(), function (project: any) {
                project.body = marked(project.body);

                newData.push(Project.fromObject(project));
            });

            tab.data(newData());

            Log.d(tab.data());
        });
    appController.getTabById("skills").loadTextContextFromUrl("/data/skills.md")
        .onDone((tab) => {
            tab.data(marked(tab.data()));
        });
    appController.getTabById("contact").loadTextContextFromUrl("/data/contact.md")
        .onDone((tab) => {
            tab.data(marked(tab.data()));
        });

    ko.applyBindings(appController);
});