import mongoose from 'mongoose';

const PlanetSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  rotation_period: {
    type: String,
    required: true
  },
  orbital_period: {
    type: String,
    required: true
  },
  diameter: {
    type: String,
    required: true
  },
  climate: {
    type: String,
    required: true
  },
  gravity: {
    type: String,
    required: true
  },
  terrain: {
    type: String,
    required: true
  },
  surface_water: {
    type: String,
    required: true
  },
  population: {
    type: String,
    required: true
  },
  films: {
    type: [{ type: Number, ref: 'films' }],
    required: true
  },
  residents: {
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

const planets = mongoose.model("planets", PlanetSchema);

export default planets
