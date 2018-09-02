.PHONY: deploy role rm

NAME=gocd

# deploy gocd
deploy:
	helm upgrade \
		--install \
		--namespace "${NAME}" \
		-f values.yaml \
		"${NAME}" stable/gocd

# role creates a Cluster Role Binding for the tiller pod
role:
	kubectl create clusterrolebinding tiller-role-binding \
		--clusterrole=cluster-admin \
		--serviceaccount=kube-system:default

# rm remove deployment
rm:
	helm delete --purge "${NAME}"
