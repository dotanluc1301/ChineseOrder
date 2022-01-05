const { body, param } =  require('express-validator');
const { CHANNEL_NAME_IS_NULL,
        CHANNEL_NAME_IS_NUMBER,
        CHANNEL_NAME_IS_EXCEED_MAXLENGTH,
        CHANNEL_ID_IS_NULL,
        CHANNEL_ID_IS_NUMBER,
        CHANNEL_ID_IS_EXCEED_MAXLENGTH } = require('../constant/errorMessage');
const { COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME,COLLECTION_CHANNEL_ATTRIBUTE_ID} = require('../constant/collection');

const getChannelValidation = async (req, res, next) => {
  await param(COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME).not().isEmpty().withMessage(CHANNEL_NAME_IS_NULL).run(req);
  await param(COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME).isLength({min: 1, max:30}).withMessage(CHANNEL_NAME_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const addChannelValidation = async (req, res, next) => {
  await body(COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME).not().isEmpty().withMessage(CHANNEL_NAME_IS_NULL).run(req);
  await body(COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME).isLength({min: 1, max:30}).withMessage(CHANNEL_NAME_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const setChannelValidation = async (req, res, next) => {
  await body(COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME).not().isEmpty().withMessage(CHANNEL_NAME_IS_NULL).run(req);
  await body(COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME).isLength({min: 1, max: 50}).withMessage(CHANNEL_NAME_IS_EXCEED_MAXLENGTH).run(req);
  await body(COLLECTION_CHANNEL_ATTRIBUTE_ID).not().isNumeric().withMessage(CHANNEL_ID_IS_NUMBER).run(req);
  await body(COLLECTION_CHANNEL_ATTRIBUTE_ID).not().isEmpty().withMessage(CHANNEL_ID_IS_NULL).run(req);
  await body(COLLECTION_CHANNEL_ATTRIBUTE_ID).isLength({min: 1, max: 200}).withMessage(CHANNEL_ID_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

const deleteChannelValidation = async (req, res, next) => {
  await body(COLLECTION_CHANNEL_ATTRIBUTE_ID).not().isNumeric().withMessage(CHANNEL_ID_IS_NUMBER).run(req);
  await body(COLLECTION_CHANNEL_ATTRIBUTE_ID).not().isEmpty().withMessage(CHANNEL_ID_IS_NULL).run(req);
  await body(COLLECTION_CHANNEL_ATTRIBUTE_ID).isLength({min: 1, max: 200}).withMessage(CHANNEL_ID_IS_EXCEED_MAXLENGTH).run(req);
  next();
}

module.exports =  { 
                    getChannelValidation,
                    addChannelValidation,
                    setChannelValidation,
                    deleteChannelValidation
                  }