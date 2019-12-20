IMAGE_NAME=mydnamap/mdm:mendel-knowledge

build:
	yarn build

docker: build
	docker build -t ${IMAGE_NAME} .

publish: docker
	docker push ${IMAGE_NAME}
