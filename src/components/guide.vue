<template>
  <div id="guide" class="guideWords" @click="showView($event)">
    <p v-for="(value, index) in words" 
    :key="value+index"
    :style="getStyle(value,index,words,50)">
      {{value}}
      <br>
    </p>
    <br>
    <br>
    <p v-for="(value, index) in show_words2" 
    :key="value+index"
    :style="getStyle(value,index,show_words2,20)">
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
          "Hello, this is a website to show you the earth.",
          "You wanna see",
          "What's going on after Industrial Revolution?",
          "Yes?",
          "Well...",
          "...",
          "Ok",
          "Click me"
        ],
        show_words2:[],
        words2:[
          "Look..",
          "Air quality is getting worse",
          "The ozone hole gradually covers the earth",
          "The number of polar bears is decreasing frantically",
          "The world's forest area is running low",
          "World forest area and oil reserves are drastically reduced",
          "Sea level rising",
          "The population is expanding",
          "......",
          "Finally....",
          " ",
          "1.Click on each state",
          "to see that its regional endangered species.",
          "2.Click Speed up button to run time faster",
          "you can see more species disappear in the future"
        ]
      }
  },
  methods:{
    showWords2(){
      this.show_words2 = this.words2
    },
    getStyle(value,index,words,ms){
      if (index ==0){
        return 'width:'+ value.length + 'ch;'
        + 'animation:cursor 1s infinite step-end, text '+ value.length*ms +'ms steps('+ value.length + ');'
      }
      else{
        return 'width:'+ value.length + 'ch;'
        + 'animation:cursor 1s infinite step-end, text '+ value.length*ms +'ms steps('+ value.length + ');'
        + 'animation-delay:' + this.getDelay(words,index,ms) +'ms;'
      }
    },
    getDelay(word,index,ms){
      let sum=0;
      for(let i=0;i<index;i++){
        if (word[i]!=undefined)
          sum+=word[i].length*ms
      }
      return sum;
    },
    showView($event){
      if (this.showViewed){
        return;
      }
      if (d3.select($event.target).html().replace(/\s*/g,"") === "Clickme<br>"){
        d3.select(".warper")
          .style("opacity",0)
        this.$emit("showView");
        this.showViewed = true;
      }
    }

  },
  mounted() {
  },
}
</script>

<style scope>
#guide{
  width: calc(100vw / 2 - 100vh / 2 );
  height: 100vh;
  padding: 20px;
  float: left;
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
  position: relative;
  z-index: 101;
} 

.guideWords p:last-child{
  border-right: solid 1px #000; 
}
</style>
