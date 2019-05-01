<template>
<section id="projects" class="padded content-max">
  <h2>Projects</h2>
  
  <div v-for="project in orderedProjects">
    {{ project.name }}
  </div>
</section>
</template>

<script>
import "../content/projects.json"
  
export default {
    data() {
	return {
	    orderedProjectSlugs: [],
	    orderedProjects: [],
	    projects: {}
	}
    },
    mounted() {
	var self = this
	
	return fetch("/content/projects.json").then(function(res) {
	    return res.json()
	}).then(function(body) {
	    self.orderedProjectSlugs = body.ordered_slugs
	    self.projects = body.projects

	    for (var k in self.orderedProjectSlugs) {
		self.orderedProjects.push(self.projects[self.orderedProjectSlugs[k]])
	    }
	}).catch(function(err) {
	    console.error("Failed to load projects", err)
	    throw "Failed to load projects"
	})
    }
}
</script>

<style>
#projects {
    padding-top: 0;
    margin-top: 5rem;
}
</style>
