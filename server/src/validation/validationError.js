const { validationResult  } =  require('express-validator');

const validateResult = async(req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400)
                                  .json({
                                          errors: errors.array().map(err => err.msg),
                                          status: 'BAD REQUEST.',
                                          error: ''
                                        });
  next();
}

module.exports = { validateResult }