# Project-2-Pineaplanner
PineaPlanner is the 2nd project during a web development boot camp, focusing on back-end solutions: NodeJS, ExpressJS, MongoDB.

## About
This app is made to propose a solution to optimize time management when dealing with weekly foods and groceries. 
Main functions in the app are to easily search for recipes/ideas and plan meals. 
Have a quick look on Heroku: https://pineaplanner.herokuapp.com/

## Requirements

- NodeJS (v >=14)   
- nodemon   
- MongoDB  

## Installation

Run `npm install` to install all the dependecies.  
Create a `.env` file at the root of the project.

## Environment variables
```
SESSION_SECRET = XXX    
MONGO_URI = XXX  
PORT = XXX  
API_KEY = XXX  # Retrieve this api key from https://api.spoonacular.com
```
## Starting the app

You can type `npm run dev` and the app will run on the port you have configured in the `.env` file.  
