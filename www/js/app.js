import Vue from "vue"
import App from "./App.vue"

import "../css/styles.css"
import "../favicon.ico"

Vue.config.errorHandler = function(err, vm, info) {
    console.error("error inside vue", err, info)
}

var app = new Vue({
    el: "#app",
    render: h => h(App)
})
