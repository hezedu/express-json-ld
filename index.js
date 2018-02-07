const fs = require('fs');
var indexPath;

function getTplRender(tpl){
  const PLACEHOLDER = '<!--JSON-LD-PLACEHOLDER-->';
  const TITLE = '<!--JSON-LD-TITLE-->';
  var placeholderIndex = tpl.indexOf(PLACEHOLDER);
  if(placeholderIndex === -1){
    throw new Error(`express-json-ld: ${indexPath} unhave "${PLACEHOLDER}"`);
  }
  
  var titleIndex = tpl.indexOf(TITLE);
  if(titleIndex === -1){
    throw new Error(`express-json-ld: ${indexPath} unhave "${TITLE}"`);
  }
  var indent = tpl.lastIndexOf('\n', placeholderIndex);
  indent = placeholderIndex - indent;
  var indentStr = [];
  for(let i = 0, len = indent; i < len; i++){
    indentStr.push('');
  }
  indentStr = indentStr.join(' ');
  var str0, str1, str2, 
  isTitleBeforePlaceholder = titleIndex < placeholderIndex;
  var render;

  if(isTitleBeforePlaceholder){
    str0 = tpl.substr(0, titleIndex);
    var _tmp = tpl.substr(titleIndex + TITLE.length);
    _tmp = _tmp.split(PLACEHOLDER);
    str1 = _tmp[0]
    str2 = _tmp[1];
    render = function(data){
      return str0 + data.title + str1 + data.body + str2;
    }
  }else{
    str0 = tpl.substr(0, placeholderIndex);
    var _tmp = tpl.substr(placeholderIndex + PLACEHOLDER.length);
    _tmp = _tmp.split(TITLE);
    str1 = _tmp[0]
    str2 = _tmp[1];
    render = function(data){
      return str0 + data.body + str1 + data.title + str2;
    }
  }
  render.indent = indentStr
  return render;
}

function jsonLDWrap(obj){
  return `<script type="application/ld+json" id="json-ld-${obj['@type']}">${JSON.stringify(obj)}</script>`
}

exports.install = function(app, _indexPath){
  if(indexPath) {
    throw new Error('JSONLD Already Installed');
  }
  indexPath = _indexPath;
  const tpl = fs.readFileSync(indexPath, 'utf-8');
  const render = getTplRender(tpl);
  const indent = '\n' + render.indent;
  app.response.__proto__.JSONLD = function(data){
    if(!Array.isArray(data)){
      data = [data];
    }
    var body = [], title = [];
    for(let i = 0, len = data.length; i < len; i++){
      var v = data[i]
      body.push(jsonLDWrap(v));
      const _title = v.name || v.headline
      if(_title){
        title.unshift(_title);
      }
    }
    this.send(render({
      body: body.join(indent),
      title: title.join('-')
    }));
  };
}
