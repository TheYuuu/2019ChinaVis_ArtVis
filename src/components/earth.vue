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
export default {
  name: 'earth',
  mounted() {
    var width = document.getElementById("earth").offsetWidth,
    height = document.getElementById("earth").offsetHeight,
    sens = 0.25;

    var autoR;
    d3.json("../static/map.json").then(world=>{
      console.log(world)  //geoNaturalEarth geoOrthographic
      var options = {name: "Natural Earth", projection: d3.geoOrthographic()}
      var i = 0;
      var projection = options.projection
                              .rotate([0, 0])
                              .center([width/2, height/2])
                              .fitSize([width/2, height/2], world);

      var path = d3.geoPath(projection);
      var graticule = d3.geoGraticule();

      var tile = d3.tile()
                    .scale(projection.scale() * 2 * Math.PI)
                    .translate(projection([0, 0]))
                    .zoomDelta((window.devicePixelRatio || 1) - .5);

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
            .call(d3.drag()
            .subject(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
            .on("drag", function() {
              clearTimeout(autoR);
              var rotate = projection.rotate();
              projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
              svg.selectAll("path.block").attr("d", path);
            }))

      var markers = [
        {long: 9.083, lat: 42.149}, // corsica
        {long: 7.26, lat: 43.71}, // nice
        {long: 2.349, lat: 48.864}, // Paris
        {long: -1.397, lat: 43.664}, // Hossegor
        {long: 3.075, lat: 50.640}, // Lille
        {long: -3.83, lat: 58}, // Morlaix
      ];
    svg
      .selectAll("animals")
      .data(markers)
      .enter()
      .append("text")
        .attr('class','animals')
        .html("&#128051")
        .attr("x", function(d){ return projection([d.long, d.lat])[0] })
        .attr("y", function(d){ return projection([d.long, d.lat])[1] })

      //  var tiles = tile();
      //  svg.append("g")
      //     .attr("clip-path", "url(#clip)")
      //     .selectAll("image")
      //     .data(tiles)
      //      .enter().append("image")
      //     .attr("xlink:href", function(d) { return "http://" + ["a", "b", "c", "d"][Math.random() * 4 | 0] + ".tiles.mapbox.com/v3/mapbox.natural-earth-2/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      //     .attr("width", Math.round(tiles.scale))
      //     .attr("height", Math.round(tiles.scale))
      //     .attr("x", function(d) { return Math.round((d[0] + tiles.translate[0]) * tiles.scale); })
      //     .attr("y", function(d) { return Math.round((d[1] + tiles.translate[1]) * tiles.scale); });

      svg.append("path")
          .datum(graticule)
          .attr("class", "graticule")
          .attr("d", path)

      var ro=0;
      autoR = setInterval(()=>{
        ro+=0.25;
        var rotate = projection.rotate();
        projection.rotate([ro,0]);
        svg.selectAll("path.block").attr("d", path);

        svg.selectAll('.animals')
        .attr("x", function(d){ return projection([d.long, d.lat])[0] })
        .attr("y", function(d){ return projection([d.long, d.lat])[1] })
      },10)
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
  fill:black
}
.block.active{
  fill:yellow
}
</style>
