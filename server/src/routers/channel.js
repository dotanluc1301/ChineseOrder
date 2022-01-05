const express = require('express');
const router = express.Router();
const { getChannelValidation, 
        addChannelValidation, 
        setChannelValidation,
        deleteChannelValidation } = require('../validation/channel');
const { validateResult } = require('../validation/validationError');
const { getChannels, getChannel, addChannel, setChannel, deleteChannel } = require('../db/channel');

//HTTP GET: getting all channels
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

//HTTP GET: getting specific channel by channel id
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

//HTTP POST: add new channel
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

//HTTP PUT: modify a single channel
router.put('/',setChannelValidation,validateResult,async function(req,res,next){
  res.set('Access-Control-Allow-Origin','*');
  try{
    await setChannel(req.body.id, req.body.channelName);
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

//HTTP DELETE: remove a single channel
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