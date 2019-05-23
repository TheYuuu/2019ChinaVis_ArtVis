var init = function(){
    const that =this;
    var width = document.getElementById("earth").offsetWidth,
    height = document.getElementById("earth").offsetHeight;
    let step = width/100;
    var autoR;
    var Description = [];
    Description.push(
        {
            localtype:'earth',
            local: [47.3,29.4],
            name:'People_In_Need_of_Water',
            lineLocal:[
                [8,30],
                [13,30]
            ],
            decline:{
                lastRecord:{
                    number:1268764722.8,
                    year:1970
                },
                danwei:"",
                speed:1.4
            },
            text:""
        },{
        localtype:'earth',
        local: [44.071469, 24.456169],
        name:'Oil_Left',
        lineLocal:[
            [7,18],
            [10,20]
        ],
        decline:{
            lastRecord:{
                number:3076395548723,
                year:1970
            },
            danwei:"barrels",
            speed:-1000
        },
        text:""
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
                number:97.07209113,
                year:1975
            },
            danwei:"%",
            speed:-0.00000005
        },
        text:""
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
        },
        text:""
    },{
        localtype:'earth',
        local: [20, 90],
        name: 'Polar_Bear',
        lineLocal:[
            [15,-10],
            [20,-10]
        ],
        decline:{
            lastRecord:{
                number:21420,
                year:2005
            },
            danwei:"",
            speed: -0.00001
        }
    },
    {
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
        },
        text:""
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
        },
        text:""
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
        },
        text:""
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
        },
        text:""
    },{
        localtype:'Entire',
        local: [width/2 - step*3, height/4*3 - step*3],
        name:'People',
        lineLocal:[
            [-22,7],
            [-33,7]
        ],
        decline:{
            lastRecord:{
                number:585000000,
                year:1501
            },
            danwei:"",
            speed:0.4301
        },
        text:""
    })

    this.TypeCount = {}
    this.lastDelete = {}
    this.Description_Map = {};
    Description.map( d => {
        if (that.Description_Map[d.decline.lastRecord.year] == undefined){
            that.Description_Map[d.decline.lastRecord.year]=[];
        }
        if(that.TypeCount[d.name] == undefined){
            that.TypeCount[d.name] = d.decline.lastRecord.number
            that.lastDelete[d.name] = d.decline.lastRecord.number
        }
        that.Description_Map[d.decline.lastRecord.year].push(d)
    })
    this.step = step;
    this.width = width;
    this.height = height;
    this.Description = Description;
    
}

module.exports = init;