/**
 * Recquest data validator wrapper
 */

// Expresss validator
const { validationResult } = require('express-validator');

// Errors
const { ErrorHandler, errorMessages } = require('../../errors');

// Validation wrapper
module.exports = validations => {
  /**
   * Express middleware
   */
  return async (req, res, next) => {
    // Add validation to request object
    await Promise.all(validations.map(validation => validation.run(req)));

    // Validate data and continue if no errors found
    const errors = validationResult(req);

    // Throw if errors
    if (!errors.isEmpty())
      // Format error message
      next(
        new ErrorHandler({
          ...errorMessages.DATA_REQUEST_INVALID,
          details: errors.array(),
          dev: true
        })
      );

    // Data is valid, call next middleware
    next();
  };
};
