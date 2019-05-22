<template>
  <div id="earth">
    <!-- <div class="warper">
    </div> -->
    <svg id="earth_svg">
      <filter id="f1" x="0" y="0">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      <defs>
        <template v-for="(item,index) in data">
          <pattern
            :key="index"
            :id="String(item.name)"
            patternUnits="userSpaceOnUse"
            height="50"
            width="50"
          >
            <image x="0" y="0" height="50" width="50" :xlink:href="item.img"></image>
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
    AddDeadList(year,name){
      this.$emit('AddDeadList',{
        year,
        name
      })
    },
    getExtinctTime(arr){
      const that = this;
      arr.forEach(item=>{
        if (item.population!=undefined && item.date!=undefined && item.ExtinctSpeed!=undefined){
          item.ExtinctTime = new Date(+new Date(item.date) + item.population/item.ExtinctSpeed)
          item.marked = false;
        }
        that.data.push({
              name:item.name.split(" ").join("_"),
              img:item.img
        })
      })
    } 
  },
  mounted() {
    var that = this;
    d3.json("../static/data/data.json").then(d=>{
      for (let k in d){
        if (d[k].animals != undefined){
          that.getExtinctTime(d[k].animals);
          // d[k].animals.forEach(item=>{
          //   var oldTime = new Date(item.date)
          //   var curTime = new Date()
          //   item.population -= (curTime - oldTime) * item.ExtinctSpeed / 1000
          //   that.data.push({
          //     name:item.name.split(" ").join("_"),
          //     img:item.img
          //   })
          // })
        }
        if (d[k].plantes != undefined){
          that.getExtinctTime(d[k].plantes);
          // d[k].plantes.forEach(item=>{
          //   var oldTime = new Date(item.date)
          //   var curTime = new Date()
          //   item.population -= (curTime - oldTime) * item.ExtinctSpeed / 1000
          //   that.data.push({
          //     name:item.name.split(" ").join("_"),
          //     img:item.img
          //   })
          // })
        }
      }
      console.log(d)
      charts.on(that,d);
    })

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
  background: #fdf8f8;
  opacity:1;
  transition: opacity 2s;
  pointer-events: none;
}
</style>
