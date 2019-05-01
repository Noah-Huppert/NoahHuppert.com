<template>
  <div>
    <Bio :languages="languages">
    </Bio>
    
    <Projects :ordered-project-slugs="orderedProjectSlugs"
	      :ordered-projects="orderedProjects"
	      :projects="projects">
    </Projects>
  </div>
</template>

<script>
import Bio from "./Bio.vue"
import Projects from "./Projects.vue"

import "../content/projects.json"
import "../content/languages.json"
import "../content/technologies.json"

export default {
    data() {
	return {
	    orderedProjectSlugs: [],
	    orderedProjects: [],
	    projects: {},

	    languagesIndex: {},
	    languages: [],

	    technologiesIndex: {},
	    technologies: []
	}
    },
    components: {
	Bio,
	Projects
    },
    mounted() {
	var self = this

	// Get projects
	var getProjectsProm = fetch("content/projects.json").then(res => {
	    return res.json()
	}).then((body) => {
	    self.orderedProjectSlugs = body.ordered_slugs
	    self.projects = body.projects

	    for (var k in self.orderedProjectSlugs) {
		self.orderedProjects.push(self.projects[self.orderedProjectSlugs[k]])
	    }
	}).catch((err) => {
	    console.error("Failed to load projects", err)
	    throw "Failed to load projects"
	})

	// Get languages index
	var getTechsIndexProm = fetch("content/languages.json").then(res => {
	    return res.json()
	}).then(body => {
	    self.languagesIndex = body
	    self.languages = Object.keys(body)
	}).catch(err => {
	    console.error("Failed to load languages index", err)
	    throw "Failed to load projects metadata"
	})

	// Get technologies index
	var getLangsIndexProm = fetch("content/technologies.json").then(res=> {
	    return res.json()
	}).then(body => {
	    self.technologiesIndex = body
	    self.technologies = Object.keys(body)
	}).catch(err => {
	    console.error("Failed to load technologies index", err)
	    throw "Failed to load projects metadata"
	})

	return Promise.all([getProjectsProm, getLangsIndexProm, getTechsIndexProm])
    }
}
</script>
