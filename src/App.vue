<template>
  <div id="app">
    <div class="content-box" id="content">
      <cloud></cloud>
      <earth></earth>
      <ozone></ozone>
    </div> 
  </div>
</template>

<script>
import earth from './components/earth'
import cloud from './components/cloud'
import ozone from './components/ozone'

export default {
  name: 'App',
  components:{
    earth,
    cloud,
    ozone
  },
  mounted() {
  },
}
</script>

<style>
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
  transform: translate3d(0);
}
.content-box{
  width: 100vw;
  height: 100vh;
}
</style>
