import mongoose from 'mongoose';
import express from 'express';
const MONGO_URL = "mongodb://127.0.0.1:27017/geeksforgeeks";
const PORT = 9000;
mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
});