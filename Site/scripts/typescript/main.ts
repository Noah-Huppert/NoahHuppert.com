//var Log: LogHelper = new LogHelper();

$(document).ready(function () {
    var model: AppModel = new AppModel();

    //Add tabs
    model.addTab(new Tab("projects", true));

    //Setup tabs
    model.getTabById("projects").loadContentFromUrl("/data/projects.json");

    ko.applyBindings(model);
});