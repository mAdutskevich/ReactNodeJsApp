# Server
## Description
NodeJS test server for testing features
Includes Auth0, Auth2.0, several endpoints to get/create events

## Setup MySQL database
This server requires a MySQL database. 
Setup MySQL database:
1. Download MySQL docker image:  
`docker pull mysql`
2. Initialize container with name 'mysql_db' on the '3307' port with root password '123'  
`docker run -d -e MYSQL_ROOT_PASSWORD=123 --name mysql_db -p 3307:3306 mysql`
3. Inside the container to access the mysql(password: 123):  
`mysql -u root -p`
4. Create the database inside MySQL:  
`CREATE DATABASE mysql_dev;`
5. Check mySqlConfig.json for consistency

## Run the project
1. Rename '.env.sample' to '.env'
2. `git submodule init`
3. `git submodule update`
4. `yarn`
5. `yarn start`

## ToDo
1. Resolve all 'any' types