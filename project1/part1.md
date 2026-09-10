Kubernetes
Kubernetes Cluster ----Control Plane,worker node
Kubernetes Volume
Namespace
Pod
Deployment
ReplicaSets
Service




What is Kubernetes
Kubernetes is an open-source container orchestration platform used to deploy, manage, scale, and maintain containerized applications. It automates tasks such as scheduling Pods, service discovery, scaling, rolling updates, and self-healing.

What is a Kubernetes Cluster?
A Kubernetes cluster is a group of machines working together to run and manage containerized applications. It consists mainly of a Control Plane and Worker Nodes.
Control Plane,worker node

What is the Control Plane
The Control Plane is the brain of the Kubernetes cluster. It manages the overall cluster state, makes scheduling decisions, processes API requests, and ensures that the actual state matches the desired state
Control Plane
│
├── kube-apiserver
├── etcd
├── kube-scheduler
└── kube-controller-manager

What is kube-apiserver?
kube-apiserver is the central entry point to the Kubernetes cluster. All Kubernetes API requests go through the API server.

What is etcd?
etcd is a distributed key-value store used by Kubernetes to store cluster state and configuration.

What is kube-scheduler
kube-scheduler decides which Worker Node should run a newly created Pod based on available resources, constraints, affinity, taints, tolerations, and other scheduling rules.

What is kube-controller-manager?
kube-controller-manager runs Kubernetes controllers that continuously monitor the cluster and work to bring the actual state of the cluster toward the desired state.

What is a Worker Node?
A Worker Node is a machine that runs application workloads in the form of Pods.
Worker Node
│
├── kubelet
├── kube-proxy
├── Container Runtime
└── Pods
What is kubelet
kubelet is an agent running on every Worker Node. It communicates with the Kubernetes API Server and ensures that the Pods assigned to that node are running according to their specifications.

What is Container Runtime
Container Runtime is the software responsible for actually running containers.

What is kube-proxy
kube-proxy is a networking component that runs on Worker Nodes and helps implement Kubernetes Service networking and route traffic toward the appropriate backend Pods.


1. What is a Kubernetes Volume?
A Kubernetes Volume provides storage to containers in a Pod and helps us manage temporary, shared, or persistent application data.

2. Why do we need volumes?
Containers have an ephemeral filesystem. If a container is recreated, data stored only inside that container filesystem can be lost. Volumes provide a way to store data outside the container's writable layer.

4. What is emptyDir?
emptyDir is a temporary Kubernetes volume that is created when a Pod is assigned to a node. All containers in the same Pod can mount and share it.

5. When would you use emptyDir?
I use emptyDir when I need temporary storage or when containers inside the same Pod need to share files.

6. What is hostPath?
hostPath mounts a file or directory from the Kubernetes node's filesystem into a Pod.

8. Difference between volumes and volumeMounts
"volumes defines the volume in the Pod specification, while volumeMounts defines the mount point of that volume inside a specific container."

9. What is a PersistentVolume?
A PersistentVolume, or PV, is a storage resource in the Kubernetes cluster that represents persistent storage. It is provisioned either manually by an administrator or dynamically through a StorageClass.

apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-pv
spec:
  capacity:
    storage: 10Gi

  accessModes:
    - ReadWriteOnce

  persistentVolumeReclaimPolicy: Retain


10. What is a PersistentVolumeClaim?
A PersistentVolumeClaim, or PVC, is a request for storage made by a 
user or application.

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-pvc
spec:
  accessModes:
    - ReadWriteOnce

  resources:
    requests:
      storage: 5Gi

12. What is StorageClass?
A StorageClass defines a class or type of storage that Kubernetes can dynamically provision. It tells Kubernetes which provisioner or CSI driver should be used and can define parameters such as performance characteristics.

13. What is Dynamic Provisioning?
Dynamic provisioning means Kubernetes automatically creates or provisions the required persistent storage when a PVC is created, using a StorageClass.

14. What is Static Provisioning?
Static provisioning means an administrator manually creates PersistentVolumes before users create their PersistentVolumeClaims.

15. What is CSI?
CSI is a standard interface that allows Kubernetes to communicate with different storage systems through storage drivers

16. Explain RWO, ROX and RWX
Mode
Meaning
RWO
Read/write from one node
ROX
Read-only from many nodes
RWX
Read/write from many nodes




17. What is Reclaim Policy?
Reclaim policy determines what happens to a PersistentVolume or dynamically provisioned storage after its associated PVC is deleted.



1. What is a Namespace?
A Kubernetes Namespace provides logical isolation within a cluster. It allows us to organize resources such as Pods, Deployments, Services and ConfigMaps, and apply policies like ResourceQuota, LimitRange and RBAC at a namespace level

11. What is a Pod?
A Pod is the smallest deployable unit in Kubernetes.
A Pod contains one or more containers that share:


You should be ready for these.
Namespace
Q1. What is a Namespace?
A logical isolation and organization boundary within a Kubernetes cluster.

Q2. Does Namespace provide network isolation?
No. Namespace provides logical isolation; NetworkPolicy is used for network traffic isolation.

Q3. What is ResourceQuota?
It limits aggregate resource consumption within a namespace.

Q4. ResourceQuota vs LimitRange?
ResourceQuota controls total namespace consumption, while LimitRange controls resource defaults and constraints for individual containers/Pods.

Q5. What is the default namespace?
default, used when no namespace is explicitly specified.

Q1. What is a Pod?
A Pod is the smallest deployable unit in Kubernetes and contains one or more containers that share networking, storage volumes, and a lifecycle boundary.

Q2. Why does Kubernetes use Pods instead of containers?
Pods provide a higher-level abstraction for running tightly coupled containers that need to share networking, storage, and lifecycle.

Q3. Can a Pod have multiple containers?
Yes. Containers in the same Pod share the Pod's network namespace and can share volumes.
Q4. What is a Pod IP?
It is the network IP assigned to a Pod. It is generally ephemeral, so applications should normally use a Service rather than relying on the Pod IP directly.

Q5. What happens to Pod IP when Pod is recreated?
The new Pod can receive a different IP.

Q6. What is an Init Container?
An Init Container runs before application containers and is used for initialization tasks.

Q7. What is a Sidecar?
A sidecar is a supporting container that runs alongside the main application container in the same Pod.

Q8. What are Pod phases?
Pending
Running
Succeeded
Failed
Unknown

Q9. How do you check Pod logs?
kubectl logs <pod>

Q10. How do you check logs from the previous crashed container?
kubectl logs <pod> --previous

Q11. How do you troubleshoot CrashLoopBackOff?
A strong 2-year answer:
"First I check the Pod status using kubectl get pod. Then I use kubectl describe pod to inspect events and configuration. I check current and previous container logs using kubectl logs and kubectl logs --previous. Then I verify ConfigMaps, Secrets, environment variables, volumes, probes, resource limits and application configuration. Based on the error, I fix the underlying issue rather than simply restarting the Pod."

1. What is a Deployment?
A Deployment is a Kubernetes workload resource used to manage stateless applications.

A Deployment manages ReplicaSets and provides declarative updates, scaling, rolling updates and rollback. A ReplicaSet ensures the desired number of Pod replicas are running. Pods provide the execution environment for containers.

A Deployment is a Kubernetes workload resource used mainly for managing stateless applications. It provides declarative application management, replica management, rolling updates, rollback and scaling. A Deployment does not directly manage Pods; it manages ReplicaSets, and ReplicaSets maintain the desired number of Pods.

For example, if I define 3 replicas, the Deployment creates a ReplicaSet which ensures that 3 Pods are running. If a Pod fails, the ReplicaSet creates a replacement. When I update the container image, the Deployment creates a new ReplicaSet and performs a rolling update by gradually creating new Pods and terminating old Pods. Kubernetes supports RollingUpdate and Recreate strategies, with RollingUpdate being the default. If the new release has an issue, I can check the rollout history and use kubectl rollout undo to rollback to a previous revision.
In production, I would monitor the rollout using kubectl rollout status, check Deployment/ReplicaSet/Pod events, verify readiness probes, logs and resource availability, and rollback if necessary.


kubectl scale deployment payment-api --replicas=6
kubectl set image deployment/payment-api payment-api=payment-api:v2.0
kubectl rollout status deployment/payment-api
kubectl rollout undo deployment/payment-api
kubectl rollout history deployment/payment-api




What is ReplicaSets
"ReplicaSet is a Kubernetes controller responsible for maintaining the desired number of Pod replicas. It uses label selectors to identify the Pods it manages. If a managed Pod is deleted or lost and the actual count falls below the desired count, the ReplicaSet creates a replacement. In production, we normally don't create ReplicaSets directly; we use Deployments, because Deployment manages ReplicaSets and provides rolling updates, rollbacks and revision management.



What is Kubernetes Service? Explain its types.

A Kubernetes Service provides a stable network endpoint for accessing a group of Pods. Pods are ephemeral and their IP addresses can change, so clients should not directly depend on Pod IPs. A Service uses label selectors to identify backend Pods and provides service discovery through Kubernetes DNS."
"The main Service types are ClusterIP, NodePort, LoadBalancer and ExternalName. ClusterIP is the default and is used for internal cluster communication. NodePort exposes the Service through a port on each node. LoadBalancer integrates with an external/cloud load balancer for external access. ExternalName maps a Kubernetes Service name to an external DNS name."
"The Service has important port fields: port is the Service port, targetPort is the Pod/application port, and nodePort is the node-level port used by NodePort Services. Kubernetes uses EndpointSlices to maintain the backend endpoint information. If needed, session affinity can be configured using sessionAffinity: ClientIP

When do we use ClusterIP

ClusterIP is used for internal communication between applications inside the Kubernetes cluster. It is the default Service type
What is LoadBalancer
LoadBalancer is commonly used to expose a Service externally through a cloud/provider load balancer.

What is NodePort
NodePort exposes a Service through a port on each eligible node.

1. What is Ingress

Ingress is a Kubernetes API object used to define rules for routing external HTTP/HTTPS traffic to Services inside the Kubernetes cluster.
What is an Ingress Controller?
An Ingress Controller is the component that actually implements the routing rules defined in an Ingress resource.
Ingress is a Kubernetes API object that defines HTTP/HTTPS routing rules to Services. An Ingress Controller implements those rules. In a typical production setup, DNS points the application hostname to an external load balancer, which sends traffic to the Ingress Controller. The controller uses host and path rules to route requests to Services. Services then route traffic to available Pod endpoints. Ingress can also handle TLS/HTTPS, and IngressClass identifies the controller responsible for a particular Ingress.

