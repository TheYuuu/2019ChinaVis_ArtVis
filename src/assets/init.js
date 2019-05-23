var init = function(){
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

module.exports = init;