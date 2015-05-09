{
	"folders":
	[
		{
			"file_exclude_patterns":
			[
				"npm-debug.log",
				"css"
			],
			"folder_exclude_patterns":
			[
				"node_modules",
				"bower_components",
				".sass-cache"
			],
			"path": "."
		}
	],
    "build_systems":
    [
    	{
        	"name": "Sass Watch",
        	"shell_cmd": "sass --watch src/client/scss:src/client/css"
        }
    ]
}
