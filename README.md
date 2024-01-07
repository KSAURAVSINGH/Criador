<h1 align="center">
  <a href = "http://criador.in/">CRIADOR</a>
</h1>

**Criador** is an interactive web app designed to streamline work assignments, enhance time management, and boost productivity. It simplifies handling multiple tasks by providing timely updates.

# Visual Representation of Application
<img width="1425" alt="Screenshot 2024-01-03 at 1 02 19 PM" src="https://github.com/KSAURAVSINGH/Criador/assets/55026380/027f1e6d-7faf-4c67-9617-12e95cdc960c">
<br>

<img width="677" alt="Screenshot 2024-01-03 at 1 02 40 PM" src="https://github.com/KSAURAVSINGH/Criador/assets/55026380/359a5a69-3968-48fb-b5cc-24db97db1665">
<br>

<img width="1393" alt="Screenshot 2024-01-03 at 1 04 09 PM" src="https://github.com/KSAURAVSINGH/Criador/assets/55026380/d7cd1048-f5d1-4b2a-8013-a86a7c6cf9aa">
<br>

<img width="1118" alt="Screenshot 2024-01-03 at 1 04 28 PM" src="https://github.com/KSAURAVSINGH/Criador/assets/55026380/a6d1c0b7-55e5-4039-858b-294959d3ef51">
<br>

<img width="1319" alt="Screenshot 2024-01-03 at 1 05 16 PM" src="https://github.com/KSAURAVSINGH/Criador/assets/55026380/30118e67-9f60-4a9c-bcfc-421126387bab">

 ​
 # Project Structure
```terminal
.github
client/
    public/
    src/
        components/
        styles/
        App.css
        App.js
        App.test.js
        index.css
        index.js
    .dockerignore
    Dockerfile
    nginx.config
    package.json
nginx/
    default.conf
    Dockerfile
server/
    auth/
    backend/
    database/
    views/
    app.js
    Dockerfile
    package.json
README.md
```
# Usage (run on your machine)
## Prerequisite
- [Node](https://nodejs.org/en/download/) ^14.15.4 or above
- [React](https://www.npmjs.com/package/react) latest

## Steps
- Clone the repository
- Install the Dependencies of both client and server
- Run the Project

## Clone the Repository
You can clone the repo or download the zip file.<br>
To clone:
```terminal
git clone https://github.com/KSAURAVSINGH/Criador.git
```

## Install the Dependencies
```terminal
npm install
```

## Run the Project
```terminal
npm start
```
The project should run on: 
- client - 'http://localhost:3000'
- server - 'http://localhost:8000'

- Add "proxy": "http://localhost:8000/" in package.json file of client to run locally
- Remove the commented RemoveUriSuffixMiddleware function from app.js of server

## Dependencies Used

# Client
Name | Version
--- | ---
@testing-library/jest-dom| ^5.17.0,
@testing-library/react| ^13.4.0,
@testing-library/user-event| ^13.5.0,
axios| ^1.6.0,
bootstrap| ^5.3.2,
bootstrap-icons| ^1.11.1,
mongodb| ^6.2.0,
nodemon| ^3.0.1,
quill| ^1.3.7,
quill-image-compress| ^1.2.30,
react| ^18.2.0,
react-dom| ^18.2.0,
react-quill| ^2.0.0,
react-router-dom| ^6.18.0,
react-scripts| 5.0.1,
web-vitals| ^2.1.4

# Server
Name | Version
--- | ---
connect-mongo| ^5.1.0,
crypto| ^1.0.1,
dotenv| ^16.3.1,
express| ^4.18.2,
express-session| ^1.17.3,
mongodb| ^6.2.0,
nodemailer| ^6.9.7,
nodemailer-express-handlebars| ^6.1.0,
nodemon| ^3.0.1,
passport| ^0.6.0,
passport-local| ^1.0.0,
path| ^0.12.7



## Contact Me
kumarsauravsingh1234567890@gmail.com






        