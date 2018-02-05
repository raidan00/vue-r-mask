<template>
  <div id="app">
    <test-input />
  </div>
</template>

<script>
import TestInput from './components/TestInput'

export default {
  name: 'app',
  components: {
    TestInput
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
