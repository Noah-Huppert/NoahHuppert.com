package tomlmd

import (
	"bytes"
	"bufio"
	"fmt"
	"io/ioutil"

	"github.com/Noah-Huppert/NoahHuppert.com/generator/schema"

	"github.com/BurntSushi/toml"
)

// tomlSep is the value expected to be on its own line to seperate TOML, which comes
// before it, and Markdown, which comes after it.
var tomlSep []byte = []byte("---")

// Marshal decodes a TOML + Markdown file into a schema.Item
// TOML must appear first seperated from the markdown by 3 dashes on their own line.
// Header should be an uninitiaized struct of the type used to unmarshal the header
func Marshal(data []byte, item *schema.InputFile, header interface{}) error {
	// {{{1 Gather header and content bytes
	headerBuf := bytes.NewBuffer(nil)
	contentBuf := bytes.NewBuffer(nil)
	
	inBuf := bytes.NewBuffer(data)
	inScanner := bufio.NewScanner(inBuf)

	isToml := true
	
	// Read each line
	for inScanner.Scan() {
		// When we find TOMl seperator set isToml to false
		if bytes.Equal(inScanner.Bytes(), tomlSep) {
			isToml = false
			continue
		}

		// Fill correct buffers
		var buf *bytes.Buffer

		if isToml {
			buf = headerBuf
		} else {
			buf = contentBuf
		}

		// whosBuf is a human readable description of which buffer is encountering an error
		whosBuf := "header"
		if !isToml {
			whosBuf = "content"
		}

		// Write line
		_, err := buf.Write(inScanner.Bytes())
		if err != nil {
			return fmt.Errorf("failed write bytes to %s buffer: %s",
				whosBuf, err.Error())
		}

		// Write newline
		_, err = buf.Write([]byte("\n"))
		if err != nil {
			return fmt.Errorf("failed write newline bytes to %s buffer: %s",
				whosBuf, err.Error())
		}
	}

	// If scanner errors
	if err := inScanner.Err(); err != nil {
		return fmt.Errorf("failed to read bytes: %s", err.Error())
	}

	// {{{1 Parse header as TOML
	_, err := toml.DecodeReader(headerBuf, &header)
	if err != nil {
		return fmt.Errorf("failed to decode header as TOML: %s",
			err.Error())
	}
	item.Header = header
	fmt.Printf("item=%#v\n", *item)

	// {{{1 Read content
	contentBytes, err := ioutil.ReadAll(contentBuf)
	if err != nil {
		return fmt.Errorf("failed to read content: %s", err.Error())
	}
	item.Content = string(contentBytes)

	return nil
}












