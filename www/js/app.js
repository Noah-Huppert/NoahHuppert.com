var app = new Vue({
	el: "#app",
	data: {
		projects: [
			{title: "Crime Map", description: "Analysis of "+
				"recent criminal activity in the University "+
				"City area of Philadelphia.",
				github: "Noah-Huppert/crime-map",
				languages: ["Go", "HTML", "Javascript"],
				status: "wip"},
			{title: "GitHub Gantt", description: "Generates a"+
				" Gantt chart for a GitHub repositories' "+
				"issues using the GitHub and ZenHub APIs.",
				github: "Noah-Huppert/gh-gantt",
				languages: ["Go", "Javascript", "HTML"],
				status: "wip"},
			{title: "Flock", description: "Automates the process "+
				"of planning events with friends.",
				github: "Open-Proj/flock",
				languages: ["Javascript", "HTML", "CSS"],
				status: "wip"},
			{title: "Zen Task", description: "User experience "+
				"focused mobile Task Warrior client.",
				github: "Open-Proj/zen-task", 
				languages: ["Dart", "C++", "XML"],
				status: "wip"},
			{title: "Py I2C Register", description: "Python "+
				"wrapper library around the common I2C "+
				"controller register pattern.", 
				github: "Noah-Huppert/py-i2c-register",
				languages: ["Python"], status: "complete"},
			{title: "Inertial Motion Capture", 
				description: "Motion capture using Inertial "+
				"Motion Units.", 
				github: "Noah-Huppert/Inertial-Motion-Capture",
				languages: ["C++","Python","C#"],
				status: "complete"},
			{title: "Lidar Lite", 
				description: "Code necessary to get a Lidar "+
				"Lite v3 unit working with an Omega "+
				"microcontroller.",
				github: "Noah-Huppert/Lidar-Lite",
				languages: ["Python"], status: "complete"},
			{title: "NoahHuppert.com", description: "Personal "+
				"website hosted on Kubernetes and "+
				"automatically deployed with Drone CI and Helm.",
				github: "Noah-Huppert/NoahHuppert.com",
				languages: ["YAML", "HTML", "JavaScript", "CSS"],
				status: "complete"},
			{title: "Redmine To GSheets", 
				description: "Google Sheets Script for "+
				"taking a Redmine CSV issue export and "+
				"displaying it on a Google Sheet.",
				github: "Noah-Huppert/redmine-to-g-sheets",
				languages: ["Javascript"], 
				status: "complete"},
			{title: "Zsh Conf", description: "A barebones zsh"+
				" configuration tool.", 
				github: "Noah-Huppert/zshconf", 
				languages: ["Bash"], status: "complete"},
			{title: "Scripts", description: "A collection of "+
				"useful Bash scripts.", 
				github: "Noah-Huppert/scripts",
				languages: ["Bash"], status: "complete"},
			{title: "Make Log", description: "A simple colored"+
				" log function for Make.", 
				github: "Noah-Huppert/make-log",
				languages: ["Make"], status: "complete"},

		],
		languages: ["C++", "C#", "Java", "Python", "Javascript", "Go", 
				"Rust", "Swift", "Ruby", "HTML", "CSS", "SQL",
				"GLSL", "Basic", "PHP", "Bash"],
		statuses: {
			wip: {
				text: "WIP",
				icon: "/img/wip.png"
			},
			complete: {
				text: "Done",
				icon: "/img/complete-2.png"
			}
		}
	}
})
