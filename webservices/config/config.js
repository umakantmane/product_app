"use strict";
var confObj =  {
    MONGODB_URI : 'mongodb://localhost:27017',
    BD_NAME:'products'
};

for(let i in confObj){
    global[i] = confObj[i];
};