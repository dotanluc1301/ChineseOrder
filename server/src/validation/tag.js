const { body, param } =  require('express-validator');
const { TAG_NAME_IS_NULL,
        TAG_NAME_IS_NUMBER,
        TAG_NAME_IS_EXCEED_MAXLENGTH,
        TAG_ID_IS_NULL,
        TAG_ID_IS_NUMBER,
        TAG_ID_IS_EXCEED_MAXLENGTH} = require('../constant/errorMessage');
const { COLLECTION_TAG_ATTRIBUTE_TAGNAME, COLLECTION_TAG_ATTRIBUTE_ID } = require('../constant/collection');

const getTagValidation = async (req, res, next) => {
  await param(COLLECTION_TAG_ATTRIBUTE_TAGNAME).not().isNumeric().withMessage(TAG_NAME_IS_NUMBER).run(req);
  await param(COLLECTION_TAG_ATTRIBUTE_TAGNAME).not().isEmpty().withMessage(TAG_NAME_IS_NULL).run(req);
  await param(COLLECTION_TAG_ATTRIBUTE_TAGNAME).isLength({min: 1, max: 30}).withMessage(TAG_NAME_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const addTagValidation = async (req, res, next) => {
  await body(COLLECTION_TAG_ATTRIBUTE_TAGNAME).not().isNumeric().withMessage(TAG_NAME_IS_NUMBER).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_TAGNAME).not().isEmpty().withMessage(TAG_NAME_IS_NULL).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_TAGNAME).isLength({min: 1, max: 30}).withMessage(TAG_NAME_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const setTagValidation = async (req, res, next) => {
  await body(COLLECTION_TAG_ATTRIBUTE_TAGNAME).not().isNumeric().withMessage(TAG_NAME_IS_NUMBER).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_TAGNAME).not().isEmpty().withMessage(TAG_NAME_IS_NULL).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_TAGNAME).isLength({min: 1, max: 30}).withMessage(TAG_NAME_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_ID).not().isNumeric().withMessage(TAG_ID_IS_NUMBER).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_ID).not().isEmpty().withMessage(TAG_ID_IS_NULL).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_ID).isLength({min: 1, max: 200}).withMessage(TAG_ID_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const deleteTagValidation = async (req, res, next) => {
  await body(COLLECTION_TAG_ATTRIBUTE_ID).not().isNumeric().withMessage(TAG_ID_IS_NUMBER).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_ID).not().isEmpty().withMessage(TAG_ID_IS_NULL).run(req);
  await body(COLLECTION_TAG_ATTRIBUTE_ID).isLength({min: 1, max: 200}).withMessage(TAG_ID_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

module.exports =  { 
                    getTagValidation,
                    addTagValidation,
                    setTagValidation,
                    deleteTagValidation
                  }