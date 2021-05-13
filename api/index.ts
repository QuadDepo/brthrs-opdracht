import mongoose from 'mongoose';
import * as filmRoutes from './routes/films.route';
import * as planetRoutes from './routes/planets.route';
import express from 'express';
const MONGO_URL = "mongodb://127.0.0.1:27017/geeksforgeeks";
const PORT = 9000;
mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
APP.use('/films', filmRoutes.getFilms);
APP.use('/film/:id', filmRoutes.getFilmById);

APP.use('/planets/', planetRoutes.getPlanets);
APP.use('/planet/:id', planetRoutes.getPlanetById);
});