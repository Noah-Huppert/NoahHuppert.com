.PHONY: deploy

# deploy to demo site
deploy:
	npm run prod
	cd dist && rsync -r . funkyboy.zone:/public/noah/noahhuppert-com-beta
