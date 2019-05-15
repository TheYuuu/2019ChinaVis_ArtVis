<template>
  <div id="app">
    <div class="content-box" id="content">
      <svg id="earth_svg"></svg>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    var width = document.getElementById("content").offsetWidth,
    height = document.getElementById("content").offsetHeight;
    console.log(width, height)
    d3.json("../static/map.json").then(world=>{
          console.log(world)
          var options = {name: "Natural Earth", projection: d3.geoNaturalEarth()}
          var i = 0;
          var projection = options.projection
                                  .rotate([0, 0])
                                  .center([width/2, height/2])
                                  .fitSize([width/2, height/2], world);

          var path = d3.geoPath(projection);

          var graticule = d3.geoGraticule();

          var svg = d3.select("#earth_svg").append('g')
                    .attr('transform',"translate(" +  width/4 + "," + height/4 + ")")

          svg.append("defs").append("path")
              .datum({type: "Sphere"})
              .attr("id", "sphere")
              .attr("d", path)

          svg.append("use")
              .attr("class", "stroke")
              .attr("xlink:href", "#sphere");

          svg.append("use")
              .attr("class", "fill")
              .attr("xlink:href", "#sphere");


          svg.selectAll("path")
                .data(world.features)
              .enter().append("path")
                .style('z-index',99)
                .attr("d", path)
                .on("mouseover",function(d) {
                  // console.log("just had a mouseover", d3.select(d));
                  d3.select(this)
                    .classed("active",true)
                })
                .on("mouseout",function(d){
                  d3.select(this)
                    .classed("active",false)
                })

            svg.append("path")
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", path)

    })
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

#earth_svg{
  width: 100%;
  height: 100%;
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
</style>
