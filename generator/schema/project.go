package schema

// ProjectHeader holds project metadata
type ProjectHeader struct {
	// Name of project
	Name string `json:"name" toml:"name"`

	// Languages used in project
	// Automatically populated by the GitHub API.
	Languages []string `json:"languages" toml:"languages"`

	// Category of project
	// Used to differentiate big projects from small tools ect.
	Category string `json:"category" toml:"category"`

	// Technologies used to create project
	Technologies []string `json:"technologies" toml:"technologies"`
}
