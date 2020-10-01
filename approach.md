Assumptions 
* returns only those drive which sent a location in last 2 minutes

Approach

* An api to register a driver
* An api to verify a driver and provide access token for further session
* An api to update location
* An api to filter drivers within 200 meters of a location
* An Effecient algorithm to filter drivers  within 200 meters of location (because total number of drivers can be millions)
* Scalable filtering algorithm

DB Schema

* driver Info schema 
which stores 
1. driver id
2. locationUpdationTime
3. userName
4. passwordHash
5. currentLocation (of a driver)
6. accessToken (for session)

* Steps to run application
* make sure you have gone through github readme file to setup project
* install nodejs, npm and mongodb
* run command : npm install (to install all project dependencies)
* run : nodemon start or npm start (to start the proect on localhost:3000)