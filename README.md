# Bonsai: Link Management Service

## Description

This service is responsible to link management via Rest API and RPC Communication

## Service Dependencies

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build Docker Image

```bash
make build-image
```

## Run Link Management Image

Make sure docker network with name bonsai-network already exist

```bash
docker run -it --rm --network bonsai-network --name link-service \
-h link-service-host -d \
-e 'JWT_SECRET_KEY=Yx$83(js)a#UgH' \
-e 'MONGODB_HOST=localhost' \
-e 'MONGODB_PORT=27017' \
-e 'MONGO_INITDB_DATABASE=links' \
-e 'MONGO_INITDB_USERNAME=dekjon' \
-e 'MONGO_INITDB_PASSWORD=Dontlookback' \
-p 3020:3020 -p 4020:4020 kadekpradnyana/bonsai-link-mgmt
```

## Run Kubernetes Deployment

Make sure minikube is installed on your machine since we're going to use it for easy development

First, refresh your minikube environment by typing this command. These example will run two nodes. You can modify it as you want.

```bash
minikube delete
minikube start --nodes=2
```

Second, apply the deployment file.

```bash
kubectl apply -f deployment.yaml
```

Third, start minikube service from the service name.

```bash
kubectl get svc
minikube service link-service
```