<template>
	<div style="margin-bottom:10px">
		<div v-if="info == 'process'" style="font-size: 20px;">
			tests in process
		</div>
		<div v-if="info == 'passed'" style="color:green; font-size: 20px;">
			all tests passed
		</div>
		<div v-if="info == 'failed'" style="color:red; font-size: 20px;">
			test failed, info in console
		</div>
		<input ref='input' v-mask="mask">
	</div>
	
</template>
<script>
import mask from 'vue-r-mask';
import caret from  'vue-r-mask/caretPos.js'; 
import testsList from './testsList.js';

export default {
	data () {
		return {
			info: 'process',
			mask: /\d{2}/,
		}
	},
	mounted (){
		let arr = [...testsList];
		let partialTest = () => {
			for (let i = 0; i<arr.length; i++){
				let el = arr[i];
				if(el.setMask){
					this.mask = el.setMask;
					arr = arr.slice(i+1);
					setTimeout(partialTest, 0);
					return;
				}else if (el.before){
					this.$refs.input.value = el.before.replace('|', '');	
					caret.set(this.$refs.input, el.before.indexOf('|'));
					this.$refs.input.dispatchEvent(new Event('input'));
					let result = this.$refs.input.value.slice(0, caret.get(this.$refs.input)) + '|' + this.$refs.input.value.slice( caret.get(this.$refs.input) );
					if(result != el.after){
						this.info = 'failed';
						console.error('test failed on mask', this.mask.toString(), el );
						console.error('failed result', result);
						return;
					}
				}
			}
			this.info = 'passed';
		}
		setTimeout(partialTest, 0);
	},
	directives: {
    mask: mask,
	}
}
</script>
