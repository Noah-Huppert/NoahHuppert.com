GENERATOR ?= generator/generator

IN_DIR ?= content
IN = $(wildcard ${IN_DIR}/**/*)
OUT_DIR ?= www/content

# generate content
${OUT_DIR}: ${IN}
		${GENERATOR} -i ${IN_DIR} -o ${OUT_DIR}

