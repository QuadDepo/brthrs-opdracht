import mongoose from 'mongoose';

const FilmSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    episode_id: {
        type: Number,
        required: true
    },
    opening_crawl: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    characters: {
        type: [{ type: Number, ref: 'people' }],
        required: true
    },   
    planets: {
        type: [Number],
        required: true
    },   
    starships: {
        type: [Number],
        required: true
    },   
    vehicles: {
        type: [Number],
        required: true
    },   
    species: {
        type: [Number],
        required: true
    }, 
    created: {
        type: Date,
        required: true
    },   
    edited: {
        type: Date,
        required: true
    }, 
    deleted: {
        type: Boolean,
        required: false
    },
    url: {
        type:  Number,
        unique: true,
        required: true
    }
});

const films = mongoose.model("films", FilmSchema);

export default films
