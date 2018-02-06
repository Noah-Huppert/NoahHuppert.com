.PHONY: deploy rm logs

NAME=tls
EMAIL=contact@noahh.io
URL=https://acme-v01.api.letsencrypt.org/directory
NAMESPACE=kube-lego
PKG_REPO="stable"
PKG="kube-lego"

# deploy installs the kube lego addon into the cluster.
lego:
	helm install \
		--name "${NAME}" \
		--namespace "${NAMESPACE}" \
		--set config.LEGO_EMAIL="${EMAIL}" \
		"${PKG_REPO}"/"${PKG}"
		#--set config.LEGO_URL="${URL}" \

# rm deletes the app deployment from the cluster
rm: 
	helm delete --purge "${NAME}"

# logs displays the kube lego container logs
logs:
	kubectl logs \
		-n "${NAMESPACE}" \
		-f \
		$(shell kubectl get -n "${NAMESPACE}" pods -o name -l app="${PKG}")
