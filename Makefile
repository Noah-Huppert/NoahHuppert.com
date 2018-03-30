.PHONY: docker docker-push docker-build docker-run docker-rm 

IMAGE_NAME=noahhuppert/noahhuppert-com
IMAGE_TAG=latest

CONTAINER_NAME=noahhuppert-com
CONTAINER_DIR=/var/lib/ghost/content
CONTAINER_PORT=2368

HOST_DIR=$(shell pwd)/www
HOST_PORT=8000

# docker builds and runs the application container.
docker: docker-build docker-run

# docker-push publishes the most recent version of the app container image to 
# the docker hub.
docker-push: docker-build
	docker push "${IMAGE_NAME}"

# docker-build builds the app container image.
docker-build:
	docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" .

# docker-run starts the app container
docker-run: docker-rm
	docker run \
		-it \
		--rm \
		--net host \
		-v "${HOST_DIR}:${CONTAINER_DIR}" \
		-p "${HOST_PORT}:${CONTAINER_PORT}" \
		--name "${CONTAINER_NAME}" \
		"${IMAGE_NAME}:${IMAGE_TAG}"

# docker-rm ensures that the app container no longer exists. So a new version 
# can be started.
docker-rm:
	docker stop "${CONTAINER_NAME} || docker rm "${CONTAINER_NAME} || true

