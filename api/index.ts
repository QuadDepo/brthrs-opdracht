import mongoose from 'mongoose';
import filmRoutes from './routes/films.route';
import planetRoutes from './routes/planets.route';
import PeopleRoutes from './routes/peoples.route';
import { populateData } from './utils/swapi.util';
import express from 'express';

const APP = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/brothers";
const PORT = 9000;

// Connect to mongoDB
mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, ignoreUndefined: true });

// Get data from Swapi Dev api
// Should be moved to cron-job
populateData()

// Films routes
APP.use('/films', filmRoutes);

// Planets routes
APP.use('/planets/', planetRoutes);

// People routes
APP.use('/peoples/', PeopleRoutes);

// Add 404 Page
APP.get('*', (req, res) => {
  res.status(404).send({
    message: "This is not the page you are looking for..."
  });
});

APP.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
})
