import Spice from '../../models/Spice';


const getSpices = async () => await Spice.find({});

const getSpice = async (_, { id }) => await Spice.findById({ _id: id }).populate('categories');

const createSpice = async (_, { input: { name, description, categories } }) => await Spice.create({ name, description, categories });

const deleteSpice = async (_, { id }) => await Spice.findByIdAndRemove({ _id: id });

const updateSpice = async (_, { id, input: { name, description, categories } }) => {
  const updatedSpice = await Spice.findByIdAndUpdate({ _id: id }, { name, description, categories });
  const correctSpice = await Spice.findById({ _id: updatedSpice._id }).populate('categories');
  return correctSpice;
};

export default {
  Query: {
    getSpices,
    getSpice,
  },
  Mutation: {
    createSpice,
    updateSpice,
    deleteSpice,
  },
};
