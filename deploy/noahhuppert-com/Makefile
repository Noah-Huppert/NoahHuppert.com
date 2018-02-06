.PHONY: all build deploy rm dns

NAMESPACE=noahhuppert-com
CHART_NAME=noahhuppert-com
SUB_DOMAIN=www.k8s

# all builds and deploys the chart
all: build deploy

# build packages the external dns chart
build:
	helm package .

# deploy pushes the external dns chart to the kubernetes cluster
deploy: 
	helm upgrade \
		--install \
		--namespace "${NAMESPACE}" \
		"${CHART_NAME}" .

# rm deletes the app deployment from the cluster
rm: 
	helm delete --purge "${CHART_NAME}"

# dns sets the intermediate records on the root domain to point to the auto 
# app ingress resource.
dns:
	doctl compute domain records update noahh.io \
		--record-id 35001486 \
		--record-data $(shell dig +short "${SUB_DOMAIN}.noahh.io")
	doctl compute domain records update noahhuppert.com \
		--record-id 35001451 \
		--record-data $(shell dig +short "${SUB_DOMAIN}.noahhuppert.com")
