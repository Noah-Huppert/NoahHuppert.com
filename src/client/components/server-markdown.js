var options = {
	src: "",
	endpoint: "/api/v1/markdown/html",
	accessToken: "",
	minUpdateTime: 1000,
	lastUpdated: Date.now(),
	updateTimeoutId: 0,
	update: function(){
		if(Date.now() - this.lastUpdated >= this.minUpdateTime){
			this._update();
			clearTimeout(this.updateTimeoutId);
		} else {
			clearTimeout(this.updateTimeoutId);

			var _this = this;

			this.updateTimeoutId = setTimeout(function(){
				_this._update(_this);
			}, this.minUpdateTime - (Date.now() - this.lastUpdated));
		}
	},
	_update: function(_this){
		if(_this === undefined){
			_this = this;
		}

		_this.lastUpdated = Date.now();

		if(_this.src === undefined){
			console.error("<server-markdown /> cannot have undefined \"src\" attribute");
		}

		if(_this.endpoint === undefined){
			console.error("<server-markdown /> cannot have undefined \"endpoint\" attribute");
		}

		if(_this.innerHTML !== undefined){
			$.ajax({
				url: _this.endpoint,
				data: {markdown: _this.src, access_token: _this.accessToken}
			})
			.done(function(res){
				_this.innerHTML = res.html;
			})
			.fail(function(err){
				console.error("Server Mardown error", err);
			});
		}
	},
	ready: function(){
		this.update();
	},
	srcChanged: function(){
		this.update();
	},
	endpointChanged: function(){
		this.update();
	},
	accessTokenChanged: function(){
		this.update();
	}
};

Polymer("server-markdown", options);