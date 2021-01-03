<template>
  <section id="bio" class="padded content-max">
    <h2>About Me</h2>

    <p>
      My name is Noah Huppert. I am a computer scientist
	 who creates systems using my full stack experience
	 with the cloud, websites and APIs, drivers and
	 firmware, electronic circuits, and
	 project management.
	 <br><br>
	 I enjoy creating side projects and using them to
	 learn. All my side projects are open source
	 on GitHub. I am completing my last semester at
	 the University of Massachusetts Amherst. Where I
	 am studying computer science and learning about
	 political theory and foreign languages.
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
