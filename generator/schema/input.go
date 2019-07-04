package schema

// Input file
type Input struct {
	// Header holds metadata
	Header interface{} `json:"header"`

	// Content is markdown formatted
	Content string `json:"content"`
}
