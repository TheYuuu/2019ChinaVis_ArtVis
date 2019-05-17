<template>
  <div id="app">
    <div class="content-box" id="content">
      <div class="time-block">
        <p class="title-time">{{time}}</p>
      </div>
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
  data:function(){
      return {
        time:new Date().toUTCString()
      }
  },
  mounted() {
    const that = this;
    setInterval(()=>{
      that.time=new Date().toUTCString();
    },1000)
  },
}
</script>

<style>
@font-face {
  font-family: 'Patriciana';
  src: url('../static/Patriciana.otf');
}

*{
  padding:0;
  margin:0;
  box-sizing: border-box;
  /* transform: translate3d(0); */
  font-family: Patriciana;
}

html {
  font-size: calc(100vh / 65);
}

.content-box{
  width: 100vh;
  height: 100vh;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.time-block{
  display: table-cell;
  height: calc(100vh /4);
  width: 100vh;
  text-align: center;
  vertical-align: middle;
}

.title-time{
  font-size: 2rem;
  font-weight: bold;
}
</style>
