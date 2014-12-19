$(document).ready(function () {
    var model: AppModel = new AppModel();

    //Add tabs
    model.addTab(new Tab("projects", "Projects", true));
    model.addTab(new Tab("skills", "Skills"));
    model.addTab(new Tab("contact", "Contact Me"));

    //Setup tabs
    model.getTabById("projects").loadJsonContentFromUrl("/data/projects.json", "projects")
        .onDone((tab) => {
            var newData: KnockoutObservableArray<Project> = ko.observableArray<Project>();

            //Convert body to markdown and data to ko.observableArray
            _.each(tab.data(), function (project: any) {
                project.body = marked(project.body);

                newData.push(Project.fromObject(project));
            });

            tab.data(newData);
        });
    model.getTabById("skills").loadTextContextFromUrl("/data/skills.md")
        .onDone((tab) => {
            tab.data(marked(tab.data()));
        });
    model.getTabById("contact").loadTextContextFromUrl("/data/contact.md")
        .onDone((tab) => {
            tab.data(marked(tab.data()));
        });

    ko.applyBindings(model);
});