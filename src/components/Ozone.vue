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
    d3.select("#earth_svg").append("circle")
      .attr("cx",width/2)
      .attr("cy",height/2)
      .attr("r",width/4)
      .attr("stroke","#6c05ff0a")
      .attr("fill","#5546b921")
      .attr('filter',"url(#f1)")
  },
}
</script>

<style>

</style>
