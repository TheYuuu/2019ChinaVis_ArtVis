var charts = {};

charts.drawEarth = function(world){
    var width = document.getElementById("earth").offsetWidth,
    height = document.getElementById("earth").offsetHeight,
    sens = 0.25;
    var autoR;
    var options = {name: "Natural Earth", projection: d3.geoNaturalEarth()}

    var svg = d3.select("#earth_svg")
    var earththsvg=svg.append('g')
    earththsvg.attr('transform',"translate(" +  width/4 + "," + height/4 + ")")
    
    var projection = options.projection
    .rotate([0, 0])
    .center([width/2, height/2])
    .fitSize([width/2, height/2], world);

    this.svg = svg;
    this.earththsvg = earththsvg;
    this.projection = projection;
    this.step = width/100;
    this.width = width;
    this.height = height;

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

    console.log(world.features)

    earththsvg.selectAll(".block")
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
    earththsvg.selectAll("path.block").attr("d", path);

    earththsvg.selectAll('.animals')
    .attr("x", function(d){ return projection([d.long, d.lat])[0] })
    .attr("y", function(d){ return projection([d.long, d.lat])[1] })
    }))

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

    earththsvg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)

    var ro=0;
    // autoR = setInterval(()=>{
    //   ro+=0.25;
    //   var rotate = projection.rotate();
    //   projection.rotate([ro,0]);
    //   svg.selectAll("path.block").attr("d", path);

    //   svg.selectAll('.animals')
    //   .attr("x", function(d){ return projection([d.long, d.lat])[0] })
    //   .attr("y", function(d){ return projection([d.long, d.lat])[1] })
    // },10)
}

charts.drawanimals = function(local,symbol){
    const earththsvg = this.earththsvg
    const projection = this.projection

    earththsvg
    .selectAll("animals")
    .data(local)
    .enter()
    .append("text")
    .attr('class','animals object')
    .html(symbol)
    .attr("x", function(d){ return projection([d.long, d.lat])[0] })
    .attr("y", function(d){ return projection([d.long, d.lat])[1] })
}

charts.addEvents= function(){

}

charts.addDescription = function(local, str){
    const earth = this.earththsvg.append('g')
    const Entire = this.svg.append('g')
    const step = this.step

    for (let i=0;i<local.length;i++){
        let svg = local[i].localtype == 'earth'?earth:Entire;

        let x = local[i].local[0]
        let y = local[i].local[1]

        svg.append('circle')
            .attr('class','animals eventDot')
            .attr("cx", x)
            .attr("cy", y)
            .attr('r', 5)
            .attr('fill','#f3c4c4')

        svg.append('line')
            .attr("x1", x)
            .attr("y1", y)
            .attr("x2", x + step*local[i].lineLocal[0][0])
            .attr("y2", y + step*local[i].lineLocal[0][1])
            .attr('stroke','#f3c4c4')

        svg.append('line')
            .attr("x1", x + step*local[i].lineLocal[0][0])
            .attr("y1", y + step*local[i].lineLocal[0][1])
            .attr("x2", x + step*local[i].lineLocal[1][0])
            .attr("y2", y + step*local[i].lineLocal[1][1])
            .attr('stroke','#f3c4c4')

        svg.append('text')
            .html(local[i].name)            
            .attr("x", x + step*local[i].lineLocal[1][0])
            .attr("y", y + step*local[i].lineLocal[1][1])
    }

}

charts.on = function(){
    const that = this;
    d3.json("../../static/map.json").then(world=>{
        var Whalelocal = [
            {long: 139.485582, lat: 34.078783}, 
            {long: 133.671016, lat: 36.170561}, 
            {long: 143.372315, lat: 38.371926},
            {long: 133.176260, lat: 41.141973},
        ];

        var Bearlocal = [
            {long: -10.0000, lat: 90.0000},
            {long: -20.0000, lat: 90.0000},
            {long: 20.0000, lat: 90.0000},
            {long: 40.0000, lat: 90.0000},
            {long: 60.0000, lat: 90.0000},
        ];
    
        this.drawEarth(world);
        this.drawanimals(Whalelocal,'&#128011');
        this.drawanimals(Bearlocal,'&#128059');

        const projection = that.projection
        const width = that.width
        const height = that.height
        const step = that.step

        var Description = [];
        Description.push({
            localtype:'earth',
            local: projection([138.302001, 35.456019]),
            name: 'Whale',
            lineLocal:[
                [9,-9],
                [15,-9]
            ]
        },
        {
            localtype:'earth',
            local: projection([20, 90]),
            name: 'Polar Bear',
            lineLocal:[
                [15,-15],
                [20,-15]
            ]
        },
        {
            localtype:'Entire',
            local: [width/2 - step*10, height/2 - step*20],
            name:'Air Quality',
            lineLocal:[
                [-9,-9],
                [-20,-9]
            ]
        },
        {
            localtype:'Entire',
            local: [width/2, height/4*3 + step],
            name:'Ozonosphere Hole',
            lineLocal:[
                [-9,5],
                [-20,5]
            ]
        })
        
        charts.addDescription(Description)
    })
}

module.exports = charts;