<template>
  <section id="bio" class="padded content-max">
    <h2>About Me</h2>

    <p>
      My name is Noah Huppert, I am a computer scientist
	 who cares deeply about human rights. My work
	 focuses on solving problems in the software and
	 hardware stack. With experience ranging from cloud
	 computing and web development to firmware and
	 electronics.
	 <br><br>
	 I enjoy spending time outdoors, working on
	 projects, and playing video games. In the summer
	 you will find me biking and rollerblading, while in
	 the winter I'll be on the slopes snowboarding. As
	 someone who loves the open source community all my
	 side projects are open source themselves, and I
	 run Void Linux on my laptop and server. In these
	 coming months I will complete my last semester at
	 the University of Massachusetts Amherst. Where I
	 am studying computer science, and also enjoy
	 learning about political theory and
	 foreign languages.
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
