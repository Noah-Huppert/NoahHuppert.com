.PHONY: all rm-all deploy rm 

MAKE=make

NAME=drone
NAMESPACE=${NAME}
CHART=incubator/drone

# all deploys drone for github and gitlab
all:
	${MAKE} deploy PROVIDER=github
	${MAKE} deploy PROVIDER=gitlab

# rm-all removes deploys for github and gitlab
rm-all:
	${MAKE} rm PROVIDER=github
	${MAKE} rm PROVIDER=gitlab

# deploy deploys a drone server
# VARIABLES
#	- PROVIDER: either github or gitlab
deploy:
	if [ -z "${PROVIDER}" ]; then echo "PROVIDER must be set"; exit 1; fi
	helm upgrade \
		--install \
		--namespace "${NAMESPACE}-${PROVIDER}" \
		-f values.yaml \
		-f values.${PROVIDER}.yaml \
		-f values.${PROVIDER}.secret.yaml \
		"${NAME}-${PROVIDER}" "${CHART}"

# rm deletes the app deployment from the cluster
# VARIABLES
#	- PROVIDER: either github or gitlab
rm: 
	helm delete --purge "${NAME}-${PROVIDER}"
