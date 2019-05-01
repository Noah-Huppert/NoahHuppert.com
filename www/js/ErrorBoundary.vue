<template>
<div>
  <div id="error" v-bind:x-show="error.length > 0 ? 'true' : 'false'">
    {{ error }}
  </div>
  
  <slot name="header"></slot>
  
  <slot name="content" v-if="error.length == 0"></slot>
  <div id="error-content-msg" v-if="error.length > 0">
    Failed to display content
  </div>

  <slot name="footer"></slot>
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
	console.error("error boundary caught:", err, "-", info)
	
	if (typeof(err) == "string") {
	    this.error = err
	} else {
	    this.error = "Error while loading page"
	}

	return false
    }
}
</script>

<style>
#error {
    width: 100%;
    position: fixed;
    padding: 1rem;
    z-index: 3;
    top: calc(-1 * var(--error-height));
    transition: top 1s;

    text-align: center;
    font-size: 2rem;
    background: var(--color-red);
    color: white;
}

#error[x-show="true"] {
    top: 0;
}

#error-content-msg {
    width: 100%;
    margin-top: 4rem;
    
    font-size: 4rem;
    text-align: center;
    text-decoration: underline;
    text-decoration-color: var(--color-red);
}
</style>
