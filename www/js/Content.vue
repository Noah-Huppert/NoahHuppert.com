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

import projectsData from "../content/projects.json"
import languagesData from "../content/languages.json"
import technologiesData from  "../content/technologies.json"

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
		// Get projects
		this.orderedProjectSlugs = projectsData.ordered_slugs
		this.projects = projectsData.projects

		for (var k in this.orderedProjectSlugs) {
			this.orderedProjects.push(this.projects[this.orderedProjectSlugs[k]])
		}

		// Get languages index
		this.languagesIndex = languagesData
		this.languages = this.sortedObjKeys(languagesData)

		// Get technologies index
		this.technologiesIndex = technologiesData
		this.technologies = this.sortedObjKeys(technologiesData)
    }
}
</script>
