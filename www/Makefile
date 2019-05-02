.PHONY: deploy

# deploy to demo site
deploy:
	npm run prod
	cd dist && aws s3 sync . s3://noahh-web-content/NoahHuppert.com
