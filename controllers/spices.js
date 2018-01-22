import Spice from '../models/Spice';

export default {
  getAll(req, res, next) {
    Spice.find({}).then(spices => res.send(spices))
      .catch(error => next(error));
  },
  getOne(req, res, next) {
    Spice.findOne({ _id: req.params.id })
      .populate('categories')
      .exec()
      .then(spice => res.status(200).send(spice))
      .catch(error => next(error));
  },
  create(req, res, next) {
    Spice.create(req.body)
      .then(spice => res.status(201).send(spice))
      .catch(error => next(error));
  },
  edit(req, res, next) {
    Spice.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(spice => Spice.findOne({ _id: spice._id })
        .then(updatedSpice => res.send(updatedSpice)))
      .catch(error => next(error));
  },
  remove(req, res, next) {
    Spice.findByIdAndRemove({ _id: req.params.id })
      .then(() => res.status(204).send({ success: true }))
      .catch(error => next(error));
  },
};
