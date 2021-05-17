import mongoose from 'mongoose';

const VehiclesSchema = new mongoose.Schema({
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
  vehicle_class: {
    type: String,
    required: true
  },
  pilots: {
    type: [{ type: Number, ref: 'people' }],
    required: true
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

const vehicles = mongoose.model("vehicles", VehiclesSchema);

export default vehicles;
