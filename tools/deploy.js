const webpack = require('webpack');
const spawn = require('child_process').spawn;
const webpackConfig = require('../config/webpack/webpack.config');

new Promise((resolve, reject) => {
  webpack({ mode: 'production',
        ...webpackConfig
      }).run((err, stats) => {
    if (err) {
      reject(err);
    } else {
      console.log(stats.toString(webpackConfig.stats));
      resolve();
    }
  });
}).then(() => {
  rumCommand('sh', [__dirname + '/release.sh'], (state) => {
    console.log('state:',state);
  });
});

function rumCommand(command, args, callBack) {
  let child = spawn(command, args);
  let response = '';
  child.stdout.on('data', function(buffer){
    response += buffer.toString();
  });
  child.stdout.on('end', function(){
    callBack(response);
  });
}