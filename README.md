# Pet hotel Bot

## Available Scripts

The project is made with react and Node.js.
To open the app in the development mode, from the root project directory, you can run:

### - `cd frontend`, `npm i` and `npm start`
Open [http://localhost:3000](http://localhost:3000) to view the frontend in your browser.\
The page will reload when you make changes.

### - `cd backend`, `npm i` and `npm run dev`
Server will be run on [http://localhost:8000](http://localhost:8000).\
You must have at least node 16 to successfully run the application.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!



Monorepo for Telegram Mini-App and Telegram Bot

Welcome to the Monorepo for our Telegram Mini-App and Telegram Bot! This repository contains the source code for both the frontend and backend components of our Telegram application.
Table of Contents

    Project Overview
    Folder Structure
    Getting Started
        Frontend
        Backend
    Contributing
    License

Project Overview

Our project is divided into two main parts:

    Frontend (Telegram Mini-App): This part of the application is responsible for the user interface of Telegram Bot Mini-App. It is built with React.
    Backend (Telegram Bot): The backend of the Telegram Bot. It is implemented in Node.js.

Folder Structure

|-- frontend/
|   |-- src/
|   |-- public/
|   |-- package.json
|   |-- ...
|-- backend/
|   |-- src/
|   |-- package.json
|   |-- ...
|-- README.md
|-- LICENSE

Getting Started

To set up and run both the frontend and backend components, follow the instructions below:
Frontend
From the project root, navigate to the frontend directory:

    cd frontend
    npm i
    npm start

Access the Telegram Mini-App in your web browser at http://localhost:3000.

Backend
From the project root, navigate to the backend directory:

    cd backend
    npm i
    npm run dev

cd backend

Install the dependencies:

npm install

Configure your Telegram Bot token in a .env file:

makefile

TELEGRAM_BOT_TOKEN=your_bot_token_here

Start the backend server:

sql

    npm start

Your Telegram Bot should now be up and running, ready to respond to incoming messages.
Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow our Contributing Guidelines.
License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code as per the terms of the license.
