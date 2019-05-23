var charts = {};

charts.init = function(){
    const that =this;
    var width = document.getElementById("earth").offsetWidth,
    height = document.getElementById("earth").offsetHeight;
    let step = width/100;
    var autoR;
    var Description = [];
    Description.push({
        localtype:'earth',
        local: [44.071469, 24.456169],
        name:'Oil_Left',
        lineLocal:[
            [20,-4],
            [23,-4]
        ],
        decline:{
            lastRecord:{
                number:3076395548723,
                year:1970
            },
            danwei:"barrels",
            speed:-1000
        }
    },{
        localtype:'earth',
        local: [3.4653, 62.2159],
        name:'Wild_Forest',
        lineLocal:[
            [-25,-5],
            [-45,-5]
        ],
        decline:{
            lastRecord:{
                number:73.42009113,
                year:1990
            },
            danwei:"%",
            speed:-0.00000005
        }
    },{
        localtype:'earth',
        local: [-133.611696, -26.201145],
        name:'Sea_Level',
        lineLocal:[
            [-10,10],
            [-30,10]
        ],
        decline:{
            lastRecord:{
                number:12.5,
                year:1995
            },
            danwei:"mm",
            speed:0.0000001
        }
    },{
        localtype:'Entire',
        local: [width/2 - step*10, height/2 - step*20],
        name:'SO2',
        lineLocal:[
            [-9,-9],
            [-30,-9]
        ],
        decline:{
            lastRecord:{
                number:0,
                year:1850
            },
            danwei:"kg",
            speed:0.000188
        }
    },{
        localtype:'Entire',
        local: [width/2 - step*10, height/2 - step*20],
        name:'CO2',
        lineLocal:[
            [-9,-9],
            [-30,-9]
        ],
        decline:{
            lastRecord:{
                number:325.54,
                year:1970
            },
            danwei:"ppm",
            speed:0.00000005
        }
    },{
        localtype:'Entire',
        local: [width/2 - step*10, height/2 - step*20],
        name:'NO2',
        lineLocal:[
            [-9,-9],
            [-30,-9]
        ],
        decline:{
            lastRecord:{
                number:111.784956,
                year:1970
            },
            danwei:"ppb",
            speed:-0.000000058
        }
    },{
        localtype:'Entire',
        local: [width/2, height/4 - step],
        name:'Ozonosphere_Hole',
        lineLocal:[
            [9,-5],
            [15,-5]
        ],
        decline:{
            lastRecord:{
                number:0,
                year:1979
            },
            danwei:"km2",
            speed:0.0164
        }
    },{
        localtype:'Entire',
        local: [width/2 - step*3, height/4*3 - step*3],
        name:'People',
        lineLocal:[
            [-22,10],
            [-33,10]
        ],
        decline:{
            lastRecord:{
                number:3700000000,
                year:2019
            },
            danwei:"",
            speed:4.45
        }
    },{
        localtype:'Entire',
        local: [width/2 - step*2, height/4*3 - step*3],
        name:'People_In_Need_of_Water',
        lineLocal:[
            [-10,15],
            [-33,15]
        ],
        decline:{
            lastRecord:{
                number:1268764722.8,
                year:1970
            },
            danwei:"",
            speed:1.4
        }
    })
    this.Description_Map = {};
    Description.map( d => {
        if (that.Description_Map[d.decline.lastRecord.year] == undefined){
            that.Description_Map[d.decline.lastRecord.year]=[];
        }
        that.Description_Map[d.decline.lastRecord.year].push(d)
        // var oldTime = new Date(d.decline.lastRecord.year, 1, 1)
        // var curTime = new Date()
        // d.decline.lastRecord.number = d.decline.lastRecord.number + (curTime - oldTime) * d.decline.speed /1000
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

charts.deleteanimals = function(type){
    const earththsvg = this.earththsvg
    const projection = this.projection
    const that = this
    
    if(that[type].count.length !=0){
        that[type].count.pop()
        earththsvg
            .selectAll('.' + type)
            .data(that[type].count)
            .exit()
            .transition()
            .duration(1000)
            .attr("opacity",0)
            .remove()
    }
}

charts.drawanimals = function(local,symbol){
    const earththsvg = this.earththsvg
    const projection = this.projection

    if(local instanceof Array){
        earththsvg
        .selectAll("animals")
        .data(local)
        .enter()
        .append("text")
        .attr('class', function(d){ return 'animals object ' + d.type})
        .html(symbol)
        .attr("x", function(d){ return projection([d.long, d.lat])[0] })
        .attr("y", function(d){ return projection([d.long, d.lat])[1] })
        .attr("opacity",0)
        .transition()
        .duration(1000)
        .attr("opacity",1)

    } else if(local instanceof Object){
        earththsvg
        .selectAll("animals")
        .data([local])
        .enter()
        .append("text")
        .attr('class', function(d){ return 'animals object ' + d.type})
        .html(symbol)
        .attr("x", function(d){ return projection([d["long"], d["lat"]])[0] })
        .attr("y", function(d){ return projection([d["long"], d["lat"]])[1] })
        .attr("opacity",0)
        .transition()
        .duration(1000)
        .attr("opacity",1)
    }
}

charts.addDescription = function(obj){
    const earth = this.earththsvg.append('g').attr("class", "Description")
    const Entire = this.svg.append('g').attr("class", "Description")
    const step = this.step
    const projection = this.projection
    const that = this

    let color = '#ff9a9a'
    let airList = ["CO2", "NO2", "SO2"]
    let isAir = false

    let svg = obj.localtype == 'earth'?earth:Entire;
    let locals = obj.localtype == 'earth'? projection(obj.local):obj.local;

    let x = locals[0]
    let y = locals[1]

    svg.append('circle')
        .attr('class',function(){
            if (obj.localtype == 'earth'){
                return 'eventDot earth_eventDot_circle '
            }else{
                return 'eventDot eventDot_circle'
            }
        })
        .attr("cx", x)
        .attr("cy", y)
        .attr('r', 5)
        .attr('fill',color)
        .attr("opacity",0)
        .transition()
        .duration(1500)
        .attr("opacity",1)

    svg.append('line')
        .attr("x1", x)
        .attr("y1", y)
        .attr("x2", x + step*obj.lineLocal[0][0])
        .attr("y2", y + step*obj.lineLocal[0][1])
        .attr('stroke',color)
        .attr("class","move_line")
        .attr("opacity",0)
        .transition()
        .duration(1500)
        .attr("opacity",1)

    svg.append('line')
        .attr("x1", x + step*obj.lineLocal[0][0])
        .attr("y1", y + step*obj.lineLocal[0][1])
        .attr("x2", x + step*obj.lineLocal[1][0])
        .attr("y2", y + step*obj.lineLocal[1][1])
        .attr('stroke',color)
        .attr("opacity",0)
        .transition()
        .duration(1500)
        .attr("opacity",1)
    
    if(airList.indexOf(obj.name) >= 0){
        isAir = true
        svg.append('text')
            .html(() => {
                return obj.name + ":" + obj.decline.lastRecord.number + " " + obj.decline.danwei;
            })   
            .attr("x", x + step*obj.lineLocal[1][0])
            .attr("y", y + step*(obj.lineLocal[1][1] - 1 - (airList.indexOf(obj.name)) * 2 ))
            .attr('class', "inf_" + obj.name)
            .attr("opacity",0)
            .transition()
            .duration(1500)
            .attr("opacity",1)
    } else {
        isAir = false
        svg.append('text')
            .html(() => {
                return obj.name + ":";
            })   
            .attr("x", x + step*obj.lineLocal[1][0])
            .attr("y", y + step*(obj.lineLocal[1][1] - 1))
            .attr('class', "inf_" + obj.name)
            .attr("opacity",0)
            .transition()
            .duration(1500)
            .attr("opacity",1)

        svg.append('text')
            .html(() => {
                return obj.decline.lastRecord.number + " " + obj.decline.danwei
            })   
            .attr("x", x + step*obj.lineLocal[1][0] )
            .attr("y", y + step*(obj.lineLocal[1][1] + 2) )
            .attr('class', "data_" + obj.name)
            .attr("opacity",0)
            .transition()
            .duration(1500)
            .attr("opacity",1)
    }
    that.addFrameEvent(that.counting({
        name:"inf_" + obj.name,
        data:"data_" + obj.name,
        isAir:isAir,
        airposition:airList.indexOf(obj.name),
        obj:obj
    }))
    //     counting.push({
    //         name:"inf_" + obj.name,
    //         data:"data_" + obj.name,
    //         isAir:isAir,
    //         airposition:airList.indexOf(obj.name),
    //         obj:obj
    //     })
    // console.log(counting)
    // return counting;
}

charts.counting = function(obj){
    const that = this;
    var text;
    var danwei;

    return function(){
        if(obj.isAir){
            text = d3.select('.' + obj.name).text().split(":");
            danwei = text[1].split(" ")
            if (obj.obj.decline != undefined){
                //return local[i].name + ":" + local[i].decline.lastRecord.number + " " + local[i].decline.danwei;
                danwei[0] = +danwei[0] + obj.obj.decline.speed * that.TimeMachine / 1000
            }
            text = d3.select('.' + obj.name).html(text[0] + ":" + danwei[0] + " " + danwei[1])
        }
        else{
            text = d3.select('.' + obj.data).text().split(" ");
            if (obj.obj.decline != undefined){
                text[0] = +text[0] + obj.obj.decline.speed * that.TimeMachine / 1000
            }
            d3.select('.' + obj.data).html(text[0] + " " + text[1])
        }
    }
}

charts.earthMove = function(projection,svg,path){
    const that = this
    var ro=0;
    return function(){
        const earth = that.earththsvg
        const Description = that.Description
        // console.log(that)
        ro+=0.15;
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
    const width = this.width;
    const height = this.height;

    svg.selectAll('.block').on('click',function(d){
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
        .attr("fill","white")
        .attr("r",width/4)

        setTimeout(()=>{
            charts.drawForce(d.properties.CONTINENT.split(" ").join("_"));
        },1000)

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
                svg.selectAll(".item_circle")                
                    .transition()
                    .duration(1000)
                    .attr("r",0)
                    .remove()
                
                    setTimeout(()=>{
                        svg.selectAll(".waller").remove()

                        svg.selectAll('.waller_circle')
                        .attr("r",width/2)
                        .attr("stroke","none")
                        .transition()
                        .duration(1000)
                        .attr("r",0)
                        .remove()
                    },1000)

            })
            .transition()
            .duration(1000)
            .attr("y",height/2 - step*15)
    })
}

charts.drawForce = function(CONTINENT){
    const PicView = this.PicView
    const svg = this.svg
    const width = this.width;
    const height = this.height;
    const step = this.step;
    var transform = 51;
    var nodes = this.CONTINENT_Data[CONTINENT].animals.concat(this.CONTINENT_Data[CONTINENT].plantes)
    svg.selectAll(".nodes").remove()

    nodes.forEach((d,i)=>{
        d.radius = step*3;
        d.index = i;
    })

    var root = {
        index: 0,
        radius: height / 4
    };

    nodes.unshift(root);

    var simulation = d3
            .forceSimulation()
            .force("forceX",d3.forceX().strength(0.1).x(width * 0.5))
            .force("forceY",d3.forceY().strength(0.1).y(height * 0.5))
            .force("center",d3.forceCenter().x(width * 0.5).y(height * 0.5))
            .force("charge", function(d, i) {
            return i ? 0 : -2000;
            });

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    simulation
        .nodes(nodes)
        .force("collide",d3.forceCollide().strength(0.5).radius(function(d) {
                if (d.index == 0) return d.radius + step*5;
                return d.radius + 5;
            })
            .iterations(1)
            .strength(0.3)
        )
        .on("tick", ticked);
        
        // var imgage_g = svg.append('g')
        //                 .attr("class","ndoes_g")
        //                 .selectAll('.imgage_g')
        //                 .data(nodes)
        //                 .enter()
        //                 .append("g")
        //                 .attr("class","imgage_g")
                        
        // var images = imgage_g.append("image")
        //                 .attr("class","image")
        //                 // .attr("xlink:href",function(d,i){
        //                 //     return d.img;
        //                 // })                           
        //                 .attr("xlink:href","http://localhost:8080/static/img/zamia-restrepoi.png")           
        //                 .attr("width", 100)  
        //                 .attr("height", 100)                   

        // var node = imgage_g.append("circle")
        //     .attr("class","item_circle")
        //     .attr("fill", function(d,i){
        //         if (d.index != 0){
        //             return "transparent";
        //         }else{
        //             return "none";
        //         }
        //     })          
        //     .attr("r", function(d) {
        //         return d.radius;
        //       })
        //     .attr("stroke", "black")
        //     .attr("cx", function(d) {
        //       return d.x;
        //     })
        //     .attr("cy", function(d) {
        //       return d.y;
        //     })
        


        node = svg
            .append("g")
            .attr("class", "nodes")
            .selectAll("none")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class","item_circle")
            .attr("stroke", "black")
            .attr("stroke-dasharray", "5,5")
            .attr("fill", function(d,i){
                if (d.index != 0){
                    return "url(#" + d.name.split(" ").join("_") + ")";
                }else{
                    return "none";
                }
            })           
            .attr("r", function(d) {
                return d.radius;
              })
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            })
            .on("mouseover", function(d) {
                d3.select(this)
                  .attr("stroke-width", "2px")
                  .attr("r", d.radius + 20)
                  .attr("stroke-dasharray", "0,0");
              })
              .on("mouseleave", function(d) {
                d3.select(this)
                  .attr("stroke-width", "1px")
                  .attr("r", d.radius)
                  .attr("stroke-dasharray", "5,5");
              })
            .on("click",function(d){
                PicView.showMe(nodes.slice(1,nodes.length), d.index - 1);
            })

    
    function ticked() {
            node
            .attr("cx", function(d) {
            if (d.x - d.radius < 0) {
                d.x += 10;
                return d.x;
            } else if (d.x + d.radius > width) {
                d.x -= 10;
                return d.x;
            }

            if (d.index == "0") {
                d.fy = height / 2;
                d.fx = width / 2;
            }

            return d.x;
            })
            .attr("cy", function(d) {
            if (d.y - d.radius < 0) {
                d.y += 10;
                return d.y;
            } else if (d.y + d.radius > height) {
                d.y -= 10;
                return d.y;
            }

            if (d.index == "0") {
                d.fy = height / 2;
                d.fx = width / 2;
            }
            return d.y;
            });
            
        // images
        //     .attr("x", function(d) {
        //         return d.x- transform;
        //     })
        //     .attr("y", function(d) {
        //         return d.y - transform;
        //     });

        }
}

charts.CONTINENT_Data_change = function(){
    var that = this;
    return function (){
            for (let k in that.CONTINENT_Data){
                if (that.CONTINENT_Data[k].animals != undefined){
                    that.CONTINENT_Data[k].animals.forEach(d=>{
                        if (!d.marked){
                            if (d.population <= 0 && that.DateNow >= d.ExtinctTime){
                                d.marked = true
                                d.population = 0
                                that.Counts--;
                                that.AddDeadList(d.ExtinctTime.getFullYear(), d.name)
                            }else{
                                d.population -= d.ExtinctSpeed * that.TimeMachine / 1000
                            }
                        }
                    })
                }
                if (that.CONTINENT_Data[k].plantes != undefined){
                    that.CONTINENT_Data[k].plantes.forEach(d=>{
                        if (!d.marked){
                            if (d.population <= 0 && that.DateNow >= d.ExtinctTime){
                                d.marked = true
                                d.population = 0
                                that.Counts--;
                                that.AddDeadList(d.ExtinctTime.getFullYear(), d.name)
                            }else{

                                d.population -= d.ExtinctSpeed * that.TimeMachine / 1000
                            }
                        }
                    })
                }
        }
    }
}

charts.Air_change = function(){
    d3.select(".satic-area")
    .style("transition","all 35s")
    .style("background","#8080806b")
}

charts.Ozonosphere_change = function(){
    const height = this.height;
    d3.select("#ozone_shield")
    .transition()
    .duration(35000)
    .attr("cy",height/10)
}

charts.RefreshTime = function(){
    const that = this;
    return function(){
        d3.select("#RunningTime").html(that.DateNow.toLocaleString().replace("下午","PM ").replace("上午","PM "));
    }
}

charts.addFrameEvent = function(fn){
    const that = this
    var type = Object.prototype.toString.call(fn)
    if (type === "[object Array]"){
        fn.forEach(d=>{
            that.fns.push(d)
        })
    }
    else if (type === "[object Function]"){
        that.fns.push(fn)
    }
}

charts.requestAnimationFrame = function(){
    const that = this;
    that.ms=50
    run(that)

    function run(that){
        this.AnimationFrame = setInterval(()=>{
            that.DateNow = new Date( +that.DateNow + that.TimeMachine )
            that.fns.forEach(d=>{
                d()
            })
            // if (that.Counts<=0){
            //     clearInterval(this.AnimationFrame);
            //     alert(that.DateNow)
            // }
            if (that.DateNow.getFullYear()>=1950){
                clearInterval(this.AnimationFrame);
                that.ms=100
                run(that)
            }
            if (that.DateNow.getFullYear()>=2000){
                clearInterval(this.AnimationFrame);
                that.ms=1000
                run(that)
            }
            if (that.DateNow.getFullYear()>=new Date().getFullYear()-1  && !that.backTime){
                clearInterval(this.AnimationFrame)
                that.ms=1
                that.TimeMachine = 1000*60*60*24
                run(that)
            }
            if (that.DateNow >=new Date() && !that.backTime){
                clearInterval(this.AnimationFrame)
                that.backTime = true
                that.DateNow = new Date()
                that.ms=1000
                that.TimeMachine = 1000
                that.showWords2()
                run(that)
            }

            //that.bear
            if(that.bear.reduce[that.DateNow.getFullYear()]!=undefined){
                for(let i=0; i<that.bear.reduce[that.DateNow.getFullYear()]; i++){
                    charts.deleteanimals("bear")
                }
            }

            if(that.population[that.DateNow.getFullYear()]!=undefined
                && that.population[that.DateNow.getFullYear()].length!=0){
                    that.population[that.DateNow.getFullYear()].map(d => {
                        charts.drawanimals(d, '&#128694')
                    })
                }

            if (that.Description_Map[that.DateNow.getFullYear()]!=undefined 
                && that.Description_Map[that.DateNow.getFullYear()].length!=0){
                while(that.Description_Map[that.DateNow.getFullYear()].length){
                    that.addDescription(that.Description_Map[that.DateNow.getFullYear()].pop())
                }
            }
        },that.ms)
    }
}

charts.on = function(Vue, CONTINENT_Data){
    const that = this;
    that.PicView = Vue.$refs.ViewPic;
    that.AddDeadList = Vue.AddDeadList;
    
    that.showWords2 = Vue.showWords2;
    that.CONTINENT_Data = CONTINENT_Data;
    that.fns = [];
    that.Counts = Vue.Counts;
    that.DateNow = new Date(1849,1,1);
    that.TimeMachine = 1000 *60 *60 *24 *365;
    
    d3.json("../../static/map.json").then(world=>{
        /*
        var Whalelocal = [
            {long: 139.485582, lat: 34.078783}, 
            {long: 133.671016, lat: 36.170561}, 
            {long: 143.372315, lat: 38.371926},
            {long: 133.176260, lat: 41.141973},
        ];
        */
        that.bear = {
            count: [
                {long: -10.0000, lat: 90.0000, type:"bear"},
                {long: -20.0000, lat: 90.0000, type:"bear"},
                {long: 20.0000, lat: 90.0000, type:"bear"},
                {long: 40.0000, lat: 90.0000, type:"bear"},
                {long: 60.0000, lat: 90.0000, type:"bear"}
            ],
            reduce:{
                "2007": 1
            }
        }
        

        /*
        var Pollutionlocal = [
            {long: 79.185509, lat: -21.263971},
            {long: 85.185509, lat: -15.263971},
            {long: 70.185509, lat: -25.263971},
            {long: 90.185509, lat: -21.263971},
        ];
        */


        that.population = {
            "1850": [
                {long:110, lat:45, year: 1850, type:"population"}, //Asia
                {long:14.431588 , lat: 49.801038, year: 1850, type:"population"}, //Eur 741,447,158
                {long:-102.595203 , lat: 46.434343, year: 1850, type:"population"}, // North Amer
                {long:-65.189542 , lat: -8.105085, year: 1850, type:"population"}, //South Amer
                {long:20.465635 , lat: 12.314046, year: 1850, type:"population"}, //Afr
                {long:134.581813 , lat: -25.627986, year: 1850, type:"population"} //Oceania
            ],
            "1950": [
                {long:100, lat:34.841334, year: 1950, type:"population"}, //Asia 
                {long:80 , lat:34.841334, year: 1950, type:"population"}, //Asia
            ],
            "1960":[
                {long:60 , lat:34.841334, year: 1960, type:"population"}, //Asia
            ],
            "1970":[
                {long:90, lat:40, year: 1970, type:"population"} //Asia
            ],
            "1980":[
                {long:70, lat:40, year: 1980, type:"population"}, //Asia
            ],
            "1990":[
                {long:90, lat:30, year: 1990, type:"population"}, //Asia 
                {long:5.431588 , lat: 49.801038, year: 1990, type:"population"}, //Eur 741,447,158
                {long:15.465635 , lat: -12.314046, year: 1990, type:"population"}, //Afr
            ],
            "2000":[
                {long:70, lat:30, year: 2000, type:"population"}, //Asia 
                {long:-92.595203 , lat: 46.434343, year: 2000, type:"population"} // North Amer
            ],
            "2010":[
                {long:55, lat:45, year: 2010, type:"population"}, //Asia
                {long:20.465635 , lat: -22.314046, year: 2010, type:"population"} //Afr
            ]

        }

        charts.init()
        charts.drawEarth(world);

        //charts.drawanimals(Whalelocal,'&#128011');
        charts.drawanimals(that.bear.count,'&#128059');
        //charts.drawanimals(Pollutionlocal,'&#x2622');
        //charts.drawanimals(Population, '&#128694')

        const projection = that.projection
        const Description = that.Description
        
        charts.addEvents()

        charts.Air_change()
        charts.Ozonosphere_change()

        charts.addFrameEvent([
                charts.earthMove(projection,that.svg,that.path),
                charts.CONTINENT_Data_change(),
                charts.RefreshTime()
        ])

        charts.requestAnimationFrame()
    })
}

module.exports = charts;