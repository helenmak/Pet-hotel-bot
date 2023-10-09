import express              from 'express';
import cors                 from 'cors';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import bodyParser from 'body-parser'

import initModels           from './models/initModels.js'

import bookingRouter from './api/rest/booking.js'

import petHotelBotTelegram from './bots/petHotelBotTelegram.js'


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let corsOptions = { origin: 'localhost:3000', credentials: true }


app.use(cors({
  origin: '*',
  credentials: false
}));

app.use('/booking', bookingRouter)

petHotelBotTelegram.getUpdates()


const db = await open({
  filename: './src/booking.db',
  driver: sqlite3.Database
})

console.log('connected to the SQlite database');

initModels(db)


const PORT = 80;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))
