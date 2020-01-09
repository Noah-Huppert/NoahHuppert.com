OUT ?= generator

${OUT}: $(wildcard "**/*.go")
	go build -o ${OUT} .

test: $(wildcard "**/*.go")
	go test ./...
