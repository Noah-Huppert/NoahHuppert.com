<template>
<div id="header-wrapper">
  <div id="header-bg"></div>
  <header class="padded content-max">
    <div id="fullname">
      <h1>Noah</h1>
      <h1 id="lastname">Huppert</h1>
    </div>
    
    <div id="contact">
      <div class="line">
	<img src="../imgs/email.svg">
	<div>contact <span class="bold">AT</span> noahh.io</div>
      </div>
      
      <div class="line">
	<img src="../imgs/github.svg">
	<div>
	  <a href="https://github.com/Noah-Huppert">Noah-Huppert</a>
	</div>
      </div>
      
      <div class="line">
	<img src="../imgs/lock.svg">
	<div>
	  <a href="https://keybase.io/noahh">Keybase</a>
	</div>
      </div>
    </div>
  </header>
</div>
</template>

<style>
#header-wrapper {
    overflow: hidden;
    margin-bottom: calc(-1 * var(--header-height) + 10rem);
}

@media(max-width: 980px) {
    :root {
	--header-height: 86rem !important;
    }

    header {
	display: block !important;
    }

    #fullname {
	width: 100% !important;
	text-align: center !important;
    }

    #lastname {
	text-align: center !important;
    }

    #contact {
	width: 29rem;
	display: block !important;
	margin: auto;
	margin-top: 4rem;
    }
}

header {
    display: flex;
    justify-content: space-between;
    z-index: 2;
    position: relative;
    top: calc(-1 * var(--header-height));
}

#header-bg {
    width: 150%;
    height: var(--header-height);
    z-index: 1;
    transform: rotate(-4deg);
    position: relative;
    top: -35rem;
    left: -20%;
    
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    background: #F5F5F5;
}

#fullname {
    width: 45rem;
    display: inline-block;
}

#firstname {
    text-align: left;
}

#lastname {
    text-align: right;
}

#contact {
    display: inline-block;
    vertical-align: top;
}

#contact .line {
    height: 4rem;
    line-height: 4rem;
    margin-top: 3rem;
    display: block;
}

#contact .line:first-of-type {
    margin-top: 0;
}

#contact .line img {
    width: 2.8rem;
    display: inline-block;
    vertical-align: middle;
}

#contact .line div {
    height: 100%;
    vertical-align: middle;
    display: inline-block;
    margin-left: 3rem;
    
    font-size: 2.4rem;
}
</style>
