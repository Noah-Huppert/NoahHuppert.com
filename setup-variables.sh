#!/usr/bin/env bash

# Pre flight checks
# Ensure DigitalOcean token secret file exists
do_token_file="./secrets/DO_TOKEN"
if [[ ! -f "$do_token_file" ]]; then
	echo "Error: File \"$do_token_file\" must exist, does not"
	return 1
fi

# Ensure SSH key exists
ssh_file="./keys/k8s_id_rsa"
if [[ ! -f "$ssh_file" ]]; then
	echo "Error: File \"$ssh_file\" must exist, does not"
	return 1
fi

# Values
number_of_workers="1"
do_token=$(cat ./secrets/DO_TOKEN)
do_region=nyc3
ssh_fingerprint=$(ssh-keygen -E MD5 -lf "$ssh_file.pub" | awk '{print $2}' | sed 's/MD5://g')
ssh_private_key=$(realpath "$ssh_file")

# Set
export TF_VAR_number_of_workers="$number_of_workers"
export TF_VAR_do_token="$do_token"
export TF_VAR_do_region"$do_region"
export TF_VAR_ssh_fingerprint="$ssh_fingerprint"
export TF_VAR_ssh_private_key="$ssh_private_key"
