const firebase = require('./firebaseConnection');
const { COLLECTION_SHOP, 
        COLLECTION_SHOP_ATTRIBUTE_SHOPNAME,
        COLLECTION_SHOP_ATTRIBUTE_URL,
        COLLECTION_SHOP_ATTRIBUTE_TAGS,
        COLLECTION_SHOP_ATTRIBUTE_CHANNEL } = require('../constant/collection');

async function getShops(){
  let arrayShop = [];
  return await firebase.db.collection(COLLECTION_SHOP)
                          .get()
                          .then(snapshot => {
                                              snapshot.forEach(doc => arrayShop.push({
                                                                                      id: doc.id,
                                                                                      document: doc.data()
                                                                                    }));
                                              return arrayShop;
                                            });
}

async function getShop(shopName){
  let arrayShop = [];
  return await firebase.db.collection(COLLECTION_SHOP)
                          .where(COLLECTION_SHOP_ATTRIBUTE_SHOPNAME,'==',shopName)
                          .get()
                          .then(snapshot => {
                                              snapshot.forEach(doc => arrayShop.push({
                                                                                      id: doc.id,
                                                                                      document: doc.data()
                                                                                    }));
                                              return arrayShop;
                                            });
}

async function addShop(shopName, url, tags, channel){
  const shopValue = { 
                      [COLLECTION_SHOP_ATTRIBUTE_SHOPNAME]: shopName,
                      [COLLECTION_SHOP_ATTRIBUTE_URL]: url,
                      [COLLECTION_SHOP_ATTRIBUTE_TAGS]: tags,
                      [COLLECTION_SHOP_ATTRIBUTE_CHANNEL]: channel
                    };

  return await firebase.db.collection(COLLECTION_SHOP)
                          .doc()
                          .set(shopValue,{merge: true});
}

async function setShop(shopId,shopName, url, tags, channel){
  const shopValue = { 
                      [COLLECTION_SHOP_ATTRIBUTE_SHOPNAME]: shopName,
                      [COLLECTION_SHOP_ATTRIBUTE_URL]: url,
                      [COLLECTION_SHOP_ATTRIBUTE_TAGS]: tags,
                      [COLLECTION_SHOP_ATTRIBUTE_CHANNEL]: channel 
                    };
  return await firebase.db.collection(COLLECTION_SHOP)
                          .doc(shopId)
                          .set(shopValue,{merge: true})
                          .then(snapshot => {return snapshot.id});
}

async function deleteShop(shopId){
  return await firebase.db.collection(COLLECTION_SHOP)
                          .doc(shopId)
                          .delete();
}

module.exports =  { 
                    getShops,
                    getShop,
                    addShop,
                    setShop,
                    deleteShop
                  }