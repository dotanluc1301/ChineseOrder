const express = require('express');
const router = express.Router();
const { getShopValidation, 
        addShopValidation, 
        setShopValidation,
        deleteShopValidation} = require('../validation/shop');
const { validateResult } = require('../validation/validationError');
const { getShops, getShop, addShop, setShop, deleteShop} = require('../db/shop');

//HTTP GET: getting all shops
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

//HTTP GET: getting specific shop by shop name
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

//HTTP POST: add new shop
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

//HTTP PUT: modify a single shop
router.put('/', setShopValidation, validateResult, async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await setShop(req.body.name,
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

//HTTP DELETE: remove a single shop
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