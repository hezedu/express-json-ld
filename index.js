const fs = require('fs');

function getTplRender(tpl){
  const PLACEHOLDER = '<!--JSON-LD-PLACEHOLDER-->';
  const TITLE = '<!--JSON-LD-TITLE-->';
  var placeholderIndex = tpl.indexOf(PLACEHOLDER);
  if(placeholderIndex === -1){
    throw new Error(`express-json-ld: ${config.indexPath} unhave "${PLACEHOLDER}"`);
  }

  var titleIndex = tpl.indexOf(TITLE);
  if(titleIndex === -1){
    throw new Error(`express-json-ld: ${config.indexPath} unhave "${TITLE}"`);
  }

  var str0, str1, str2, 
  isTitleBeforePlaceholder = titleIndex < placeholderIndex;
  if(isTitleBeforePlaceholder){
    str0 = tpl.substr(0, titleIndex);
    var _tmp = tpl.substr(titleIndex + TITLE.length);
    str1 = _tmp.substr(0, placeholderIndex);
    str2 = _tmp.substr(placeholderIndex + PLACEHOLDER.length);
    return function(data){
      return str0 + data.title + str1 + data.body + str2;
    }
  }else{
    str0 = tpl.substr(0, placeholderIndex);
    var _tmp = tpl.substr(placeholderIndex + PLACEHOLDER.length);
    str1 = _tmp.substr(0, titleIndex);
    str2 = _tmp.substr(placeholderIndex + TITLE.length);
    return function(data){
      return str0 + data.body + str1 + data.title + str2;
    }
  }
}

function jsonLDWrap(obj){
  return `<script type="application/ld+json" id="json-ld-${obj['@type']}">${JSON.stringify(obj)}</script>`
}

module.exports = function(config){
  const tpl = fs.readFileSync(config.indexPath, 'utf-8');
  const render = getTplRender(tpl);
  config.app.response.__proto__.jsonLD = function(data){
    if(!Array.isArray(data)){
      data = [data];
    }
    var body = '', title = [];
    for(let i = 0, len = data.length; i < len; i++){
      var v = data[i]
      body += jsonLDWrap(v);
      const _title = v.name || v.headline
      if(_title){
        title.unshift(_title);
      }
    }
    this.send(render({
      body: body,
      title: title.join('-')
    }));
  };
}
