const fs = require('fs');

fs.watchFile('./watch_file.txt', function(){
  console.log(arguments);
})