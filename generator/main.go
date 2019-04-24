package main

import (
	"io/ioutil"
	"strings"
	"strconv"
	"bytes"
	"bufio"
	"os"
	"path/filepath"
	"fmt"
	"regexp"
	"sort"

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

	// {{{1 Load projects
	projectsExp := regexp.MustCompile("^([0-9]+)[-_].+$")

	projects := make(map[uint64]Project)
	
	err := filepath.Walk("./projects", func(path string, info os.FileInfo, err error) error {
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

		// {{{2 Add project to map
		projects[numPrefix] = Project{
			ProjectHeader: header,
			Content: contentBuffer.String(),
		}

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

	sortedProjects := []Project{}
	
	for k := range projectPrefixes {
		numPrefix := uint64(k)
		
		sortedProjects = append(sortedProjects, projects[numPrefix])
		logger.Debugf("%d: %#v", k, projects[numPrefix])
	}
}
