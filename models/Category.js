import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category must have a name!'],
  },
  spices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'spice',
  }],
});

const Category = mongoose.model('category', CategorySchema);

export default Category;
