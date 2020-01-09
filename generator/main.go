/*
Parses directory of input files and returns a JSON representation
*/
package main

import (
	"flag"
	"fmt"
	"path/filepath"
	"os"
	"io/ioutil"
	"bufio"
	"strings"

	"github.com/Noah-Huppert/NoahHuppert.com/generator/schema"
	"github.com/Noah-Huppert/NoahHuppert.com/generator/tomlmd"
	
	"github.com/Noah-Huppert/golog"
	"gopkg.in/go-playground/validator.v9"
)

// Flags specifies parameters of tool execution
type Flags struct {
	// InputDir is the input file source directory to parse
	InputDir string `validate:"required"`
}

// String representation of Flags
func (f Flags) String() string {
	return fmt.Sprintf("%#v", f)
}

func main() {
	// {{{1 Setup
	logger := golog.NewStdLogger("generator")

	var flags Flags
	flag.StringVar(&flags.InputDir, "in", "", "Input file source directory to parse")
	flag.Parse()

	validate := validator.New()
	if err := validate.Struct(flags); err != nil {
		logger.Fatalf("invalid flags: %s", err.Error())
	}

	logger.Infof("flags=%s", flags.String())

	// {{{1 Parse input files
	// in holds input files
	// Keys are input file IDs
	// Values are InputFiles
	in := map[string]schema.InputFile{}

	// inOrders keys are type IDs, values are arrays of input file IDs
	inOrders := map[string][]string{}
	
	err := filepath.Walk(flags.InputDir, func(path string, info os.FileInfo, err error) error {
		// Don't parse directories
		if info.IsDir() {
			return nil
		}

		// Get file path relative to input dir
		inputFile := schema.InputFile{}

		relPath, err := filepath.Rel(flags.InputDir, path)
		if err != nil {
			return fmt.Errorf("failed to get relative path: %s", err.Error())
		}

		// Get input file metadata
		nameParts := strings.Split(info.Name(), ".")
		inputFile.ID = strings.Join(nameParts[0:len(nameParts)-1], ".")

		dir := filepath.Dir(relPath)
		dirParts := strings.Split(dir, "/")

		inputFile.SchemaType = dirParts[0]
		inputFile.TypeID = strings.Join(dirParts, "/")

		// Open file
		file, err := os.Open(path)
		if err != nil {
			return fmt.Errorf("failed to open input file \"%s\": %s", path,
				err.Error())
		}
		defer func() {
			if err := file.Close(); err != nil {
				logger.Fatalf("failed to close input file \"%s\": %s",
					path, err.Error())
			}
		}()
		
		// If order.txt file
		if info.Name() == "order.txt" {
			// Get array of lines
			linesScanner := bufio.NewScanner(file)

			lines := []string{}

			for linesScanner.Scan() {
				lines = append(lines, linesScanner.Text())
			}

			if err := linesScanner.Err(); err != nil {
				return fmt.Errorf("failed to read order.txt file \"%s\": %s", path,
					err.Error())
			}

			// Save in inOrders
			inOrders[inputFile.TypeID] = lines

			return nil
		}

		// If not markdown file
		if filepath.Ext(info.Name()) != ".md" {
			return nil
		}

		// Determine header schema by type
		var inputFileHeader interface{}
		
		switch inputFile.SchemaType {
		case "projects":
			inputFileHeader = schema.ProjectHeader{}
			break
		default:
			return fmt.Errorf("unknown schema type \"%s\" for input file \"%s\"",
				inputFile.SchemaType, path)
			break
		}

		// Marshal input file
		inputFileBytes, err := ioutil.ReadAll(file)
		if err != nil {
			return fmt.Errorf("failed to read input file bytes \"%s\": %s",
				path, err.Error())
		}

		if err := tomlmd.Marshal(inputFileBytes, &inputFile, inputFileHeader); err != nil {
			return fmt.Errorf("failed to marshal input file \"%s\": %s",
				path, err.Error())
		}

		switch inputFile.Header.(type) {
		case schema.ProjectHeader:
			projectHeader, _ := inputFile.Header.(schema.ProjectHeader)
			logger.Debugf("projectHeader=%#v", projectHeader)
		default:
			logger.Debugf("projectHeader=unknown")
		}

		// Validate header schema
		if err := validate.Struct(inputFileHeader); err != nil {
			return fmt.Errorf("invalid header for input file \"%s\": %s",
				path, err.Error())
		}

		// Save input file
		in[inputFile.ID] = inputFile

		return nil
	})

	if err != nil {
		logger.Fatalf("failed to parse input files: %s", err.Error())
	}
}
