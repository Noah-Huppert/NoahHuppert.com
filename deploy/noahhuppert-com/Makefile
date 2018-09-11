.PHONY: all build deploy rm dns

NAME=noahhuppert-com

# all builds and deploys the site
all: build deploy

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
