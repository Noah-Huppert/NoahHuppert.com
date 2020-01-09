package tomlmd

import (
	"testing"

	"github.com/Noah-Huppert/NoahHuppert.com/generator/schema"
	"github.com/stretchr/testify/assert"
)

// TestMarshal decode TOML header and extracts markdown content
func TestMarshal(t *testing.T) {
	expected := schema.InputFile{
		Header: map[string]interface{}{
			"IsBar": "Bar",
			"IsOne": int64(1), // int64 b/c that's what the TOML decoder parses ints to
			"IsTrue": true,
		},
		Content: "expected content\n",
	}

	var actual schema.InputFile

	itemBytes := []byte(`
IsBar = "Bar"
IsOne = 1
IsTrue = true
---
expected content`)
	
	err := Marshal(itemBytes, &actual, interface{})
	assert.Nil(t, err)
	
	assert.Equal(t, expected, actual, "not equal")
}
