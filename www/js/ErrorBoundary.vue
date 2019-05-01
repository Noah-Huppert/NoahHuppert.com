<template>
<div>
  <div id="error" v-bind:x-show="error.length > 0 ? 'true' : 'false'">
    {{ error }}
  </div>
  <slot></slot>
</div>
</template>

<script>
export default {
    data() {
	return {
	    error: ""
	}
    },
    errorCaptured(err, vm, info) {
	if (typeof(err) == "string") {
	    this.error = err;
	} else {
	    this.error = "Error while loading page";
	}
	
	console.error("error boundary:", err, vm, info)
    }
}
</script>
