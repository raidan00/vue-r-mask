<template>
  <div>
    <input v-model="message" v-mask="/\d{2}-\d{2}/">
    <input v-model="message2" v-mask="/\d{2}#\d{2}/">
  </div>
</template>
<style scoped>
	input {
		display: block;
		margin: auto;
		margin-bottom: 20px;
	}
</style>
<script>
import mask from 'vue-r-mask'

export default {
	data (){
		return {
			message: '',
			message2: '',
		};
	},
	directives: {
    mask: mask,
	}
}
</script>

