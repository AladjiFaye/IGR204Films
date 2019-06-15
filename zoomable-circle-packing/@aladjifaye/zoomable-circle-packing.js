// https://observablehq.com/@d3/zoomable-circle-packing@157
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Zoomable Circle Packing

Click to zoom in or out.`
)});
  main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","color"], function(pack,data,d3,width,height,color)
{

  const zoomRoot = pack(data);
  let focus = zoomRoot;
  let view;

  const svg1 = d3.select("#svg1")
      .attr("viewBox", `-${width / 2} -${height /2} ${width} ${height/1}`)
      .attr("width","50%")
      .attr("height",600)
      .style("float","left")
      // .style("position","absolute")
      .style("top","0px")
      // .style("left","0px")
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", () => zoom(zoomRoot));

      function getValidName(string) {
            //https://www.w3schools.com/jsref/jsref_replace.asp
            //https://stackoverflow.com/questions/29246485/javascript-regex-problems-nothing-to-repeat
            //on doit avoir un nom ne contenant que des lettres pour que celui ci soit "valide"

            let res = string.replace(/[\W_]+/g, ''); //https://stackoverflow.com/questions/30824525/remove-all-characters-that-are-not-letters-or-numbers-in-a-string
            return res;
          }




            const zoomNode = svg1.append("g")
              .selectAll("circle")
              .data(zoomRoot.descendants().slice(1))
              .join("circle")
                .attr("fill", d => d.children ? color(d.depth) : "white")
                .attr("id", d=>{
                  let name = getValidName(d.data.name);
                  let parentName = getValidName(d.parent.data.name);
                  return parentName + name;
                })
                //.attr("pointer-events", d => !d.children ? null : null)
                .on("mouseover", d=> {
                  var v = [zoomRoot.x, zoomRoot.y, zoomRoot.r*3]
                  var k = width / v[2];
                  var coord = d3.mouse(d3.event.currentTarget);
                  let name = getValidName(d.data.name);
                  let parentName = getValidName(d.parent.data.name);
                  d3.select("#"+parentName+name).attr("stroke", "#000");
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
                    .attr("y",455)
                    //.attr("transform", `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`)
                    .text("name : " + d.data.name)
                    .append("tspan")
                      .attr("x",25)
                      .attr("y",470)
                      .text("Popularity (rated from 0 to 100) : "+d.data.value);

                      if (d.data.awards=="Yes") {
                        d3.select("#textData")
                        .append("tspan")
                          .attr("fill","red")
                          .attr("x",25)
                          .attr("y",485)
                          .text("Has received awards");
                      }
                      else {
                        d3.select("#textData")
                        .append("tspan")
                          .attr("x",25)
                          .attr("y",485)
                          .text("Has not received awards");
                      }

                  }
                })
                .on("mouseout", d=> {
                  let name = getValidName(d.data.name);
                  let parentName = getValidName(d.parent.data.name);
                  d3.select("#" + parentName+name).attr("stroke", null);


                })
                .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

  const label = svg1.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(zoomRoot.descendants())
    .join("text")
      .style("fill-opacity", d => d.parent === zoomRoot ? 1 : 0)
      .style("display", d => d.parent === zoomRoot ? "inline" : "none")
      .text(d => d.data.name);


      const svg2 = d3.select("#svg2")
               // .attr("viewBox", `-${width /2.5} -${height / 2.5} ${width/1.25} ${height}`)
             // .style("display", "block")
              // .style("float","right")
              .attr("width","50%")
              .attr("height",600)
             // .style("margin", "0 -14px")
             .style("background", "rgb(0,255,255)")
             .style("cursor", "pointer")
             // .style("position","absolute")
             .style("top","-0px")
             // .style("left","70%")

             const whiteband = svg2.append("rect")
               .attr("id","bandeau")
               .attr("width","100%")
               .attr("height","100%")
               .attr("style","position:fixed;stroke-width:3;stroke:rgb(0,0,0);fill-opacity:0;")
               // .attr("x",350)
               // .attr("y",-500);

             const rect = svg2.append("rect")
               .attr("id","textbox")
               .attr("width",300)
               .attr("height",150)
               .attr("style","position:fixed;stroke-width:3;stroke:rgb(0,0,0);fill-opacity:0;")
               .attr("x",20)
               .attr("y",440);


               const text = svg2.append("text")
                 .attr("id","movietext")
                 .attr("x",20)
                 .attr("y",435)
                 .attr("font-size","12px")
                 .text("Movie information");

              const image = svg2.append("image")
                  .attr("xlink:href","https://images.ecosia.org/WmDTsFAleKz5loQc6c9OouC3UWc=/0x390/smart/https%3A%2F%2Fwallpapertag.com%2Fwallpaper%2Ffull%2F4%2Fc%2Ff%2F537285-white-screen-wallpaper-2560x1600-retina.jpg")
                  // .style("position","relative")
                  .attr("x",21)
                   .attr("y",441)
                  .attr("width",298)
                  .attr("height",148)
                  .attr("preserveAspectRatio","none")
                  // .attr("viewBox","0 0 5000 5000");


                  //****** Generate data for the tree *************

                  /*var data = [
                      { "name" : "Level 2: A", "parent":"Top Level" },
                      { "name" : "Top Level", "parent":"null" },
                      { "name" : "Son of A", "parent":"Level 2: A" },
                      { "name" : "Daughter of A", "parent":"Level 2: A" },
                      { "name" : "Level 2: B", "parent":"Top Level" }
                    ];*/
                  var data1 = [{ "name" : "Title 0.1", "parent":"Subject 0" },{ "name" : "Length 0.1.2", "parent":"Title 0.1" },{ "name" : "Length     end", "parent":"Length 0.1.2" },{ "name" : "Year 0.1.3", "parent":"Title 0.1" },{ "name" : "Year     end", "parent":"Year 0.1.3" },{ "name" : "Actor 0.1.4", "parent":"Title 0.1" },{ "name" : "Actor     end", "parent":"Actor 0.1.4" },{ "name" : "Actress 0.1.5", "parent":"Title 0.1" },{ "name" : "Actress     end", "parent":"Actress 0.1.5" },{ "name" : "Director 0.1.6", "parent":"Title 0.1" },{ "name" : "Director     end", "parent":"Director 0.1.6" },{ "name" : "Popularity 0.1.7", "parent":"Title 0.1" },{ "name" : "Popularity     end", "parent":"Popularity 0.1.7" },{ "name" : "Awards 0.1.8", "parent":"Title 0.1" },{ "name" : "Awards     end", "parent":"Awards 0.1.8" },{ "name" : "Length 0.2", "parent":"Subject 0" },{ "name" : "Title 0.2.1", "parent":"Length 0.2" },{ "name" : "Title     end", "parent":"Title 0.2.1" },{ "name" : "Year 0.2.3", "parent":"Length 0.2" },{ "name" : "Year     end", "parent":"Year 0.2.3" },{ "name" : "Actor 0.2.4", "parent":"Length 0.2" },{ "name" : "Actor     end", "parent":"Actor 0.2.4" },{ "name" : "Actress 0.2.5", "parent":"Length 0.2" },{ "name" : "Actress     end", "parent":"Actress 0.2.5" },{ "name" : "Director 0.2.6", "parent":"Length 0.2" },{ "name" : "Director     end", "parent":"Director 0.2.6" },{ "name" : "Popularity 0.2.7", "parent":"Length 0.2" },{ "name" : "Popularity     end", "parent":"Popularity 0.2.7" },{ "name" : "Awards 0.2.8", "parent":"Length 0.2" },{ "name" : "Awards     end", "parent":"Awards 0.2.8" },{ "name" : "Year 0.3", "parent":"Subject 0" },{ "name" : "Title 0.3.1", "parent":"Year 0.3" },{ "name" : "Title     end", "parent":"Title 0.3.1" },{ "name" : "Length 0.3.2", "parent":"Year 0.3" },{ "name" : "Length     end", "parent":"Length 0.3.2" },{ "name" : "Actor 0.3.4", "parent":"Year 0.3" },{ "name" : "Actor     end", "parent":"Actor 0.3.4" },{ "name" : "Actress 0.3.5", "parent":"Year 0.3" },{ "name" : "Actress     end", "parent":"Actress 0.3.5" },{ "name" : "Director 0.3.6", "parent":"Year 0.3" },{ "name" : "Director     end", "parent":"Director 0.3.6" },{ "name" : "Popularity 0.3.7", "parent":"Year 0.3" },{ "name" : "Popularity     end", "parent":"Popularity 0.3.7" },{ "name" : "Awards 0.3.8", "parent":"Year 0.3" },{ "name" : "Awards     end", "parent":"Awards 0.3.8" },{ "name" : "Actor 0.4", "parent":"Subject 0" },{ "name" : "Title 0.4.1", "parent":"Actor 0.4" },{ "name" : "Title     end", "parent":"Title 0.4.1" },{ "name" : "Length 0.4.2", "parent":"Actor 0.4" },{ "name" : "Length     end", "parent":"Length 0.4.2" },{ "name" : "Year 0.4.3", "parent":"Actor 0.4" },{ "name" : "Year     end", "parent":"Year 0.4.3" },{ "name" : "Actress 0.4.5", "parent":"Actor 0.4" },{ "name" : "Actress     end", "parent":"Actress 0.4.5" },{ "name" : "Director 0.4.6", "parent":"Actor 0.4" },{ "name" : "Director     end", "parent":"Director 0.4.6" },{ "name" : "Popularity 0.4.7", "parent":"Actor 0.4" },{ "name" : "Popularity     end", "parent":"Popularity 0.4.7" },{ "name" : "Awards 0.4.8", "parent":"Actor 0.4" },{ "name" : "Awards     end", "parent":"Awards 0.4.8" },{ "name" : "Actress 0.5", "parent":"Subject 0" },{ "name" : "Title 0.5.1", "parent":"Actress 0.5" },{ "name" : "Title     end", "parent":"Title 0.5.1" },{ "name" : "Length 0.5.2", "parent":"Actress 0.5" },{ "name" : "Length     end", "parent":"Length 0.5.2" },{ "name" : "Year 0.5.3", "parent":"Actress 0.5" },{ "name" : "Year     end", "parent":"Year 0.5.3" },{ "name" : "Actor 0.5.4", "parent":"Actress 0.5" },{ "name" : "Actor     end", "parent":"Actor 0.5.4" },{ "name" : "Director 0.5.6", "parent":"Actress 0.5" },{ "name" : "Director     end", "parent":"Director 0.5.6" },{ "name" : "Popularity 0.5.7", "parent":"Actress 0.5" },{ "name" : "Popularity     end", "parent":"Popularity 0.5.7" },{ "name" : "Awards 0.5.8", "parent":"Actress 0.5" },{ "name" : "Awards     end", "parent":"Awards 0.5.8" },{ "name" : "Director 0.6", "parent":"Subject 0" },{ "name" : "Title 0.6.1", "parent":"Director 0.6" },{ "name" : "Title     end", "parent":"Title 0.6.1" },{ "name" : "Length 0.6.2", "parent":"Director 0.6" },{ "name" : "Length     end", "parent":"Length 0.6.2" },{ "name" : "Year 0.6.3", "parent":"Director 0.6" },{ "name" : "Year     end", "parent":"Year 0.6.3" },{ "name" : "Actor 0.6.4", "parent":"Director 0.6" },{ "name" : "Actor     end", "parent":"Actor 0.6.4" },{ "name" : "Actress 0.6.5", "parent":"Director 0.6" },{ "name" : "Actress     end", "parent":"Actress 0.6.5" },{ "name" : "Popularity 0.6.7", "parent":"Director 0.6" },{ "name" : "Popularity     end", "parent":"Popularity 0.6.7" },{ "name" : "Awards 0.6.8", "parent":"Director 0.6" },{ "name" : "Awards     end", "parent":"Awards 0.6.8" },{ "name" : "Popularity 0.7", "parent":"Subject 0" },{ "name" : "Title 0.7.1", "parent":"Popularity 0.7" },{ "name" : "Title     end", "parent":"Title 0.7.1" },{ "name" : "Length 0.7.2", "parent":"Popularity 0.7" },{ "name" : "Length     end", "parent":"Length 0.7.2" },{ "name" : "Year 0.7.3", "parent":"Popularity 0.7" },{ "name" : "Year     end", "parent":"Year 0.7.3" },{ "name" : "Actor 0.7.4", "parent":"Popularity 0.7" },{ "name" : "Actor     end", "parent":"Actor 0.7.4" },{ "name" : "Actress 0.7.5", "parent":"Popularity 0.7" },{ "name" : "Actress     end", "parent":"Actress 0.7.5" },{ "name" : "Director 0.7.6", "parent":"Popularity 0.7" },{ "name" : "Director     end", "parent":"Director 0.7.6" },{ "name" : "Awards 0.7.8", "parent":"Popularity 0.7" },{ "name" : "Awards     end", "parent":"Awards 0.7.8" },{ "name" : "Awards 0.8", "parent":"Subject 0" },{ "name" : "Title 0.8.1", "parent":"Awards 0.8" },{ "name" : "Title     end", "parent":"Title 0.8.1" },{ "name" : "Length 0.8.2", "parent":"Awards 0.8" },{ "name" : "Length     end", "parent":"Length 0.8.2" },{ "name" : "Year 0.8.3", "parent":"Awards 0.8" },{ "name" : "Year     end", "parent":"Year 0.8.3" },{ "name" : "Actor 0.8.4", "parent":"Awards 0.8" },{ "name" : "Actor     end", "parent":"Actor 0.8.4" },{ "name" : "Actress 0.8.5", "parent":"Awards 0.8" },{ "name" : "Actress     end", "parent":"Actress 0.8.5" },{ "name" : "Director 0.8.6", "parent":"Awards 0.8" },{ "name" : "Director     end", "parent":"Director 0.8.6" },{ "name" : "Popularity 0.8.7", "parent":"Awards 0.8" },{ "name" : "Popularity     end", "parent":"Popularity 0.8.7" },{ "name" : "Subject 1.0", "parent":"Title 1" },{ "name" : "Length 1.0.2", "parent":"Subject 1.0" },{ "name" : "Length     end", "parent":"Length 1.0.2" },{ "name" : "Year 1.0.3", "parent":"Subject 1.0" },{ "name" : "Year     end", "parent":"Year 1.0.3" },{ "name" : "Actor 1.0.4", "parent":"Subject 1.0" },{ "name" : "Actor     end", "parent":"Actor 1.0.4" },{ "name" : "Actress 1.0.5", "parent":"Subject 1.0" },{ "name" : "Actress     end", "parent":"Actress 1.0.5" },{ "name" : "Director 1.0.6", "parent":"Subject 1.0" },{ "name" : "Director     end", "parent":"Director 1.0.6" },{ "name" : "Popularity 1.0.7", "parent":"Subject 1.0" },{ "name" : "Popularity     end", "parent":"Popularity 1.0.7" },{ "name" : "Awards 1.0.8", "parent":"Subject 1.0" },{ "name" : "Awards     end", "parent":"Awards 1.0.8" },{ "name" : "Length 1.2", "parent":"Title 1" },{ "name" : "Subject 1.2.0", "parent":"Length 1.2" },{ "name" : "Subject     end", "parent":"Subject 1.2.0" },{ "name" : "Year 1.2.3", "parent":"Length 1.2" },{ "name" : "Year     end", "parent":"Year 1.2.3" },{ "name" : "Actor 1.2.4", "parent":"Length 1.2" },{ "name" : "Actor     end", "parent":"Actor 1.2.4" },{ "name" : "Actress 1.2.5", "parent":"Length 1.2" },{ "name" : "Actress     end", "parent":"Actress 1.2.5" },{ "name" : "Director 1.2.6", "parent":"Length 1.2" },{ "name" : "Director     end", "parent":"Director 1.2.6" },{ "name" : "Popularity 1.2.7", "parent":"Length 1.2" },{ "name" : "Popularity     end", "parent":"Popularity 1.2.7" },{ "name" : "Awards 1.2.8", "parent":"Length 1.2" },{ "name" : "Awards     end", "parent":"Awards 1.2.8" },{ "name" : "Year 1.3", "parent":"Title 1" },{ "name" : "Subject 1.3.0", "parent":"Year 1.3" },{ "name" : "Subject     end", "parent":"Subject 1.3.0" },{ "name" : "Length 1.3.2", "parent":"Year 1.3" },{ "name" : "Length     end", "parent":"Length 1.3.2" },{ "name" : "Actor 1.3.4", "parent":"Year 1.3" },{ "name" : "Actor     end", "parent":"Actor 1.3.4" },{ "name" : "Actress 1.3.5", "parent":"Year 1.3" },{ "name" : "Actress     end", "parent":"Actress 1.3.5" },{ "name" : "Director 1.3.6", "parent":"Year 1.3" },{ "name" : "Director     end", "parent":"Director 1.3.6" },{ "name" : "Popularity 1.3.7", "parent":"Year 1.3" },{ "name" : "Popularity     end", "parent":"Popularity 1.3.7" },{ "name" : "Awards 1.3.8", "parent":"Year 1.3" },{ "name" : "Awards     end", "parent":"Awards 1.3.8" },{ "name" : "Actor 1.4", "parent":"Title 1" },{ "name" : "Subject 1.4.0", "parent":"Actor 1.4" },{ "name" : "Subject     end", "parent":"Subject 1.4.0" },{ "name" : "Length 1.4.2", "parent":"Actor 1.4" },{ "name" : "Length     end", "parent":"Length 1.4.2" },{ "name" : "Year 1.4.3", "parent":"Actor 1.4" },{ "name" : "Year     end", "parent":"Year 1.4.3" },{ "name" : "Actress 1.4.5", "parent":"Actor 1.4" },{ "name" : "Actress     end", "parent":"Actress 1.4.5" },{ "name" : "Director 1.4.6", "parent":"Actor 1.4" },{ "name" : "Director     end", "parent":"Director 1.4.6" },{ "name" : "Popularity 1.4.7", "parent":"Actor 1.4" },{ "name" : "Popularity     end", "parent":"Popularity 1.4.7" },{ "name" : "Awards 1.4.8", "parent":"Actor 1.4" },{ "name" : "Awards     end", "parent":"Awards 1.4.8" },{ "name" : "Actress 1.5", "parent":"Title 1" },{ "name" : "Subject 1.5.0", "parent":"Actress 1.5" },{ "name" : "Subject     end", "parent":"Subject 1.5.0" },{ "name" : "Length 1.5.2", "parent":"Actress 1.5" },{ "name" : "Length     end", "parent":"Length 1.5.2" },{ "name" : "Year 1.5.3", "parent":"Actress 1.5" },{ "name" : "Year     end", "parent":"Year 1.5.3" },{ "name" : "Actor 1.5.4", "parent":"Actress 1.5" },{ "name" : "Actor     end", "parent":"Actor 1.5.4" },{ "name" : "Director 1.5.6", "parent":"Actress 1.5" },{ "name" : "Director     end", "parent":"Director 1.5.6" },{ "name" : "Popularity 1.5.7", "parent":"Actress 1.5" },{ "name" : "Popularity     end", "parent":"Popularity 1.5.7" },{ "name" : "Awards 1.5.8", "parent":"Actress 1.5" },{ "name" : "Awards     end", "parent":"Awards 1.5.8" },{ "name" : "Director 1.6", "parent":"Title 1" },{ "name" : "Subject 1.6.0", "parent":"Director 1.6" },{ "name" : "Subject     end", "parent":"Subject 1.6.0" },{ "name" : "Length 1.6.2", "parent":"Director 1.6" },{ "name" : "Length     end", "parent":"Length 1.6.2" },{ "name" : "Year 1.6.3", "parent":"Director 1.6" },{ "name" : "Year     end", "parent":"Year 1.6.3" },{ "name" : "Actor 1.6.4", "parent":"Director 1.6" },{ "name" : "Actor     end", "parent":"Actor 1.6.4" },{ "name" : "Actress 1.6.5", "parent":"Director 1.6" },{ "name" : "Actress     end", "parent":"Actress 1.6.5" },{ "name" : "Popularity 1.6.7", "parent":"Director 1.6" },{ "name" : "Popularity     end", "parent":"Popularity 1.6.7" },{ "name" : "Awards 1.6.8", "parent":"Director 1.6" },{ "name" : "Awards     end", "parent":"Awards 1.6.8" },{ "name" : "Popularity 1.7", "parent":"Title 1" },{ "name" : "Subject 1.7.0", "parent":"Popularity 1.7" },{ "name" : "Subject     end", "parent":"Subject 1.7.0" },{ "name" : "Length 1.7.2", "parent":"Popularity 1.7" },{ "name" : "Length     end", "parent":"Length 1.7.2" },{ "name" : "Year 1.7.3", "parent":"Popularity 1.7" },{ "name" : "Year     end", "parent":"Year 1.7.3" },{ "name" : "Actor 1.7.4", "parent":"Popularity 1.7" },{ "name" : "Actor     end", "parent":"Actor 1.7.4" },{ "name" : "Actress 1.7.5", "parent":"Popularity 1.7" },{ "name" : "Actress     end", "parent":"Actress 1.7.5" },{ "name" : "Director 1.7.6", "parent":"Popularity 1.7" },{ "name" : "Director     end", "parent":"Director 1.7.6" },{ "name" : "Awards 1.7.8", "parent":"Popularity 1.7" },{ "name" : "Awards     end", "parent":"Awards 1.7.8" },{ "name" : "Awards 1.8", "parent":"Title 1" },{ "name" : "Subject 1.8.0", "parent":"Awards 1.8" },{ "name" : "Subject     end", "parent":"Subject 1.8.0" },{ "name" : "Length 1.8.2", "parent":"Awards 1.8" },{ "name" : "Length     end", "parent":"Length 1.8.2" },{ "name" : "Year 1.8.3", "parent":"Awards 1.8" },{ "name" : "Year     end", "parent":"Year 1.8.3" },{ "name" : "Actor 1.8.4", "parent":"Awards 1.8" },{ "name" : "Actor     end", "parent":"Actor 1.8.4" },{ "name" : "Actress 1.8.5", "parent":"Awards 1.8" },{ "name" : "Actress     end", "parent":"Actress 1.8.5" },{ "name" : "Director 1.8.6", "parent":"Awards 1.8" },{ "name" : "Director     end", "parent":"Director 1.8.6" },{ "name" : "Popularity 1.8.7", "parent":"Awards 1.8" },{ "name" : "Popularity     end", "parent":"Popularity 1.8.7" },{ "name" : "Subject 2.0", "parent":"Length 2" },{ "name" : "Title 2.0.1", "parent":"Subject 2.0" },{ "name" : "Title     end", "parent":"Title 2.0.1" },{ "name" : "Year 2.0.3", "parent":"Subject 2.0" },{ "name" : "Year     end", "parent":"Year 2.0.3" },{ "name" : "Actor 2.0.4", "parent":"Subject 2.0" },{ "name" : "Actor     end", "parent":"Actor 2.0.4" },{ "name" : "Actress 2.0.5", "parent":"Subject 2.0" },{ "name" : "Actress     end", "parent":"Actress 2.0.5" },{ "name" : "Director 2.0.6", "parent":"Subject 2.0" },{ "name" : "Director     end", "parent":"Director 2.0.6" },{ "name" : "Popularity 2.0.7", "parent":"Subject 2.0" },{ "name" : "Popularity     end", "parent":"Popularity 2.0.7" },{ "name" : "Awards 2.0.8", "parent":"Subject 2.0" },{ "name" : "Awards     end", "parent":"Awards 2.0.8" },{ "name" : "Title 2.1", "parent":"Length 2" },{ "name" : "Subject 2.1.0", "parent":"Title 2.1" },{ "name" : "Subject     end", "parent":"Subject 2.1.0" },{ "name" : "Year 2.1.3", "parent":"Title 2.1" },{ "name" : "Year     end", "parent":"Year 2.1.3" },{ "name" : "Actor 2.1.4", "parent":"Title 2.1" },{ "name" : "Actor     end", "parent":"Actor 2.1.4" },{ "name" : "Actress 2.1.5", "parent":"Title 2.1" },{ "name" : "Actress     end", "parent":"Actress 2.1.5" },{ "name" : "Director 2.1.6", "parent":"Title 2.1" },{ "name" : "Director     end", "parent":"Director 2.1.6" },{ "name" : "Popularity 2.1.7", "parent":"Title 2.1" },{ "name" : "Popularity     end", "parent":"Popularity 2.1.7" },{ "name" : "Awards 2.1.8", "parent":"Title 2.1" },{ "name" : "Awards     end", "parent":"Awards 2.1.8" },{ "name" : "Year 2.3", "parent":"Length 2" },{ "name" : "Subject 2.3.0", "parent":"Year 2.3" },{ "name" : "Subject     end", "parent":"Subject 2.3.0" },{ "name" : "Title 2.3.1", "parent":"Year 2.3" },{ "name" : "Title     end", "parent":"Title 2.3.1" },{ "name" : "Actor 2.3.4", "parent":"Year 2.3" },{ "name" : "Actor     end", "parent":"Actor 2.3.4" },{ "name" : "Actress 2.3.5", "parent":"Year 2.3" },{ "name" : "Actress     end", "parent":"Actress 2.3.5" },{ "name" : "Director 2.3.6", "parent":"Year 2.3" },{ "name" : "Director     end", "parent":"Director 2.3.6" },{ "name" : "Popularity 2.3.7", "parent":"Year 2.3" },{ "name" : "Popularity     end", "parent":"Popularity 2.3.7" },{ "name" : "Awards 2.3.8", "parent":"Year 2.3" },{ "name" : "Awards     end", "parent":"Awards 2.3.8" },{ "name" : "Actor 2.4", "parent":"Length 2" },{ "name" : "Subject 2.4.0", "parent":"Actor 2.4" },{ "name" : "Subject     end", "parent":"Subject 2.4.0" },{ "name" : "Title 2.4.1", "parent":"Actor 2.4" },{ "name" : "Title     end", "parent":"Title 2.4.1" },{ "name" : "Year 2.4.3", "parent":"Actor 2.4" },{ "name" : "Year     end", "parent":"Year 2.4.3" },{ "name" : "Actress 2.4.5", "parent":"Actor 2.4" },{ "name" : "Actress     end", "parent":"Actress 2.4.5" },{ "name" : "Director 2.4.6", "parent":"Actor 2.4" },{ "name" : "Director     end", "parent":"Director 2.4.6" },{ "name" : "Popularity 2.4.7", "parent":"Actor 2.4" },{ "name" : "Popularity     end", "parent":"Popularity 2.4.7" },{ "name" : "Awards 2.4.8", "parent":"Actor 2.4" },{ "name" : "Awards     end", "parent":"Awards 2.4.8" },{ "name" : "Actress 2.5", "parent":"Length 2" },{ "name" : "Subject 2.5.0", "parent":"Actress 2.5" },{ "name" : "Subject     end", "parent":"Subject 2.5.0" },{ "name" : "Title 2.5.1", "parent":"Actress 2.5" },{ "name" : "Title     end", "parent":"Title 2.5.1" },{ "name" : "Year 2.5.3", "parent":"Actress 2.5" },{ "name" : "Year     end", "parent":"Year 2.5.3" },{ "name" : "Actor 2.5.4", "parent":"Actress 2.5" },{ "name" : "Actor     end", "parent":"Actor 2.5.4" },{ "name" : "Director 2.5.6", "parent":"Actress 2.5" },{ "name" : "Director     end", "parent":"Director 2.5.6" },{ "name" : "Popularity 2.5.7", "parent":"Actress 2.5" },{ "name" : "Popularity     end", "parent":"Popularity 2.5.7" },{ "name" : "Awards 2.5.8", "parent":"Actress 2.5" },{ "name" : "Awards     end", "parent":"Awards 2.5.8" },{ "name" : "Director 2.6", "parent":"Length 2" },{ "name" : "Subject 2.6.0", "parent":"Director 2.6" },{ "name" : "Subject     end", "parent":"Subject 2.6.0" },{ "name" : "Title 2.6.1", "parent":"Director 2.6" },{ "name" : "Title     end", "parent":"Title 2.6.1" },{ "name" : "Year 2.6.3", "parent":"Director 2.6" },{ "name" : "Year     end", "parent":"Year 2.6.3" },{ "name" : "Actor 2.6.4", "parent":"Director 2.6" },{ "name" : "Actor     end", "parent":"Actor 2.6.4" },{ "name" : "Actress 2.6.5", "parent":"Director 2.6" },{ "name" : "Actress     end", "parent":"Actress 2.6.5" },{ "name" : "Popularity 2.6.7", "parent":"Director 2.6" },{ "name" : "Popularity     end", "parent":"Popularity 2.6.7" },{ "name" : "Awards 2.6.8", "parent":"Director 2.6" },{ "name" : "Awards     end", "parent":"Awards 2.6.8" },{ "name" : "Popularity 2.7", "parent":"Length 2" },{ "name" : "Subject 2.7.0", "parent":"Popularity 2.7" },{ "name" : "Subject     end", "parent":"Subject 2.7.0" },{ "name" : "Title 2.7.1", "parent":"Popularity 2.7" },{ "name" : "Title     end", "parent":"Title 2.7.1" },{ "name" : "Year 2.7.3", "parent":"Popularity 2.7" },{ "name" : "Year     end", "parent":"Year 2.7.3" },{ "name" : "Actor 2.7.4", "parent":"Popularity 2.7" },{ "name" : "Actor     end", "parent":"Actor 2.7.4" },{ "name" : "Actress 2.7.5", "parent":"Popularity 2.7" },{ "name" : "Actress     end", "parent":"Actress 2.7.5" },{ "name" : "Director 2.7.6", "parent":"Popularity 2.7" },{ "name" : "Director     end", "parent":"Director 2.7.6" },{ "name" : "Awards 2.7.8", "parent":"Popularity 2.7" },{ "name" : "Awards     end", "parent":"Awards 2.7.8" },{ "name" : "Awards 2.8", "parent":"Length 2" },{ "name" : "Subject 2.8.0", "parent":"Awards 2.8" },{ "name" : "Subject     end", "parent":"Subject 2.8.0" },{ "name" : "Title 2.8.1", "parent":"Awards 2.8" },{ "name" : "Title     end", "parent":"Title 2.8.1" },{ "name" : "Year 2.8.3", "parent":"Awards 2.8" },{ "name" : "Year     end", "parent":"Year 2.8.3" },{ "name" : "Actor 2.8.4", "parent":"Awards 2.8" },{ "name" : "Actor     end", "parent":"Actor 2.8.4" },{ "name" : "Actress 2.8.5", "parent":"Awards 2.8" },{ "name" : "Actress     end", "parent":"Actress 2.8.5" },{ "name" : "Director 2.8.6", "parent":"Awards 2.8" },{ "name" : "Director     end", "parent":"Director 2.8.6" },{ "name" : "Popularity 2.8.7", "parent":"Awards 2.8" },{ "name" : "Popularity     end", "parent":"Popularity 2.8.7" },{ "name" : "Subject 3.0", "parent":"Year 3" },{ "name" : "Title 3.0.1", "parent":"Subject 3.0" },{ "name" : "Title     end", "parent":"Title 3.0.1" },{ "name" : "Length 3.0.2", "parent":"Subject 3.0" },{ "name" : "Length     end", "parent":"Length 3.0.2" },{ "name" : "Actor 3.0.4", "parent":"Subject 3.0" },{ "name" : "Actor     end", "parent":"Actor 3.0.4" },{ "name" : "Actress 3.0.5", "parent":"Subject 3.0" },{ "name" : "Actress     end", "parent":"Actress 3.0.5" },{ "name" : "Director 3.0.6", "parent":"Subject 3.0" },{ "name" : "Director     end", "parent":"Director 3.0.6" },{ "name" : "Popularity 3.0.7", "parent":"Subject 3.0" },{ "name" : "Popularity     end", "parent":"Popularity 3.0.7" },{ "name" : "Awards 3.0.8", "parent":"Subject 3.0" },{ "name" : "Awards     end", "parent":"Awards 3.0.8" },{ "name" : "Title 3.1", "parent":"Year 3" },{ "name" : "Subject 3.1.0", "parent":"Title 3.1" },{ "name" : "Subject     end", "parent":"Subject 3.1.0" },{ "name" : "Length 3.1.2", "parent":"Title 3.1" },{ "name" : "Length     end", "parent":"Length 3.1.2" },{ "name" : "Actor 3.1.4", "parent":"Title 3.1" },{ "name" : "Actor     end", "parent":"Actor 3.1.4" },{ "name" : "Actress 3.1.5", "parent":"Title 3.1" },{ "name" : "Actress     end", "parent":"Actress 3.1.5" },{ "name" : "Director 3.1.6", "parent":"Title 3.1" },{ "name" : "Director     end", "parent":"Director 3.1.6" },{ "name" : "Popularity 3.1.7", "parent":"Title 3.1" },{ "name" : "Popularity     end", "parent":"Popularity 3.1.7" },{ "name" : "Awards 3.1.8", "parent":"Title 3.1" },{ "name" : "Awards     end", "parent":"Awards 3.1.8" },{ "name" : "Length 3.2", "parent":"Year 3" },{ "name" : "Subject 3.2.0", "parent":"Length 3.2" },{ "name" : "Subject     end", "parent":"Subject 3.2.0" },{ "name" : "Title 3.2.1", "parent":"Length 3.2" },{ "name" : "Title     end", "parent":"Title 3.2.1" },{ "name" : "Actor 3.2.4", "parent":"Length 3.2" },{ "name" : "Actor     end", "parent":"Actor 3.2.4" },{ "name" : "Actress 3.2.5", "parent":"Length 3.2" },{ "name" : "Actress     end", "parent":"Actress 3.2.5" },{ "name" : "Director 3.2.6", "parent":"Length 3.2" },{ "name" : "Director     end", "parent":"Director 3.2.6" },{ "name" : "Popularity 3.2.7", "parent":"Length 3.2" },{ "name" : "Popularity     end", "parent":"Popularity 3.2.7" },{ "name" : "Awards 3.2.8", "parent":"Length 3.2" },{ "name" : "Awards     end", "parent":"Awards 3.2.8" },{ "name" : "Actor 3.4", "parent":"Year 3" },{ "name" : "Subject 3.4.0", "parent":"Actor 3.4" },{ "name" : "Subject     end", "parent":"Subject 3.4.0" },{ "name" : "Title 3.4.1", "parent":"Actor 3.4" },{ "name" : "Title     end", "parent":"Title 3.4.1" },{ "name" : "Length 3.4.2", "parent":"Actor 3.4" },{ "name" : "Length     end", "parent":"Length 3.4.2" },{ "name" : "Actress 3.4.5", "parent":"Actor 3.4" },{ "name" : "Actress     end", "parent":"Actress 3.4.5" },{ "name" : "Director 3.4.6", "parent":"Actor 3.4" },{ "name" : "Director     end", "parent":"Director 3.4.6" },{ "name" : "Popularity 3.4.7", "parent":"Actor 3.4" },{ "name" : "Popularity     end", "parent":"Popularity 3.4.7" },{ "name" : "Awards 3.4.8", "parent":"Actor 3.4" },{ "name" : "Awards     end", "parent":"Awards 3.4.8" },{ "name" : "Actress 3.5", "parent":"Year 3" },{ "name" : "Subject 3.5.0", "parent":"Actress 3.5" },{ "name" : "Subject     end", "parent":"Subject 3.5.0" },{ "name" : "Title 3.5.1", "parent":"Actress 3.5" },{ "name" : "Title     end", "parent":"Title 3.5.1" },{ "name" : "Length 3.5.2", "parent":"Actress 3.5" },{ "name" : "Length     end", "parent":"Length 3.5.2" },{ "name" : "Actor 3.5.4", "parent":"Actress 3.5" },{ "name" : "Actor     end", "parent":"Actor 3.5.4" },{ "name" : "Director 3.5.6", "parent":"Actress 3.5" },{ "name" : "Director     end", "parent":"Director 3.5.6" },{ "name" : "Popularity 3.5.7", "parent":"Actress 3.5" },{ "name" : "Popularity     end", "parent":"Popularity 3.5.7" },{ "name" : "Awards 3.5.8", "parent":"Actress 3.5" },{ "name" : "Awards     end", "parent":"Awards 3.5.8" },{ "name" : "Director 3.6", "parent":"Year 3" },{ "name" : "Subject 3.6.0", "parent":"Director 3.6" },{ "name" : "Subject     end", "parent":"Subject 3.6.0" },{ "name" : "Title 3.6.1", "parent":"Director 3.6" },{ "name" : "Title     end", "parent":"Title 3.6.1" },{ "name" : "Length 3.6.2", "parent":"Director 3.6" },{ "name" : "Length     end", "parent":"Length 3.6.2" },{ "name" : "Actor 3.6.4", "parent":"Director 3.6" },{ "name" : "Actor     end", "parent":"Actor 3.6.4" },{ "name" : "Actress 3.6.5", "parent":"Director 3.6" },{ "name" : "Actress     end", "parent":"Actress 3.6.5" },{ "name" : "Popularity 3.6.7", "parent":"Director 3.6" },{ "name" : "Popularity     end", "parent":"Popularity 3.6.7" },{ "name" : "Awards 3.6.8", "parent":"Director 3.6" },{ "name" : "Awards     end", "parent":"Awards 3.6.8" },{ "name" : "Popularity 3.7", "parent":"Year 3" },{ "name" : "Subject 3.7.0", "parent":"Popularity 3.7" },{ "name" : "Subject     end", "parent":"Subject 3.7.0" },{ "name" : "Title 3.7.1", "parent":"Popularity 3.7" },{ "name" : "Title     end", "parent":"Title 3.7.1" },{ "name" : "Length 3.7.2", "parent":"Popularity 3.7" },{ "name" : "Length     end", "parent":"Length 3.7.2" },{ "name" : "Actor 3.7.4", "parent":"Popularity 3.7" },{ "name" : "Actor     end", "parent":"Actor 3.7.4" },{ "name" : "Actress 3.7.5", "parent":"Popularity 3.7" },{ "name" : "Actress     end", "parent":"Actress 3.7.5" },{ "name" : "Director 3.7.6", "parent":"Popularity 3.7" },{ "name" : "Director     end", "parent":"Director 3.7.6" },{ "name" : "Awards 3.7.8", "parent":"Popularity 3.7" },{ "name" : "Awards     end", "parent":"Awards 3.7.8" },{ "name" : "Awards 3.8", "parent":"Year 3" },{ "name" : "Subject 3.8.0", "parent":"Awards 3.8" },{ "name" : "Subject     end", "parent":"Subject 3.8.0" },{ "name" : "Title 3.8.1", "parent":"Awards 3.8" },{ "name" : "Title     end", "parent":"Title 3.8.1" },{ "name" : "Length 3.8.2", "parent":"Awards 3.8" },{ "name" : "Length     end", "parent":"Length 3.8.2" },{ "name" : "Actor 3.8.4", "parent":"Awards 3.8" },{ "name" : "Actor     end", "parent":"Actor 3.8.4" },{ "name" : "Actress 3.8.5", "parent":"Awards 3.8" },{ "name" : "Actress     end", "parent":"Actress 3.8.5" },{ "name" : "Director 3.8.6", "parent":"Awards 3.8" },{ "name" : "Director     end", "parent":"Director 3.8.6" },{ "name" : "Popularity 3.8.7", "parent":"Awards 3.8" },{ "name" : "Popularity     end", "parent":"Popularity 3.8.7" },{ "name" : "Subject 4.0", "parent":"Actor 4" },{ "name" : "Title 4.0.1", "parent":"Subject 4.0" },{ "name" : "Title     end", "parent":"Title 4.0.1" },{ "name" : "Length 4.0.2", "parent":"Subject 4.0" },{ "name" : "Length     end", "parent":"Length 4.0.2" },{ "name" : "Year 4.0.3", "parent":"Subject 4.0" },{ "name" : "Year     end", "parent":"Year 4.0.3" },{ "name" : "Actress 4.0.5", "parent":"Subject 4.0" },{ "name" : "Actress     end", "parent":"Actress 4.0.5" },{ "name" : "Director 4.0.6", "parent":"Subject 4.0" },{ "name" : "Director     end", "parent":"Director 4.0.6" },{ "name" : "Popularity 4.0.7", "parent":"Subject 4.0" },{ "name" : "Popularity     end", "parent":"Popularity 4.0.7" },{ "name" : "Awards 4.0.8", "parent":"Subject 4.0" },{ "name" : "Awards     end", "parent":"Awards 4.0.8" },{ "name" : "Title 4.1", "parent":"Actor 4" },{ "name" : "Subject 4.1.0", "parent":"Title 4.1" },{ "name" : "Subject     end", "parent":"Subject 4.1.0" },{ "name" : "Length 4.1.2", "parent":"Title 4.1" },{ "name" : "Length     end", "parent":"Length 4.1.2" },{ "name" : "Year 4.1.3", "parent":"Title 4.1" },{ "name" : "Year     end", "parent":"Year 4.1.3" },{ "name" : "Actress 4.1.5", "parent":"Title 4.1" },{ "name" : "Actress     end", "parent":"Actress 4.1.5" },{ "name" : "Director 4.1.6", "parent":"Title 4.1" },{ "name" : "Director     end", "parent":"Director 4.1.6" },{ "name" : "Popularity 4.1.7", "parent":"Title 4.1" },{ "name" : "Popularity     end", "parent":"Popularity 4.1.7" },{ "name" : "Awards 4.1.8", "parent":"Title 4.1" },{ "name" : "Awards     end", "parent":"Awards 4.1.8" },{ "name" : "Length 4.2", "parent":"Actor 4" },{ "name" : "Subject 4.2.0", "parent":"Length 4.2" },{ "name" : "Subject     end", "parent":"Subject 4.2.0" },{ "name" : "Title 4.2.1", "parent":"Length 4.2" },{ "name" : "Title     end", "parent":"Title 4.2.1" },{ "name" : "Year 4.2.3", "parent":"Length 4.2" },{ "name" : "Year     end", "parent":"Year 4.2.3" },{ "name" : "Actress 4.2.5", "parent":"Length 4.2" },{ "name" : "Actress     end", "parent":"Actress 4.2.5" },{ "name" : "Director 4.2.6", "parent":"Length 4.2" },{ "name" : "Director     end", "parent":"Director 4.2.6" },{ "name" : "Popularity 4.2.7", "parent":"Length 4.2" },{ "name" : "Popularity     end", "parent":"Popularity 4.2.7" },{ "name" : "Awards 4.2.8", "parent":"Length 4.2" },{ "name" : "Awards     end", "parent":"Awards 4.2.8" },{ "name" : "Year 4.3", "parent":"Actor 4" },{ "name" : "Subject 4.3.0", "parent":"Year 4.3" },{ "name" : "Subject     end", "parent":"Subject 4.3.0" },{ "name" : "Title 4.3.1", "parent":"Year 4.3" },{ "name" : "Title     end", "parent":"Title 4.3.1" },{ "name" : "Length 4.3.2", "parent":"Year 4.3" },{ "name" : "Length     end", "parent":"Length 4.3.2" },{ "name" : "Actress 4.3.5", "parent":"Year 4.3" },{ "name" : "Actress     end", "parent":"Actress 4.3.5" },{ "name" : "Director 4.3.6", "parent":"Year 4.3" },{ "name" : "Director     end", "parent":"Director 4.3.6" },{ "name" : "Popularity 4.3.7", "parent":"Year 4.3" },{ "name" : "Popularity     end", "parent":"Popularity 4.3.7" },{ "name" : "Awards 4.3.8", "parent":"Year 4.3" },{ "name" : "Awards     end", "parent":"Awards 4.3.8" },{ "name" : "Actress 4.5", "parent":"Actor 4" },{ "name" : "Subject 4.5.0", "parent":"Actress 4.5" },{ "name" : "Subject     end", "parent":"Subject 4.5.0" },{ "name" : "Title 4.5.1", "parent":"Actress 4.5" },{ "name" : "Title     end", "parent":"Title 4.5.1" },{ "name" : "Length 4.5.2", "parent":"Actress 4.5" },{ "name" : "Length     end", "parent":"Length 4.5.2" },{ "name" : "Year 4.5.3", "parent":"Actress 4.5" },{ "name" : "Year     end", "parent":"Year 4.5.3" },{ "name" : "Director 4.5.6", "parent":"Actress 4.5" },{ "name" : "Director     end", "parent":"Director 4.5.6" },{ "name" : "Popularity 4.5.7", "parent":"Actress 4.5" },{ "name" : "Popularity     end", "parent":"Popularity 4.5.7" },{ "name" : "Awards 4.5.8", "parent":"Actress 4.5" },{ "name" : "Awards     end", "parent":"Awards 4.5.8" },{ "name" : "Director 4.6", "parent":"Actor 4" },{ "name" : "Subject 4.6.0", "parent":"Director 4.6" },{ "name" : "Subject     end", "parent":"Subject 4.6.0" },{ "name" : "Title 4.6.1", "parent":"Director 4.6" },{ "name" : "Title     end", "parent":"Title 4.6.1" },{ "name" : "Length 4.6.2", "parent":"Director 4.6" },{ "name" : "Length     end", "parent":"Length 4.6.2" },{ "name" : "Year 4.6.3", "parent":"Director 4.6" },{ "name" : "Year     end", "parent":"Year 4.6.3" },{ "name" : "Actress 4.6.5", "parent":"Director 4.6" },{ "name" : "Actress     end", "parent":"Actress 4.6.5" },{ "name" : "Popularity 4.6.7", "parent":"Director 4.6" },{ "name" : "Popularity     end", "parent":"Popularity 4.6.7" },{ "name" : "Awards 4.6.8", "parent":"Director 4.6" },{ "name" : "Awards     end", "parent":"Awards 4.6.8" },{ "name" : "Popularity 4.7", "parent":"Actor 4" },{ "name" : "Subject 4.7.0", "parent":"Popularity 4.7" },{ "name" : "Subject     end", "parent":"Subject 4.7.0" },{ "name" : "Title 4.7.1", "parent":"Popularity 4.7" },{ "name" : "Title     end", "parent":"Title 4.7.1" },{ "name" : "Length 4.7.2", "parent":"Popularity 4.7" },{ "name" : "Length     end", "parent":"Length 4.7.2" },{ "name" : "Year 4.7.3", "parent":"Popularity 4.7" },{ "name" : "Year     end", "parent":"Year 4.7.3" },{ "name" : "Actress 4.7.5", "parent":"Popularity 4.7" },{ "name" : "Actress     end", "parent":"Actress 4.7.5" },{ "name" : "Director 4.7.6", "parent":"Popularity 4.7" },{ "name" : "Director     end", "parent":"Director 4.7.6" },{ "name" : "Awards 4.7.8", "parent":"Popularity 4.7" },{ "name" : "Awards     end", "parent":"Awards 4.7.8" },{ "name" : "Awards 4.8", "parent":"Actor 4" },{ "name" : "Subject 4.8.0", "parent":"Awards 4.8" },{ "name" : "Subject     end", "parent":"Subject 4.8.0" },{ "name" : "Title 4.8.1", "parent":"Awards 4.8" },{ "name" : "Title     end", "parent":"Title 4.8.1" },{ "name" : "Length 4.8.2", "parent":"Awards 4.8" },{ "name" : "Length     end", "parent":"Length 4.8.2" },{ "name" : "Year 4.8.3", "parent":"Awards 4.8" },{ "name" : "Year     end", "parent":"Year 4.8.3" },{ "name" : "Actress 4.8.5", "parent":"Awards 4.8" },{ "name" : "Actress     end", "parent":"Actress 4.8.5" },{ "name" : "Director 4.8.6", "parent":"Awards 4.8" },{ "name" : "Director     end", "parent":"Director 4.8.6" },{ "name" : "Popularity 4.8.7", "parent":"Awards 4.8" },{ "name" : "Popularity     end", "parent":"Popularity 4.8.7" },{ "name" : "Subject 5.0", "parent":"Actress 5" },{ "name" : "Title 5.0.1", "parent":"Subject 5.0" },{ "name" : "Title     end", "parent":"Title 5.0.1" },{ "name" : "Length 5.0.2", "parent":"Subject 5.0" },{ "name" : "Length     end", "parent":"Length 5.0.2" },{ "name" : "Year 5.0.3", "parent":"Subject 5.0" },{ "name" : "Year     end", "parent":"Year 5.0.3" },{ "name" : "Actor 5.0.4", "parent":"Subject 5.0" },{ "name" : "Actor     end", "parent":"Actor 5.0.4" },{ "name" : "Director 5.0.6", "parent":"Subject 5.0" },{ "name" : "Director     end", "parent":"Director 5.0.6" },{ "name" : "Popularity 5.0.7", "parent":"Subject 5.0" },{ "name" : "Popularity     end", "parent":"Popularity 5.0.7" },{ "name" : "Awards 5.0.8", "parent":"Subject 5.0" },{ "name" : "Awards     end", "parent":"Awards 5.0.8" },{ "name" : "Title 5.1", "parent":"Actress 5" },{ "name" : "Subject 5.1.0", "parent":"Title 5.1" },{ "name" : "Subject     end", "parent":"Subject 5.1.0" },{ "name" : "Length 5.1.2", "parent":"Title 5.1" },{ "name" : "Length     end", "parent":"Length 5.1.2" },{ "name" : "Year 5.1.3", "parent":"Title 5.1" },{ "name" : "Year     end", "parent":"Year 5.1.3" },{ "name" : "Actor 5.1.4", "parent":"Title 5.1" },{ "name" : "Actor     end", "parent":"Actor 5.1.4" },{ "name" : "Director 5.1.6", "parent":"Title 5.1" },{ "name" : "Director     end", "parent":"Director 5.1.6" },{ "name" : "Popularity 5.1.7", "parent":"Title 5.1" },{ "name" : "Popularity     end", "parent":"Popularity 5.1.7" },{ "name" : "Awards 5.1.8", "parent":"Title 5.1" },{ "name" : "Awards     end", "parent":"Awards 5.1.8" },{ "name" : "Length 5.2", "parent":"Actress 5" },{ "name" : "Subject 5.2.0", "parent":"Length 5.2" },{ "name" : "Subject     end", "parent":"Subject 5.2.0" },{ "name" : "Title 5.2.1", "parent":"Length 5.2" },{ "name" : "Title     end", "parent":"Title 5.2.1" },{ "name" : "Year 5.2.3", "parent":"Length 5.2" },{ "name" : "Year     end", "parent":"Year 5.2.3" },{ "name" : "Actor 5.2.4", "parent":"Length 5.2" },{ "name" : "Actor     end", "parent":"Actor 5.2.4" },{ "name" : "Director 5.2.6", "parent":"Length 5.2" },{ "name" : "Director     end", "parent":"Director 5.2.6" },{ "name" : "Popularity 5.2.7", "parent":"Length 5.2" },{ "name" : "Popularity     end", "parent":"Popularity 5.2.7" },{ "name" : "Awards 5.2.8", "parent":"Length 5.2" },{ "name" : "Awards     end", "parent":"Awards 5.2.8" },{ "name" : "Year 5.3", "parent":"Actress 5" },{ "name" : "Subject 5.3.0", "parent":"Year 5.3" },{ "name" : "Subject     end", "parent":"Subject 5.3.0" },{ "name" : "Title 5.3.1", "parent":"Year 5.3" },{ "name" : "Title     end", "parent":"Title 5.3.1" },{ "name" : "Length 5.3.2", "parent":"Year 5.3" },{ "name" : "Length     end", "parent":"Length 5.3.2" },{ "name" : "Actor 5.3.4", "parent":"Year 5.3" },{ "name" : "Actor     end", "parent":"Actor 5.3.4" },{ "name" : "Director 5.3.6", "parent":"Year 5.3" },{ "name" : "Director     end", "parent":"Director 5.3.6" },{ "name" : "Popularity 5.3.7", "parent":"Year 5.3" },{ "name" : "Popularity     end", "parent":"Popularity 5.3.7" },{ "name" : "Awards 5.3.8", "parent":"Year 5.3" },{ "name" : "Awards     end", "parent":"Awards 5.3.8" },{ "name" : "Actor 5.4", "parent":"Actress 5" },{ "name" : "Subject 5.4.0", "parent":"Actor 5.4" },{ "name" : "Subject     end", "parent":"Subject 5.4.0" },{ "name" : "Title 5.4.1", "parent":"Actor 5.4" },{ "name" : "Title     end", "parent":"Title 5.4.1" },{ "name" : "Length 5.4.2", "parent":"Actor 5.4" },{ "name" : "Length     end", "parent":"Length 5.4.2" },{ "name" : "Year 5.4.3", "parent":"Actor 5.4" },{ "name" : "Year     end", "parent":"Year 5.4.3" },{ "name" : "Director 5.4.6", "parent":"Actor 5.4" },{ "name" : "Director     end", "parent":"Director 5.4.6" },{ "name" : "Popularity 5.4.7", "parent":"Actor 5.4" },{ "name" : "Popularity     end", "parent":"Popularity 5.4.7" },{ "name" : "Awards 5.4.8", "parent":"Actor 5.4" },{ "name" : "Awards     end", "parent":"Awards 5.4.8" },{ "name" : "Director 5.6", "parent":"Actress 5" },{ "name" : "Subject 5.6.0", "parent":"Director 5.6" },{ "name" : "Subject     end", "parent":"Subject 5.6.0" },{ "name" : "Title 5.6.1", "parent":"Director 5.6" },{ "name" : "Title     end", "parent":"Title 5.6.1" },{ "name" : "Length 5.6.2", "parent":"Director 5.6" },{ "name" : "Length     end", "parent":"Length 5.6.2" },{ "name" : "Year 5.6.3", "parent":"Director 5.6" },{ "name" : "Year     end", "parent":"Year 5.6.3" },{ "name" : "Actor 5.6.4", "parent":"Director 5.6" },{ "name" : "Actor     end", "parent":"Actor 5.6.4" },{ "name" : "Popularity 5.6.7", "parent":"Director 5.6" },{ "name" : "Popularity     end", "parent":"Popularity 5.6.7" },{ "name" : "Awards 5.6.8", "parent":"Director 5.6" },{ "name" : "Awards     end", "parent":"Awards 5.6.8" },{ "name" : "Popularity 5.7", "parent":"Actress 5" },{ "name" : "Subject 5.7.0", "parent":"Popularity 5.7" },{ "name" : "Subject     end", "parent":"Subject 5.7.0" },{ "name" : "Title 5.7.1", "parent":"Popularity 5.7" },{ "name" : "Title     end", "parent":"Title 5.7.1" },{ "name" : "Length 5.7.2", "parent":"Popularity 5.7" },{ "name" : "Length     end", "parent":"Length 5.7.2" },{ "name" : "Year 5.7.3", "parent":"Popularity 5.7" },{ "name" : "Year     end", "parent":"Year 5.7.3" },{ "name" : "Actor 5.7.4", "parent":"Popularity 5.7" },{ "name" : "Actor     end", "parent":"Actor 5.7.4" },{ "name" : "Director 5.7.6", "parent":"Popularity 5.7" },{ "name" : "Director     end", "parent":"Director 5.7.6" },{ "name" : "Awards 5.7.8", "parent":"Popularity 5.7" },{ "name" : "Awards     end", "parent":"Awards 5.7.8" },{ "name" : "Awards 5.8", "parent":"Actress 5" },{ "name" : "Subject 5.8.0", "parent":"Awards 5.8" },{ "name" : "Subject     end", "parent":"Subject 5.8.0" },{ "name" : "Title 5.8.1", "parent":"Awards 5.8" },{ "name" : "Title     end", "parent":"Title 5.8.1" },{ "name" : "Length 5.8.2", "parent":"Awards 5.8" },{ "name" : "Length     end", "parent":"Length 5.8.2" },{ "name" : "Year 5.8.3", "parent":"Awards 5.8" },{ "name" : "Year     end", "parent":"Year 5.8.3" },{ "name" : "Actor 5.8.4", "parent":"Awards 5.8" },{ "name" : "Actor     end", "parent":"Actor 5.8.4" },{ "name" : "Director 5.8.6", "parent":"Awards 5.8" },{ "name" : "Director     end", "parent":"Director 5.8.6" },{ "name" : "Popularity 5.8.7", "parent":"Awards 5.8" },{ "name" : "Popularity     end", "parent":"Popularity 5.8.7" },{ "name" : "Subject 6.0", "parent":"Director 6" },{ "name" : "Title 6.0.1", "parent":"Subject 6.0" },{ "name" : "Title     end", "parent":"Title 6.0.1" },{ "name" : "Length 6.0.2", "parent":"Subject 6.0" },{ "name" : "Length     end", "parent":"Length 6.0.2" },{ "name" : "Year 6.0.3", "parent":"Subject 6.0" },{ "name" : "Year     end", "parent":"Year 6.0.3" },{ "name" : "Actor 6.0.4", "parent":"Subject 6.0" },{ "name" : "Actor     end", "parent":"Actor 6.0.4" },{ "name" : "Actress 6.0.5", "parent":"Subject 6.0" },{ "name" : "Actress     end", "parent":"Actress 6.0.5" },{ "name" : "Popularity 6.0.7", "parent":"Subject 6.0" },{ "name" : "Popularity     end", "parent":"Popularity 6.0.7" },{ "name" : "Awards 6.0.8", "parent":"Subject 6.0" },{ "name" : "Awards     end", "parent":"Awards 6.0.8" },{ "name" : "Title 6.1", "parent":"Director 6" },{ "name" : "Subject 6.1.0", "parent":"Title 6.1" },{ "name" : "Subject     end", "parent":"Subject 6.1.0" },{ "name" : "Length 6.1.2", "parent":"Title 6.1" },{ "name" : "Length     end", "parent":"Length 6.1.2" },{ "name" : "Year 6.1.3", "parent":"Title 6.1" },{ "name" : "Year     end", "parent":"Year 6.1.3" },{ "name" : "Actor 6.1.4", "parent":"Title 6.1" },{ "name" : "Actor     end", "parent":"Actor 6.1.4" },{ "name" : "Actress 6.1.5", "parent":"Title 6.1" },{ "name" : "Actress     end", "parent":"Actress 6.1.5" },{ "name" : "Popularity 6.1.7", "parent":"Title 6.1" },{ "name" : "Popularity     end", "parent":"Popularity 6.1.7" },{ "name" : "Awards 6.1.8", "parent":"Title 6.1" },{ "name" : "Awards     end", "parent":"Awards 6.1.8" },{ "name" : "Length 6.2", "parent":"Director 6" },{ "name" : "Subject 6.2.0", "parent":"Length 6.2" },{ "name" : "Subject     end", "parent":"Subject 6.2.0" },{ "name" : "Title 6.2.1", "parent":"Length 6.2" },{ "name" : "Title     end", "parent":"Title 6.2.1" },{ "name" : "Year 6.2.3", "parent":"Length 6.2" },{ "name" : "Year     end", "parent":"Year 6.2.3" },{ "name" : "Actor 6.2.4", "parent":"Length 6.2" },{ "name" : "Actor     end", "parent":"Actor 6.2.4" },{ "name" : "Actress 6.2.5", "parent":"Length 6.2" },{ "name" : "Actress     end", "parent":"Actress 6.2.5" },{ "name" : "Popularity 6.2.7", "parent":"Length 6.2" },{ "name" : "Popularity     end", "parent":"Popularity 6.2.7" },{ "name" : "Awards 6.2.8", "parent":"Length 6.2" },{ "name" : "Awards     end", "parent":"Awards 6.2.8" },{ "name" : "Year 6.3", "parent":"Director 6" },{ "name" : "Subject 6.3.0", "parent":"Year 6.3" },{ "name" : "Subject     end", "parent":"Subject 6.3.0" },{ "name" : "Title 6.3.1", "parent":"Year 6.3" },{ "name" : "Title     end", "parent":"Title 6.3.1" },{ "name" : "Length 6.3.2", "parent":"Year 6.3" },{ "name" : "Length     end", "parent":"Length 6.3.2" },{ "name" : "Actor 6.3.4", "parent":"Year 6.3" },{ "name" : "Actor     end", "parent":"Actor 6.3.4" },{ "name" : "Actress 6.3.5", "parent":"Year 6.3" },{ "name" : "Actress     end", "parent":"Actress 6.3.5" },{ "name" : "Popularity 6.3.7", "parent":"Year 6.3" },{ "name" : "Popularity     end", "parent":"Popularity 6.3.7" },{ "name" : "Awards 6.3.8", "parent":"Year 6.3" },{ "name" : "Awards     end", "parent":"Awards 6.3.8" },{ "name" : "Actor 6.4", "parent":"Director 6" },{ "name" : "Subject 6.4.0", "parent":"Actor 6.4" },{ "name" : "Subject     end", "parent":"Subject 6.4.0" },{ "name" : "Title 6.4.1", "parent":"Actor 6.4" },{ "name" : "Title     end", "parent":"Title 6.4.1" },{ "name" : "Length 6.4.2", "parent":"Actor 6.4" },{ "name" : "Length     end", "parent":"Length 6.4.2" },{ "name" : "Year 6.4.3", "parent":"Actor 6.4" },{ "name" : "Year     end", "parent":"Year 6.4.3" },{ "name" : "Actress 6.4.5", "parent":"Actor 6.4" },{ "name" : "Actress     end", "parent":"Actress 6.4.5" },{ "name" : "Popularity 6.4.7", "parent":"Actor 6.4" },{ "name" : "Popularity     end", "parent":"Popularity 6.4.7" },{ "name" : "Awards 6.4.8", "parent":"Actor 6.4" },{ "name" : "Awards     end", "parent":"Awards 6.4.8" },{ "name" : "Actress 6.5", "parent":"Director 6" },{ "name" : "Subject 6.5.0", "parent":"Actress 6.5" },{ "name" : "Subject     end", "parent":"Subject 6.5.0" },{ "name" : "Title 6.5.1", "parent":"Actress 6.5" },{ "name" : "Title     end", "parent":"Title 6.5.1" },{ "name" : "Length 6.5.2", "parent":"Actress 6.5" },{ "name" : "Length     end", "parent":"Length 6.5.2" },{ "name" : "Year 6.5.3", "parent":"Actress 6.5" },{ "name" : "Year     end", "parent":"Year 6.5.3" },{ "name" : "Actor 6.5.4", "parent":"Actress 6.5" },{ "name" : "Actor     end", "parent":"Actor 6.5.4" },{ "name" : "Popularity 6.5.7", "parent":"Actress 6.5" },{ "name" : "Popularity     end", "parent":"Popularity 6.5.7" },{ "name" : "Awards 6.5.8", "parent":"Actress 6.5" },{ "name" : "Awards     end", "parent":"Awards 6.5.8" },{ "name" : "Popularity 6.7", "parent":"Director 6" },{ "name" : "Subject 6.7.0", "parent":"Popularity 6.7" },{ "name" : "Subject     end", "parent":"Subject 6.7.0" },{ "name" : "Title 6.7.1", "parent":"Popularity 6.7" },{ "name" : "Title     end", "parent":"Title 6.7.1" },{ "name" : "Length 6.7.2", "parent":"Popularity 6.7" },{ "name" : "Length     end", "parent":"Length 6.7.2" },{ "name" : "Year 6.7.3", "parent":"Popularity 6.7" },{ "name" : "Year     end", "parent":"Year 6.7.3" },{ "name" : "Actor 6.7.4", "parent":"Popularity 6.7" },{ "name" : "Actor     end", "parent":"Actor 6.7.4" },{ "name" : "Actress 6.7.5", "parent":"Popularity 6.7" },{ "name" : "Actress     end", "parent":"Actress 6.7.5" },{ "name" : "Awards 6.7.8", "parent":"Popularity 6.7" },{ "name" : "Awards     end", "parent":"Awards 6.7.8" },{ "name" : "Awards 6.8", "parent":"Director 6" },{ "name" : "Subject 6.8.0", "parent":"Awards 6.8" },{ "name" : "Subject     end", "parent":"Subject 6.8.0" },{ "name" : "Title 6.8.1", "parent":"Awards 6.8" },{ "name" : "Title     end", "parent":"Title 6.8.1" },{ "name" : "Length 6.8.2", "parent":"Awards 6.8" },{ "name" : "Length     end", "parent":"Length 6.8.2" },{ "name" : "Year 6.8.3", "parent":"Awards 6.8" },{ "name" : "Year     end", "parent":"Year 6.8.3" },{ "name" : "Actor 6.8.4", "parent":"Awards 6.8" },{ "name" : "Actor     end", "parent":"Actor 6.8.4" },{ "name" : "Actress 6.8.5", "parent":"Awards 6.8" },{ "name" : "Actress     end", "parent":"Actress 6.8.5" },{ "name" : "Popularity 6.8.7", "parent":"Awards 6.8" },{ "name" : "Popularity     end", "parent":"Popularity 6.8.7" },{ "name" : "Subject 7.0", "parent":"Popularity 7" },{ "name" : "Title 7.0.1", "parent":"Subject 7.0" },{ "name" : "Title     end", "parent":"Title 7.0.1" },{ "name" : "Length 7.0.2", "parent":"Subject 7.0" },{ "name" : "Length     end", "parent":"Length 7.0.2" },{ "name" : "Year 7.0.3", "parent":"Subject 7.0" },{ "name" : "Year     end", "parent":"Year 7.0.3" },{ "name" : "Actor 7.0.4", "parent":"Subject 7.0" },{ "name" : "Actor     end", "parent":"Actor 7.0.4" },{ "name" : "Actress 7.0.5", "parent":"Subject 7.0" },{ "name" : "Actress     end", "parent":"Actress 7.0.5" },{ "name" : "Director 7.0.6", "parent":"Subject 7.0" },{ "name" : "Director     end", "parent":"Director 7.0.6" },{ "name" : "Awards 7.0.8", "parent":"Subject 7.0" },{ "name" : "Awards     end", "parent":"Awards 7.0.8" },{ "name" : "Title 7.1", "parent":"Popularity 7" },{ "name" : "Subject 7.1.0", "parent":"Title 7.1" },{ "name" : "Subject     end", "parent":"Subject 7.1.0" },{ "name" : "Length 7.1.2", "parent":"Title 7.1" },{ "name" : "Length     end", "parent":"Length 7.1.2" },{ "name" : "Year 7.1.3", "parent":"Title 7.1" },{ "name" : "Year     end", "parent":"Year 7.1.3" },{ "name" : "Actor 7.1.4", "parent":"Title 7.1" },{ "name" : "Actor     end", "parent":"Actor 7.1.4" },{ "name" : "Actress 7.1.5", "parent":"Title 7.1" },{ "name" : "Actress     end", "parent":"Actress 7.1.5" },{ "name" : "Director 7.1.6", "parent":"Title 7.1" },{ "name" : "Director     end", "parent":"Director 7.1.6" },{ "name" : "Awards 7.1.8", "parent":"Title 7.1" },{ "name" : "Awards     end", "parent":"Awards 7.1.8" },{ "name" : "Length 7.2", "parent":"Popularity 7" },{ "name" : "Subject 7.2.0", "parent":"Length 7.2" },{ "name" : "Subject     end", "parent":"Subject 7.2.0" },{ "name" : "Title 7.2.1", "parent":"Length 7.2" },{ "name" : "Title     end", "parent":"Title 7.2.1" },{ "name" : "Year 7.2.3", "parent":"Length 7.2" },{ "name" : "Year     end", "parent":"Year 7.2.3" },{ "name" : "Actor 7.2.4", "parent":"Length 7.2" },{ "name" : "Actor     end", "parent":"Actor 7.2.4" },{ "name" : "Actress 7.2.5", "parent":"Length 7.2" },{ "name" : "Actress     end", "parent":"Actress 7.2.5" },{ "name" : "Director 7.2.6", "parent":"Length 7.2" },{ "name" : "Director     end", "parent":"Director 7.2.6" },{ "name" : "Awards 7.2.8", "parent":"Length 7.2" },{ "name" : "Awards     end", "parent":"Awards 7.2.8" },{ "name" : "Year 7.3", "parent":"Popularity 7" },{ "name" : "Subject 7.3.0", "parent":"Year 7.3" },{ "name" : "Subject     end", "parent":"Subject 7.3.0" },{ "name" : "Title 7.3.1", "parent":"Year 7.3" },{ "name" : "Title     end", "parent":"Title 7.3.1" },{ "name" : "Length 7.3.2", "parent":"Year 7.3" },{ "name" : "Length     end", "parent":"Length 7.3.2" },{ "name" : "Actor 7.3.4", "parent":"Year 7.3" },{ "name" : "Actor     end", "parent":"Actor 7.3.4" },{ "name" : "Actress 7.3.5", "parent":"Year 7.3" },{ "name" : "Actress     end", "parent":"Actress 7.3.5" },{ "name" : "Director 7.3.6", "parent":"Year 7.3" },{ "name" : "Director     end", "parent":"Director 7.3.6" },{ "name" : "Awards 7.3.8", "parent":"Year 7.3" },{ "name" : "Awards     end", "parent":"Awards 7.3.8" },{ "name" : "Actor 7.4", "parent":"Popularity 7" },{ "name" : "Subject 7.4.0", "parent":"Actor 7.4" },{ "name" : "Subject     end", "parent":"Subject 7.4.0" },{ "name" : "Title 7.4.1", "parent":"Actor 7.4" },{ "name" : "Title     end", "parent":"Title 7.4.1" },{ "name" : "Length 7.4.2", "parent":"Actor 7.4" },{ "name" : "Length     end", "parent":"Length 7.4.2" },{ "name" : "Year 7.4.3", "parent":"Actor 7.4" },{ "name" : "Year     end", "parent":"Year 7.4.3" },{ "name" : "Actress 7.4.5", "parent":"Actor 7.4" },{ "name" : "Actress     end", "parent":"Actress 7.4.5" },{ "name" : "Director 7.4.6", "parent":"Actor 7.4" },{ "name" : "Director     end", "parent":"Director 7.4.6" },{ "name" : "Awards 7.4.8", "parent":"Actor 7.4" },{ "name" : "Awards     end", "parent":"Awards 7.4.8" },{ "name" : "Actress 7.5", "parent":"Popularity 7" },{ "name" : "Subject 7.5.0", "parent":"Actress 7.5" },{ "name" : "Subject     end", "parent":"Subject 7.5.0" },{ "name" : "Title 7.5.1", "parent":"Actress 7.5" },{ "name" : "Title     end", "parent":"Title 7.5.1" },{ "name" : "Length 7.5.2", "parent":"Actress 7.5" },{ "name" : "Length     end", "parent":"Length 7.5.2" },{ "name" : "Year 7.5.3", "parent":"Actress 7.5" },{ "name" : "Year     end", "parent":"Year 7.5.3" },{ "name" : "Actor 7.5.4", "parent":"Actress 7.5" },{ "name" : "Actor     end", "parent":"Actor 7.5.4" },{ "name" : "Director 7.5.6", "parent":"Actress 7.5" },{ "name" : "Director     end", "parent":"Director 7.5.6" },{ "name" : "Awards 7.5.8", "parent":"Actress 7.5" },{ "name" : "Awards     end", "parent":"Awards 7.5.8" },{ "name" : "Director 7.6", "parent":"Popularity 7" },{ "name" : "Subject 7.6.0", "parent":"Director 7.6" },{ "name" : "Subject     end", "parent":"Subject 7.6.0" },{ "name" : "Title 7.6.1", "parent":"Director 7.6" },{ "name" : "Title     end", "parent":"Title 7.6.1" },{ "name" : "Length 7.6.2", "parent":"Director 7.6" },{ "name" : "Length     end", "parent":"Length 7.6.2" },{ "name" : "Year 7.6.3", "parent":"Director 7.6" },{ "name" : "Year     end", "parent":"Year 7.6.3" },{ "name" : "Actor 7.6.4", "parent":"Director 7.6" },{ "name" : "Actor     end", "parent":"Actor 7.6.4" },{ "name" : "Actress 7.6.5", "parent":"Director 7.6" },{ "name" : "Actress     end", "parent":"Actress 7.6.5" },{ "name" : "Awards 7.6.8", "parent":"Director 7.6" },{ "name" : "Awards     end", "parent":"Awards 7.6.8" },{ "name" : "Awards 7.8", "parent":"Popularity 7" },{ "name" : "Subject 7.8.0", "parent":"Awards 7.8" },{ "name" : "Subject     end", "parent":"Subject 7.8.0" },{ "name" : "Title 7.8.1", "parent":"Awards 7.8" },{ "name" : "Title     end", "parent":"Title 7.8.1" },{ "name" : "Length 7.8.2", "parent":"Awards 7.8" },{ "name" : "Length     end", "parent":"Length 7.8.2" },{ "name" : "Year 7.8.3", "parent":"Awards 7.8" },{ "name" : "Year     end", "parent":"Year 7.8.3" },{ "name" : "Actor 7.8.4", "parent":"Awards 7.8" },{ "name" : "Actor     end", "parent":"Actor 7.8.4" },{ "name" : "Actress 7.8.5", "parent":"Awards 7.8" },{ "name" : "Actress     end", "parent":"Actress 7.8.5" },{ "name" : "Director 7.8.6", "parent":"Awards 7.8" },{ "name" : "Director     end", "parent":"Director 7.8.6" },{ "name" : "Subject 8.0", "parent":"Awards 8" },{ "name" : "Title 8.0.1", "parent":"Subject 8.0" },{ "name" : "Title     end", "parent":"Title 8.0.1" },{ "name" : "Length 8.0.2", "parent":"Subject 8.0" },{ "name" : "Length     end", "parent":"Length 8.0.2" },{ "name" : "Year 8.0.3", "parent":"Subject 8.0" },{ "name" : "Year     end", "parent":"Year 8.0.3" },{ "name" : "Actor 8.0.4", "parent":"Subject 8.0" },{ "name" : "Actor     end", "parent":"Actor 8.0.4" },{ "name" : "Actress 8.0.5", "parent":"Subject 8.0" },{ "name" : "Actress     end", "parent":"Actress 8.0.5" },{ "name" : "Director 8.0.6", "parent":"Subject 8.0" },{ "name" : "Director     end", "parent":"Director 8.0.6" },{ "name" : "Popularity 8.0.7", "parent":"Subject 8.0" },{ "name" : "Popularity     end", "parent":"Popularity 8.0.7" },{ "name" : "Title 8.1", "parent":"Awards 8" },{ "name" : "Subject 8.1.0", "parent":"Title 8.1" },{ "name" : "Subject     end", "parent":"Subject 8.1.0" },{ "name" : "Length 8.1.2", "parent":"Title 8.1" },{ "name" : "Length     end", "parent":"Length 8.1.2" },{ "name" : "Year 8.1.3", "parent":"Title 8.1" },{ "name" : "Year     end", "parent":"Year 8.1.3" },{ "name" : "Actor 8.1.4", "parent":"Title 8.1" },{ "name" : "Actor     end", "parent":"Actor 8.1.4" },{ "name" : "Actress 8.1.5", "parent":"Title 8.1" },{ "name" : "Actress     end", "parent":"Actress 8.1.5" },{ "name" : "Director 8.1.6", "parent":"Title 8.1" },{ "name" : "Director     end", "parent":"Director 8.1.6" },{ "name" : "Popularity 8.1.7", "parent":"Title 8.1" },{ "name" : "Popularity     end", "parent":"Popularity 8.1.7" },{ "name" : "Length 8.2", "parent":"Awards 8" },{ "name" : "Subject 8.2.0", "parent":"Length 8.2" },{ "name" : "Subject     end", "parent":"Subject 8.2.0" },{ "name" : "Title 8.2.1", "parent":"Length 8.2" },{ "name" : "Title     end", "parent":"Title 8.2.1" },{ "name" : "Year 8.2.3", "parent":"Length 8.2" },{ "name" : "Year     end", "parent":"Year 8.2.3" },{ "name" : "Actor 8.2.4", "parent":"Length 8.2" },{ "name" : "Actor     end", "parent":"Actor 8.2.4" },{ "name" : "Actress 8.2.5", "parent":"Length 8.2" },{ "name" : "Actress     end", "parent":"Actress 8.2.5" },{ "name" : "Director 8.2.6", "parent":"Length 8.2" },{ "name" : "Director     end", "parent":"Director 8.2.6" },{ "name" : "Popularity 8.2.7", "parent":"Length 8.2" },{ "name" : "Popularity     end", "parent":"Popularity 8.2.7" },{ "name" : "Year 8.3", "parent":"Awards 8" },{ "name" : "Subject 8.3.0", "parent":"Year 8.3" },{ "name" : "Subject     end", "parent":"Subject 8.3.0" },{ "name" : "Title 8.3.1", "parent":"Year 8.3" },{ "name" : "Title     end", "parent":"Title 8.3.1" },{ "name" : "Length 8.3.2", "parent":"Year 8.3" },{ "name" : "Length     end", "parent":"Length 8.3.2" },{ "name" : "Actor 8.3.4", "parent":"Year 8.3" },{ "name" : "Actor     end", "parent":"Actor 8.3.4" },{ "name" : "Actress 8.3.5", "parent":"Year 8.3" },{ "name" : "Actress     end", "parent":"Actress 8.3.5" },{ "name" : "Director 8.3.6", "parent":"Year 8.3" },{ "name" : "Director     end", "parent":"Director 8.3.6" },{ "name" : "Popularity 8.3.7", "parent":"Year 8.3" },{ "name" : "Popularity     end", "parent":"Popularity 8.3.7" },{ "name" : "Actor 8.4", "parent":"Awards 8" },{ "name" : "Subject 8.4.0", "parent":"Actor 8.4" },{ "name" : "Subject     end", "parent":"Subject 8.4.0" },{ "name" : "Title 8.4.1", "parent":"Actor 8.4" },{ "name" : "Title     end", "parent":"Title 8.4.1" },{ "name" : "Length 8.4.2", "parent":"Actor 8.4" },{ "name" : "Length     end", "parent":"Length 8.4.2" },{ "name" : "Year 8.4.3", "parent":"Actor 8.4" },{ "name" : "Year     end", "parent":"Year 8.4.3" },{ "name" : "Actress 8.4.5", "parent":"Actor 8.4" },{ "name" : "Actress     end", "parent":"Actress 8.4.5" },{ "name" : "Director 8.4.6", "parent":"Actor 8.4" },{ "name" : "Director     end", "parent":"Director 8.4.6" },{ "name" : "Popularity 8.4.7", "parent":"Actor 8.4" },{ "name" : "Popularity     end", "parent":"Popularity 8.4.7" },{ "name" : "Actress 8.5", "parent":"Awards 8" },{ "name" : "Subject 8.5.0", "parent":"Actress 8.5" },{ "name" : "Subject     end", "parent":"Subject 8.5.0" },{ "name" : "Title 8.5.1", "parent":"Actress 8.5" },{ "name" : "Title     end", "parent":"Title 8.5.1" },{ "name" : "Length 8.5.2", "parent":"Actress 8.5" },{ "name" : "Length     end", "parent":"Length 8.5.2" },{ "name" : "Year 8.5.3", "parent":"Actress 8.5" },{ "name" : "Year     end", "parent":"Year 8.5.3" },{ "name" : "Actor 8.5.4", "parent":"Actress 8.5" },{ "name" : "Actor     end", "parent":"Actor 8.5.4" },{ "name" : "Director 8.5.6", "parent":"Actress 8.5" },{ "name" : "Director     end", "parent":"Director 8.5.6" },{ "name" : "Popularity 8.5.7", "parent":"Actress 8.5" },{ "name" : "Popularity     end", "parent":"Popularity 8.5.7" },{ "name" : "Director 8.6", "parent":"Awards 8" },{ "name" : "Subject 8.6.0", "parent":"Director 8.6" },{ "name" : "Subject     end", "parent":"Subject 8.6.0" },{ "name" : "Title 8.6.1", "parent":"Director 8.6" },{ "name" : "Title     end", "parent":"Title 8.6.1" },{ "name" : "Length 8.6.2", "parent":"Director 8.6" },{ "name" : "Length     end", "parent":"Length 8.6.2" },{ "name" : "Year 8.6.3", "parent":"Director 8.6" },{ "name" : "Year     end", "parent":"Year 8.6.3" },{ "name" : "Actor 8.6.4", "parent":"Director 8.6" },{ "name" : "Actor     end", "parent":"Actor 8.6.4" },{ "name" : "Actress 8.6.5", "parent":"Director 8.6" },{ "name" : "Actress     end", "parent":"Actress 8.6.5" },{ "name" : "Popularity 8.6.7", "parent":"Director 8.6" },{ "name" : "Popularity     end", "parent":"Popularity 8.6.7" },{ "name" : "Popularity 8.7", "parent":"Awards 8" },{ "name" : "Subject 8.7.0", "parent":"Popularity 8.7" },{ "name" : "Subject     end", "parent":"Subject 8.7.0" },{ "name" : "Title 8.7.1", "parent":"Popularity 8.7" },{ "name" : "Title     end", "parent":"Title 8.7.1" },{ "name" : "Length 8.7.2", "parent":"Popularity 8.7" },{ "name" : "Length     end", "parent":"Length 8.7.2" },{ "name" : "Year 8.7.3", "parent":"Popularity 8.7" },{ "name" : "Year     end", "parent":"Year 8.7.3" },{ "name" : "Actor 8.7.4", "parent":"Popularity 8.7" },{ "name" : "Actor     end", "parent":"Actor 8.7.4" },{ "name" : "Actress 8.7.5", "parent":"Popularity 8.7" },{ "name" : "Actress     end", "parent":"Actress 8.7.5" },{ "name" : "Director 8.7.6", "parent":"Popularity 8.7" },{ "name" : "Director     end", "parent":"Director 8.7.6" },{ "name" : "Subject 0", "parent":"Racine" },{ "name" : "Title 1", "parent":"Racine" },{ "name" : "Length 2", "parent":"Racine" },{ "name" : "Year 3", "parent":"Racine" },{ "name" : "Actor 4", "parent":"Racine" },{ "name" : "Actress 5", "parent":"Racine" },{ "name" : "Director 6", "parent":"Racine" },{ "name" : "Popularity 7", "parent":"Racine" },{ "name" : "Awards 8", "parent":"Racine" },{ "name" : "Racine", "parent":"null" }];
                      var dataMap = data1.reduce(function(map, node) {
                       map[node.name] = node;
                       return map;
                      }, {});
                      var treeData = [];
                      data1.forEach(function(node) {
                       // add to parent
                       var parent = dataMap[node.parent];
                       if (parent) {
                        // create child array if it doesn't exist
                        (parent.children || (parent.children = []))
                         // add node to child array
                         .push(node);
                       } else {
                        // parent is null or missing
                        treeData.push(node);
                       }
                      });

                  // ************** Generate the tree diagram	 *****************
                  var margin = {top: 150, right: 120, bottom: 20, left: 80},
                  	treeWidth = 960 - margin.right - margin.left,
                  	treeHeight = 300 - margin.top - margin.bottom;

                  var i = 0,
                  	duration = 750,
                  	root;

                  var tree = d3.tree()
                  	.size([treeHeight, treeWidth]);

                  // var diagonal = d3.svg.diagonal()
                  // 	.projection(function(d) { return [d.y, d.x]; });
                  var diagonal =  d3.linkHorizontal()
                                    .x(function(d) { return d.y; })
                                    .y(function(d) { return d.x; });

                  var svg3 = d3.select("#div1").append("svg")
                    .attr("id","svg3")
                    // .attr("width",200)
                    // .attr("height",300)
                  	.attr("width", treeWidth + margin.right + margin.left)
                  	.attr("height", treeHeight + margin.top + margin.bottom)
                    .style("position","absolute")
                    .style("top","0px")
                    .style("left","50%")
                    .append("g")
                  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                  root = pack(data1[0]);
                  root.x0 = treeHeight / 2;
                  root.y0 = 0;
                  var begin =true;
                  root.children.forEach(collapse);
                  update(root);

                  d3.select(self.frameElement).style("height", "500px");

                  function update(source) {
//https://stackoverflow.com/questions/41087568/d3js-tree-nodes-is-not-a-function
                    // Compute the new tree layout.
                    // var nodes = tree.nodes(root).reverse(),
                  	//   links = tree.links(nodes);
                    var nodes = root.descendants();
                    var links = root.links();


                    // Normalize for fixed-depth.
                    nodes.forEach(function(d) { d.y = d.depth * 180; });

                    // Update the nodes…
                    var node = svg3.selectAll("g.node")
                  	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

                    // Enter any new nodes at the parent's previous position.
                    var nodeEnter = node.enter().append("g")
                  	  .attr("class", "node")
                  	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                  	  .on("click", click);

                    nodeEnter.append("circle")
                  	  .attr("r", 1e-6)
                  	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

                    nodeEnter.append("text")
                  	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
                  	  .attr("dy", ".35em")
                  	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                  	  .text(function(d) {
                         var im = d.data.name;
                        im = im.substring(0,im.length-d.depth*2);
                        return im; })
                  	  .style("fill-opacity", 1e-6);

                    // Transition nodes to their new position.
                    var nodeUpdate = node.transition()
                  	  .duration(duration)
                  	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

                    nodeUpdate.select("circle")
                  	  .attr("r", 10)
                  	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

                    nodeUpdate.select("text")
                  	  .style("fill-opacity", 1);

                    // Transition exiting nodes to the parent's new position.
                    var nodeExit = node.exit().transition()
                  	  .duration(duration)
                  	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                  	  .remove();

                    nodeExit.select("circle")
                  	  .attr("r", 1e-6);

                    nodeExit.select("text")
                  	  .style("fill-opacity", 1e-6);

                    // Update the links…
                    var link = svg3.selectAll("path.link")
                  	  .data(links, function(d) { return d.target.id; });

                    // Enter any new links at the parent's previous position.
                    link.enter().insert("path", "g")
                  	  .attr("class", "link")
                  	  .attr("d", function(d) {
                  		var o = {x: source.x0, y: source.y0};
                  		return diagonal({source: o, target: o});
                  	  });

                    // Transition links to their new position.
                    link.transition()
                  	  .duration(duration)
                  	  .attr("d", diagonal);

                    // Transition exiting nodes to the parent's new position.
                    link.exit().transition()
                  	  .duration(duration)
                  	  .attr("d", function(d) {
                  		var o = {x: source.x, y: source.y};
                  		return diagonal({source: o, target: o});
                  	  })
                  	  .remove();

                    // Stash the old positions for transition.
                    nodes.forEach(function(d) {
                  	d.x0 = d.x;
                  	d.y0 = d.y;
                    });
                  }



                  // Toggle children on click.
                  function click(d) {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                      } else {
                        d.children = d._children;
                        d._children = null;
                      }
                      // If the node has a parent, then collapse its child nodes
                      // except for this clicked node.
                     if (d.parent) {
                        d.parent.children.forEach(function(element) {
                          if (d !== element) {
                            if (element.children) {
                                element._children = element.children;
                                element.children = null;
                              }
                          }
                        });
                      }
                      if (d.children){
                      if (d.depth<4){
                      var t=d.name.substring(0,d.name.length-d.depth*2);}
                      else{
                         var t="";
                      }
                      var test= d.parent;
                      while (test.name!="Racine") {

                        t=test.name.substring(0,test.name.length-test.depth*2) +" "+ t;
                        test=test.parent;
                      }
                    }
                    else{

                      var t="";
                      var test= d.parent;
                      while (test.name!="Racine") {
                        t=test.name.substring(0,test.name.length-test.depth*2) +" "+ t;
                        test=test.parent;
                      }
                    }

                    // les noeuds pour filtre sont conetues dans t dans l'ordre deupuis la racine dans un string avec espace entre chaque name
                      alert(t);

                      update(d);
                  }
                  function collapse(d) {
                                        if (d.children) {
                                          d._children = d.children;
                                          d._children.forEach(collapse);
                                          d.children = null;
                                        }
                                      }








  zoomTo([zoomRoot.x, zoomRoot.y, zoomRoot.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    zoomNode.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    zoomNode.attr("r", d => d.r * k);
  }

  function zoom(d) {
    const focus0 = focus;

    focus = d;

    const transition = svg1.transition()
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

  return svg1.node();
}
);
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.json("https://gist.githubusercontent.com/Guanaco2569/ea551601561e1a9e6739bdbf7ad7c6ab/raw/7e88a9548f504abeea4dde00f87dbef710611a63/parsed.json")
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
750
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
