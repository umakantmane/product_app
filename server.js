var app = require("express")()
  , PORT = process.env.PORT || 3000
  , cors = require('cors')
  , bodyParser = require('body-parser');

require('./webservices/config/config');  
require('./webservices/config/db');
global.BASE_URL = __dirname;
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
// res.header('Access-Control-Allow-Credentials', true);
//   next();
// });  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./webservices/controllers/ProductController')(app);

app.listen(PORT, function(err){
    if(err) throw err;
    console.log("server running on port: " + PORT);
});


