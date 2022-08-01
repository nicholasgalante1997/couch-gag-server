> Everyone that says that they're a devops expert is a liar and a thief.

- Nick Galante (Maintainer, Amazon Games SDE)

##### How does _Couch Gag Server_ use docker?

We use it to run our node application server in a controlled environment that we can reliably assume will not change until we change it. We also use it to run an nginx load balancing proxy that can help us balance requests to our server on deployment. We err on the side of verbosity in our Dockerfiles. We comment often, but our comments are brief and straight to the point. A good rule of thumb is "Could I say this to an infant and make it make sense and not lose his/her attention?"

We also use docker-compose to organize our multiple containers. We use docker-compose because it gives us the ability to rapidly scale our servers across a number of running container instances with ease from the command line.

##### Our Dockerfiles

We have two dockerfiles, we have attempted to be verbose in commenting so I recommend reading through the files themselves and understanding each step

1. **Node [path = './Dockerfile']**
2. **Nginx [path = './Nginx.Dockerfile']**

**./Dockerfile - Node**

We use the Node:16.16.0 LTS node environment
We create a directory to place our files into in the docker environment
That directory is /couchgag/server
