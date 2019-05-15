<template>
  <div id="app">
    <div class="content-box" id="content">

    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    var width = 960,
    height = 500;

var options = {name: "Natural Earth", projection: d3.geoNaturalEarth()}
var i = 0;
var projection = options.projection.rotate([0, 0]).center([0, 0]);

var path = d3.geoPath(projection);
var graticule = d3.geoGraticule();

var svg = d3.select(".content-box").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform",'')
svg.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);
svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");
svg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");
svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json("../static/world-110m.json").then(world=>{
  svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
})

var menu = d3.select("#projection-menu")
    .on("change", change);
menu.selectAll("option")
    .data(options)
  .enter().append("option")
    .text(function(d) { return d.name; });

update(options)

function loop() {
  var j = Math.floor(Math.random() * n);
  menu.property("selectedIndex", i = j + (j >= i));
  update(options[i]);
}
function change() {
  // clearInterval(interval);
  update(options[this.selectedIndex]);
}
function update(options) {
  svg.selectAll("path").interrupt().transition()
      .duration(1000).ease(d3.easeLinear)
}
function projectionTween(projection0, projection1) {
  return function(d) {
    var t = 0;
    var projection = d3.geoProjection(project)
        .scale(1)
        .translate([width / 2, height / 2]);
    var path = d3.geoPath(projection);
    function project(λ, φ) {
      λ *= 180 / Math.PI, φ *= 180 / Math.PI;
      var p0 = projection0([λ, φ]), p1 = projection1([λ, φ]);
      return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
    }
    return function(_) {
      t = _;
      return path(d);
    };
  };
}
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
  width: 100wh;
  height: 100vh;
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
