.PHONY: all scale-down scale-up build deploy rm dns

NAME=noahhuppert-com

# all builds and deploys the site
all: build deploy

# scale-down scales the site down to 0 replicas
scale-down:
	kubectl -n "${NAME}" scale deploy "${NAME}" --replicas 0

# scale-up scales the site back up to 1 replica
scale-up:
	kubectl -n "${NAME}" scale deploy "${NAME}" --replicas 1

# build packages the external dns chart
build:
	helm package .

# deploy pushes the external dns chart to the kubernetes cluster
deploy: 
	helm upgrade \
		--install \
		--namespace "${NAME}" \
		"${NAME}" .

# rm deletes the app deployment from the cluster
rm: 
	helm delete --purge "${NAME}"
