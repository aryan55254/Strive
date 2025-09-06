const { ZodError } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = {};
      error.issues.forEach((issue) => {
        const fieldName = issue.path[issue.path.length - 1];
        formattedErrors[fieldName] = issue.message;
      });

      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
    next(error);
  }
};

module.exports = validate;
