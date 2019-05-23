var drawForce = function(CONTINENT){
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

module.exports = drawForce;