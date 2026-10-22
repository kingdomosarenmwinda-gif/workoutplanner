const { ValidationError } = require("../utils/errors");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const details = error.details.map((d) => d.message).join(", ");
    return next(new ValidationError(details));
  }
  req.body = value;
  next();
};

module.exports = { validate };
