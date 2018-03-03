.PHONY: all build deploy rm

MAKE=make

IO_HOST=noahh.io.
IO_DO_DOMAIN=noahh-io

COM_HOST=noahhuppert.com
COM_DO_DOMAIN=noahhuppert-com

IO_NAMESPACE=external-dns-${IO_DO_DOMAIN}
IO_CHART_NAME=external-dns-${IO_DO_DOMAIN}

COM_NAMESPACE=external-dns-${COM_DO_DOMAIN}
COM_CHART_NAME=external-dns-${COM_DO_DOMAIN}

# all builds and deploys the chart for the .io and .com domains
all: 
	${MAKE} NAMESPACE=${IO_NAMESPACE} \
		HOST=${IO_HOST} \
		DO_DOMAIN=${IO_DO_DOMAIN} \
		CHART_NAME=${IO_CHART_NAME} \
		build deploy
	${MAKE} NAMESPACE=${COM_NAMESPACE} \
		HOST=${COM_HOST} \
		DO_DOMAIN=${COM_DO_DOMAIN} \
		CHART_NAME=${COM_CHART_NAME} \
		build deploy

# build packages the external dns chart
build:
	helm package .

# deploy pushes the external dns chart to the kubernetes cluster
# Args:
#	- NAMESPACE
#	- HOST
#	- DO_DOMAIN
#	- CHART_NAME
deploy: 
	helm upgrade \
		--install \
		--namespace "${NAMESPACE}" \
		--set host="${HOST}" \
		--set digitalocean.domain="${DO_DOMAIN}" \
		"${CHART_NAME}" .

# rm deletes the app deployment from the cluster
rm: 
	helm delete --purge "${CHART_NAME}"
