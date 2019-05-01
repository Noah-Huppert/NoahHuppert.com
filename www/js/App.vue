<template>
<div>
  <ErrorBoundary>
    <Header></Header>
  </ErrorBoundary>
</div>
</template>

<script>
import Header from "./Header.vue"
import ErrorBoundary from "./ErrorBoundary.vue"

export default {
    data() {
	return {}
    },
    components: {
	Header,
	ErrorBoundary
    }
}
</script>
