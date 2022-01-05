const firebase = require('./firebaseConnection');
const { COLLECTION_CHANNEL, COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME } = require('../constant/collection');

async function getChannels(){
  let arrayChannel = [];
  return await firebase.db.collection(COLLECTION_CHANNEL)
                          .get()
                          .then(snapshot => {
                                              snapshot.forEach(doc => arrayChannel.push({
                                                                                      id: doc.id,
                                                                                      document: doc.data()
                                                                                    }));
                                              return arrayChannel;
                                            });
}

async function getChannel(channelName){
  let arrayChannel = [];
  return await firebase.db.collection(COLLECTION_CHANNEL)
                          .where(COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME,'==',channelName)
                          .get()
                          .then(snapshot => {
                                              snapshot.forEach(doc => arrayChannel.push({
                                                                                      id: doc.id,
                                                                                      document: doc.data()
                                                                                    }));
                                              return arrayChannel;
                                            });
}

async function addChannel(channelName){
  const channelValue = { [COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME]: channelName };
  return await firebase.db.collection(COLLECTION_CHANNEL)
                          .doc()
                          .set(channelValue,{merge: true})
                          .then(snapshot => {return snapshot.id});
}

async function setChannel(channelId,channelName){
  const channelValue = { [COLLECTION_CHANNEL_ATTRIBUTE_CHANNELNAME]: channelName };
  return await firebase.db.collection(COLLECTION_CHANNEL)
                          .doc(channelId)
                          .set(channelValue,{merge: true})
                          .then(snapshot => {return snapshot.id});
}

async function deleteChannel(channelId){
  return await firebase.db.collection(COLLECTION_CHANNEL)
                          .doc(channelId)
                          .delete();
}

module.exports =  { 
                    getChannels,
                    getChannel,
                    addChannel,
                    setChannel,
                    deleteChannel,
                  }