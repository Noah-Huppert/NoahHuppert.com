var app = new Vue({
	el: "#app",
	data: {
		projects: [	
			{title: "Lidar Lite", 
				description: "Code necessary to get a Lidar "+
				"Lite v3 unit working with an Omega "+
				"microcontroller.",
				github: "Noah-Huppert/Lidar-Lite",
				languages: ["Python"], status: "complete"},
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
			{title: "Human Call Filter", description: "Captcha "+
				"for phone calls.",
				github: "Noah-Huppert/human-call-filter",
				languages: ["Go", "HTML", "Javascript", "CSS"],
				status: "complete"},
			{title: "Kubernetes Deploy",
				description: "Kubernetes deployment command "+
				"line tool.", github: "Noah-Huppert/k8s-deploy",
				languages: ["Bash"], status: "complete"},
			{title: "Kube Namespace", description: "Run multiple"+
				"kubectl commands in the same namespace.",
				github: "Noah-Huppert/kube-namespace",
				languages: ["Bash"], status: "complete"},
			{title: "Go Log", description: "A simple Go logging "+
				"package.", github: "Noah-Huppert/golog",
				languages: ["Go"], status: "complete"},
			{title: "CNC.js", description: "Web tool to convert "+
				"drawings into GCode which can be run by a "+
				"CNC mill.", github: "Noah-Huppert/CNC.js",
				languages: ["HTML", "Javascript", "CSS", 
				"GCode"],
				status: "complete"},
			{title: "Super Blocks", description: "A fun math "+
				"game which teaches children basic "+
				"arithmetic. Exhibited at Maker Faire 2014.",
				github: "Noah-Huppert/Super-Blocks",
				languages: ["C#"], status: "complete"},
			{title: "Bug Swatter", description: "Chrome "+
				"extension which annotates bug reports to "+
				"assist in moderating Fly Spray bug trackers.",
				github: "Noah-Huppert/Bug-Swatter",
				languages: ["HTML", "CSS", "Javascript"],
				status: "complete"},
			{title: "NoahHuppert.com", description: "Personal "+
				"website hosted on Kubernetes and "+
				"automatically deployed with Drone CI and Helm.",
				github: "Noah-Huppert/NoahHuppert.com",
				languages: ["YAML", "HTML", "JavaScript", "CSS"],
				status: "complete"},
			{title: "GitHub Gantt", description: "Generates a"+
				" Gantt chart for a GitHub repositories' "+
				"issues using the GitHub and ZenHub APIs.",
				github: "Noah-Huppert/gh-gantt",
				languages: ["Go", "Javascript", "HTML"],
				status: "wip"},
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
			{title: "Robotics Demo", description: "Demo for the "+
				"Woman in Robotics Seminar at NetApp.",
				github: "Noah-Huppert/RoboticsDemo",
				languages: ["Robot C"], status: "complete"},
			{title: "Style Google", description: "Chrome "+
				"extension which replaces the Google doodle "+
				"with a random font.", 
				github: "Noah-Huppert/Style-Google",
				languages: ["Javascript"], status: "complete"},
			{title: "PA Flashing Commander",
				description: "Planetary Annihilation mod "+
				"which applies the energy plant idle effect "+
				"to the player's commander skin.", 
				github: "Noah-Huppert/Flashing-Commander",
				languages: ["JSON"], status: "complete"},
			{title: "PA Mod Website",
				description: "Redesigned home page for a "+
				" Planetary Annihilation community mod site.",
				github: "Noah-Huppert/pamods.github.io",
				languages: ["HTML", "CSS"], status: "complete"},
			{title: "Virtual Pest", description: "Virtual pet "+
				"which changes moods in reaction to stimuli. "+
				"Created for Drexel CS 164.",
				github: "Noah-Huppert/Virtual-Pest",
				languages: ["HTML", "CSS", "Javascript"],
				status: "complete"},
			{title: "Client Center", description: "Custom made "+
				"bug tracker.", 
				github: "Noah-Huppert/Client-Center", 
				languages: ["PHP", "JavaScript", "CSS"],
				status: "complete"}
		],
		languages: ["C++", "C#", "Java", "Python", "Javascript", "Go", 
			"SQL", "Rust", "Swift", "Ruby", "HTML", "CSS", "JSON",
			"GLSL", "Basic", "PHP", "Bash", "Robot C", "GCode"],
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
});

var sidebarEl = document.getElementById("sidebar");
var cutoff = 64;

function animateSidebar() {
	var val = cutoff - window.scrollY;

	if (val < 0) {
		val = 0;
	}
	val = Math.round(val);

	sidebarEl.style.transform = "translateY(" + val + "px)";
}

var media = window.matchMedia("(max-width: 900px)");
media.onchange = function(e) {
	if (media.matches) {
		sidebarEl.style.transform = "translateY(0px)";
	} else {
		animateSidebar();
	}
}


document.onscroll = function(e) {
	if (!media.matches) {
		animateSidebar();
	} else {
		sidebarEl.style.transform = "translateY(0px)";
	}
};
