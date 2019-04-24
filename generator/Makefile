.PHONY: build

USER ?= noahhuppert
IMAGE ?= noahhuppert-com-generator
VERSION ?= latest

TAG = ${USER}/${IMAGE}:${VERSION}

# build docker image
build:
	docker build -t ${TAG} .
