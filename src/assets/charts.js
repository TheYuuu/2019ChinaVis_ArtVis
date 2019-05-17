var charts = {};
charts.init = function(){
    var width = document.getElementById("earth").offsetWidth,
    height = document.getElementById("earth").offsetHeight;
    let step = width/100;
    var autoR;
    var Description = [];
    Description.push({
        localtype:'earth',
        local: [138.302001, 35.456019],
        name: 'Whale',
        lineLocal:[
            [9,-9],
            [15,-9]
        ]
    },{
        localtype:'earth',
        local: [20, 90],
        name: 'Polar Bear',
        lineLocal:[
            [15,-15],
            [20,-15]
        ]
    },{
        localtype:'earth',
        local: [3.4653, 62.2159],
        name:'Amazon Rainforest',
        lineLocal:[
            [-25,-5],
            [-45,-5]
        ]
    },{
        localtype:'earth',
        local: [-133.611696, -26.201145],
        name:'Sea Level',
        lineLocal:[
            [-10,10],
            [-20,10]
        ]
    },{
        localtype:'earth',
        local: [79.185509, -21.263971],
        name:'Marine Pollution',
        lineLocal:[
            [15,10],
            [20,10]
        ]
    },{
        localtype:'Entire',
        local: [width/2 - step*10, height/2 - step*20],
        name:'Air Quality',
        lineLocal:[
            [-9,-9],
            [-20,-9]
        ]
    },{
        localtype:'Entire',
        local: [width/2, height/4*3 + step],
        name:'Ozonosphere Hole',
        lineLocal:[
            [-9,5],
            [-20,5]
        ]
    })

    this.step = step;
    this.width = width;
    this.height = height;
    this.Description = Description;
}

charts.drawEarth = function(world){
    const width = this.width
    const height = this.height
    const step = this.step

    var options = {name: "Natural Earth", projection: d3.geoNaturalEarth()}

    var svg = d3.select("#earth_svg")
    var earththsvg=svg.append('g')
    earththsvg.attr('transform',"translate(" +  width/4 + "," + height/4 + ")")
    
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

charts.addDescription = function(local, str){
    const earth = this.earththsvg.append('g')
    const Entire = this.svg.append('g')
    const step = this.step
    const projection = this.projection

    let color = '#ff9a9a'
    for (let i=0;i<local.length;i++){
        let svg = local[i].localtype == 'earth'?earth:Entire;
        let locals = local[i].localtype == 'earth'? projection(local[i].local):local[i].local;

        let x = locals[0]
        let y = locals[1]
        let setpX = 

        svg.append('circle')
            .attr('class',function(){
                if (local[i].localtype == 'earth'){
                    return 'eventDot earth_eventDot_circle '
                }else{
                    return 'eventDot eventDot_circle'
                }
            })
            .attr("cx", x)
            .attr("cy", y)
            .attr('r', 5)
            .attr('fill',color)

        svg.append('line')
            .attr("x1", x)
            .attr("y1", y)
            .attr("x2", x + step*local[i].lineLocal[0][0])
            .attr("y2", y + step*local[i].lineLocal[0][1])
            .attr('stroke',color)
            .attr("class","move_line")

        svg.append('line')
            .attr("x1", x + step*local[i].lineLocal[0][0])
            .attr("y1", y + step*local[i].lineLocal[0][1])
            .attr("x2", x + step*local[i].lineLocal[1][0])
            .attr("y2", y + step*local[i].lineLocal[1][1])
            .attr('stroke',color)

        svg.append('text')
            .html(local[i].name)   
            .attr("x", x + step*local[i].lineLocal[1][0])
            .attr("y", y + step*local[i].lineLocal[1][1])

        this.counting(local[i].name)
    }
}

charts.counting = function(name, local){
    console.log()
    // svg.append('text')
    //     .html(local[i].name)   
    //     .attr("x", x + step*local[i].lineLocal[1][0])
    //     .attr("y", y + step*local[i].lineLocal[1][1])
}

charts.earthMove = function(projection,svg,path){    
    const that = this
    var ro=0;
    return function(){
        const earth = that.earththsvg
        const Description = that.Description
        // console.log(that)
        ro+=0.35;
        projection.rotate([ro,0]);
        svg.selectAll("path.block").attr("d", path);

        svg.selectAll('.animals')
        .attr("x", function(d){return projection([d.long, d.lat])[0] })
        .attr("y", function(d){ return projection([d.long, d.lat])[1] })

        earth.selectAll('.earth_eventDot_circle')
        .attr("cx", function(d,i){return projection(Description[i].local)[0] })
        .attr("cy", function(d,i){return projection(Description[i].local)[1] })

        earth.selectAll('.move_line')
        .attr("x1", function(d,i){return projection(Description[i].local)[0] })
        .attr("y1", function(d,i){return projection(Description[i].local)[1] })
    }
}

charts.addEvents = function(){
    const that = this;
    const svg = this.svg
    const step = this.step;

    var width = document.getElementById("earth").offsetWidth,
    height = document.getElementById("earth").offsetHeight

    svg.selectAll('.block').on('click',function(d){
        clearInterval(that.autoR)
        console.log(d)

        svg.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width",width)
        .attr("height",height)
        .attr("stroke","#6c05ff0a")
        .attr("class","waller")
        .attr("fill","white")

        svg.append("circle")
        .attr("class","waller_circle")
        .attr("cx",width/2)
        .attr("cy",height/2)
        .attr("r",0)
        .attr("stroke","black")
        .attr("fill","white")
        .transition()
        .duration(1000)
        .attr("r",width/4)

        svg.append("text")
            .text(d.properties.CONTINENT)
            .attr("class","waller")
            .attr("font-size",step*4)
            .attr("font-weight","bolder")
            .attr("x", function(d){
                return width/2 - this.getComputedTextLength() / 2;
            })
            .attr("y",height/4)
            .on('click',function(d){
                svg.selectAll(".waller").remove()

                svg.selectAll('.waller_circle')
                .attr("r",width/2)
                .attr("stroke","none")
                .transition()
                .duration(1000)
                .attr("r",0)
                .remove()
            })
            .transition()
            .duration(1000)
            .attr("y",height/2 - step*15)
    })
}

charts.requestAnimationFrame= function(fns){
    requestAnimationFrame(function(){
        fns.forEach(d=>{
            d()
        })
        charts.requestAnimationFrame(fns);
    })
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

        var Pollutionlocal = [
            {long: 79.185509, lat: -21.263971},
            {long: 85.185509, lat: -15.263971},
            {long: 70.185509, lat: -25.263971},
            {long: 90.185509, lat: -21.263971},
        ];
        charts.init()
        charts.drawEarth(world);

        charts.drawanimals(Whalelocal,'&#128011');
        charts.drawanimals(Bearlocal,'&#128059');
        charts.drawanimals(Pollutionlocal,'&#x2622');

        const projection = that.projection
        const Description = that.Description
        
        charts.addDescription(Description)
        charts.addEvents()
        charts.requestAnimationFrame([
            charts.earthMove(projection,that.svg,that.path)
        ])
    })
}

module.exports = charts;