import caret from  './caretPos.js';

export default {
	bind (el, val, VNode){
		bind(...arguments)
  },
	update (el, val, VNode){
		if( val.value.toString() == val.oldValue.toString()) return;
		el.removeEventListener('input', VNode.context.vueRmask)
		bind(...arguments);
	}
}
function bind (el, val, VNode){
	if(VNode.data.on && VNode.data.on.input) el.removeEventListener('input', VNode.data.on.input);
	let maskFunc = initMask(el, val);
	el.addEventListener('input', maskFunc);
	VNode.context.vueRmask = maskFunc;
	if(VNode.data.on && VNode.data.on.input) el.addEventListener('input', VNode.data.on.input)
	el.dispatchEvent(new Event('input'));
};
function initMask (el, val){
	let frame = [];
	let str = val.value.toString().slice(1,-1);
	let reg = /(?:((?:\\.)|(?:\[.+?\]))\{[\d,]+\})|\\.|./g, match;
	while(match = reg.exec(str)){
		let toPush = {};
		if(match[0].length <= 2){
			toPush.minLen = 1;
			toPush.maxLen = 1;
			toPush.type = 'single';
      toPush.char = match[0][match[0].length-1];
      toPush.reg = new RegExp(match[0]+'+');
		} else {
			toPush.minLen = +/\{(\d+)/.exec(match[0])[1];
			toPush.maxLen = +/(\d+)\}/.exec(match[0])[1];
      toPush.reg = new RegExp('(_|' + match[1] + ')+');
		}
		frame.push(toPush);
	}
	return function (){
		//let forTests = { before: this.value.slice(0, caret.get(this)) + '|' + this.value.slice( caret.get(this) )};

		if (this.value === '' && this.placeholder) { return }

		let arr = this.value.split('').map((e)=>{return {char: e, type: 'char'}});
		let pos = { char: '', type: 'pos' };
		arr.splice(caret.get(this), 0, pos);
		let newVal = [];
		mainLoop: for(let i = 0; i < frame.length; i++){
			for(let k = 0; k < frame[i].maxLen; k++){
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

		//forTests.after = this.value.slice(0, caret.get(this)) + '|' + this.value.slice( caret.get(this) );
		//console.log(forTests);
	}
};
