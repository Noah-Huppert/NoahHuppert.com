var options = {
	content: "",
	update: function(){
		if(this.innerHTML !== undefined){
			this.innerHTML = this.content;
		}
	},
	ready: function(){
		this.update();
	},
	contentChanged: function(){
		this.update();
	}
};

Polymer("raw-html", options);