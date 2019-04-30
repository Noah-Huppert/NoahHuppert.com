const errorBoundary = {
    data: function() {
	return {
	    error: ""
	};
    },
    errorCaptured: function(err, vm, info) {
	if (typeof(err) == "string") {
	    this.error = err;
	} else {
	    this.error = "Error while loading page";
	}
	
	console.error("error boundary:", err, vm, info)
    },
    template: `
        <div>
            <div id="error" v-bind:x-show="error.length > 0 ? 'true' : 'false'">
                {{ error }}
            </div>
            <slot></slot>
        </div>`,
};

const projects = {
    data: function() {
	return {
	    orderedProjectSlugs: [],
	    orderedProjects: [],
	    projects: {}
	};
    },
    mounted: function() {
	var self = this;
	
	fetch("/content/projects.json").then(function(res) {
	    return res.json();
	}).then(function(body) {
	    self.orderedProjectSlugs = body.ordered_slugs;
	    self.projects = body.projects;

	    for (k in self.orderedProjectSlugs) {
		self.orderedProjects.push(self.projects[self.orderedProjectSlugs[k]]);
	    }
	}).catch(function(err) {
	    self.error = "Failed to load projects";
	    
	    console.error("Failed to load projects", err);
	});
    },
    template: `
        <div>
            <div v-for="item in orderedProjects">
                {{ item.name }}
            </div>
        </div>`
};

var app = new Vue({
    el: "#app",
    components: {
	"error-boundary": errorBoundary,
	"x-projects": projects
    }
});
