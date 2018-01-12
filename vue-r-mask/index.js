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
	var reg = /(?:\\d+\{[\d,]+\})|\\.|./g, match;
	while(match = reg.exec(str)){
		var toPush = {};
		if(match[0].length <= 2){
			toPush.minLen = 1;
			toPush.maxLen = 1;
      toPush.type = 'single';
      toPush.char = match[0][match[0].length-1];
      toPush.reg = new RegExp(match[0]+'+');
		} else {
			toPush.minLen = +/\{(\d+)/.exec(match[0])[1];
			toPush.maxLen = +/(\d+)\}/.exec(match[0])[1];
      toPush.reg = new RegExp('(_|' + /[^{]+/.exec(match[0])[0] + ')+');
		}
		frame.push(toPush);	
	}
	console.log(frame);
  return function (el){	
		console.log(this.value);
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
            newVal.push({char:frame[i].char});
          }else{
						if( k >= frame[i].minLen ){
							continue mainLoop;
						}
            newVal.push({char:'_'});
          }
          continue;
        }
        if(frame[i].reg.exec(arr[0].char)){
					if( k >= frame[i].minLen && arr[0].char == '_') {
						continue mainLoop;
					}
          newVal.push(arr.shift());
        }else{
          if(frame[i].type == 'single'){
              newVal.push({char:frame[i].char});
          }else{
							if( k >= frame[i].minLen ) {
								continue mainLoop;
							}
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
