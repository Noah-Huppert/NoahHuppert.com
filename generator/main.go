package main

import (
	"io/ioutil"
	"encoding/json"
	"strings"
	"strconv"
	"bytes"
	"bufio"
	"os"
	"path/filepath"
	"fmt"
	"regexp"
	"sort"
	"flag"

	"github.com/Noah-Huppert/golog"
	"github.com/BurntSushi/toml"
)

// Project
type Project struct {
	// ProjectHeader
	ProjectHeader

	// Content of project
	Content string `json:"content"`
}

// ProjectHeader is a header for a project
type ProjectHeader struct {
	// Name of project
	Name string `json:"name"`

	// Languages used in project
	Languages []string `json:"languages"`

	// Technologies used in project
	Technologies []string `json:"technologies"`

	// Slug of project
	Slug string `json:"slug"`
}

func main() {
	// {{{1 Setup logger
	logger := golog.NewStdLogger("generator")

	// {{{1 Parse flags
	var inputDir string
	var outputDir string

	flag.StringVar(&inputDir, "i", ".", "Input directory")
	flag.StringVar(&outputDir, "o", "output", "Output directory")
	
	flag.Parse()

	// {{{1 Load projects
	projectsExp := regexp.MustCompile("^([0-9]+)[-_].+$")

	projects := make(map[uint64]Project)
	projectsBySlug := make(map[string]Project)
	
	err := filepath.Walk(filepath.Join(inputDir, "projects"), func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}

		// {{{2 Get numeric prefix and slug of file
		base := filepath.Base(path)
		matches := projectsExp.FindStringSubmatch(base)

		if len(matches) == 0 {
			return fmt.Errorf("file %s not numerically prefixed", path)
		}

		numPrefix, err := strconv.ParseUint(matches[1], 10, 64)
		if err != nil {
			return fmt.Errorf("error parsing %s file's numeric prefix: %s",
				err.Error())
		}

		// {{{2 Parse file header
		f, err := os.Open(path)
		if err != nil {
			return fmt.Errorf("error opening %s file: %s", path, err.Error())
		}

		// {{{3 Get header bytes
		scanner := bufio.NewScanner(f)
		headerBuffer := bytes.NewBuffer([]byte{})

		dividerFound := false

		for scanner.Scan() {
			if err := scanner.Err(); err != nil {
				return fmt.Errorf("error scanning header %s file line: %s",
					path, err.Error())
			}
			
			line := scanner.Text()

			if line == "---" {
				dividerFound = true
				break
			}

			if _, err = headerBuffer.Write([]byte(fmt.Sprintf("%s\n", line))); err != nil {
				return fmt.Errorf("error writing header line to buffer: %s",
					err.Error())
			}
		}

		if !dividerFound {
			return fmt.Errorf("failed to find end of header divider in %s file",
				path)
		}

		// {{{3 Decode		
		headerBytes, err := ioutil.ReadAll(headerBuffer)
		if err != nil {
			return fmt.Errorf("error reading header byte from buffer for %s file: %s",
				path, err.Error())
		}

		header := ProjectHeader{}
		if err := toml.Unmarshal(headerBytes, &header); err != nil {
			return fmt.Errorf("error decoding file %s header as TOML: %s",
				path, err.Error())
		}

		// {{{3 Validate
		validateErrors := []string{}
		
		if len(header.Name) == 0 {
			validateErrors = append(validateErrors, "Name field empty")
		}

		if len(header.Languages) == 0 {
			validateErrors = append(validateErrors, "Languages field empty")
		}

		if len(header.Technologies) == 0 {
			validateErrors = append(validateErrors, "Technologies field empty")
		}

		if len(header.Slug) == 0 {
			validateErrors = append(validateErrors, "Slug field empty")
		}

		if len(validateErrors) > 0 {
			return fmt.Errorf("failed to validate %s file header: %s",
				path,
				strings.Join(validateErrors, ", "))
		}

		// {{{2 Get project content
		contentBuffer := bytes.NewBuffer([]byte{})

		for scanner.Scan() {
			if err := scanner.Err(); err != nil {
				return fmt.Errorf("error scanning content %s file line: %s",
					path, err.Error())
			}

			line := scanner.Bytes()

			if _, err := contentBuffer.Write(line); err != nil {
				return fmt.Errorf("error writing content line to buffer: %s",
					err.Error())
			}
		}

		if contentBuffer.Len() == 0 {
			return fmt.Errorf("read no content from %s file", path)
		}

		// {{{2 Close file
		if err := f.Close(); err != nil {
			return fmt.Errorf("error closing %s file: %s", path, err.Error())
		}

		// {{{2 Add project to map
		p := Project{
			ProjectHeader: header,
			Content: contentBuffer.String(),
		}
		projects[numPrefix] = p
		projectsBySlug[p.Slug] = p

		return nil
	})

	if err != nil {
		logger.Fatalf("failed to walk projects directory: %s", err.Error())
	}

	// {{{1 Sort projects
	projectPrefixes := []uint64{}
	for k := range projects {
		projectPrefixes = append(projectPrefixes, k)
	}

	sort.Slice(projectPrefixes, func(i, j int) bool {
		return projectPrefixes[i] < projectPrefixes[j]
	})

	orderedSlugs := []string{}
	
	for _, k := range projectPrefixes {
		orderedSlugs = append(orderedSlugs, projects[k].Slug)
	}
	
	// {{{1 Build indexes
	langIndex := make(map[string][]string)
	techIndex := make(map[string][]string)

	for _, project := range projects {
		for _, lang := range project.Languages {
			if _, ok := langIndex[lang]; !ok {
				langIndex[lang] = []string{}
			}

			langIndex[lang] = append(langIndex[lang], project.Slug)
		}

		for _, tech := range project.Technologies {
			if _, ok := techIndex[tech]; !ok {
				techIndex[tech] = []string{}
			}

			techIndex[tech] = append(techIndex[tech], project.Slug)
		}
	}

	// {{{1 Write output files
	// {{{2 Create output directory if doesn't exist
	if outDirInfo, err := os.Stat(outputDir); err != nil && os.IsNotExist(err) {
		if err := os.Mkdir(outputDir, 0755); err != nil {
			logger.Fatalf("error creating %s output directory: %s",
				outputDir, err.Error())
		}
	} else if !outDirInfo.IsDir() {
		logger.Fatalf("%s output directory exists but as a file", outputDir)
	}
	
	// {{{2 Projects output file
	projectsF, err := os.Create(filepath.Join(outputDir, "projects.json"))
	if err != nil {
		logger.Fatalf("error opening projects output file: %s", err.Error())
	}
	defer func() {
		if err := projectsF.Close(); err != nil {
			logger.Fatalf("error closing projects output file: %s", err.Error())
		}
	}()

	projectsEncoder := json.NewEncoder(projectsF)

	projectsOut := map[string]interface{}{
		"ordered_slugs": orderedSlugs,
		"projects": projectsBySlug,
	}
	if err := projectsEncoder.Encode(projectsOut); err != nil {
		logger.Fatalf("error encoding projects output file to JSON: %s", err.Error())
	}

	// {{{2 Lanuages index
	langF, err := os.Create(filepath.Join(outputDir, "languages.json"))
	if err != nil {
		logger.Fatalf("error opening languages index output file: %s", err.Error())
	}
	defer func() {
		if err := langF.Close(); err != nil {
			logger.Fatalf("error closing languages index output file: %s",
				err.Error())
		}
	}()

	langEncoder := json.NewEncoder(langF)
	if err := langEncoder.Encode(langIndex); err != nil {
		logger.Fatalf("error encoding languages index output file to JSON: %s",
			err.Error())
	}

	// {{{2 Technologies index
	techF, err := os.Create(filepath.Join(outputDir, "technologies.json"))
	if err != nil {
		logger.Fatalf("error opening technologies index output file: %s", err.Error())
	}
	defer func() {
		if err := techF.Close(); err != nil {
			logger.Fatalf("error closing technologies index output file: %s",
				err.Error())
		}
	}()

	techEncoder := json.NewEncoder(techF)
	if err := techEncoder.Encode(techIndex); err != nil {
		logger.Fatalf("error encoding technologies index output file to JSON: %s",
			err.Error())
	}
}
