var Log: LogHelper = new LogHelper();

$(document).ready(function () {
    var model: AppModel = new AppModel();

    //Add tabs
    model.addTab(new Tab("projects", true));

    //Setup tabs
    model.getTabById("projects").loadContentFromUrl("https://api.orchestrate.io/v0/Projects");

    //TODO Make work with orchestrate.io API

    ko.applyBindings(model);
});