<template>
  <div id="ozone">
    
  </div>
</template>

<script>
export default {
  name: 'ozone',
  mounted() {
    var width = document.getElementById("earth").offsetWidth,
    height = document.getElementById("earth").offsetHeight;
    var svg = d3.select("#earth_svg");

    svg.append("circle")
      .attr("cx",width/2)
      .attr("cy",height/2)
      .attr("r",width/4+20)
      .attr("stroke","#6c05ff0a")
      .attr("fill","#5546b921")
      .attr('filter',"url(#f1)")
    
    // var nodes = d3.range(10).map(function(d, i) {
    //     return { name: i, radius: 30};
    //   });

    // var root = {
    //     name: -1,
    //     radius: width / 4
    //   };
    //   nodes.unshift(root);

    // var simulation = d3
    //   .forceSimulation()
    //   .force(
    //     "forceX",d3.forceX().strength(0.1).x(width * 0.5)
    //   )
    //   .force(
    //     "forceY",d3.forceY().strength(0.1).y(height * 0.5)
    //   )
    //   .force("center",d3.forceCenter().x(width * 0.5).y(height * 0.5)
    //   )
    //   .force("charge", function(d, i) {
    //     return i ? 0 : -2000;
    //   });

    // var color = d3.scaleOrdinal(d3.schemeCategory10);

    // simulation
    //   .nodes(nodes)
    //   .force( "collide",d3.forceCollide().strength(0.5)
    //       .radius(function(d) {
    //         if (d.name == -1) return d.radius + 10;
    //         return d.radius + 5;
    //       })
    //       .iterations(1)
    //       .strength(0.3)
    //   )
    //   .on("tick", ticked);

    // var node = svg
    //   .append("g")
    //   .attr("class", "nodes")
    //   .selectAll("circle")
    //   .data(nodes)
    //   .enter()
    //   .append("circle")
    //   .attr("stroke", "black")
    //   .attr("stroke-dasharray", "5,5")
    //   .attr("fill", function(d, i) {
    //     return "url(#n" + d.name + ")";
    //   })
    //   .attr("cx", function(d) {
    //     return d.x;
    //   })
    //   .attr("cy", function(d) {
    //     return d.y;
    //   })
    //   .call(
    //     d3
    //       .drag()
    //       .on("start", dragstarted)
    //       .on("drag", dragged)
    //       .on("end", dragended)
    //   )
    //   .attr("r", function(d) {
    //     return d.radius;
    //   });
    
    //  function ticked() {
    //       node
    //         .attr("cx", function(d) {
    //           if (d.x - d.radius < 0) {
    //             d.x += 10;
    //             return d.x;
    //           } else if (d.x + d.radius > width) {
    //             d.x -= 10;
    //             return d.x;
    //           }
    //           return d.x;
    //         })
    //         .attr("cy", function(d) {
    //           if (d.y - d.radius < 0) {
    //             d.y += 10;
    //             return d.y;
    //           } else if (d.y + d.radius > height) {
    //             d.y -= 10;
    //             return d.y;
    //           }

    //           if (d.name == "-1") {
    //             d.fy = height / 2;
    //             d.fx = width / 2;
    //           }
    //           return d.y;
    //         });
    //     }

    //     function dragstarted(d) {
    //       if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    //       d.fx = d.x;
    //       d.fy = d.y;
    //     }

    //     function dragged(d) {
    //       d.fx = d3.event.x;
    //       d.fy = d3.event.y;
    //       if (d.y - d.radius < 0) {
    //         d.y += 10;
    //         d.vy = 10;
    //         return d.y;
    //       } else if (d.y + d.radius > height) {
    //         d.y -= 10;
    //         d.vy = 10;
    //         return d.y;
    //       }
    //       if (d.x - d.radius < 0) {
    //         d.x += 10;
    //         d.vx = 10;
    //         return d.x;
    //       } else if (d.x + d.radius > width) {
    //         d.x -= 10;
    //         d.vx = 10;
    //         return d.x;
    //       }
    //     }

    //     function dragended(d) {
    //       if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    //       d.fx = null;
    //       d.fy = null;
    //     }
  },
}
</script>

<style>

</style>
