var fs = require('fs');
var browserify = require('browserify');
var vueify = require('vueify');
browserify('www/js/main.js')
  .transform(vueify, {presets: ["es2015"]})
  .bundle().on('error', function (err) {
    console.log(err);
  })
  .pipe(fs.createWriteStream('www/js/bundle.js'))