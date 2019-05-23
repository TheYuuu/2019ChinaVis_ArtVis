<template>
  <div id="earth">
    <div class="warper">
    </div>
    <svg id="earth_svg">
      <filter id="f1" x="0" y="0">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      <filter id="grayscale">
        <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
      </filter>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
      </linearGradient>
    </defs>
      <defs>
        <template v-for="(item,index) in data">
          <pattern
            :key="index"
            :id="String(item.name)"
            patternUnits="userSpaceOnUse"
            height="50"
            width="50"
          >
            <image x="0" y="0" height="100" width="100" :xlink:href="item.img"></image>
          </pattern>
        </template>
      </defs>
    </svg>
    <ViewPic ref="ViewPic"></ViewPic>
  </div>
</template>

<script>
import { setInterval, clearTimeout } from 'timers';
import charts from '../assets/charts'
import ViewPic from './ViewPic'
export default {
  name: 'earth',
  components:{
    ViewPic
  },
  data: function() {
    return {
      data: []
    };
  },
  methods:{
    start(){
      var that = this;
      d3.json("../static/data/finadata.json").then(d=>{
        for (let k in d){
          if (d[k].animals != undefined){
            that.getExtincionTime(d[k].animals);
          }
          if (d[k].plantes != undefined){
            that.getExtincionTime(d[k].plantes);
          }
        }
        that.Counts = that.data.length;
        console.log(that.Counts,d)
        charts.on(that,d);
      })
    },
    AddDeadList(year,name){
      this.$emit('AddDeadList',{
        year,
        name
      })
    },
    showWords2(){
      this.$emit('showWords2')
    },
    getExtincionTime(arr){
      const that = this;
      arr.forEach(item=>{
        item.ExtincionTime = new Date(item.ExtincionTime)
        item.date = new Date(item.date)
        item.populationNow = item.population

        that.data.push({
              name:item.name.split(" ").join("_"),
              img:item.img
        })
      })
    } 
  },
  mounted() {
  },
}
</script>

<style>
#earth, #earth_svg{
  width: 100%;
  height: 100%;
}

#earth{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-left:1px solid lavender;
  border-right:1px solid lavender;
}

#projection-menu {
  position: absolute;
  right: 10px;
  top: 10px;
}
.stroke {
  fill: none;
  stroke: #000;
  stroke-width: 3px;
}
.fill {
  fill: #fff;
}
.graticule {
  fill: none;
  stroke: #777;
  stroke-width: .5px;
  stroke-opacity: .5;
}
.land {
  fill: #222;
}
.boundary {
  fill: none;
  stroke: #fff;
  stroke-width: .5px;
}

.block{
  fill:#8e7761
}

.block.active{
  fill:#3c6b52;
}


.warper{
  position: absolute;
  z-index: 100;
  width:100%;
  height: 100%;
  background: white;
  opacity:1;
  transition: opacity 2s;
  pointer-events: none;
}
</style>
