import Category from '../../models/Category';


const getCategories = async () => await Category.find({});

const getCategory = async (_, { id }) => await Category.findById({ _id: id }).populate('spices');

const createCategory = async (_, { input: { name, spices } }) => await Category.create({ name, spices });

const deleteCategory = async (_, { id }) => await Category.findByIdAndRemove({ _id: id });

const updateCategory = async (_, { id, input: { name, spices } }) => {
  const updatedCategory = await Category.findByIdAndUpdate({ _id: id }, { name, spices });
  const correctSpice = await Category.findById({ _id: updatedCategory._id }).populate('spices');
  return correctSpice;
};

export default {
  Query: {
    getCategories,
    getCategory,
  },
  Mutation: {
    updateCategory,
    createCategory,
    deleteCategory,
  },
};
