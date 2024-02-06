# Pet hotel Bot

*The bot for the Telegram Mini App contest.*


The application is divided into two main parts:

__Frontend (Telegram Mini-App)__: This part of the application is responsible for the user interface of Telegram Bot Mini-App. It is built with React using react-scripts library.\
__Backend (Telegram Bot)__: The backend of the Telegram Bot. It is implemented in Node.js.

## Getting Started

__You must have at least node 16 to successfully run the application.__

To set up and run both the frontend and backend components, follow the instructions below.


### Frontend
From the project root, navigate to the frontend directory:

    cd frontend

Configure your Telegram Bot server url in config files located at: [/frontend/src/config](/frontend/src/config).

Install modules and launch the app:

    npm i
    npm start

Access the Telegram Mini-App in your web browser at [http://localhost:3000](http://localhost:3000).

The root of the application is [index.js](/frontend/src/index.js) file.\
The main application wrapper with main layout and routers setup is [App.js](/frontend/src/App.js) file.\
Screens views are located in [pages](/frontend/src/pages) directory with their components in [components](/frontend/src/components) accordingly.\
Telegram Bot Mini-App api is exposed from [useTelegram](/frontend/src/hooks/useTelegram.js) hook.\
All necessary mocked data are located in [assets/data](/frontend/src/assets/data) directory.

To build the app for production, run:

    npm run build

The Telegram Mini-App api is available at the [telegram official site](https://core.telegram.org/bots/webapps#designing-mini-apps).

### Backend
From the project root, navigate to the backend directory:

    cd backend

Configure your Telegram Bot token and Mini-App url in config files: [/backend/config](/backend/config).

Install the dependencies and start the backend server:

    npm i
    npm run dev

Your Telegram Bot should now be up and running at [http://localhost:8000](http://localhost:8000), ready to respond to incoming messages.

You can change the default port in the index file or via the PORT environment variable.

By default, the Bot is using SQLite database. You can change it to any other database - you'll need to update [models initiation and configuration](/backend/src/models/Base.js) and DB config in [index](/backend/src/index.js) file.

To handle incoming requests, the Bot needs to have an according route in the [api](/backend/src/api) directory.\
The requests are further processed by the [controllers](/backend/src/controllers) and passed to the business logic part that is located in [services](/backend/src/services).

The Telegram Bot api is adjusted to application usage and exposed from the [infrastructure/telegramBot.js](/backend/src/infrastructure/telegramBot.js) as the TelegramBot class.\
The current "Pet Hotel Bot" is initiated in the [bots](/backend/src/bots) directory. You may initialize any additional bots here.

Currently, Telegram Bot is getting updates with long polling. You can add the webhooks logic by updating the [telegramBot](/backend/src/infrastructure/telegramBot.js) file.

To build the app for production, run:

    npm run build

Also, you can run the app locally in production mode:

    npm start

The Telegram Bot api is available at the [telegram official site](https://core.telegram.org/bots/api#authorizing-your-bot).


## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code as per the terms of the license.
