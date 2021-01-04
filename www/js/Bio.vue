<template>
  <section id="bio" class="padded content-max">
    <h2>About Me</h2>

    <p>
      My name is Noah Huppert. I am a computer scientist
	 who solves cool problems using my full stack
	 experience with cloud operations, frontend, web
	 APIs, databases, firmware, electronic circuits, and
	 project management.
	 <br><br>
	 I enjoy learning by building small projects. For fun I
	 rollerblade, snowboard, and play video games. These coming
	 months will be my final semester studying computer science,
	 political theory, and foreign languages at the
	 University of Massachusetts Amherst. 
    </p>

    <p>
      <b>Programming languages I use:</b> {{ languagesStr }}.
    </p>
  </section>
</template>

<script>
export default {
    props: [ "languages", "technologies" ],
    computed: {
	languagesStr() {
	    return this.languages.join(", ")
	}
    }
}
</script>

<style>
#bio p {
    padding-left: 1.5rem;
    font-size: 2.2rem;
}
</style>
