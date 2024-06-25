# Default values for logFile and jsonFile
logFile?=./qgames.log
jsonFile?=./report.json

build: 
	docker build -t quake-log-parser .

start:
	docker run -v .:/usr/src/app quake-log-parser $(logFile) $(jsonFile)

start-prod:
	docker run -v .:/usr/src/app quake-log-parser npm run start:prod $(logFile) $(jsonFile)

test:
	docker run quake-log-parser npm run test
