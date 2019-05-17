<template>
  <div id="earth">
    <svg id="earth_svg">
      <filter id="f1" x="0" y="0">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
    </svg>
  </div>
</template>

<script>
import { setInterval, clearTimeout } from 'timers';
import charts from '../assets/charts'
export default {
  name: 'earth',
  mounted() {
      charts.on();
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
  fill:#6c8665
}
</style>
