<template>
  <div>
		<div>
			<div class="text">Simple mask</div>
			<div class="mask">v-mask="/\d{2}-\d{2}/"</div>
			<input v-mask="/\d{2}-\d{2}/">
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
			<div class="text">Use in textarea</div>
			<div class="mask">v-mask="/\d{5} \d{5} \d{5} \d{5} \d{5} \d{5} \d{5} \d{5}/"</div>
			<textarea rows="3" cols="25" v-mask="/\d{5} \d{5} \d{5} \d{5} \d{5} \d{5} \d{5} \d{5}/"></textarea>
		</div>
  </div>
</template>
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
</style>
<script>
import mask from 'vue-r-mask'

export default {
	data (){
		return {
			mask: /\d{2}-\d{2}/,
			message: '1234',
		};
	},
	directives: {
    mask: mask,
	}
}
</script>

