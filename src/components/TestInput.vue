<template>
  <div>
		<tests v-if="dev"/>
		<div>
			<div class="text">Simple mask</div>
			<div class="mask">v-mask="/\d{2}-\w{5}/"</div>
			<input v-mask="/\d{2}-\w{5}/">
		</div>
		<div>
			<div class="text">Simple mask with v-model</div>
			<div class="mask">v-mask="mask"</div>
			<div class="mask">v-model="message"</div>
			<div class="mask">mask: {{mask.toString()}}</div>
			<div class="mask">message: {{message}}</div>
			<input v-model="message" v-mask="mask">
		</div>
		<div>
			<div class="text">Phone mask</div>
			<div class="mask">v-mask="/\+1 \(\d{3}\) \d{4}-\d{2}/"</div>
			<input v-mask="/\+1 \(\d{3}\) \d{4}-\d{2}/">
		</div>
		<div>
			<div class="text">Number of digits in year from 2 to 4</div>
			<div class="mask">v-mask="/\d{2}\/\d{2}\/\d{2,4}/"</div>
			<input v-mask="/\d{2}\/\d{2}\/\d{2,4}/">
		</div>
		<div>
			<div class="text">Input only numbers</div>
			<div class="mask">v-mask="/\d{0,100}/"</div>
			<input v-mask="/\d{0,100}/">
		</div>
		<div>
			<div class="text">Input only binary numbers</div>
			<div class="mask">v-mask="/[01]{0,100}/"</div>
			<input v-mask="/[01]{0,100}/">
		</div>
		<div>
			<div class="text">Input only word</div>
			<div class="mask">v-mask="/\w{0,100}/"</div>
			<input v-mask="/\w{0,100}/">
		</div>
		<div>
			<div class="text">Input only letters</div>
			<div class="mask">v-mask="/[a-zA-Z]{0,100}/"</div>
			<input v-mask="/[a-zA-Z]{0,100}/">
		</div>
		<div>
			<div class="text">First number in hour form 0 to 2</div>
			<div class="text">First number in minute form 0 to 5</div>
			<div class="mask">v-mask="/[0-2]{1}\d{1}:[0-5]{1}\d{1}/"</div>
			<input v-mask="/[0-2]{1}\d{1}:[0-5]{1}\d{1}/">
		</div>
		<div>
			<div class="text">Mask with placeholder</div>
			<div class="mask">v-mask="/\w{0,100}/"</div>
			<input v-mask="/\w{0,100}/" placeholder="A placeholder">
		</div>
		<div>
			<div class="text">Mask that appends text</div>
			<div class="mask">v-mask="/\w{0,30}@domain\.com/"</div>
			<input v-mask="/\w{0,30}@domain\.com/"  placeholder="Choose email">
		</div>
		<div>
			<div class="text">Change mask on the fly</div>
			<div class="mask">v-mask="{{changeableMask.toString()}}"</div>
			<button @click="setMask1">/\+1 \(\d{3}\) \d{4}-\d{2}/</button>
			<button @click="setMask2">/\+1 \d{3} \d{6}/</button>
			<input v-mask="changeableMask">
		</div>
		<div>
			<div class="text">Use in textarea</div>
			<div class="mask">v-mask="/\d{5} \d{5} \d{5} \d{5} \d{5} \d{5} \d{5} \d{5}/"</div>
			<textarea rows="3" cols="25" v-mask="/\d{5} \d{5} \d{5} \d{5} \d{5} \d{5} \d{5} \d{5}/"></textarea>
		</div>
  </div>
</template>
<script>
import mask from 'vue-r-mask'
import Tests from './Tests.vue'

export default {
	components: {
		Tests,
	},
	data (){
		return {
			mask: /\d{2}-\d{2}/,
			message: '1234',
			changeableMask: /\d{10}/,
			dev: process.env.NODE_ENV != 'production',
		};
	},
	methods: {
		setMask1 (){
			this.changeableMask = /\+1 \(\d{3}\) \d{4}-\d{2}/;
		},
		setMask2 (){
			this.changeableMask = /\+1 \d{3} \d{6}/;
		},
	},
	directives: {
    mask: mask,
	}
}
</script>
<style scoped>
	input, textarea {
		display: block;
		margin: auto;
		margin-bottom: 20px;
		margin-top: 5px;
		font-size: 17px;
	}
	.text {
		font-weight: bold;
		margin-bottom: 5px;
	}
	button {
		display: block;
		margin: auto;
		margin-top: 5px;
		font-size: 15px;
	}
</style>

