var init = require('./init') 
var drawEarth = require('./drawEarth') 
var drawForce = require('./drawForce') 

var charts = {};
charts.init = init
charts.drawEarth = drawEarth
charts.drawForce = drawForce


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

charts.CONTINENT_Data_change = function(){
    var that = this;
    return function (){
        var handle = function(d){
            if (!d.marked){
                if (d.populationNow < 1 && that.DateNow >= d.ExtincionTime){
                    d.marked = true
                    d.populationNow = 0
                    that.Counts--;
                    that.AddDeadList(d.ExtincionTime.getFullYear(), d.name)
                }else{
                    let y = Math.floor(+(that.DateNow - new Date(d.date))/1000/60/60/24/365)
                    if ( +(that.DateNow - new Date(d.date)) >= 1000*60*60*24*365 && d.populationNow >= 1 ){
                        d.populationNow = d.population - d.ExtinctSpeed * d.populationNow * y;
                    }
                }
            }
        }
        for (let k in that.CONTINENT_Data){
                if (that.CONTINENT_Data[k].animals != undefined){
                    that.CONTINENT_Data[k].animals.forEach(d=>{
                        handle(d)
                    })
                }
                if (that.CONTINENT_Data[k].plantes != undefined){
                    that.CONTINENT_Data[k].plantes.forEach(d=>{
                        handle(d)
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
    .attr("cy",0)
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

charts.loadButton = function(){
    const that = this;

    d3.selectAll(".title-button")
    .transition()
    .duration(1000)   
    .style("opacity",1)

    d3.select("#Speed-button").on("click",function(){
        clearInterval(that.AnimationFrame);
        that.ms=500
        that.TimeMachine = 1000 *60 *60 *24 *365;
        that.run()
    })
}

charts.requestAnimationFrame = function(){
    this.ms=1
    this.run()
}

charts.run = function(){
    const that = this;
    this.AnimationFrame = setInterval(()=>{
        that.DateNow = new Date( +that.DateNow + that.TimeMachine )
        that.fns.forEach(d=>{
            d()
        })
        // if (that.Counts<=0){
        //     clearInterval(this.AnimationFrame);
        //     alert(that.DateNow)
        // }
        if (that.DateNow.getFullYear()>=1800){
            clearInterval(this.AnimationFrame);
            that.ms=100
            that.run()
        }
        if (that.DateNow.getFullYear()>=2000){
            clearInterval(this.AnimationFrame);
            that.ms=1000
            that.run()
        }
        if (that.DateNow.getFullYear()>=new Date().getFullYear()-1  && !that.backTime){
            clearInterval(this.AnimationFrame)
            that.ms=1
            that.TimeMachine = 1000*60*60*24
            that.run()
        }
        if (that.DateNow >=new Date() && !that.backTime){
            clearInterval(this.AnimationFrame)
            that.backTime = true
            that.DateNow = new Date()
            that.ms=1000
            that.TimeMachine = 1000
            that.showWords2()
            //show more button
            that.loadButton();
            that.run()
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

charts.on = function(Vue, CONTINENT_Data){
    const that = this;
    that.PicView = Vue.$refs.ViewPic;
    that.AddDeadList = Vue.AddDeadList;
    
    that.showWords2 = Vue.showWords2;
    that.CONTINENT_Data = CONTINENT_Data;
    that.fns = [];
    that.Counts = Vue.Counts;
    that.DateNow = new Date(1500,1,1);
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