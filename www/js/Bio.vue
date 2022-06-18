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
	 I enjoy playing video games, rollerblading, and learning by building small projects. 
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
