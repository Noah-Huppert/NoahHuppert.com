<template>
<div>
  <ErrorBoundary ref="errorBoundary">
    <div>
      <Header></Header>
      
      <Projects></Projects>
    </div>
  </ErrorBoundary>
</div>
</template>

<script>
import Header from "./Header.vue"
import ErrorBoundary from "./ErrorBoundary.vue"
import Projects from "./Projects.vue"

export default {
    data() {
	return {}
    },
    components: {
	ErrorBoundary,
	Header,
	Projects
    }
}
</script>
