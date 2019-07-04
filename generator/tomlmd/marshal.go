package parse

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
const tomlSep []byte = {"---"}

// Marshal decodes a TOML + Markdown file into a schema.Item
// TOML must appear first seperated from the markdown by 3 dashes on their own line.
func Marshal(data []byte, item *schema.Item) error {
	// {{{1 Gather header and content bytes
	headerBuf := bytes.NewBuffer(nil)
	contentBuf := bytes.NewBuffer(nil)
	
	inBuf := bytes.NewBuffer(data)
	inScanner := bufio.NewScanner(inBuf)

	isToml := true

	for inScanner.Scan() {
		if bytes.Equal(inScanner.Bytes(), tomlSep) {
			isToml = false
		}

		var buf *bytes.Buffer

		if isToml {
			buf = headerBuf
		} else {
			buf = contentBuf
		}

		_, err := buf.Write(inScanner.Bytes())
		if err != nil {
			whosBuf := "header"
			if !isToml {
				whosBuf = "content"
			}
			
			return fmt.Errorf("failed write bytes to %s buffer: %s",
				whosBuf, err.Error())
		}
	}

	if err := inScanner.Err(); err != nil {
		return fmt.Errorf("failed to read bytes: %s", err.Error())
	}

	// {{{1 Parse header as TOML
	_, err := toml.DecodeReader(headerBuf, &item)
	if err != nil {
		return fmt.Errorf("failed to decode header as TOML: %s",
			err.Error())
	}

	// {{{1 Read content
	contentBytes, err := ioutil.ReadAll(contentBuf)
	if err != nil {
		return fmt.Errorf("failed to read content: %s", err.Error())
	}
	item.Content = string(contentBytes)

	return nil
}












