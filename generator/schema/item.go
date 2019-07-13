package schema

// Item is 1 content file
type Item struct {
	// Header holds metadata
	Header

	//

	// Content is markdown formatted
	Content string `json:"content"`
}
