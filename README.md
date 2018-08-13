[![Drone CI Status](https://drone.noahh.io/api/badges/Noah-Huppert/NoahHuppert.com/status.svg)](https://drone.noahh.io/Noah-Huppert/NoahHuppert.com)  

# NoahHuppert.com
Personal website located at [noahh.io](http://noahh.io) and 
[noahhuppert.com](http://noahhuppert.com).  

# Table Of Contents
- [Overview](#overview)
- [Continuous Integration](#continuous-integration)

# Overview
Hugo static site, served by Caddy, and deployed on Kuberenetes.

Website content is located in the `site` directory.  

Build the theme for the Hugo theme by running `make css` in 
`site/themes/noahhuppert-com`.

# Continuous Integration
[Drone](http://drone.io/) is used to run continuous integration pipelines.  

## Configure Drone CLI
Configure the Drone CLI to use the self hosted Drone server by making a copy of 
the `.env.example` named `.env`.  

Fill out your own `DRONE_TOKEN` value.  

Then source this `.env` file every time you begin a new terminal session and 
wish to work with the Drone server.  

```
$ source .env
```

## Kubernetes
The following Drone secrets must be created in order to give Drone access to 
the Kuberenetes cluster.  

### API Server
Find your Kubernetes API server by running `kubectl config view`. The API server 
will be in the `cluster.$.server` field.  

Add this value as a Drone secret:  
```
$ drone secret add \
	--image quay.io/ipedrazas/drone-helm \
	--name API_SERVER \
	--value <k8s api server> \
	Noah-Huppert/NoahHuppert.com 
```

### Kubernetes Token
Create a Kubernetes service account with:  

```
$ kubectl -n drone create serviceaccount drone
```

Next get this service account's token:

```
$ kubectl -n drone get serviceaccount drone
apiVersion: v1 
...
secrets:
- name: drone-token-1yfdw
        ^^^^^^^^^^^^^^^^^  
$ kubectl -n drone get secret drone-token-1yfdw -o yaml
```

Copy the contents of the `token` field and base64 decode them:  

```
$ echo "<paste>" | base64 -d
```

This value is the Kuberenetes Token.  

Create a Drone secret storing this value with:

```
$ drone secret add \
	--image quay.io/ipedrazas/drone-helm \
	--name KUBERNETES_TOKEN \
	--value <k8s token> \
	  Noah-Huppert/NoahHuppert.com 
```

## General Secret
Set a random secret password which Drone will use in general operation.  

Generate a password with:  

```
$ head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32; echo
```

Then save it as a Drone secret with:  

```
$ drone secret add \
	--image quay.io/ipedrazas/drone-helm \
	--name SECRET_PASSWORD \
	--value <k8s token password> \
	Noah-Huppert/NoahHuppert.com
```
