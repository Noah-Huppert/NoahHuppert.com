var app = new Vue({
	el: "#app",
	data: {
		projects: [
			{"title": "Py I2C Register", "description": "Python "+
				"wrapper library around the common I2C "+
				"controller register pattern.", 
				"github": "Noah-Huppert/py-i2c-register",
				"languages": ["Python"]},
			{"title": "Zsh Conf", "description": "A barebones zsh"+
				" configuration tool.", 
				"github": "Noah-Huppert/zshconf", 
				"languages": ["Bash"]},
			{"title": "Scripts", "description": "A collection of "+
				"useful Bash scripts.", 
				"github": "Noah-Huppert/scripts",
				"languages": ["Bash"]},
			{"title": "Make Log", "description": "A simple colored"+
				" log function for Make.", 
				"github": "Noah-Huppert/make-log",
				"languages": ["Make"]},
			{"title": "Inertial Motion Capture", 
				"description": "Motion capture using Inertial "+
				"Motion Units.", 
				"github": "Noah-Huppert/Inertial-Motion-Capture",
				"languages": ["C++","Python","C#"]},
			{"title": "Lidar Lite", 
				"description": "Code necessary to get a Lidar "+
				"Lite v3 unit working with an Omega "+
				"microcontroller.",
				"github": "Noah-Huppert/Lidar-Lite",
				"languages": ["Python"]},
			{"title": "Redmine To GSheets", 
				"description": "Google Sheets Script for "+
				"taking a Redmine CSV issue export and "+
				"displaying it on a Google Sheet.",
				"github": "Noah-Huppert/redmine-to-g-sheets",
				"languages": ["Javascript"]}
		],
		languages: ["C++", "C#", "Java", "Python", "Javascript", "Go", 
				"Rust", "Swift", "Ruby", "HTML", "CSS", "SQL",
				"GLSL", "Basic", "PHP", "Bash"]
	}
})
