import mongoose from 'mongoose';

const SpeciesSchema= new mongoose.Schema({
  _id: {
    type: Number,
  },
   name: { 
     type: String,
     required: true 
    },
    classification: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    skin_colors: { 
      type: String,
      required: true
    },
    hair_colors: { 
      type: String,
      required: true
    },
    eye_colors: { 
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    average_lifespan: { 
      type: String,
      required: true
    },
    homeworld: { 
      type: Number,
      required: false
    },
    films: { 
      type: [{ type: Number, ref: 'films' }],
      required: true
    },
    people: { 
      type: [{ type: Number, ref: 'people' }],
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
      type: Number,
      unique: true,
      required: true
    }
});

const species = mongoose.model("species", SpeciesSchema);

export default species
