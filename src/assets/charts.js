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
            .style("font-size", "40px")
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
        .style("font-size", "40px")
        .attr("opacity",0)
        .transition()
        .duration(1000)
        .attr("opacity",1)
        .style("font-size", "12px")

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
        .style("font-size", "40px")
        .attr("opacity",0)
        .transition()
        .duration(1000)
        .attr("opacity",1)
        .style("font-size", "12px")
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
}

charts.counting = function(obj){
    const that = this;
    var text;
    var danwei;
    var typeName;
    return function(){
        if(obj.isAir){
            text = d3.select('.' + obj.name).text().split(":");
            danwei = text[1].split(" ")
            if (danwei[0]<=0 && obj.obj.decline.lastRecord.number != 0)
                return
            if (obj.obj.decline != undefined){
                //return local[i].name + ":" + local[i].decline.lastRecord.number + " " + local[i].decline.danwei;
                danwei[0] = +danwei[0] + obj.obj.decline.speed * that.TimeMachine / 1000
            if (danwei[0]<=0  && obj.obj.decline.lastRecord.number != 0)
                danwei[0]=0
            }

            text = d3.select('.' + obj.name).html(text[0] + ":" + danwei[0].toFixed(4) + " " + danwei[1])
            
            typeName = obj["name"].split("inf_")[1]
            that.TypeCount[typeName] = danwei[0]
        }
        else{
            text = d3.select('.' + obj.data).text().split(" ");
            if (text[0]<=0  && obj.obj.decline.lastRecord.number != 0)
                return
            if (obj.obj.decline != undefined){
                text[0] = +text[0] + obj.obj.decline.speed * that.TimeMachine / 1000
                if (text[0]<=0  && obj.obj.decline.lastRecord.number != 0)
                    text[0]=0
            }
            d3.select('.' + obj.data).html(text[0].toFixed(4) + " " + text[1])
            typeName = obj["name"].split("inf_")[1]
            that.TypeCount[typeName] = text[0]
        }
    }
}

charts.earthMove = function(projection,svg,path){
    const that = this
    var ro=0;
    return function(){
        const earth = that.earththsvg
        const Description = that.Description
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
                if (d.populationNow < 1 && that.DateNow >= d.ExtinctionTime){
                    d.marked = true
                    d.populationNow = 0
                    that.Counts--;
                    that.AddDeadList(d.ExtinctionTime.getFullYear(), d)
                }else{
                    let y = Math.floor(+(that.DateNow - new Date(d.date))/1000/60/60/24/365)
                    if ( +(that.DateNow - new Date(d.date)) >= 1000*60*60*24*365 && d.populationNow >= 1 ){
                        d.populationNow = (d.population - d.ExtinctSpeed * d.populationNow * y).toFixed(4);
                        if (d.populationNow<1){
                            d.populationNow=0;
                        }
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

charts.addLegend = function(){
    const that = this
    const width = this.width
    const height = this.height
    const step = this.step

    d3.select("#earth_svg")
        .selectAll("legend")
        .data(that.legend)
        .enter()
        .append("text")
        .attr('class', 'legend')
        .html(function(d){
            return d.code + " " + d.unit + "<br/>"
        })
<<<<<<< HEAD
        .attr("x", function(d,i){ return 600 })
        .attr("y", function(d,i){ return i*25 + 950 })
=======
        .attr("x", function(d,i){ return 0 + 2*step })
        .attr("y", function(d,i){ return i*25 + height - 10*step })
>>>>>>> 01f433015fdd40f62b56f53033222f1164966a37
        .attr("opacity",0)
        .transition()
        .duration(1000)
        .attr("opacity",1)
        .style("font-size", "14px")
}

charts.loadButton = function(){
    const that = this;

    d3.selectAll(".title-button")
    .transition()
    .duration(1000)   
    .style("opacity",1)

    d3.select("#Speed-button").on("click",function(){
        clearInterval(that.AnimationFrame);
        that.ms=1
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
        if (that.DateNow.getFullYear() == 2500){
            clearInterval(this.AnimationFrame);
        }
        if (that.DateNow.getFullYear()>=1800 && !that.backTime1800){
            clearInterval(this.AnimationFrame);
            that.backTime1800 = true
            that.ms=50
            that.run()
        }
        if (that.DateNow.getFullYear()>=2000 && !that.backTime2000){
            clearInterval(this.AnimationFrame);
            that.backTime2000 = true
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

        let now_wild_forest = Math.floor(that.TypeCount["Wild_Forest"]),
            past_wild_forest = that.lastDelete["Wild_Forest"]
        if(that.TypeCount["Wild_Forest"] != undefined 
            && now_wild_forest % 3 == 0
            && now_wild_forest != past_wild_forest){
                let times = (past_wild_forest - now_wild_forest) / 3
                that.lastDelete["Wild_Forest"] = now_wild_forest
                for(let i=0;i<times;i++){
                    charts.deleteanimals("tree")
                }
        }
        

        if(that.bear.reduce[that.DateNow.getFullYear()]!=undefined){
            for(let i=0; i<that.bear.reduce[that.DateNow.getFullYear()]; i++){
                charts.deleteanimals("bear")
            }
        }

        let now_people = Math.floor(that.TypeCount["People"] / 500000000),
            past_people = that.lastDelete["People"]

        if(now_people != undefined 
            && now_people != past_people){
                let times;
                if(past_people > now_people){
                    times = 1
                } else {
                    times = now_people - past_people
                }
                that.lastDelete["People"] = now_people
                for(let i=0;i<times;i++){
                    let d = that.population[Math.floor(Math.random() * (that.population.length - 1))]
                    d.long = d.long + (Math.random() * 8) - 2
                    d.lat = d.lat + (Math.random() * 8) - 2
                    charts.drawanimals(d, '&#128694')
                }
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

        that.legend = [
            {"name": "bear", "unit": "5,000", "code": "&#128059 Population of polar bear: "},
            {"name": "tree", "unit": "3%", "code": "&#127795 Percent of wild forests left: "},
            {"name": "people", "unit": "500,000,000", "code": "&#128694 Population around the world: "}
        ]
        that.bear = {
            count: [
                {long: -10.0000, lat: 90.0000, type:"bear"},
                {long: -20.0000, lat: 90.0000, type:"bear"},
                {long: 20.0000, lat: 90.0000, type:"bear"},
                {long: 40.0000, lat: 90.0000, type:"bear"},
                {long: 60.0000, lat: 90.0000, type:"bear"}
            ],
            reduce:{
                "2007": 1,
                '2023':1,
                '2039':1,
                '2055':1,
                '2071':1,
            }
        }

        that.tree = {
            //3%
            count: [
                {long:159.749538, lat:55.582954 , type:"tree"},//Asia
                {long:135.057732 , lat:63.062483, type:"tree"},//Asia
                {long:116.084791 , lat:41.326644 , type:"tree"},//Asia
                {long:94.774701 , lat:35.235501 , type:"tree"},//Asia
                {long:97.707156 , lat:24.088490 , type:"tree"},//Asia
                {long:109.331901 , lat:24.319681, type:"tree"},//Asia
                {long:72.322768 , lat:27.135527 , type:"tree"},//Asia
                {long:22.636679 , lat:49.831924, type:"tree"}, //Asia
                {long:52.751984 , lat:62.820094 , type:"tree"}, //Asia
                {long:8.485339 , lat:47.518421 , type:"tree"},//Eur
                {long:-4.985585 , lat:39.252141 , type:"tree"}, //Eur
                {long:14.583780 , lat:51.850822 , type:"tree"}, //Eur
                {long:13.428332 , lat:62.554330 , type:"tree"}, //Eur
                {long:14.533609 , lat:2.651325 , type:"tree"}, //Eur
                {long:20.164437 , lat:2.179529, type:"tree"}, //Afr
                {long:28.491501 , lat:0.559533 , type:"tree"}, //Afr
                {long:1.633598 , lat:18.807416, type:"tree"}, //Afr
                {long:21.758628 , lat:-15.882557, type:"tree"}, //Afr
                {long:34.632831 , lat:14.902828, type:"tree"}, //Afr
                {long:-127.685968 , lat:58.428542,  type:"tree"}, //Nor A
                {long:-117.218823 , lat:57.854885 , type:"tree"}, //Nor A
                {long:-105.250433 , lat:55.714486 , type:"tree"}, //Nor A
                {long:-85.036680 , lat:51.682161 , type:"tree"}, //Nor A
                {long:-82.366583 , lat:37.850611 , type:"tree"}, //Nor A
                {long:-118.036795 , lat:43.764984, type:"tree"}, //Nor A
                {long:-65.736107 , lat:3.930499, type:"tree"}, //Sou A
                {long:-68.193071 , lat:-8.215564 , type:"tree"}, //Sou A
                {long:-61.534837 , lat:-31.201328, type:"tree"}, //Sou A
                {long:-49.554814 , lat:-6.472938, type:"tree"}, //Sou A
                {long:141.551504 , lat:-28.363542 , type:"tree"}, //Aus
                {long:123.204025 , lat:-25.225526, type:"tree"}, //Aus
            ],
            reduce:{}
        }
        
        //init tree reduce
        for(let i=0; i<that.tree.count.length; i++){
            let year = 1954 + i * 3
            that.tree.reduce[year] = 1
        }

        that.population = [
                {long:110, lat:45, year: 1850, type:"population"}, //Asia
                {long:14.431588 , lat: 49.801038, year: 1850, type:"population"}, //Eur 741,447,158
                {long:-102.595203 , lat: 46.434343, year: 1850, type:"population"}, // North Amer
                {long:-65.189542 , lat: -8.105085, year: 1850, type:"population"}, //South Amer
                {long:20.465635 , lat: 12.314046, year: 1850, type:"population"}, //Afr
                {long:134.581813 , lat: -25.627986, year: 1850, type:"population"}, //Oceania
                {long:100, lat:34.841334, year: 1950, type:"population"}, //Asia 
                {long:80 , lat:34.841334, year: 1950, type:"population"}, //Asia
                {long:60 , lat:34.841334, year: 1960, type:"population"}, //Asia
                {long:90, lat:40, year: 1970, type:"population"}, //Asia
                {long:70, lat:40, year: 1980, type:"population"}, //Asia
                {long:90, lat:30, year: 1990, type:"population"}, //Asia 
                {long:5.431588 , lat: 49.801038, year: 1990, type:"population"}, //Eur 741,447,158
                {long:15.465635 , lat: -12.314046, year: 1990, type:"population"}, //Afr
                {long:70, lat:30, year: 2000, type:"population"}, //Asia 
                {long:-92.595203 , lat: 46.434343, year: 2000, type:"population"}, // North Amer
                {long:55, lat:45, year: 2010, type:"population"}, //Asia
                {long:20.465635 , lat: -22.314046, year: 2010, type:"population"} //Afr
            ]
        
        charts.init()
        charts.drawEarth(world);

        charts.drawanimals(that.bear.count,'&#128059');
        charts.drawanimals(that.tree.count.sort(() => Math.random() -0.5 ), '&#127795')

        const projection = that.projection
        const Description = that.Description
        
        charts.addEvents()
        charts.Air_change()
        charts.Ozonosphere_change()
        charts.addLegend()
        charts.addFrameEvent([
                charts.earthMove(projection,that.svg,that.path),
                charts.CONTINENT_Data_change(),
                charts.RefreshTime()
        ])

        charts.requestAnimationFrame()
        // charts.loadButton()
    })
}

module.exports = charts;