import mongoose from 'mongoose';

const PeopleSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  mass: {
    type: String,
    required: true
  },
  hair_color: {
    type: String,
    required: true
  },
  skin_color: {
    type: String,
    required: true
  },
  birth_year: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  homeworld: {
    type: String,
    required: false
  },
  films: {
    type: [{ type: Number, ref: 'films' }],
    required: true
  },
  species: {
    type: [{ type: Number, ref: 'species' }],
    required: true
  },
  vehicles: {
    type: [{ type: Number, ref: 'vehicals' }],
    required: true
  },
  starships: {
    type: [{ type: Number, ref: 'starships' }],
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
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const people = mongoose.model("people", PeopleSchema);

export default people
