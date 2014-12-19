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
var Project = (function () {
    function Project(name, body, github) {
        this.name = ko.observable();
        this.body = ko.observable();
        this.github = ko.observable();
        this.name(name);
        this.body(body);
        this.github(github);
    }
    Project.fromObject = function (obj) {
        return new Project(obj.name, obj.body, obj.github);
    };
    return Project;
})();
var Promise = (function () {
    function Promise() {
        this.firedDone = false;
        this.firedDoneData = {};
        this.firedError = false;
        this.firedErrorData = {};
    }
    /* Firing */
    Promise.prototype.fireDone = function (data) {
        this.firedDone = true;
        this.firedDoneData = data;
        if (this.doneCallback != undefined) {
            this.doneCallback(data);
        }
    };
    Promise.prototype.fireError = function (data) {
        this.firedError = true;
        this.firedErrorData = data;
        if (this.errorCallback != undefined) {
            this.errorCallback(data);
        }
    };
    /* Mapping */
    Promise.prototype.onDone = function (doneCallback) {
        this.doneCallback = doneCallback;
        if (this.firedDone) {
            this.fireDone(this.firedDoneData);
        }
    };
    Promise.prototype.onError = function (errorCallback) {
        this.errorCallback = errorCallback;
        if (this.firedError) {
            this.fireError(this.firedErrorData);
        }
    };
    return Promise;
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
    Tab.prototype.loadJsonContentFromUrl = function (url, key) {
        var _this = this;
        var promise = new Promise();
        $.getJSON(url, function (data, err) {
            if (err == "success") {
                if (key) {
                    _this.data(data[key]);
                    promise.fireDone(_this);
                }
                else {
                    _this.data(data);
                    promise.fireDone(_this);
                }
            }
            else {
                Log.e("Tab-" + _this.id() + ".loadJsonContentFromUrl", err);
                promise.fireError({ "this": _this, "err": err });
            }
        });
        return promise;
    };
    Tab.prototype.loadTextContextFromUrl = function (url) {
        var _this = this;
        var promise = new Promise();
        $.get(url, function (data, err) {
            if (err == "success") {
                _this.data(data);
                promise.fireDone(_this);
            }
            else {
                Log.e("Tab-" + _this.id() + ".loadTextContextFromUrl", err);
                promise.fireError({ "this": _this, "err": err });
            }
        });
        return promise;
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
    model.getTabById("projects").loadJsonContentFromUrl("/data/projects.json", "projects").onDone(function (tab) {
        var newData = ko.observableArray();
        //Convert body to markdown and data to ko.observableArray
        _.each(tab.data(), function (project) {
            project.body = marked(project.body);
            newData.push(Project.fromObject(project));
        });
        tab.data(newData);
    });
    model.getTabById("skills").loadTextContextFromUrl("/data/skills.md").onDone(function (tab) {
        tab.data(marked(tab.data()));
    });
    model.getTabById("contact").loadTextContextFromUrl("/data/contact.md").onDone(function (tab) {
        tab.data(marked(tab.data()));
    });
    ko.applyBindings(model);
});
//# sourceMappingURL=main.js.map