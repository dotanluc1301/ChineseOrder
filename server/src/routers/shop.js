const express = require('express');
const router = express.Router();
const { getShopValidation, 
        addShopValidation, 
        setShopValidation,
        deleteShopValidation} = require('../validation/shop');
const { validateResult } = require('../validation/validationError');
const { getShops, getShop, addShop, setShop, deleteShop} = require('../db/shop');

/**
 * @swagger
 *  /shop:
 *    get:
 *      tags:
 *      - Shop
 *      summary:  Getting all shops
 *                Navigated by <domain>/api/shop
 */
router.get('/',async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayShops = await getShops();
    res.status(200).send({ 
                          data: arrayShops,
                          status: 'OK.',
                          error: ''
                        });
  }catch(e){
    console.log(e);
    res.status(400).send({ 
                          data: [],
                          status: 'BAD REQUEST.',
                          error: e
                        })
  }
});

/**
 *  @swagger
 *  /shop/{name}:
 *    get:
 *      tags:
 *      - Shop
 *      parameters: 
 *      - name: name
 *        in: path
 *        description: the shop name
 *        required: true
 *      summary:  Getting specified shop defined by given name
 *                Navigated by <domain>/api/shop/:name
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.get('/:name',getShopValidation,validateResult,async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayShops = await getShop(req.params.name);
    if(arrayShops.length == 0){
      return res.status(200).send({
                                  data: arrayShops,
                                  status: 'BAD REQUEST.',
                                  error: 'No data found.'
                                });
    } 
    res.status(200).send({
                          data:arrayShops,
                          status: 'OK.',
                          error: ''
                        });
  }catch(e){
    console.log(e);
    res.status(400).json({
                          data: [],
                          status: 'BAD REQUEST.',
                          error: e  
                        });
  }
});

/**
 *  @swagger
 *  /shop/:
 *    post:
 *      tags:
 *      - Shop
 *      parameters: 
 *      - name: name
 *        in: body
 *        description: the tag name
 *        required: true
 *      - name: url
 *        in: body
 *        description: the url value
 *        required: true
 *      - name: tags
 *        in: body
 *        description: the tags value
 *        required: true
 *      - name: channel
 *        in: body
 *        description: the channel value
 *        required: true
 *      summary:  Create new shop by given value
 *                Navigated by <domain>/api/shop
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.post('/',addShopValidation,validateResult,async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayShop = await getShop(req.body.name);
    if(arrayShop.length > 0){
      return res.status(400).send({
                                  status: 'BAD REQUEST.',
                                  error: 'Duplicated data.'
                                });
    }
    await addShop(req.body.name,
                  req.body.url,
                  req.body.tags,
                  req.body.channel);
    res.status(200).send({ 
                          status: 'OK.',
                          error: ''
                        });
  }catch(e){
    console.log(e);
    res.status(400).json({
                          status: 'BAD REQUEST.',
                          error: e
                        });
  }
});

/**
 *  @swagger
 *  /shop/:
 *    put:
 *      tags:
 *      - Shop
 *      parameters: 
 *      - name: id
 *        in: body
 *        description: the shop id
 *        required: true
 *      - name: name
 *        in: body
 *        description: the shop name
 *        required: true
 *      - name: url
 *        in: body
 *        description: the url value
 *        required: true
 *      - name: tags
 *        in: body
 *        description: the tags value
 *        required: true
 *      - name: channel
 *        in: body
 *        description: the channel value
 *        required: true
 *      summary:  Edit existing shop by given name
 *                Navigated by <domain>/api/shop
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.put('/', setShopValidation, validateResult, async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await setShop(req.body.id,
                  req.body.name,
                  req.body.url,
                  req.body.tags,
                  req.body.channel);
    res.status(200).send({ 
                          status: 'OK.',
                          error: ''
                        });
  }catch(e){
    console.log(e);
    res.status(400).json({
                          error: e,
                          status: 'BAD REQUEST.'
                        });
  }
});

/**
 *  @swagger
 *  /shop/:
 *    delete:
 *      tags:
 *      - Shop
 *      parameters: 
 *      - name: id
 *        in: path
 *        description: the shop id
 *        required: true
 *      summary:  Delete shop by given id
 *                Navigated by <domain>/api/shop/:id
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.delete('/:id',deleteShopValidation,validateResult,async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await deleteShop(req.params.id);
    res.status(200).send({
                          status: 'OK.',
                          error: ''
                        });
  }catch(e){
    console.log(e);
    res.status(400).json({
                          status: 'OK.',
                          status: 'BAD REQUEST.'
                        });
  }
});

module.exports = router;