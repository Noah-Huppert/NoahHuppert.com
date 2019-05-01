><template>
<section id="projects" class="padded content-max">
  <h2>Projects</h2>
  
  <div id="projects-container">
    <a v-bind:href="'https://github.com/' + project.github"
       class="project" v-for="project in orderedProjects">
      <h3>{{ project.name }}<img alt="chain link icon" src="../imgs/chain.svg"></h3>
      
      <p>{{ project.content }}</p>

      <div id="languages">
	<span v-for="lang in project.languages">
	  {{ lang }}
	</span>
      </div>
    </a>
  </div>
</section>
</template>

<script>
export default {
    props: [ "orderedProjectSlugs", "orderedProjects", "projects" ]
}
</script>

<style>
#projects {
    padding-top: 0;
    margin-top: 5rem;
}

#projects-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

#projects h2 {
    margin-bottom: 1rem;
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

.project h3 {
    font-weight: bold;
}

.project img {
    width: 2rem;
    margin-left: 1rem;
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
</style>
