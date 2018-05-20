var PORT =  process.env.PORT || 8080;
var config = {
   
   entry: './webclient/main.js',
   output: {
      path:'/',
      filename: 'index.js',
   },
   devServer: {
      inline: true,
      historyApiFallback:true,
      //disableHostCheck: true,
      //host:'0.0.0.0',
      port: PORT,
      open: true,
        proxy: {
        "/api": "http://localhost:3000"
        }
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}
module.exports = config;