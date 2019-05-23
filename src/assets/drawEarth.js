var drawEarth = function(world){
    const width = this.width
    const height = this.height
    const step = this.step

    var options = {name: "Natural Earth", projection: d3.geoNaturalEarth()}

    var svg = d3.select("#earth_svg")
    var earththsvg=svg.append('g')
    earththsvg.attr('transform',"translate(" +  (width/4 + 10) + "," + height/4 + ")")
    
    var projection = options.projection
    .rotate([0, 0])
    .center([width/2, height/2])
    .fitSize([width/2-20, height/2], world);

    var path = d3.geoPath(projection);
    var graticule = d3.geoGraticule();

    var tile = d3.tile()
    .scale(projection.scale() * 2 * Math.PI)
    .translate(projection([0, 0]))
    .zoomDelta((window.devicePixelRatio || 1) - .5);

    earththsvg.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path)

    earththsvg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

    earththsvg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");

    earththsvg.selectAll(".block")
    .data(world.features)
    .enter().append("path")
    .attr("d", path)
    .attr("class",'block')
    .on("mouseover",function(d) {
        d3.select(this)
        .classed("active",true)
    })
    .on("mouseout",function(d){
        d3.select(this)
        .classed("active",false)
    })   
    // .call(d3.drag()
    // .subject(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
    // .on("drag", function() {
    // clearTimeout(autoR);
    // var rotate = projection.rotate();
    // projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
    // earththsvg.selectAll("path.block").attr("d", path);

    // earththsvg.selectAll('.animals')
    // .attr("x", function(d){ return projection([d.long, d.lat])[0] })
    // .attr("y", function(d){ return projection([d.long, d.lat])[1] })
    // }))

    //  var tiles = tile();
    //  earththsvg.append("g")
    //     .attr("clip-path", "url(#clip)")
    //     .selectAll("image")
    //     .data(tiles)
    //      .enter().append("image")
    //     .attr("xlink:href", function(d) { return "http://" + ["a", "b", "c", "d"][Math.random() * 4 | 0] + ".tiles.mapbox.com/v3/mapbox.natural-earth-2/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
    //     .attr("width", Math.round(tiles.scale))
    //     .attr("height", Math.round(tiles.scale))
    //     .attr("x", function(d) { return Math.round((d[0] + tiles.translate[0]) * tiles.scale); })
    //     .attr("y", function(d) { return Math.round((d[1] + tiles.translate[1]) * tiles.scale); });

    earththsvg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)

    this.svg = svg;
    this.earththsvg = earththsvg;
    this.projection = projection;
    this.path = path;
}

module.exports = drawEarth;