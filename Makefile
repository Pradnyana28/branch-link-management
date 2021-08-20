build-image:
	docker build -t kadekpradnyana/bonsai-link-mgmt .

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-up-build:
	docker-compose up -d --build