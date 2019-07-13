package schema

// InputFile is 1 content file
type InputFile struct {
	// Header holds metadata
	Header

	// Content is markdown formatted
	Content string `json:"content"`
}
