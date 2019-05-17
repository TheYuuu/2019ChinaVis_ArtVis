<template>
  <div id="guide" class="guideWords" @click="showView($event)">
    <p v-for="(value, index) in words" 
    :key="index"
    :style="getStyle(value,index)">
      {{value}}
      <br>
    </p>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'guide',
  data:function(){
      return {
        words:[
          "Hello, this is a website in 2100.",
          "You wanna see what the world is like?",
          "Yes?",
          "Well...",
          "...",
          "Ok",
          "Click me"
        ],
      }
  },
  methods:{
    getStyle(value,index){
      if (index ==0){
        return 'width:'+ value.length + 'ch;'
        + 'animation:cursor 1s infinite step-end, text '+ value.length*100 +'ms steps('+ value.length + ');'
      }
      else{
        return 'width:'+ value.length + 'ch;'
        + 'animation:cursor 1s infinite step-end, text '+ value.length*100 +'ms steps('+ value.length + ');'
        + 'animation-delay:' + this.getDelay(index) +'ms;'
      }
    },
    getDelay(index){
      let sum=0;
      for(let i=0;i<index;i++){
        sum+=this.words[i].length*150
      }
      return sum;
    },
    showView($event){
      if (d3.select($event.target).html().indexOf("Click me")!=-1){
        d3.select(".warper")
          .style("opacity",0)
      }
    }

  },
  mounted() {
    setTimeout(()=>{
      // d3.select("#content").style("background","black")
    },100)
  },
}
</script>

<style scope>
#guide{
  width: calc(100vw / 2 - 100vh / 2 );
  height: 100vh;
  padding:10px;
  overflow: auto;
}

@keyframes cursor { 
 0%{
   opacity: 1;
  }
 50% { 
 border-color: transparent; 
} 
} 
@keyframes text { 
  from { 
    width: 0; 
  } 
} 
.guideWords p{ 
  opacity: 0;
  white-space: nowrap; 
  overflow: hidden;
  font: 16px monospace; 
} 

.guideWords p:last-child{
  border-right: solid 1px #000; 
}
</style>
