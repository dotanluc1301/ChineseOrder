const firebase = require('./firebaseConnection');
const { COLLECTION_TAG, COLLECTION_TAG_ATTRIBUTE_TAGNAME} = require('../constant/collection');

async function getTags(){
  let arrayTag = [];
  return await firebase.db.collection(COLLECTION_TAG)
                          .get()
                          .then(snapshot => {
                                              snapshot.forEach(doc => arrayTag.push({
                                                                                      id: doc.id,
                                                                                      document: doc.data()
                                                                                    }));
                                              return arrayTag;
                                            });
}

async function getTag(tagName){
  let arrayTag = [];
  return await firebase.db.collection(COLLECTION_TAG)
                          .where(COLLECTION_TAG_ATTRIBUTE_TAGNAME,'==',tagName)
                          .get()
                          .then(snapshot => {
                                              snapshot.forEach(doc => arrayTag.push({
                                                                                      id: doc.id,
                                                                                      document: doc.data()
                                                                                    }));
                                              return arrayTag;
                                            });
}

async function addTag(tagName){
  const tagValue = { [COLLECTION_TAG_ATTRIBUTE_TAGNAME]: tagName };
  return await firebase.db.collection(COLLECTION_TAG)
                          .doc()
                          .set(tagValue);                          
}

async function setTag(tagId,tagName){
  const tagValue = { [COLLECTION_TAG_ATTRIBUTE_TAGNAME]: tagName };
  return await firebase.db.collection(COLLECTION_TAG)
                          .doc(tagId)
                          .set(tagValue,{merge: true});
}

async function deleteTag(tagId){
  return await firebase.db.collection(COLLECTION_TAG)
                          .doc(tagId)
                          .delete();
}

module.exports =  { 
                    getTags,
                    getTag,
                    addTag,
                    setTag,
                    deleteTag,
                  }