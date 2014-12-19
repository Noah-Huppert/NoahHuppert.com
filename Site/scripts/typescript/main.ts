$(document).ready(function () {
    var model: AppModel = new AppModel();

    //Add tabs
    model.addTab(new Tab("projects", "Projects", true));
    model.addTab(new Tab("skills", "Skills"));
    model.addTab(new Tab("contact", "Contact Me"));

    //Setup tabs
    model.getTabById("projects").loadContentFromUrl("/data/projects.json", "projects");

    ko.applyBindings(model);
});