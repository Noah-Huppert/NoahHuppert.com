var app = new Vue({
	el: "#app",
	data: {
		projects: [
			{"title": "Py I2C Register", "description": "Python "+
				"wrapper library around the common I2C "+
				"controller register pattern.", 
				"github": "Noah-Huppert/py-i2c-register"},
			{"title": "Zsh Conf", "description": "A barebones zsh"+
				" configuration tool.", 
				"github": "Noah-Huppert/zshconf"},
			{"title": "Scripts", "description": "A collection of "+
				"useful Bash scripts.", 
				"github": "Noah-Huppert/scripts"},
			{"title": "Make Log", "description": "A simple colored"+
				" log function for Make.", 
				"github": "Noah-Huppert/make-log"},
			{"title": "Inertial Motion Capture", 
				"description": "Motion capture using Inertial "+
				"Motion Units.", 
				"github": "Noah-Huppert/Inertial-Motion-Capture"},
			{"title": "Lidar Lite", 
				"description": "Code necessary to get a Lidar "+
				"Lite v3 unit working with an Omega "+
				"microcontroller.",
				"github": "Noah-Huppert/Lidar-Lite"},
			{"title": "Redmine To GSheets", 
				"description": "Code necessary to get a Lidar"+
				" Lite v3 unit working with an Omega "+
				"microcontroller.",
				"github": "Noah-Huppert/redmine-to-g-sheets"}
		]
	}
})
