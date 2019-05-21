<template>
  <div id="app">
    <guide></guide>
    <div class="content-box" id="content">
      <div class="time-block">
        <p class="title-time">What's going on on Earth?</p>
        <p class="title-time">{{time}}</p>
      </div>
      <cloud></cloud>
      <earth></earth>
      <ozone></ozone>
    </div> 
    <deadList></deadList>
  </div>
</template>

<script>
import earth from './components/earth'
import cloud from './components/cloud'
import ozone from './components/ozone'
import guide from './components/guide'
import deadList from './components/deadList'

export default {
  name: 'App',
  components:{
    earth,
    cloud,
    ozone,
    guide,
    deadList
  },
  data:function(){
      return {
        time:new Date().toLocaleString().replace("下午","PM ").replace("上午","PM ")
      }
  },
  mounted() {
    const that = this;
    setInterval(()=>{
      that.time=new Date().toLocaleString().replace("下午","PM ").replace("上午","PM ");
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
  font-family: Patriciana;
  user-select: none;
  /* transition: all 1s; */
}

html {
  font-size: calc(100vh / 65);
}

.content-box{
  width: 100vh;
  height: 100vh;
  overflow: hidden;
  border:1px solid lavender;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.time-block{
  display: table-cell;
  height: calc(100vh /8);
  width: 100vh;
  text-align: center;
  vertical-align: middle;
}

.title-time{
  font-size: 2rem;
  font-weight: bold;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
width:6px;
height: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
border-radius:10px;
background:lavender;
-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
background: lavender;
}
</style>
