import mongoose from 'mongoose';

const StarshipSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  cost_in_credits: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  max_atmosphering_speed: {
    type: String,
    required: true
  },
  crew: {
    type: String,
    required: true
  },
  passengers: {
    type: String,
    required: true
  },
  cargo_capacity: {
    type: String,
    required: true
  },
  consumables: {
    type: String,
    required: true
  },
  starship_class: {
    type: String,
    required: true
  },
  hyperdrive_rating: {
    type: String,
    required: true
  },
  MGLT: {
    type: String,
    required: true
  },
  pilots: {
    type: [{ type: Number, ref: 'people' }],
    required: false
  },
  films: {
    type: [{ type: Number, ref: 'films' }],
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

const starships = mongoose.model("starships", StarshipSchema);

export default starships