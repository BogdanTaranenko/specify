import mongoose from 'mongoose';

const SpiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Spice must have a name'],
    unique: [true, 'Spice must have a unique name, check other spices'],
  },
  description: {
    type: String,
    required: [true, 'Spice must have a description'],
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  }],
});

const Spice = mongoose.model('spice', SpiceSchema);

export default Spice;

