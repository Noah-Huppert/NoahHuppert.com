$(document).ready(function () {
    var githubController: GithubController = new GithubController();
    var appController: AppController = new AppController();

    githubController.entryPoints.repos.get.call({ "owner": "Noah-Huppert", "repo": "NoahHuppert.com" }, "GET").on(Promise.STAGE_SUCCESS, (data) => {
        Log.d(data.responseJSON, "main.repo.get.onDone");
    });

    //Add tabs
    appController.addTab(new Tab("projects", "Projects", true));
    appController.addTab(new Tab("skills", "Skills"));
    appController.addTab(new Tab("contact", "Contact Me"));

    //Setup tabs
    appController.getTabById("projects").loadJsonContentFromUrl("/data/projects.json", "projects")
        .on(Promise.STAGE_SUCCESS, (tab) => {
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
        .on(Promise.STAGE_SUCCESS, (tab) => {
            tab.data(marked(tab.data()));
        });
    appController.getTabById("contact").loadTextContextFromUrl("/data/contact.md")
        .on(Promise.STAGE_SUCCESS, (tab) => {
            tab.data(marked(tab.data()));
        });

    ko.applyBindings(appController);
});
