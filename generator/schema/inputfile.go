package schema

// InputFile is 1 content file
type InputFile struct {
	// Meta holds input file metadata.
	// Field set before marshalling.
	Meta
	
	// Header holds content metadata
	// Field set during marshalling.
	Header

	// Content is markdown formatted
	// Field set during marshalling.
	Content string `json:"content"`
}

// Meta holds input file metadata
type Meta struct {
	// SchemaType is the name of the schema to apply to input file
	SchemaType string

	// TypeID is the name of the type OR type + subtype. The concept of subtypes
	// is only used in this field. It is never used to assign a schema.
	TypeID string
}

// Header holds metadata about an item
type Header interface{}
