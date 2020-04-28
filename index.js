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

console.log(parse(str))