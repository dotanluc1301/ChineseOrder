const express = require('express');
const router = express.Router();
const { getChannelValidation, 
        addChannelValidation, 
        setChannelValidation,
        deleteChannelValidation } = require('../validation/channel');
const { validateResult } = require('../validation/validationError');
const { getChannels, getChannel, addChannel, setChannel, deleteChannel } = require('../db/channel');

/**
 * @swagger
 *  /api/channel:
 *    get:
 *      tags:
 *      - Channel
 *      summary:  Getting all channels
 *                Navigated by <domain>/api/channel
 */
router.get('/',async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayChannels = await getChannels()
    res.status(200).send({ 
                          data: arrayChannels,
                          status: 'OK.'
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
 *  /api/channel/{channelName}:
 *    get:
 *      tags:
 *      - Channel
 *      parameters: 
 *      - name: channelName
 *        in: path
 *        description: the channel name
 *        required: true
 *      summary:  Getting specified channel defined by given name
 *                Navigated by <domain>/api/channel/:channelName  
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.get('/:channelName',getChannelValidation,validateResult,async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayChannels = await getChannel(req.params.channelName);
    if(arrayChannels.length == 0){
      return res.status(200).send({
                                  data: arrayChannels,
                                  status: 'BAD REQUEST.',
                                  error: 'No data found.'
                                });
    } 
    res.status(200).send({
                          data: arrayChannels,
                          status: 'OK.',
                          error: ''
                        });
  }catch(e){
    console.log(e);
    res.status(400).json({
                          data: [],
                          status: 'BAD REQUEST',
                          error: e   
                        });
  }
});

/**
 *  @swagger
 *  /api/channel/:
 *    post:
 *      tags:
 *      - Channel
 *      parameters: 
 *      - name: channelName
 *        in: body
 *        description: the channel name
 *        required: true
 *      summary:  Create new channel by given name
 *                Navigated by <domain>/api/channel
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.post('/',addChannelValidation,validateResult,async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    let arrayChannel = await getChannel(req.body.channelName)
    if(arrayChannel.length > 0){
      return res.status(400).send({
                                  status: 'BAD REQUEST.',
                                  error: 'Duplicated data.'
                                });
    }
    await addChannel(req.body.channelName);
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
 *  /api/channel/:
 *    put:
 *      tags:
 *      - Channel
 *      parameters: 
 *      - name: channelName
 *        in: body
 *        description: the channel name
 *        required: true
 *      - name: id
 *        in: path
 *        description: the channel id
 *        required: true
 *      summary:  Edit existing channel by given name
 *                Navigated by <domain>/api/channel
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.put('/:id',setChannelValidation,validateResult,async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await setChannel(req.params.id, req.body.channelName);
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
 *  /api/channel/:
 *    delete:
 *      tags:
 *      - Channel
 *      parameters: 
 *      - name: id
 *        in: path
 *        description: the channel id
 *        required: true
 *      summary:  Delete channel by given id
 *                Navigated by <domain>/api/channel/:id
 *      responses:
 *        200:
 *          description: Success
 *          content: application/json
 */
router.delete('/:id',deleteChannelValidation,validateResult,async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await deleteChannel(req.params.id);
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