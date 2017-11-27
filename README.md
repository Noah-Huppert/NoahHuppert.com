# NoahHuppert.cor
r: target STRING not available


Personal website located at [noah.io](http://noahh.io) and 
[noahhuppert.com](http://noahhuppert.com).

# Table Of Contents
- [Overview](#overview)
- [Setup](#setup)

# Overview
This repository holds the source and instruction necessary to host my website. 
This site can be accessed from multiple domains.  

The computers that run the site will be referred to as the cluster.

# Setup
This section describes the steps necessary to setup the cluster.  

Components:

- [Tiller](#tiller)
- [External DNS](#external-dns)

## Tiller
Tiller is a Kubernetes controller that installs Helm charts onto the cluster.  

To install it on the cluster run:

```
helm init --upgrade
```

Run this command every time there is a new version of Tiller.

## External DNS
External DNS is a Kubernetes controller which automatically creates DNS entries 
for services.  

Fill in the `digitalocean.token` value in `values.yaml`.


