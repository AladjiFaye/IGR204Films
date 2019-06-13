// https://observablehq.com/@aladjifaye/zoomable-circle-packing@275
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Zoomable Circle Packing

Click to zoom in or out.`
)});
  main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","color"], function(pack,data,d3,width,height,color)
{
  const root = pack(data);
  let focus = root;
  let view;

  const svg = d3.create("svg")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", () => zoom(root));





  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "white")
      .attr("id", d=>d.data.name)
      //.attr("pointer-events", d => !d.children ? null : null)
      .on("mouseover", d=> {
        var v = [root.x, root.y, root.r*3]
        var k = width / v[2];
        var coord = d3.mouse(d3.event.currentTarget);
        d3.select("#"+d.data.name).attr("stroke", "#000");
        console.log((d.x - v[0]) * k);
        console.log((d.y - v[0]) * k);
        if (!d.children) {

          svg.selectAll("rect")
            .data(root.descendants().slice(1))
            .enter()
            .append("rect")
            .attr("id","meshbox")
            .attr("width",200)
            .attr("height",200)
            .attr("style","position:fixed;stroke-width:3;stroke:rgb(0,0,0);fill:rgb(255,255,255);fill-opacity:0.0")
            .attr("x",250)
            .attr("y",250);

         d3.select("#textData").remove();
        d3.select("g")
        .append("text")
          //.attr("id", "text"+d.data.name)
          .attr("id", "textData")
          //.attr("x",(d.x - v[0]) * k)
          //.attr("y",(d.y - v[1]) * k)
          .attr("x",250)
          .attr("y",350)
          //.attr("transform", `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`)
          .text("name : " + d.data.name +
                      ", \nvalue : "+d.data.value);



          //svg.append("rect")
        //.attr("id","textbox")
    //<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;
     //   .attr("width","150")
      //  .attr("heidth","150")
   //     .attr("style","height:10px;width:50px;border-style:solid;border-width:2px;position:fixed;")
   //     .attr("style","fill:rgb(0,0,255);stroke-width:3;");
      //.text("qgqfrejqkghrqkdfhreqkghkqehfkrelhgrk");

        }
      })
      .on("mouseout", d=> {
        d3.select("#" + d.data.name).attr("stroke", null);
        /*if(!d.children) {
         d3.select("#text"+d.data.name)
          .remove();
        }*/

      })
      .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));





  const label = svg.append("g")
      .attr("id","labels")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name);

  zoomTo([root.x, root.y, root.r*3]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    //d3.selectAll(".textclass").attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(d) {
    const focus0 = focus;

    focus = d;

    const transition = svg.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.json("https://gist.githubusercontent.com/Guanaco2569/ea551601561e1a9e6739bdbf7ad7c6ab/raw/26185767c4d920d5b303da50b50e093ac30636da/parsed.json")
)});
  main.variable(observer("pack")).define("pack", ["d3","width","height"], function(d3,width,height){return(
data => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))
)});
  main.variable(observer("width")).define("width", function(){return(
932
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
