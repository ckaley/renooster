# Renooster

## Description

A web application that allows users to keep track of their subscriptions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#Technologies)

## Technologies

- Express Server
- Node.js
- MYSQL database
- Passport.js
- Handlebars Templating Engine
- MVC Directory Structure

## Installation

The application has 11 dependencies. Run npm install on package.js to install dependencies.  
Dependencie required:

- bcrypt-nodejs
- body-parser
- dotenv
- express
- express-handlebars
- express-session
- mysql2
- passport
- passport-local
- sequelize
- moment

## Usage

Users must register an account with Renooster to use the application. Once a user is registered, logging in is required to use the application.  
Currently, this version does not allow individual user accounts to keep separate records. Any user that is logged in can see all subscription records saved to the application.  
The user can add, edit, and remove subscriptions and subscription details. Users can also view subscriptions that expire within the next 30 days by toggling the "Expiring Soon" view.
