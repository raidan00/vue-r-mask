import caret from  './caretPos.js'; 

export default {
  bind (el, val, VNode){
    var maskFunc = initMask(el, val);
    el.removeEventListener('input', VNode.data.on.input)
    el.addEventListener('input', maskFunc);
    el.addEventListener('input', VNode.data.on.input)
  },
  unbind (el){
    //el.removeEventListener('input', maskFunc)
  },
}
function initMask (el, val){
	var frame = [];
	var str = val.value.toString().slice(1,-1);
	var reg = /(?:\\d+\{[\d,]\})|./g, match;
	while(match = reg.exec(str)){
		var toPush = {reg: new RegExp(match[0]), regStr: match[0]};
		if(match[0].length == 1){
			toPush.minLen = 1;
			toPush.maxLen = 1;
			toPush.newReg = match[0];
      toPush.charReg = match[0];
      toPush.type = 'single';
      toPush.reg = new RegExp(toPush.charReg+'+');
		} else {
			toPush.minLen = +/\{(\d+)/.exec(match[0])[1];
			toPush.maxLen = +/(\d+)\}/.exec(match[0])[1];
			toPush.newReg = '(_|' + match[0].replace('{', '){');
      toPush.charReg = /[^{]+/.exec(toPush.newReg)[0];
      toPush.reg = new RegExp(toPush.charReg+'+');
		}
		frame.push(toPush);	
	}
  return function (el){	
    var arr = this.value.split('').map((e)=>{return {char: e, type: 'char'}});
    var pos = { char: '', type: 'pos' };
    arr.splice(caret.get(this), 0, pos);
    var newVal = [];
    mainLoop: for(var i = 0; i < frame.length; i++){
      for(var k = 0; k < frame[i].maxLen; k++){     
        if(arr[0] && arr[0].type == 'pos'){
          newVal.push(arr.shift());
          k--;
          continue;
        }
        if(arr[0] == undefined){
          if(frame[i].type == 'single'){
            newVal.push({char:frame[i].charReg});
          }else{
            newVal.push({char:'_'});
          }
          continue;
        }
        if(frame[i].reg.exec(arr[0].char)){
          newVal.push(arr.shift());
        }else{
          if(frame[i].type == 'single'){
              newVal.push({char:frame[i].charReg});
          }else{
              arr.shift();
              k--;
          }
        }
      }
    }
    this.value = newVal.map((e)=>e.char).join('');
    caret.set(this, newVal.indexOf(pos));
  }
};
