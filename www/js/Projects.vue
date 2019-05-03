><template>
<section id="projects" class="padded content-max">
  <div id="projects-header">
    <h2>Projects</h2>
    <input type="text" placeholder="Search projects" v-model="projectSearch">
  </div>
  
  <div id="projects-container">
    <a v-bind:href="'https://github.com/' + project.github"
       class="project" v-for="project in searchedProjects">
      
      <div class="project-header">
	<h3>{{ project.name }}</h3>
	<img alt="chain link icon" src="../imgs/chain.svg">
      </div>
      
      <p>{{ project.content }}</p>

      <div id="languages">
	<span v-for="lang in project.languages">
	  {{ lang }}
	</span>
      </div>
    </a>
    
    <span id="projects-no-search-match" v-if="searchedProjects.length == 0">
      No matching projects found
    </span>
  </div>
</section>
</template>

<script>
const fuzz = require("fuzzball")
  
export default {
    props: [ "orderedProjectSlugs", "orderedProjects", "projects" ],
    data() {
	return {
	    projectSearch: ""
	}
    },
    computed: {
	searchedProjects() {
	    if (this.projectSearch.length == 0) {
		return this.orderedProjects
	    }

	    var searched = [];

	    for (var i in this.orderedProjects) {
		const project = this.orderedProjects[i]

		var searchValues = [
		    project.name
		]

		searchValues.push.apply(searchValues, project.languages)
		searchValues.push.apply(searchValues, project.technologies)
		
		for (var j in searchValues) {
		    if (fuzz.partial_ratio(searchValues[j], this.projectSearch) > 80) {
			searched.push(project)
			break
		    }
		}
	    }

	    return searched
	}
    }
}
</script>

<style>
#projects {
    padding-top: 0;
    margin-top: 5rem;
}

#projects-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}

#projects-header input {
    max-width: 80rem;
    min-width: 1rem;
    height: 4rem;

    margin-right: 3rem;
    margin-left: 4rem;
    padding-left: 1rem;
    
    display: inline-flex;
    flex: 1 1 37rem;

    border-radius: 0;
    border: 0.2rem black solid;
    
    font-size: 2rem;
}

@media(max-width: 1019px) {
    #projects-header input {
	margin: 1rem;
    }
}

#projects-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.project {
    width: 37rem;
    min-height: 22rem;

    margin: 3rem;
    padding: 1.5rem;
    
    flex: 1 1 37rem;
    flex-direction: column;
    display: inline-flex;
    
    color: black;
    text-decoration: none;
    
    border: 3px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
    transition: box-shadow 0.25s;
}

@media(max-width: 1019px) {
    .project {
	margin: 1rem;
    }
}

.project:hover {
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
}

.project-header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

.project h3 {
    font-weight: bold;
    flex: 1;
}

.project img {
    width: 2rem;
}

.project p {
    font-size: 2rem;
    flex: 1;
}

.project #languages {
    display: inline-flex;
    flex-direction: row;
}

.project #languages span {
    padding: 0.8rem;
    margin-right: 0.5rem;
    
    box-sizing: border-box;
    
    border: 0.2rem solid var(--color-blue);
    border-radius: 0.3rem;
    color: var(--color-blue);
}

#projects-no-search-match {
    font-size: 2.5rem;
    margin-left: 1rem;
}
</style>
