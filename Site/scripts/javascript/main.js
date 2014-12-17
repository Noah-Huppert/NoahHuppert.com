var Log;
(function (Log) {
    var INFO_TAG = "INFO";
    var DEBUG_TAG = "DEBUG";
    var ERROR_TAG = "ERROR";
    var mutedTags = [];
    function write(data, tag, location) {
        if (mutedTags.indexOf(tag) == -1 && mutedTags.indexOf("*") == -1) {
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
            console.log(tag, location, data);
        }
    }
    Log.write = write;
    function mute(tag) {
        if (tag && mutedTags.indexOf(tag) == -1) {
            mutedTags.push(tag);
        }
        else if (!tag) {
            mutedTags = ["*"];
        }
    }
    Log.mute = mute;
    function unmute(tag) {
        if (tag) {
            mutedTags = _.without(mutedTags, tag);
        }
        else {
            mutedTags = [];
        }
    }
    Log.unmute = unmute;
    /* Tags */
    function i(data, location) {
        write(data, INFO_TAG, location);
    }
    Log.i = i;
    function d(data, location) {
        write(data, DEBUG_TAG, location);
    }
    Log.d = d;
    function e(data, location) {
        write(data, ERROR_TAG, location);
    }
    Log.e = e;
})(Log || (Log = {}));
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
        Log.d(this.id, "Tab.constructor");
    }
    Tab.prototype.loadContentFromUrl = function (url) {
        Log.d(this.id, "Tab.loadContentFromUrl");
        $.getJSON(url, this.fetchedJsonData);
    };
    Tab.prototype.fetchedJsonData = function (data, err) {
        Log.d(this.id, "Tab.fetchedJsonData");
        /*if (err == "success") {
            this.data(data);
            Log.i(this.data());
        } else {
            Log.e("Tab-" + this.id() + ".loadContentFromUrl", err);
        }*/
    };
    return Tab;
})();
//var Log: LogHelper = new LogHelper();
$(document).ready(function () {
    var model = new AppModel();
    //Add tabs
    model.addTab(new Tab("projects", true));
    //Setup tabs
    model.getTabById("projects").loadContentFromUrl("/data/projects.json");
    ko.applyBindings(model);
});
//# sourceMappingURL=main.js.map