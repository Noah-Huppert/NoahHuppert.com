var LogHelper = (function () {
    function LogHelper() {
        this.INFO_TAG = "INFO";
        this.DEBUG_TAG = "DEBUG";
        this.ERROR_TAG = "ERROR";
        this.mutedTags = [];
    }
    LogHelper.prototype.write = function (data, tag, location) {
        if (this.mutedTags.indexOf(tag) == -1 && this.mutedTags.indexOf("*") == -1) {
            var tagSuffix = location ? " " : " - ";
            if (tag) {
                tag = "[" + tag + "]" + tagSuffix;
            }
            else {
                tag = tagSuffix;
            }
            if (location) {
                location += " - ";
            }
            else {
                location = "";
            }
            console.log(tag + location + data);
        }
    };
    LogHelper.prototype.mute = function (tag) {
        if (tag && this.mutedTags.indexOf(tag) == -1) {
            this.mutedTags.push(tag);
        }
        else if (!tag) {
            this.mutedTags = ["*"];
        }
    };
    LogHelper.prototype.unmute = function (tag) {
        if (tag) {
            this.mutedTags = _.without(this.mutedTags, tag);
        }
        else {
            this.mutedTags = [];
        }
    };
    /* Tags */
    LogHelper.prototype.i = function (data, location) {
        this.write(data, this.INFO_TAG, location);
    };
    LogHelper.prototype.d = function (data, location) {
        this.write(data, this.DEBUG_TAG, location);
    };
    LogHelper.prototype.e = function (data, location) {
        this.write(data, this.ERROR_TAG, location);
    };
    return LogHelper;
})();
var AppModel = (function () {
    function AppModel() {
        this.tabs = ko.observableArray();
    }
    /* Actions */
    AppModel.prototype.addTab = function (tab) {
        if (this.getTabById(tab.id()) == undefined) {
            this.tabs().push(tab);
        }
    };
    AppModel.prototype.getTabById = function (tabId) {
        return _.filter(this.tabs(), function (item) {
            return item.id() === tabId;
        })[0];
    };
    return AppModel;
})();
var Tab = (function () {
    function Tab(id, active) {
        this.id = ko.observable();
        this.active = ko.observable();
        this.data = ko.observable();
        this.id(id);
        if (active) {
            this.active(active);
        }
    }
    Tab.prototype.loadContentFromUrl = function (url) {
        $.getJSON(url, function fetchedJson(data, err) {
            if (err == undefined) {
                this.data = data;
            }
            else {
                Log.e("Tab[" + this.id() + "].loadContentFromUrl", "Can not load data from \"" + url + "\", error: " + err);
            }
        });
    };
    return Tab;
})();
var Log = new LogHelper();
$(document).ready(function () {
    var model = new AppModel();
    //Add tabs
    model.addTab(new Tab("projects", true));
    //Setup tabs
    model.getTabById("projects").loadContentFromUrl("https://api.orchestrate.io/v0/Projects");
    //TODO Make work with orchestrate.io API
    ko.applyBindings(model);
});
//# sourceMappingURL=main.js.map