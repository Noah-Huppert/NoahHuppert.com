<template>
  <section id="bio" class="padded content-max">
    <h2>About Me</h2>

    <p>
      My name is Noah Huppert, I am a computer scientist
	 who solves problems in the software and hardware
	 development stack. My experience ranges from work
	 in cloud computing and web development to firmware
	 and electronics.
	 <br><br>
	 I enjoy spending time outdoors biking,
	 rollerblading, and in the winter snowboarding.
	 Flight simulator and Cyberpunk 2077 are my games of
	 choice at the moment. Currently I run Void Linux
	 on my laptop and server. I spend some of my free
	 time working on side projects or contributing to
	 other open source. I am about to complete
	 my last semester at the University of Massachusetts
	 Amherst. Where I am studying computer science,
	 and also enjoy learning about political theory
	 and foreign languages.
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
