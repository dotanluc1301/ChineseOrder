const express = require('express');
const router = express.Router();
const { getTagValidation, 
        addTagValidation, 
        setTagValidation,
        deleteTagValidation} = require('../validation/tag');
const { validateResult } = require('../validation/validationError');
const { getTags, getTag, addTag, setTag, deleteTag} = require('../db/tag');

//HTTP GET: getting all tags
router.get('/',async function(req, res, next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayTags = await getTags();
    res.status(200).send({ 
                          data: arrayTags,
                          status: 'OK.',
                          error: ''
                        });
  }catch(err){
    console.log(err.msg);
    res.status(400).send({ 
                          data: [],
                          status: 'BAD REQUEST.',
                          error: ''
                        })
  }
});

//HTTP GET: getting specific tag by tag name
router.get('/:name', getTagValidation, validateResult, async function(req, res, next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayTags = await getTag(req.params.name);
    if(arrayTags.length == 0){
      return res.status(200).send({
                                  data: arrayTags,
                                  status: 'BAD REQUEST.',
                                  error: 'No data found.'
                                });
    } 
    res.status(200).send({
                          data: arrayTags,
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

//HTTP POST: add new tag
router.post('/',addTagValidation, validateResult,async function(req, res, next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayTag = await getTag(req.body.name);
    if(arrayTag.length > 0){
      return res.status(400).send({
                                  status: 'BAD REQUEST.',
                                  error: 'Duplicated data.'
                                });
    }
    await addTag(req.body.name);
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

//HTTP PUT: modify a single tag
router.put('/',setTagValidation,validateResult,async function(req, res, next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await setTag(req.body.id, req.body.name);
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

//HTTP DELETE: remove a single tag
router.delete('/:id',deleteTagValidation,validateResult,async function(req, res, next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await deleteTag(req.params.id);
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

module.exports = router;