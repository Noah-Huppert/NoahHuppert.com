<template>
<div>
  <ErrorBoundary ref="errorBoundary">
    <template v-slot:header>
      <Header></Header>
    </template>

    <template v-slot:content>
      <Content></Content>
    </template>

    <template v-slot:footer>
      <Footer></Footer>
    </template>
  </ErrorBoundary>
</div>
</template>

<script>
import Header from "./Header.vue"
import ErrorBoundary from "./ErrorBoundary.vue"
import Content from "./Content.vue"
import Footer from "./Footer.vue"

export default {
    components: {
	ErrorBoundary,
	Header,
	Content,
	Footer
    }
}
</script>
