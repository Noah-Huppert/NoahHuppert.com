.PHONY: all build deploy rm

HOST=noahh.io.
DHOST=noahh-io

NAMESPACE=external-dns-${DHOST}
CHART_NAME=external-dns-${DHOST}

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
		--set host="${HOST}" \
		--set dhost="${DHOST}" \
		"${CHART_NAME}" .

# rm deletes the app deployment from the cluster
rm: 
	helm delete --purge "${CHART_NAME}"
