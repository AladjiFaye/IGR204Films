// https://observablehq.com/@d3/zoomable-circle-packing@157
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

  const svg = d3.select("#test").append("svg")

  //on peut, pour la taille, modifier la viewbox directement dans le html
      .attr("viewBox", `-${width/50} -${height / 3.1} ${width/20} ${height/1.3}`)
      // .style("float","left")
      .attr("width",750)
      .attr("height",750)
      // .style("display", "block")
      .style("margin", "0 -10px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", () => zoom(root));

      function getValidName(string) {
      //https://www.w3schools.com/jsref/jsref_replace.asp
      //https://stackoverflow.com/questions/29246485/javascript-regex-problems-nothing-to-repeat
      //on doit avoir un nom ne contenant que des lettres pour que celui ci soit "valide"
      let res=string.replace(/ /g,""); //on enlève les espaces
      res=res.replace(/\'/g,""); //on enlève les guillemets
      res=res.replace(/&/g,""); //caractères spéciaux
      res=res.replace(/:/g,"");
      res=res.replace(/!/g,"");
      res=res.replace(/\?/g,"");
      res=res.replace(/,/g,"");
      res=res.replace(/-/g,"");
      res=res.replace(/\./g,"");
      return res;
    }




      const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
          .attr("fill", d => d.children ? color(d.depth) : "white")
          .attr("id", d=>{
            let name = getValidName(d.data.name);
            let parentName = getValidName(d.parent.data.name);
            return parentName + name;
          })
          //.attr("pointer-events", d => !d.children ? null : null)
          .on("mouseover", d=> {
            var v = [root.x, root.y, root.r*3]
            var k = width / v[2];
            var coord = d3.mouse(d3.event.currentTarget);
            let name = getValidName(d.data.name);
            let parentName = getValidName(d.parent.data.name);
            d3.select("#"+parentName+name).attr("stroke", "#000");
            console.log(parentName+name);
            if (!d.children) {


             d3.select("#textData").remove();
            svg2.append("text")
              //.attr("id", "text"+d.data.name)
              .attr("id", "textData")
              //.attr("x",(d.x - v[0]) * k)
              //.attr("y",(d.y - v[1]) * k) //permet d'afficher sur la position du cercle au cas où...
              .attr("font-size","12px")
              // .attr("textLength","25%") //pour la longueur déterminée à l'avance du texte au cas où
              // .attr("lengthAdjust","spacing") //idem
              .attr("x",25)
              .attr("y",465)
              //.attr("transform", `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`)
              .text("name : " + d.data.name)
              .append("tspan")
                .attr("x",25)
                .attr("y",480)
                .text("value : "+d.data.value);



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
            let name = getValidName(d.data.name);
            let parentName = getValidName(d.parent.data.name);
            d3.select("#" + parentName+name).attr("stroke", null);
            /*if(!d.children) {
             d3.select("#text"+d.data.name)
              .remove();
            }*/

          })
          .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));





      // const rect = svg.selectAll("rect")
      //   .data(root.descendants().slice(1))
      //   .enter()
      //   .append("rect")
      //   .attr("id","textbox")
      //   .attr("width",210)
      //   .attr("height",215)
      //   .attr("style","position:fixed;stroke-width:3;stroke:rgb(0,0,0);fill:rgb(255,255,255);fill-opacity:0.0")
      //   .attr("x",250)
      //   .attr("y",250);

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



          const svg2 = d3.select("#test").append("svg")
                // .attr("viewBox", `-${width /2.5} -${height / 2.5} ${width/1.25} ${height}`)
              // .style("display", "block")
               // .style("float","right")
               .attr("width",600)
               .attr("height",750)
              // .style("margin", "0 -14px")
              .style("background", "rgb(255,255,255)")
              .style("cursor", "pointer")
              .on("click", () => zoom(root));


          const whiteband = svg2.append("rect")
            .attr("id","bandeau")
            .attr("width",600)
            .attr("height",750)
            .attr("style","position:fixed;stroke-width:3;stroke:rgb(0,0,0);fill-opacity:0;")
            // .attr("x",350)
            // .attr("y",-500);

          const rect = svg2.append("rect")
            .attr("id","textbox")
            .attr("width",560)
            .attr("height",150)
            .attr("style","position:fixed;stroke-width:3;stroke:rgb(0,0,0);fill-opacity:0;")
            .attr("x",20)
            .attr("y",450);


            const text = svg2.append("text")
              .attr("id","movietext")
              .attr("x",20)
              .attr("y",435)
              .attr("font-size","12px")
              .text("Movie information");

          //
          //
          //
          //   const bandeau = svg.append("rect")
          //     .attr("id","bandeau")
          //     .attr("width",210)
          //     .attr("height",400)
          //     .attr("style","position:fixed;stroke-width:3;stroke:rgb(0,0,0);fill:hsl(152,80%,80%)")
          //     .attr("x",350)
          //     .attr("y",-300);
          //



  zoomTo([root.x, root.y, root.r * 3]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
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
d3.json("https://gist.githubusercontent.com/Guanaco2569/ea551601561e1a9e6739bdbf7ad7c6ab/raw/e3f8c0de067d0804bf016ccefa47e80da723328e/parsed.json")
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
