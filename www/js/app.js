const errorBoundary = {
    template: "#template-error-boundary",
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
    }
};

const projects = {
    template: "#template-x-projects",
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
	    throw "Failed to load projects";
	    
	    console.error("Failed to load projects", err);
	});
    }
};

const project = {
    template: "#template-x-project",
    props: ["project"],
};

var app = new Vue({
    el: "#app",
    components: {
	"error-boundary": errorBoundary,
	"x-projects": projects,
	"x-project": project
    }
});
