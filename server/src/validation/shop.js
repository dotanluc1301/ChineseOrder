const { body, param } =  require('express-validator');
const { SHOP_NAME_IS_NULL,
        SHOP_NAME_IS_NUMBER,
        SHOP_NAME_IS_EXCEED_MAXLENGTH,
        SHOP_ID_IS_NULL,
        SHOP_ID_IS_NUMBER,
        SHOP_ID_IS_EXCEED_MAXLENGTH,
        SHOP_URL_IS_NUMBER,
        SHOP_URL_IS_NULL,
        SHOP_URL_IS_EXCEED_MAXLENGTH,
        SHOP_TAG_IS_NUMBER,
        SHOP_TAG_IS_NULL,
        SHOP_TAG_IS_NOT_ARRAY,
        SHOP_TAG_IS_EXCEED_MAXLENGTH,
        SHOP_CHANNEL_IS_NULL,
        SHOP_CHANNEL_IS_NUMBER,
        SHOP_CHANNEL_IS_EXCEED_MAXLENGTH } = require('../constant/errorMessage');
const { COLLECTION_SHOP_ATTRIBUTE_SHOPNAME,
        COLLECTION_SHOP_ATTRIBUTE_URL,
        COLLECTION_SHOP_ATTRIBUTE_TAGS,
        COLLECTION_SHOP_ATTRIBUTE_CHANNEL,
        COLLECTION_SHOP_ATTRIBUTE_ID } = require('../constant/collection');

const getShopValidation = async (req, res, next) => {
  await param(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).not().isNumeric().withMessage(SHOP_NAME_IS_NUMBER).run(req);
  await param(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).not().isEmpty().withMessage(SHOP_NAME_IS_NULL).run(req);
  await param(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).isLength({min: 1, max: 200}).withMessage(SHOP_NAME_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const addShopValidation = async (req, res, next) => {
  await body(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).not().isNumeric().withMessage(SHOP_NAME_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).not().isEmpty().withMessage(SHOP_NAME_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).isLength({min: 1, max: 200}).withMessage(SHOP_NAME_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_URL).not().isNumeric().withMessage(SHOP_URL_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_URL).not().isEmpty().withMessage(SHOP_URL_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_URL).not().isURL().withMessage(SHOP_URL_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_URL).isLength({min: 1, max: 2000}).withMessage(SHOP_URL_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_TAGS).not().isNumeric().withMessage(SHOP_TAG_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_TAGS).not().isEmpty().withMessage(SHOP_TAG_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_TAGS).not().isArray().withMessage(SHOP_TAG_IS_NOT_ARRAY).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_TAGS).not().isArray({min: 1,max: 50}).withMessage(SHOP_TAG_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_CHANNEL).not().isNumeric().withMessage(SHOP_CHANNEL_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_CHANNEL).not().isEmpty().withMessage(SHOP_CHANNEL_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_CHANNEL).isLength({min: 1, max: 30}).withMessage(SHOP_CHANNEL_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const setShopValidation = async (req, res, next) => {
  await body(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).not().isNumeric().withMessage(SHOP_NAME_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).not().isEmpty().withMessage(SHOP_NAME_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME).isLength({min: 1, max: 200}).withMessage(SHOP_NAME_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_URL).not().isNumeric().withMessage(SHOP_URL_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_URL).not().isEmpty().withMessage(SHOP_URL_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_URL).not().isURL().withMessage(SHOP_URL_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_URL).isLength({min: 1, max: 2000}).withMessage(SHOP_URL_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_TAGS).not().isNumeric().withMessage(SHOP_TAG_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_TAGS).not().isEmpty().withMessage(SHOP_TAG_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_TAGS).not().isArray().withMessage(SHOP_TAG_IS_NOT_ARRAY).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_TAGS).not().isArray({min: 1,max: 50}).withMessage(SHOP_TAG_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_ID).not().isNumeric().withMessage(SHOP_ID_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_ID).not().isEmpty().withMessage(SHOP_ID_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_ID).isLength({min: 1, max: 200}).withMessage(SHOP_ID_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_CHANNEL).not().isNumeric().withMessage(SHOP_CHANNEL_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_CHANNEL).not().isEmpty().withMessage(SHOP_CHANNEL_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_CHANNEL).isLength({min: 1, max: 30}).withMessage(SHOP_CHANNEL_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const deleteShopValidation = async (req, res, next) => {
  await body(COLLECTION_SHOP_ATTRIBUTE_ID).not().isNumeric().withMessage(SHOP_ID_IS_NUMBER).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_ID).not().isEmpty().withMessage(SHOP_ID_IS_NULL).run(req);
  await body(COLLECTION_SHOP_ATTRIBUTE_ID).not().isLength({min: 1, max: 200}).withMessage(SHOP_ID_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

module.exports =  { 
                    getShopValidation,
                    addShopValidation,
                    setShopValidation,
                    deleteShopValidation
                  }