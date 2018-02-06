.PHONY: deploy rm

NAME=tls
EMAIL=contact@noahh.io
URL=https://acme-v01.api.letsencrypt.org/directory
NAMESPACE=kube-lego

# deploy installs the kube lego addon into the cluster.
lego:
	helm install \
		--name "${NAME}" \
		--namespace "${NAMESPACE}" \
		--set config.LEGO_EMAIL="${EMAIL}" \
		--set config.LEGO_URL="${URL}" \
		stable/kube-lego

# rm deletes the app deployment from the cluster
rm: 
	helm delete --purge "${NAME}"
