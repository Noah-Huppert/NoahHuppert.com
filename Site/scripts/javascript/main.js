var AppController = (function () {
    function AppController() {
        this.tabs = ko.observableArray();
    }
    /* Actions */
    //Tabs
    AppController.prototype.addTab = function (tab) {
        if (this.getTabById(tab.id()) == undefined) {
            this.tabs().push(tab);
        }
    };
    AppController.prototype.getTabById = function (tabId) {
        return _.filter(this.tabs(), function (item) {
            return item.id() === tabId;
        })[0];
    };
    AppController.prototype.shouldShowTab = function (tabId) {
        var tab = this.getTabById(tabId);
        return tab != undefined && tab.active();
    };
    AppController.prototype.switchTab = function (tabId) {
        _.each(this.tabs(), function (tab) {
            if (tab.id() == tabId) {
                tab.active(true);
            }
            else {
                tab.active(false);
            }
        });
    };
    return AppController;
})();
var GithubController = (function () {
    function GithubController() {
        this.URL_ROOT = "https://api.github.com";
        this.OPTIONS = {
            "Accept": "application/vnd.github.v3+json"
        };
        this.entryPoints = {
            "repos": {
                "get": new ApiEntryPoint(this.URL_ROOT, "/repos/:owner/:repo", this.OPTIONS)
            }
        };
    }
    return GithubController;
})();
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
var ApiEntryPoint = (function () {
    function ApiEntryPoint(host, path, options) {
        this.host = host;
        this.path = path;
        if (options) {
            this.options = options;
        }
    }
    ApiEntryPoint.prototype.build = function (wildcards) {
        var replacedPath = this.path;
        _.each(wildcards, function (value, key) {
            var pathParts = replacedPath.split(":" + key);
            replacedPath = pathParts.join(value);
        });
        return this.host + replacedPath;
    };
    ApiEntryPoint.prototype.call = function (wildcards, method, options) {
        var promise = new Promise();
        if (!options) {
            options = {};
        }
        _.each(this.options, function (key, value) {
            options[key] = value;
        });
        if (options.url == undefined) {
            options.url = this.build(wildcards);
        }
        if (options.type == undefined) {
            options.type = method;
        }
        options.complete = function (data) {
            if (data.status != 200) {
                promise.fireError(data);
            }
            else {
                promise.fireDone(data);
            }
        };
        $.ajax(options);
        return promise;
    };
    return ApiEntryPoint;
})();
var MultiPromise = (function () {
    function MultiPromise(numStages) {
        this.stages = {};
        for (var i = 1; i < numStages; i++) {
            this.stages[i] = {
                "statuses": {
                    "done": {
                        "fired": false,
                        "data": {},
                        "callback": undefined
                    },
                    "error": {}
                }
            };
        }
    }
    return MultiPromise;
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
    Project.prototype.getGithubUsername = function () {
        var githubParts = this.github().split("/");
        return githubParts[0];
    };
    Project.prototype.getGithubRepo = function () {
        var githubParts = this.github().split("/");
        return githubParts[1];
    };
    Project.prototype.getGithubOther = function () {
        var githubParts = this.github().split("/");
        githubParts.splice(0, 1);
        return githubParts.join("/");
    };
    Project.prototype.getGithubUrl = function () {
        return "https://github.com/" + this.github();
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
    var githubController = new GithubController();
    var appController = new AppController();
    var donePromise = new Promise();
    githubController.entryPoints.repos.get.call({ "owner": "Noah-Huppert", "repo": "NoahHuppert.com" }, "GET").onDone(function (data) {
        //Log.d(data.responseJSON, "main.repo.get.onDone");
    });
    //Add tabs
    appController.addTab(new Tab("projects", "Projects", true));
    appController.addTab(new Tab("skills", "Skills"));
    appController.addTab(new Tab("contact", "Contact Me"));
    //Setup tabs
    appController.getTabById("projects").loadJsonContentFromUrl("/data/projects.json", "projects").onDone(function (tab) {
        var newData = ko.observableArray();
        //Convert body to markdown and data to ko.observableArray
        _.each(tab.data(), function (project) {
            project.body = marked(project.body);
            newData.push(Project.fromObject(project));
        });
        tab.data(newData());
        Log.d(tab.data());
    });
    appController.getTabById("skills").loadTextContextFromUrl("/data/skills.md").onDone(function (tab) {
        tab.data(marked(tab.data()));
    });
    appController.getTabById("contact").loadTextContextFromUrl("/data/contact.md").onDone(function (tab) {
        tab.data(marked(tab.data()));
    });
    ko.applyBindings(appController);
});
//# sourceMappingURL=main.js.map