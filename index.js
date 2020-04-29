function Page() {}

Page.prototype = {
  constructor: Page,

  postA: function (a) {
    console.log('a:' + a);
  },
  postB: function (b) {
    console.log('b:' + b);
  },
  postC: function (c) {
    console.log('c:' + c);
  },
  check: function () {
    return 1 > 0.5;
  }
}

function checkChange(obj){
  for(let key in obj){
    if(key.indexOf('post')!=-1 && typeof obj[key]=='function'){
      let fn=obj[key];
      obj[key]=function(){
        if(obj.check()){
          fn.apply(obj,arguments);
        }
      }
    }
  }
}
checkChange(Page.prototype);
let page=new Page();
page.postA(1);
page.postB(1);
page.postC(1);


function deepClone(obj){
  if(obj===null || obj===undefined || typeof obj!=='object'){
    return obj;
  }
  let newObj;
  if(Object.prototype.toString.call(obj)=='[object Date]'){
    return new Date(obj.getTime());
  }
  if(Array.isArray(newObj)){
    newObj=[];
  }else {
    newObj={};
  }
  for(let key in obj){
    newObj[key]=deepClone(obj[key]);
  }
  return newObj;
}

let test={
  a:1,
  b:{
    c:2
  }
}
console.log(deepClone(test))
let d=new Date();
console.log(deepClone(d))

var data =  [1, [2, [ [3, 4], 5], 6]];
  let result=[];

function flat(data){
  if(!Array.isArray(data)) return data;
  for(let i=0;i<data.length;i++){
    if(typeof data[i]=='object'){
      flat(data[i]);
    }else{
      result.push(data[i]);
    }
  }
  return result;
}
console.log(flat(data));

function isArray(a){
  if(typeof a!=='object') return false;
  return Object.prototype.toString.call(a)=='[object Array]';
}
console.log(isArray(""))

let str="?acd=11&qweee=ooo&acd=3";
function parse(str){
  if(typeof str!=='string') return str;

  if(str[0]=='?') str=str.slice(1);
  let result={};
  let pairs=str.split('&');
  for(let i=0;i<pairs.length;i++){
    let pair=pairs[i].split('=');
    let key=decodeURIComponent(pair[0]);
    let value=decodeURIComponent(pair[1])
    if(result[key]==undefined){
      result[key]=value;
    }else if(Array.isArray(result[key])){
      result[key].push(value);
    }else{
      let arr=[result[key],value];
      result[key]=arr;
    }
  }
  return result;
}

class event{
  constructor(){
    this._callbacks={};
  }
  on(type,handler){
    this._callbacks[type]=this._callbacks[type]||[];
    this._callbacks[type].push(handler);
    return this;
  }
  off(type,handler){
    let list=this._callbacks[type];
    if(list!=undefined){
      for(let i=0;i<list.length;i++){
        if(list[i]===handler){
          list.splice(i,1);
          break;
        }
      }
    }
    return this;
  }
  trigger(type,data){
    let list=this._callbacks[type];
    if(list!=undefined){
      for(let i=0;i<list.length;i++){
        list[i].call(this,data);
      }
    }
  }
  once(type,handler){
    this.on(type,wrapper);
    let self=this;
    function wrapper(){
      handler.apply(self,arguments);
      self.off(type,wrapper);
    }
    return this;
  }

}


(function (window) {
    function fn(str) {
        this.str = str;
    }
  //(\d+) ()中保存到$1
    fn.prototype.format = function () {
        var arg = Array.from(arguments);
        return this.str.replace(/\{\s*(\d+)\s*\}/g, function (a, b) {
            return arg[b] || '';
        });
    };

    window.fn = fn;
})(window);

// use
(function () {
    var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
    console.log(t.format('http://www.alibaba.com', 'Alibaba', 'Welcome'));
})();


function fillArray(input,start,end){
  for(let i=0;i<100;i++){
    let num=parseInt(Math.random()*(end-start))+start;
    input[i]=num;
  }
}

    var input = [];
    fillArray(input, 1, 100);
    console.log(input);

    normalize(input);
    // console.log(input);

function normalize(input){
  let map={};
  for(let i=0;i<100;i++){
    if(map[input[i]]==undefined) map[input[i]]=true;
  }
  let arr=[];
  for(let key in map){
    arr.push(key);
  }
  console.log(arr)
}
