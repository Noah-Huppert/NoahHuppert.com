# NoahHuppert.com
Personal website located at [noahh.io](http://noahh.io) and 
[noahhuppert.com](http://noahhuppert.com).  

# Table Of Contents
- [Overview](#overview)
- [Continuous Integration](#continuous-integration)

# Overview
The website hosted with [Caddy](https://caddyserver.com/) and deployed to 
[Kuberenetes](https://kubernetes.io/).  

Website content is located in the `www` directory.  

# Continuous Integration
[Drone](http://drone.io/) is used to automatically deploy to Kuberenetes.  

The following Drone secrets must be created in order to give Drone access to 
the Kuberenetes cluster.  

```
drone secret add --image=quay.io/ipedrazas/drone-helm \
  Noah-Huppert/NoahHuppert.com API_SERVER <k8s api server>

drone secret add --image=quay.io/ipedrazas/drone-helm \
  Noah-Huppert/NoahHuppert.com KUBERNETES_TOKEN <k8s token>

drone secret add --image=quay.io/ipedrazas/drone-helm \
  Noah-Huppert/NoahHuppert.com SECRET_PASSWORD <k8s token password>
```
