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
    //Tabs
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
    AppModel.prototype.shouldShowTab = function (tabId) {
        var tab = this.getTabById(tabId);
        return tab != undefined && tab.active();
    };
    AppModel.prototype.switchTab = function (tabId) {
        _.each(this.tabs(), function (tab) {
            if (tab.id() == tabId) {
                tab.active(true);
            }
            else {
                tab.active(false);
            }
        });
    };
    return AppModel;
})();
var Tab = (function () {
    function Tab(id, prettyName, active) {
        this.id = ko.observable();
        this.prettyName = ko.observable();
        this.active = ko.observable();
        this.data = ko.observable();
        this.id(id);
        this.prettyName(prettyName);
        if (active != undefined) {
            this.active(active);
        }
        else {
            this.active(false);
        }
    }
    Tab.prototype.loadContentFromUrl = function (url, key) {
        var _this = this;
        $.getJSON(url, function (data, err) {
            if (err == "success") {
                if (key) {
                    _this.data(data[key]);
                }
                else {
                    _this.data(data);
                }
            }
            else {
                Log.e("Tab-" + _this.id() + ".loadContentFromUrl", err);
            }
        });
    };
    return Tab;
})();
$(document).ready(function () {
    var model = new AppModel();
    //Add tabs
    model.addTab(new Tab("projects", "Projects", true));
    model.addTab(new Tab("skills", "Skills"));
    model.addTab(new Tab("contact", "Contact Me"));
    //Setup tabs
    model.getTabById("projects").loadContentFromUrl("/data/projects.json", "projects");
    ko.applyBindings(model);
});
//# sourceMappingURL=main.js.map