<template>
  <div id="app">
    <guide  ref="guide" 
      @showView="showView"></guide>
    <div class="content-box" id="content">
      <div class="time-block">
        <p class="title-time">What's going on after Industrial Revolution?</p>
        <p class="title-time" id="RunningTime">loading</p>
        <button class="title-button" id="Speed-button">Speed Up</button>
        <button class="title-button" id="Re-button" @click="reload()">Refresh</button>
        <button class="title-button" id="Ab-button">About</button>
      </div>
      <cloud></cloud>
      <earth ref ="earth"
        @AddDeadList="AddDeadList"
        @showWords2="showWords2"></earth>
      <ozone></ozone>
    </div> 
    <deadList ref="deadList"></deadList>
    <About></About>
  </div>
</template>

<script>
import earth from './components/earth'
import cloud from './components/cloud'
import ozone from './components/ozone'
import guide from './components/guide'
import deadList from './components/deadList'
import About from './components/About'

export default {
  name: 'App',
  components:{
    earth,
    cloud,
    ozone,
    guide,
    deadList,
    About
  },
  methods:{
    reload(){
      location.reload()
    },
    showWords2(){
      this.$refs.guide.showWords2()
    },
    showView(){
      this.$refs.earth.start()
    },
    AddDeadList(obj){
      this.$refs.deadList.insert(obj.year, obj.name)
    }
  },
  data:function(){
      return {
      }
  },
  mounted() {
    const that = this;
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
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  z-index: 100;
}

.title-button{
  opacity: 0;
  position: relative;
  font-size: 1rem;
  font-weight: bold;
  z-index: 100;
  background-color: lavender;
  border-color: lavender;
  padding: 3px;
  color: #666;
  border-radius: 20px;
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
