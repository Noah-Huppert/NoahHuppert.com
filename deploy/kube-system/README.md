# Kube System Chart
This chart contains Kubernetes system components which must be deployed.  

Components:
    
    - HAProxy Ingress Controller
    
# Chart Values
This Chart exposes several values for customization. Values should be set in `values.yaml` and represent the following: 

```yaml
haproxy:
    cert: TLS Certifcate to use for HAProxy communication
    key: TLS Key to use for HAProxy communication
```

# Chart Deployment 
Unlike many Charts this chart must be deployed manually and not via a continuous integration workflow.  

This is due to the fact that this Chart contains many components which can only be launched once, and are crucial to 
normal k8s cluster operation.

To deploy this Chart run the following commands:

1. Lint Chart
    - `$ helm lint`
2. Package Chart
    - `$ helm package --debug .`
3. Deploy Chart
    - `$ helm upgrade core ./ --install`
