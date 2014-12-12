/* JSHint */
/* global _:false */
/* global ko:false */
(function(){
  "use strict";

  var Log = new LogHelper();

  function LogHelper(){
    var self = this;

    self.INFO_TAG = "INFO";
    self.ERROR_TAG = "ERROR";
    self.DEBUG_TAG = "DEBUG";

    self.mutedTags = [];

    /* Actions */
    self.validString = function(string){
      return typeof string === "string" && string !== undefined && string.length !== 0;
    };

    self.write = function(tag, location, data){
      if(self.mutedTags.indexOf(tag) === -1 && self.mutedTags.indexOf("*") === -1){
        tag = self.validString(tag) ? "[" + tag + "]" + (!self.validString(location) ? " - " : " ") : "";
        location = self.validString(location) ? location + " - " : "";

        console.log(tag + location + data);
      }
    };

    self.mute = function(tag){
      tag = self.validString(tag) ? tag : "*";//If no tag is entered then default to *, which mutes all

      if(tag === "*"){
        self.mutedTags = ["*"];
      } else if(self.mute.indexOf(tag) === -1){
        self.mutedTags.push(tag);
      }
    };

    self.unmute = function(tag){
      tag = self.validString(tag) ? tag : "*";//If no tag is entered then default to *, which unmutes all tags

      if(tag === "*"){
        self.mutedTags = [];
      } else if(self.mute.indexOf(tag) === -1){
        self.mutedTags = _.without(self.mutedTags, tag);
      }
    };

    /* Log Tags */
    self.i = function(location, data){
      self.write(self.INFO_TAG, location, data);
    };

    self.e = function(location, data){
      self.write(self.ERROR_TAG, location, data);
    };

    self.d = function(location, data){
      self.write(self.DEBUG_TAG, location, data);
    };
  }

  function AppModel(){
    var self = this;

    self.tabs = ko.observableArray();

    /* Actions */
    self.shouldShowTab = function(tabId){
      return self.getTabById(tabId) !== undefined && self.getTabById(tabId).active();
    };

    /* Getters */
    self.getTabById = function(tabId){
      return _.filter(self.tabs(), function(item){
        return item.tabId() === tabId();
      });
    };

    /* Setters */
    self.addTab = function(tab){
      if(self.getTabById(tab.tabId()) === undefined){
        self.tabs().push(tab);
      }
    };

    /* Init */
    //self.addTab(new Tab("projects"));
  }

  function Tab(tabId){
    var self = this;

    self.tabId = ko.observable(tabId);
    self.content = ko.observable({});
    self.active = ko.observable(true);

    self.loadContentFromUrl = function(url){
      $.getJSON(url, function fetchedJson(data, err){
        if(err === undefined){
          self.content = data;
        } else{
          Log.e("Tab[" + self.tabId + "].loadContentFromUrl", "Can not load data from \"" + url + "\", error: " + err);
        }
      });
    };
  }

  $(document).ready(function(){
    ko.applyBindings(new AppModel());
  });
}());
