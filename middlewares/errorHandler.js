// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  res.status(500).send({ error: error.message } || { error: error.toString() });
};
