const express = require('express');
const router = express.Router();
const { getTagValidation, 
        addTagValidation, 
        setTagValidation,
        deleteTagValidation} = require('../validation/tag');
const { validateResult } = require('../validation/validationError');
const { getTags, getTag, addTag, setTag, deleteTag} = require('../db/tag');

/**
 * @swagger
 *  /api/tag:
 *    get:
 *      tags:
 *      - Tag
 *      summary:  Getting all tags
 *                Navigated by <domain>/api/tag
 */
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

/**
 *  @swagger
 *  /api/tag/{name}:
 *    get:
 *      tags:
 *      - Tag
 *      parameters: 
 *      - name: name
 *        in: path
 *        description: the tag name
 *        required: true
 *      summary:  Getting specified tag defined by given name
 *                Navigated by <domain>/api/tag/:name
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
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
/**
 *  @swagger
 *  /api/tag/:
 *    post:
 *      tags:
 *      - Tag
 *      parameters: 
 *      - name: name
 *        in: body
 *        description: the tag name
 *        required: true
 *      summary:  Create new tag by given name
 *                Navigated by <domain>/api/tag
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
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

/**
 *  @swagger
 *  /api/tag/:
 *    put:
 *      tags:
 *      - Tag
 *      parameters: 
 *      - name: id
 *        in: path
 *        description: the tag id
 *        required: true
 *      - name: name
 *        in: body
 *        description: the tag name
 *        required: true
 *      summary:  Edit existing tag by given name
 *                Navigated by <domain>/api/tag/:id
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.put('/',setTagValidation,validateResult,async function(req, res, next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await setTag(req.params.id, req.body.name);
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
 *  /api/tag/:
 *    delete:
 *      tags:
 *      - Tag
 *      parameters: 
 *      - name: id
 *        in: path
 *        description: the tag id
 *        required: true
 *      summary: Delete tag by given id
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
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