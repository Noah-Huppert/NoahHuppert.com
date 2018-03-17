.PHONY: deploy rm 

NAME=drone
NAMESPACE=${NAME}
CHART=incubator/drone

# deploy installs the kube lego addon into the cluster.
deploy:
	helm upgrade \
		--install \
		--namespace "${NAMESPACE}" \
		-f values.yaml \
		-f values.secret.yaml \
		"${NAME}" "${CHART}"

# rm deletes the app deployment from the cluster
rm: 
	helm delete --purge "${NAME}"
