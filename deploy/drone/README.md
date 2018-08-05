# Drone CI
Hosts a Drone CI server on Kubernetes.

# Table Of Contents
- [Setup](#setup)
- [Deploy](#deploy)

# Overview
Starts a Drone CI server for GitHub and GitLab.  

Located at:

- GitHub
	- [drone.github.noahh.io](https://drone.github.noahh.io)
	- [drone.github.noahhuppert.com](https://drone.github.noahhuppert.com)
- GitLab
	- [drone.gitlab.noahh.io](https://drone.gitlab.noahh.io)
	- [drone.gitlab.noahhuppert.com](https://drone.gitlab.noahhuppert.com)

# Setup
Make a copy of the `values.{github,gitlab}.secret.example.yaml` named
`values.{github,gitlab}.secret.yaml`.  

Place your GitHub and GitLab API credentials in the respective files.  

The `DRONE_ADMIN` environment variable in `values.yaml` is a list of users
to treat as admins. New users can only be invited by these admins.

# Deploy
Run the `all` make target:

```
$ make all
$ # Or
$ make
```
