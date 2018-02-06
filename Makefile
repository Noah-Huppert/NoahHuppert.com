.PHONY: upload ssh docker docker-push docker-build docker-run docker-rm 

SRC_DIR=./www

REMOTE_USER=root
REMOTE_HOST=www.noahh.io
REMOTE_PARENT_DIR=/var

IMAGE_NAME=noahhuppert/noahhuppert-com
IMAGE_TAG=latest

CONTAINER_NAME=noahhuppert-com

# upload pushes the repository contents to the remote server.
upload:
	scp -r "${SRC_DIR}" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PARENT_DIR}"

# ssh opens an ssh connection to our server.
ssh:
	ssh "${REMOTE_USER}@${REMOTE_HOST}"

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
		--name "${CONTAINER_NAME}" \
		"${IMAGE_NAME}:${IMAGE_TAG}"

# docker-rm ensures that the app container no longer exists. So a new version 
# can be started.
docker-rm:
	docker stop "${CONTAINER_NAME} || docker rm "${CONTAINER_NAME} || true

