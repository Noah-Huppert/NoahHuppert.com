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
    methods: {
	sortedObjKeys(o) {
	    var sortable = []

	    for (var k in o) {
		sortable.push([k, o[k].length])
	    }

	    sortable.sort((a, b) => {
		if (a[1] > b[1]) {
		    return -1
		} else {
		    return 1
		}
	    })

	    var res = []
	    
	    for (var i in sortable) {
		res.push(sortable[i][0])
	    }

	    return res
	}
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
	    self.languages = this.sortedObjKeys(body)
	}).catch(err => {
	    console.error("Failed to load languages index", err)
	    throw "Failed to load projects metadata"
	})

	// Get technologies index
	var getLangsIndexProm = fetch("content/technologies.json").then(res=> {
	    return res.json()
	}).then(body => {
	    self.technologiesIndex = body
	    self.technologies = this.sortedObjKeys(body)
	}).catch(err => {
	    console.error("Failed to load technologies index", err)
	    throw "Failed to load projects metadata"
	})

	return Promise.all([getProjectsProm, getLangsIndexProm, getTechsIndexProm])
    }
}
</script>
