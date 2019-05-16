<template>
  <div id="app">
    <div class="content-box" id="content">
      <cloud></cloud>
      <earth></earth>
    </div> 
  </div>
</template>

<script>
import earth from './components/earth'
import cloud from './components/cloud'
export default {
  name: 'App',
  components:{
    earth,
    cloud
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
}
.content-box{
  width: 100vw;
  height: 100vh;
}
</style>
