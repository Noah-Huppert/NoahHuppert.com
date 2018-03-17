# Drone CI
Hosts a Drone CI server on Kubernetes.

# Table Of Contents
- [Setup](#setup)
- [Deploy](#deploy)

# Setup
Make a copy of the `values.secret.example.yaml` named `values.secret.yaml`.  
Place your GitHub API credentials in this file.

# Deploy
Run the `deploy` make target:

```
$ make deploy
$ # Or
$ make
```
