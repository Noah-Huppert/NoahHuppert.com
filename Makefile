GENERATOR ?= generator/generator

IN_DIR ?= content
OUT_DIR ?= www/content

# generate content
${OUT_DIR}: ${IN_DIR}
		${GENERATOR} -i ${IN_DIR} -o ${OUT_DIR}

