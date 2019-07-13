package schema

// OutputFile holds all input files in a structured form
type OutputFile map[string]ContentOutput

// ContentOutput holds the output for all input files of a subtype
type ContentOutput struct {
	// Content is input files of subtype, keys are input file IDs, values are input files
	Content map[string]InputFile

	// Order of input file IDs
	Order []string

	// Index of input files by header values
	// Map keys are header keys.
	// Values are indexes of that header's values.
	Index map[string]HeaderIndex
}

// HeaderIndex holds which input files have which header values
// Map keys are header values.
// Values are ordered IDs of input files which have the key's header value
type HeaderIndex map[string][]string
