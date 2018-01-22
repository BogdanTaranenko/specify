import Category from '../models/Category';

export default {
  getAll(req, res, next) {
    Category.find({}).then(categories => res.send(categories))
      .catch(error => next(error));
  },
  getOne(req, res, next) {
    Category.findOne({ _id: req.params.id })
      .populate('spices')
      .exec()
      .then(category => res.status(200).send(category))
      .catch(error => next(error));
  },
  create(req, res, next) {
    Category.create(req.body)
      .then(category => res.status(201).send(category))
      .catch(error => next(error));
  },
  edit(req, res, next) {
    Category.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(category => Category.findOne({ _id: category._id })
        .then(updatedCategory => res.send(updatedCategory)))
      .catch(error => next(error));
  },
  remove(req, res, next) {
    Category.findByIdAndRemove({ _id: req.params.id })
      .then(category => res.send(category))
      .catch(error => next(error));
  },
};
