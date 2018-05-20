
var mongooseObj = require( 'mongoose' ); 
    mongooseObj.connect( MONGODB_URI + '/' + BD_NAME); 

mongooseObj.connection.on('connected', function () {  
  console.log('Mongo connection opened at' + MONGODB_URI + '/' + BD_NAME);
}); 

mongooseObj.connection.on('error',function (err) {  
  console.log('Mongo Connection error: ' + err);
}); 

mongooseObj.connection.on('disconnected', function () {  
  console.log('Mongo connection disconnected!'); 
});

process.on('SIGINT', function() {  
  mongooseObj.connection.close(function () { 
    console.log('Mongo connection killed'); 
    process.exit(0); 
  }); 
}); 