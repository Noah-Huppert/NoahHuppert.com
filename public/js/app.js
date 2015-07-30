"use strict";

app.join = function(a, b){
    return a + b;
};

app.Auth = {
    User: undefined,
    ApiAccessToken: {
        access_token: Cookies.get("access_token") || ""
    },
    LoadCallbacks: {
        identifyApiAccessToken: function(body){
            console.log(body);
        }
    }
};
