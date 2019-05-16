<template>
  <div id="earth">
    <svg id="earth_svg"></svg>
  </div>
</template>

<script>
export default {
  name: 'earth',
  mounted() {
    var width = document.getElementById("earth").offsetWidth,
    height = document.getElementById("earth").offsetHeight;
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

          console.log(world.features)
          
          svg.selectAll(".block")
              .data(world.features)
              .enter().append("path")
                .attr("d", path)
                .attr("class",'block')
                .on("mouseover",function(d) {
                  // console.log(d3.select(d));
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
#earth, #earth_svg{
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
.block{
  fill:black
}
.block.active{
  fill:yellow
}
</style>
