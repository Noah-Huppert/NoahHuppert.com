(function(document){
    "use strict";

    var App = document.querySelector("#app");

    /* Authetication */
    App.accessToken = Cookies.get("access_token");
    App.isAutheticated = function(){
        //TODO Make api access token endpoint to get user info from api access token
    };

    App.toggleNavigationDrawer = function(){
        var navigationDrawer = document.querySelector("#navigation-drawer");
        var active = navigationDrawer.getAttribute("data-active") === "true";

        navigationDrawer.setAttribute("data-active", !active);
    };

    App.hideNavigationDrawer = function(){
        var navigationDrawer = document.querySelector("#navigation-drawer");
        navigationDrawer.setAttribute("data-active", "false");
    };
})(document);
