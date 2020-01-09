package schema

// ProjectHeader holds project metadata
type ProjectHeader struct {
	// Name of project
	Name string `validate:"required"`

	// Languages used in project
	// Automatically populated by the GitHub API.
	Languages []string `validate:"required"`

	// Category of project
	// Used to differentiate big projects from small tools ect.
	Category string `validate:"required"`

	// Technologies used to create project
	Technologies []string `validate:"required"`
}
