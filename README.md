# ReactNodeJsApp
This project includes **client** and **server** apps. 

The idea of **server** app is to write NodeJs server in typescript, switch to ES Modules, use MySql as DB,
and use server as test environment or learning platform.

The idea of **client** app is to test Vite with typescript and all linters and use client app as test environment or learning platform. 
Client app is quite raw, because I gave all my attention to server app.

I am going to continue working on both apps

## Start
### Client
1) Rename '.env.sample' to '.env'
2) pnpm i
3) pnpm --filter client start

### Server
1) Rename '.env.sample' to '.env' in server folder
2) Setup MySQL database using readme.md in server folder
2) pnpm i
3) pnpm --filter server start

