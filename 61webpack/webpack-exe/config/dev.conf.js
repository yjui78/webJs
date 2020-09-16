const path = require('path');
module.exports ={
    mode: 'development',
    output:{
        path:path.resolve(__dirname,'../build'),
        filename:'bundle.js',
        publicPath:'/', 
    },
     devServer:{
        contentBase: path.resolve(__dirname,'./'),
        compress: true, 
        port:3001,       
        open:true, 
         disableHostCheck:true,
         historyApiFallback:true,
         proxy:{
            '/api':'http://localhost:8080',
         }
    }
}