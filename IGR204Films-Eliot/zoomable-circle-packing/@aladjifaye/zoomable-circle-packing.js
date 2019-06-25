// https://observablehq.com/@d3/zoomable-circle-packing@157
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Zoomable Circle Packing

Click to zoom in or out.`
)});
  main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","color", "dataTemp1", "dataTemp2", "dataFilms"], function(pack,data,d3,width,height,color, dataTemp1, dataTemp2, dataFilms)
{
  let zoomRoot = pack(data);
  let focus = zoomRoot;
  let view;

  // d3.select("body")
  // .append("input")
  //   .attr("class", "SearchBar")
  //   .attr("id", "search")
  //   .attr("type", "text")
  //   .attr("placeholder", "Search...");

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
	  //.style("fill-opacity", 0)
      .style("cursor", "pointer")
      .on("click", () => zoom(zoomRoot));


      function getValidName(string) {
            //https://www.w3schools.com/jsref/jsref_replace.asp
            //https://stackoverflow.com/questions/29246485/javascript-regex-problems-nothing-to-repeat
            //on doit avoir un nom ne contenant que des lettres pour que celui ci soit "valide"

            let res = string.replace(/[\W_]+/g, ''); //https://stackoverflow.com/questions/30824525/remove-all-characters-that-are-not-letters-or-numbers-in-a-string
            res=res.replace("1","a1");  //commencer un ID par un chiffre n'est pas permis par JS
            return res;
          }

            let zoomNode = svg1.append("g")
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
                  console.log(parentName+name);
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
					  d3.select("#textData")
                      .append("tspan")
                        .attr("x",25)
                        .attr("y",500)
                        .text("Movie length (in minutes): " + dataFilms[d.data.name]["Length"].toString());
                  }
                })
                .on("mouseout", d=> {
                  let name = getValidName(d.data.name);
                  let parentName = getValidName(d.parent.data.name);
                  d3.select("#" + parentName+name).attr("stroke", null);


                })
                .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

  let label = svg1.append("g")
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



                  //****** Generate data for the tree *************
                  {
                  var data1 = [{ "name" : "Title 0.1", "parent":"Subject 0" },{ "name" : "Title     end", "parent":"Title 0.1" },{ "name" : "Length 0.2", "parent":"Subject 0" },{ "name" : "Length     end", "parent":"Length 0.2" },{ "name" : "Year 0.3", "parent":"Subject 0" },{ "name" : "Year     end", "parent":"Year 0.3" },{ "name" : "Actor 0.4", "parent":"Subject 0" },{ "name" : "Actor     end", "parent":"Actor 0.4" },{ "name" : "Actress 0.5", "parent":"Subject 0" },{ "name" : "Actress     end", "parent":"Actress 0.5" },{ "name" : "Director 0.6", "parent":"Subject 0" },{ "name" : "Director     end", "parent":"Director 0.6" },{ "name" : "Popularity 0.7", "parent":"Subject 0" },{ "name" : "Popularity     end", "parent":"Popularity 0.7" },{ "name" : "Awards 0.8", "parent":"Subject 0" },{ "name" : "Awards     end", "parent":"Awards 0.8" },{ "name" : "Subject 1.0", "parent":"Title 1" },{ "name" : "Subject     end", "parent":"Subject 1.0" },{ "name" : "Length 1.2", "parent":"Title 1" },{ "name" : "Length     end", "parent":"Length 1.2" },{ "name" : "Year 1.3", "parent":"Title 1" },{ "name" : "Year     end", "parent":"Year 1.3" },{ "name" : "Actor 1.4", "parent":"Title 1" },{ "name" : "Actor     end", "parent":"Actor 1.4" },{ "name" : "Actress 1.5", "parent":"Title 1" },{ "name" : "Actress     end", "parent":"Actress 1.5" },{ "name" : "Director 1.6", "parent":"Title 1" },{ "name" : "Director     end", "parent":"Director 1.6" },{ "name" : "Popularity 1.7", "parent":"Title 1" },{ "name" : "Popularity     end", "parent":"Popularity 1.7" },{ "name" : "Awards 1.8", "parent":"Title 1" },{ "name" : "Awards     end", "parent":"Awards 1.8" },{ "name" : "Subject 2.0", "parent":"Length 2" },{ "name" : "Subject     end", "parent":"Subject 2.0" },{ "name" : "Title 2.1", "parent":"Length 2" },{ "name" : "Title     end", "parent":"Title 2.1" },{ "name" : "Year 2.3", "parent":"Length 2" },{ "name" : "Year     end", "parent":"Year 2.3" },{ "name" : "Actor 2.4", "parent":"Length 2" },{ "name" : "Actor     end", "parent":"Actor 2.4" },{ "name" : "Actress 2.5", "parent":"Length 2" },{ "name" : "Actress     end", "parent":"Actress 2.5" },{ "name" : "Director 2.6", "parent":"Length 2" },{ "name" : "Director     end", "parent":"Director 2.6" },{ "name" : "Popularity 2.7", "parent":"Length 2" },{ "name" : "Popularity     end", "parent":"Popularity 2.7" },{ "name" : "Awards 2.8", "parent":"Length 2" },{ "name" : "Awards     end", "parent":"Awards 2.8" },{ "name" : "Subject 3.0", "parent":"Year 3" },{ "name" : "Subject     end", "parent":"Subject 3.0" },{ "name" : "Title 3.1", "parent":"Year 3" },{ "name" : "Title     end", "parent":"Title 3.1" },{ "name" : "Length 3.2", "parent":"Year 3" },{ "name" : "Length     end", "parent":"Length 3.2" },{ "name" : "Actor 3.4", "parent":"Year 3" },{ "name" : "Actor     end", "parent":"Actor 3.4" },{ "name" : "Actress 3.5", "parent":"Year 3" },{ "name" : "Actress     end", "parent":"Actress 3.5" },{ "name" : "Director 3.6", "parent":"Year 3" },{ "name" : "Director     end", "parent":"Director 3.6" },{ "name" : "Popularity 3.7", "parent":"Year 3" },{ "name" : "Popularity     end", "parent":"Popularity 3.7" },{ "name" : "Awards 3.8", "parent":"Year 3" },{ "name" : "Awards     end", "parent":"Awards 3.8" },{ "name" : "Subject 4.0", "parent":"Actor 4" },{ "name" : "Subject     end", "parent":"Subject 4.0" },{ "name" : "Title 4.1", "parent":"Actor 4" },{ "name" : "Title     end", "parent":"Title 4.1" },{ "name" : "Length 4.2", "parent":"Actor 4" },{ "name" : "Length     end", "parent":"Length 4.2" },{ "name" : "Year 4.3", "parent":"Actor 4" },{ "name" : "Year     end", "parent":"Year 4.3" },{ "name" : "Actress 4.5", "parent":"Actor 4" },{ "name" : "Actress     end", "parent":"Actress 4.5" },{ "name" : "Director 4.6", "parent":"Actor 4" },{ "name" : "Director     end", "parent":"Director 4.6" },{ "name" : "Popularity 4.7", "parent":"Actor 4" },{ "name" : "Popularity     end", "parent":"Popularity 4.7" },{ "name" : "Awards 4.8", "parent":"Actor 4" },{ "name" : "Awards     end", "parent":"Awards 4.8" },{ "name" : "Subject 5.0", "parent":"Actress 5" },{ "name" : "Subject     end", "parent":"Subject 5.0" },{ "name" : "Title 5.1", "parent":"Actress 5" },{ "name" : "Title     end", "parent":"Title 5.1" },{ "name" : "Length 5.2", "parent":"Actress 5" },{ "name" : "Length     end", "parent":"Length 5.2" },{ "name" : "Year 5.3", "parent":"Actress 5" },{ "name" : "Year     end", "parent":"Year 5.3" },{ "name" : "Actor 5.4", "parent":"Actress 5" },{ "name" : "Actor     end", "parent":"Actor 5.4" },{ "name" : "Director 5.6", "parent":"Actress 5" },{ "name" : "Director     end", "parent":"Director 5.6" },{ "name" : "Popularity 5.7", "parent":"Actress 5" },{ "name" : "Popularity     end", "parent":"Popularity 5.7" },{ "name" : "Awards 5.8", "parent":"Actress 5" },{ "name" : "Awards     end", "parent":"Awards 5.8" },{ "name" : "Subject 6.0", "parent":"Director 6" },{ "name" : "Subject     end", "parent":"Subject 6.0" },{ "name" : "Title 6.1", "parent":"Director 6" },{ "name" : "Title     end", "parent":"Title 6.1" },{ "name" : "Length 6.2", "parent":"Director 6" },{ "name" : "Length     end", "parent":"Length 6.2" },{ "name" : "Year 6.3", "parent":"Director 6" },{ "name" : "Year     end", "parent":"Year 6.3" },{ "name" : "Actor 6.4", "parent":"Director 6" },{ "name" : "Actor     end", "parent":"Actor 6.4" },{ "name" : "Actress 6.5", "parent":"Director 6" },{ "name" : "Actress     end", "parent":"Actress 6.5" },{ "name" : "Popularity 6.7", "parent":"Director 6" },{ "name" : "Popularity     end", "parent":"Popularity 6.7" },{ "name" : "Awards 6.8", "parent":"Director 6" },{ "name" : "Awards     end", "parent":"Awards 6.8" },{ "name" : "Subject 7.0", "parent":"Popularity 7" },{ "name" : "Subject     end", "parent":"Subject 7.0" },{ "name" : "Title 7.1", "parent":"Popularity 7" },{ "name" : "Title     end", "parent":"Title 7.1" },{ "name" : "Length 7.2", "parent":"Popularity 7" },{ "name" : "Length     end", "parent":"Length 7.2" },{ "name" : "Year 7.3", "parent":"Popularity 7" },{ "name" : "Year     end", "parent":"Year 7.3" },{ "name" : "Actor 7.4", "parent":"Popularity 7" },{ "name" : "Actor     end", "parent":"Actor 7.4" },{ "name" : "Actress 7.5", "parent":"Popularity 7" },{ "name" : "Actress     end", "parent":"Actress 7.5" },{ "name" : "Director 7.6", "parent":"Popularity 7" },{ "name" : "Director     end", "parent":"Director 7.6" },{ "name" : "Awards 7.8", "parent":"Popularity 7" },{ "name" : "Awards     end", "parent":"Awards 7.8" },{ "name" : "Subject 8.0", "parent":"Awards 8" },{ "name" : "Subject     end", "parent":"Subject 8.0" },{ "name" : "Title 8.1", "parent":"Awards 8" },{ "name" : "Title     end", "parent":"Title 8.1" },{ "name" : "Length 8.2", "parent":"Awards 8" },{ "name" : "Length     end", "parent":"Length 8.2" },{ "name" : "Year 8.3", "parent":"Awards 8" },{ "name" : "Year     end", "parent":"Year 8.3" },{ "name" : "Actor 8.4", "parent":"Awards 8" },{ "name" : "Actor     end", "parent":"Actor 8.4" },{ "name" : "Actress 8.5", "parent":"Awards 8" },{ "name" : "Actress     end", "parent":"Actress 8.5" },{ "name" : "Director 8.6", "parent":"Awards 8" },{ "name" : "Director     end", "parent":"Director 8.6" },{ "name" : "Popularity 8.7", "parent":"Awards 8" },{ "name" : "Popularity     end", "parent":"Popularity 8.7" },{ "name" : "Subject 0", "parent":"Racine" },{ "name" : "Title 1", "parent":"Racine" },{ "name" : "Length 2", "parent":"Racine" },{ "name" : "Year 3", "parent":"Racine" },{ "name" : "Actor 4", "parent":"Racine" },{ "name" : "Actress 5", "parent":"Racine" },{ "name" : "Director 6", "parent":"Racine" },{ "name" : "Popularity 7", "parent":"Racine" },{ "name" : "Awards 8", "parent":"Racine" },{ "name" : "Racine", "parent":"" }];
                  }
                  // ************** Generate the tree diagram	 *****************
                  var root = d3.stratify()
                  .id(function(d) { return d.name; })
                  .parentId(function(d) { return d.parent; })
                  (data1);

                  var margin = {top: 200, right: 10, bottom: 20, left: 80},
                  	treeWidth = 1000 - margin.right - margin.left,
                  	treeHeight =500 - margin.top - margin.bottom;

                   const dx = 20;
                    const dy = treeWidth/6;

                  var i = 0,
                	duration = 750,
                  	root;

                  root.x0=dy/2;
                  root.y0=0;

                  var diagonal =  d3.linkHorizontal()
                                    .x(function(d) { return d.y; })
                                    .y(function(d) { return d.x; });

                  var svg3 = d3.select("#div1").append("svg")
                    .attr("id","svg3")

                  	.attr("width", treeWidth + margin.right + margin.left)
                  	.attr("height", treeHeight + margin.top + margin.bottom)
                    .style("position","absolute")
                    .style("top","0px")
                    .style("left","50%")
                    .append("g")
                  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                 root.descendants().forEach((d)=> {
                    if (d.children) {
                      d._children = d.children;
                      d._children.forEach(collapse);
                      d.children = null;
                    }
                  });

                  const gLink=svg3.append("g")
                      .attr("fill", "none")
                      .attr("stroke", "#555")
                      .attr("stroke-opacity", 0.4)
                      .attr("stroke-width", 1.5);

                  const gNode = svg3.append("g")
                      .attr("cursor", "pointer")
                      .attr("pointer-events", "all");

                  var tree = d3.tree().nodeSize([dx,dy]);

                  d3.select(self.frameElement).style("height", "500px");

                  function update(source) {
//https://stackoverflow.com/questions/41087568/d3js-tree-nodes-is-not-a-function

                    var nodes = root.descendants().reverse();
                    var links = root.links();

                    tree(root);
                    let left = root;
                    let right = root;
                    root.eachBefore(node => {
                      if (node.x < left.x) left = node;
                      if (node.x > right.x) right = node;
                    });

                    const transition = svg3.transition()
                        .duration(duration)
                        .attr("viewBox", [-margin.left, left.x - margin.top, treeWidth, treeHeight])
                        .tween("resize", window.ResizeObserver ? null : () => () => svg3.dispatch("toggle"));


                    // Update the nodes…
                    var node = gNode.selectAll("g")
                  	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

                    // Enter any new nodes at the parent's previous position.
                    var nodeEnter = node.enter().append("g")
                  	  .attr("class", "node")
                  	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                  	  .on("click", d=>{click(d);});

                    nodeEnter.append("circle")
                  	  // .attr("r", 1e-6)
                      .attr("r", 2.5)
                  	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
                      .attr("stroke-width", 10);

                    nodeEnter.append("text")
                  	  // .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
                      .attr("x", function(d) { return d.children || d._children ? -6 : 6; })
                  	  .attr("dy", ".35em")
                      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start";})
                  	  //.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                  	  .text(function(d) {
                        var im = d.data.name;
                         im = d.data.name.substring(0,d.data.name.length-d.depth*2);
                         return d.data.name.substring(0,d.data.name.length-d.depth*2); })
                        .clone(true).lower()
                          .attr("stroke-linejoin", "round")
                          .attr("stroke-width", 3)
                          .attr("stroke", "white")
                  	  .style("fill-opacity", 1e-6);

                    const nodeUpdate = node.merge(nodeEnter).transition(transition)
                        .attr("transform", d => `translate(${d.y},${d.x})`)
                        .attr("fill-opacity", 1)
                        .attr("stroke-opacity", 1);

                    nodeUpdate.select("circle")
                  	  .attr("r", 10)
                  	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

                    nodeUpdate.select("text")
                  	  .style("fill-opacity", 1);

                    const nodeExit = node.exit().transition(transition).remove()
                        .attr("transform", d => `translate(${source.y},${source.x})`)
                        .attr("fill-opacity", 0)
                        .attr("stroke-opacity", 0);

                    nodeExit.select("circle")
                  	  .attr("r", 1e-6);

                    nodeExit.select("text")
                  	  .style("fill-opacity", 1e-6);

                    const link = gLink.selectAll("path")
                      .data(links, d => d.target.id);

                    const linkEnter = link.enter().append("path")
                        .attr("d", d => {
                          const o = {x: source.x0, y: source.y0};
                          return diagonal({source: o, target: o});
                        });

                  // Transition links to their new position.
                  link.merge(linkEnter).transition(transition)
                      .attr("d", diagonal);

                  // Transition exiting nodes to the parent's new position.
                  link.exit().transition(transition).remove()
                      .attr("d", d => {
                        const o = {x: source.x, y: source.y};
                        return diagonal({source: o, target: o});
                      });

                  // Stash the old positions for transition.
                  root.eachBefore(d => {
                    d.x0 = d.x;
                    d.y0 = d.y;
                  });
                }

                  // Toggle children on click.
                  function click(d) {
                    //je laisse ici le code de Paul-Ernest un peu modifié;
                    // il faudra l'adapter à la forme de la bdd comme celle d'Eliot.

                    d.children = d.children ? null : d._children;
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
                          var t=d.data.name.substring(0,d.data.name.length-d.depth*2);
                        }
                        else{
                           var t="";
                        }
                        if (d.parent){
                          var test= d.parent;
                          while (test.parent) {
                            t=test.data.name.substring(0,test.data.name.length-test.depth*2) +" "+ t;
                            test=test.parent;
                          }
                        }
                    }
                    else{
                      var t="";
                      if (d.parent) {
                        var test= d.parent;
                        while (test.parent) {
                          t=test.name.substring(0,test.name.length-test.depth*2) +" "+ t;
                          test=test.parent;
                        }
                      }
                    }

                    // les noeuds pour filtre sont conetues dans t dans l'ordre deupuis la racine dans un string avec espace entre chaque name
                      //alert(t);
                      update(d);

					  if (d.depth == 1) {
					    console.log(dataTemp1);
					    zoomRoot = pack(dataTemp1[t]); }
					  else if (d.depth == 2) {
						  zoomRoot = pack(dataTemp2[t]); }


					  focus = zoomRoot;

					  svg1.selectAll("g").remove();

					  zoomNode = svg1.append("g")
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

	label = svg1.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(zoomRoot.descendants())
    .join("text")
      .style("fill-opacity", d => d.parent === zoomRoot ? 1 : 0)
      .style("display", d => d.parent === zoomRoot ? "inline" : "none")
      .text(d => d.data.name);

	  zoom(zoomRoot);
                  }

                  function collapse(d) {
                                        if (d.children) {
                                          d._children = d.children;
                                          d._children.forEach(collapse);
                                          d.children = null;
                                        }
                                      }

                  update(root);

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


  //------------search functionnalities ------------------------------------------
  d3.select(".autocomplete")
  .insert("input",":first-child")
    .attr("id", "search")
    .attr("type", "text")
    .attr("placeholder", "Search...");

  // d3.select("#search")
  //     .on("keyup", function() {
  //
  //           var text = this.value.trim();
  //           //console.log(text);
  //           var entry1=text.replace(/\s/g,'').toLowerCase();
  //           d3.selectAll('circle')
  //           .each(function(d) {
  //             var id=d3.select(this).attr("id");
  //             //console.log(id);
  //             if(id)
  //             {
  //               var id1=id.toLowerCase();
  //               if(id1.includes(entry1))
  //               {
  //                 colorize_node(id);
  //               }
  //             }
  //           });
  //       });

    d3.select("#search").on("keypress", function() {
      if(d3.event.keyCode === 13){
      var text = this.value.trim();
            console.log(text);
            var entry1=text.replace(/\s/g,'').toLowerCase();
            d3.selectAll('circle')
            .each(function(d) {
              var id=d3.select(this).attr("id");
              if(id)
              {
                var id1=id.toLowerCase();
                if(id1.includes(entry1))
                {
                  colorize_node(id);
                }
              }
            });

      }
    });

  function search(entry)
  {
    //removing spaces and normalizing text:
    var entry1=entry.replace(/\s/g,'').toLowerCase();

    d3.selectAll('circle')
    .each(function(d) {
      var id=d3.select(this).attr("id");
      var id1=id.toLowerCase();
      //console.log(id);
      if(id1.includes(entry1))
      {
        colorize_node(id);
      }
    });
  }


  function colorize_node(node_id)
  {
    d3.select("#"+node_id).style('fill', 'orange').style("opacity", 0.5).attr("stroke", "#ff0066");
  }
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        }
        else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }

          var text = document.getElementById("search").value.trim();
            console.log(text);
            var entry1=text.replace(/\s/g,'').toLowerCase();
            d3.selectAll('circle')
            .each(function(d) {
              var id=d3.select(this).attr("id");
              if(id)
              {
                var id1=id.toLowerCase();
                if(id1.includes(entry1))
                {
                  colorize_node(id);
                }
              }
            });
            // removing all autocomplete items
            var autoitems = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < autoitems.length; i++) {
              autoitems[i].parentNode.removeChild(autoitems[i]);

            }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  {
  var list_of_movies = ['STRING', 'Tie Me Up! Tie Me Down!', 'High Heels', 'Dead Zone, The', 'Cuba', 'Days of Heaven', 'Octopussy', 'Target Eagle', 'American Angels: Baptism of Blood, The', 'Subway', 'Camille Claudel', 'Fanny and Alexander', 'Tragedy of a Ridiculous Man', 'A Man & a Woman', 'A Man & a Woman: Twenty Years Later', 'Un Hombre y una Mujer', 'Official Story, The', 'Lindbergh Kidnapping Case, The', 'Blackmail', "Donovan's Reef", 'Tucker: The Man & His Dream', 'Scrooged', 'Raiders of the Lost Ark', 'Running Man, The', 'Predator 2', 'Colors', 'Zandalee', 'Miles from Home', 'Happy Birthday to Me', 'Final Notice', 'Quintet', "Devil's Eye, The", 'Wild Strawberries', 'Seventh Seal, The', 'Germicide', 'Dreams', 'Naked Night, The', 'Through a Glass Darkly', 'Cries & Whispers', 'Barbarian & the Geisha, The', 'Casino Royale', 'Dr. No', 'Elephant Walk', 'Ten', 'Man Who Loved Women, The', 'Hawaii', 'Torn Curtain', 'Duet for One', 'Sound of Music, The', 'Gonzo Presents Muppet Weird Stuff', 'Tartuffe', 'A New Life', 'Magic', 'Tommy', 'Big Fix, The', 'Alan & Naomi', 'Fatal Attraction', 'Patriot Games', 'Woman Next Door, The', 'Hunting', 'Bataan', 'Siegfried, The Nibelungenlied', 'Henry, Portrait of a Serial Killer', 'Big Blue, The', 'Flight of the Intruder', "Nobody's Fool", 'After Hours', 'Desperately Seeking Susan', 'A New Leaf', 'Killers of Kilimanjaro', 'Don Juan', "Babette's Feast", 'Vincent, Francois, Paul & the Others', 'Thunderball', 'Lodger (Story of the London Fog)', 'Appointment with Death', 'Murder on the Orient Express', 'Blood Alley', 'Spy Who Loved Me, The', 'Storm', 'Bloodbath', 'Miami Cops', 'Island of Dr. Moreau, The', 'Eighty-Four Charing Cross Road', 'Elephant Man, The', 'Dr Alien', 'Creepshow', 'Sammy & Rosie Get Laid', "Goalie's Anxiety at the Penalty Kick, The", 'Mademoiselle Striptease', 'Women, The', 'That Naughty Girl', 'Voulez-Vous Danser Avec Moi?', 'A Coeur Joie, (Head Over Heels)', 'Shalako', 'Contempt', 'Dear Brigitte', 'A Very Private Affair', 'Ravishing Idiot, The', 'Bride Is Much Too Beautiful, The', 'Doctor at Sea', "Le Repos Du Guerrier, (Warrior's Rest)", 'And God Created Woman', 'Ms. Don Juan', 'Siesta', 'Rich & Strange', 'Lionheart', 'E. T. The Extra-Terrestrial', 'Cool World', 'Nadine', 'Batman', 'Blind Date', 'Mother Lode', 'Final Analysis', 'Never Say Never Again', 'Nine & a Half Weeks', 'Killjoy', 'No Mercy', 'Marrying Man, The', 'Misery', 'Crisis', 'Samson & Delilah', 'Act of Piracy', 'Split Decisions', "Vampire's Kiss", 'Nightmare at Noon', 'Presumed Innocent', 'Reap the Wild Wind', 'Pocket Money', 'Mary White', 'Catch a Rising Star, Tenth Anniversary', 'Guilty by Suspicion', 'Secret Beyond the Door', 'Scarlet Street', "Daffy Duck's Quackbusters", "Rowlf's Rhapsodies with the Muppets", 'Gandhi', 'Wind & the Lion, The', 'Carnal Knowledge', 'Getting Straight', 'Scarlet Letter, The', 'Count of Old Town, The', 'Autumn Sonata', 'Gaslight', 'Indiscreet', 'Walpurgis Night', 'Joan of Arc', 'A Woman Called Golda', 'A Walk in the Spring Rain', 'Under Capricorn', 'Notorious', 'June Night', 'Goodbye Again', 'Anastasia', "Bells of St. Mary's, The", 'Intermezzo', "A Woman's Face", 'Swedenhielms', 'Only One Night', 'Dollar', 'Elena & Her Men', 'Europa Fifty-One', 'Voyage in Italy', 'Fear', 'Stromboli', 'Cactus Flower', 'Hideaways', "Twenty Four Hours in a Woman's Life", 'Programmed to Kill', 'Conan the Barbarian', 'Raw Nerve', 'Think Dirty', 'King of Comedy', 'Best of the Big Laff Off, The', 'Amadeus', 'White Lightning', 'Unbearable Lightness of Being, The', 'Life & Times of Judge Roy Bean, The', 'Airport', 'Day for Night', 'Secrets of Women', 'Burnt Offerings', 'Easy Rider', 'Five Easy Pieces', 'Day of the Locust, The', 'Goldfinger', 'Exorcist II, The Heretic', 'White Lightning', 'Lady for a Night', 'Charly', 'High Plains Drifter', 'Honkytonk Man', 'Nightbreed', 'Under the Sun of Satan', 'Vagabond', "Bill Cosby, Live at Harrah's", 'Monty Python & the Holy Grail', 'John Cleese on How to Irritate People', 'Matchmaker, The', 'For Your Eyes Only', 'Wings', 'Medicine Man', 'Good Fellas', 'Kiss of the Spider Woman', 'Rookie, THe', 'Sting, The', 'Torpedo Run', 'Instant Justice', 'Cyrano de Bergerac', 'Border Street', 'Firehouse', 'Morituri', 'From the Life of the Marionettes', 'Frantic', 'Coma', 'Dead Ringers', 'Golden Ninja Invasion', 'Exorcist, The', "Alice Doesn't Live Here Anymore", 'Eyes of the Amaryllis, The', 'What Price Glory?', 'Inauguration of the Pleasure Dome', 'School Daze', 'End of Innocence, The', 'Anderson Tapes, The', 'Father Murphy, A Horse from Heaven', 'Skull', 'Quick & The Dead, The', 'Best Defense', 'Dreamscape', 'Black Rain', '8 1/2', 'One Frightened Night', 'Year My Voice Broke, The', 'Is Paris Burning?', 'QB VII', 'Island of Dr. Moreau, The', 'Beyond the Limit', 'Secret Agent', 'Paramount Comedy Theater: Well-Developed', 'Big Bust Out, The', 'Fourth Protocol, The', 'Gremlins 2: The New Batch', 'Fast Times at Ridgemont High', 'Mannequin', 'Rabid', 'Party, The', 'Vampire Raiders, Ninja Queen', 'Bloopers from Star Trek', 'Destroyer', 'Party Girl', 'Twin Peaks', 'Moonstruck', 'Witches of Eastwick, The', 'Moonraker', 'Beat Street', 'Running Out of Luck', 'Never on Tuesday', 'Shampoo', 'Power', 'Darling', 'Ugly American, The', 'Ambassador Bill', 'Big Trail, The', 'Hombre', "Coogan's Bluff", 'Penn & Teller Get Killed', 'Shy People', "It's My Turn", 'Dangerous Liaisons', 'Reversal of Fortune', 'Meeting Venus', 'Tomorrow Is Forever', 'Like Father Like Son', 'Rope', 'Road to Hong Kong', 'Shirley Valentine', 'City of Joy', 'Appaloosa, The', 'Seven Minutes in Heaven', "Hearts of Darkness, A Filmmaker's Apocalypse", 'Tonight for Sure', 'White Hunter, Black Heart', 'Sundays & Cybele', 'Puppet Master', 'Night Gallery', 'Pet Sematary', "America's Music, Gospel", 'Slap Shot', 'O. C. & Stiggs', 'A Fish Called Wanda', 'A Lesson in Love', 'Brink of Life', 'Betty Blue', 'Hair', "National Lampoon's Christmas Vacation", 'Dersu Uzala, (The Hunter)', 'Alice', 'Fifth Floor, The', 'Snow Kill', 'People, The', 'True Grit', 'Battle of Midway, The', 'Three Godfathers', 'Hush, Hush, Sweet Charlotte', 'A Stolen Life', 'Old Maid, The', 'All about Eve', 'Fly, The', 'Quick Change', 'Lair of the White Worm, The', 'Rainbow, The', 'Man Who Knew Too Much, The', 'Beauty & the Beast', 'Foreign Correspondent', 'Heiress, The', 'Boy Who Could Fly, The', 'Terrorists, The', 'Wheel of Fortune', 'Do the Right Thing', 'Court-Martial of Jackie Robinson, The', 'Elvira Madigan', 'Hurricane Smith', 'Fair Game', 'Rape of the Sabines, The', 'Risky Business', 'I Love All of You (Je Vous Aime)', 'Love Songs', 'Le Choix des Armes', 'Choice of Arms', 'March or Die', 'Last Metro, The', 'Jean de Florette', 'Fat Man & Little Boy', 'Wild at Heart', 'Family Business', 'Stand & Deliver', 'Looker', 'Fire & Rain', 'Best of Candid Camera, The', 'Seven Sinners', 'Judgment at Nuremberg', "Minsky's Follies", 'Novice, The', 'Wings of Desire', 'Until the End of the World', 'Castaway', "Alfred Hitchcock Presents, Sorcerer's Apprentice", 'Delicatessen', 'Great Train Robbery, The', 'Hanover Street', 'Hunchback', 'My Darling Clementine', 'Wagon Master', 'She Wore a Yellow Ribbon', 'Fantasy Man', 'Monster in the Closet', 'Double Edge', 'Network', 'Chinatown', 'Three Days of the Condor', 'Voyage of the Damned', 'Barfly', 'Wait Until Spring, Bandini', 'Life with Father', 'A Guy Named Joe', 'Stavisky', 'Time Bandits', 'Shining, The', 'Flame of Barbary Coast', 'Naked Truth, The', 'Brood, The', 'Molly Maguires, The', 'Beverly Hills Cop', "Blind Man's Bluff", 'La Dolce Vita', 'After the Fox', 'Man with the Golden Gun, The', 'Marbella', 'Bobo, The', 'Big Bands, The', 'Killer Image.', 'Kandyland', 'Campus Man', 'Jubal', 'Purple Rose of Cairo, The', 'Broadway Danny Rose', 'Husbands & Wives', 'Hannah & Her Sisters', 'Hurricane', 'Between Two Women', 'Cannonball Run, The', 'Doughnuts & Society', 'Holocaust', 'Meridian', 'Diary of a Hitman', 'Gor', 'Surrender', 'Places in the Heart', 'Not Without My Daughter', 'Heroes', 'Absence of Malice', 'Norma Rae', 'Steel Magnolias', 'Burbs, The', 'Empire Strikes Back, The', 'Star Wars', 'Return of the Jedi', 'Hear My Song', 'Slightly Scarlet', 'Gunfight at the OK Corral', 'Range Feud, The', 'Bloodsucking Pharaohs in Pittsburgh', 'Roma', 'China Syndrome, The', 'Morning After, The', 'Klute', 'Electric Horseman, The', 'Cat Ballou', 'Coming Home', 'Rebecca', 'Jane Eyre', 'Stacey!', 'Naked Obsession', 'Stripped to Kill II, Live Girls', 'Rain Killer, The', 'Valley Girl', 'Silence of the Lambs, The', 'Stealing Home', 'Napoleon & Samantha', 'Five Corners', 'Blackboard Jungle, The', 'My Left Foot', 'Back to the Beach', 'Painted Veil, The', 'Inspiration', 'Anna Christie', 'Flesh & the Devil, The', 'Woman of Affairs', 'Anna Karenina', 'Camille', 'Mata Hari', 'Wild Orchids', 'Grand Hotel', 'Susan Lennox, Her Fall & Rise', 'Ninotchka', 'Queen Christina', 'Mysterious Lady, The', 'Joyless Street', 'Single Standard, The', 'As You Desire Me', 'Romance', 'A Child Is Waiting', 'Tootsie', 'Let It Ride', 'Julius Caesar', 'Nineteen Forty-One', 'Jaws', 'Hot Pursuit', 'Triumph of the Spirit', 'Brannigan', 'Buffet Froid', 'Salvador', 'Horse Soldiers, The', 'Long John Silver', 'Hustler, The', 'Star Chamber, The', "Clara's Heart", 'Burglar', 'Comic Relief', 'Bloodbrothers', 'Rain Man', 'Masculine Feminine', 'Outer Limits, The', "Mama's Dirty Girls", 'Last Ride of the Dalton Gang, The', 'Why Me?', 'Number Seventeen', 'Manhunter', 'Bonfire of the Vanities, The', 'Working Girl', 'Shining Through', 'Slumber Party Massacre III', 'Tokyo Pop', 'Terminator 2', 'Terminator, The', 'King Kong Lives!', 'Those Daring Young Men in Their Jaunty', 'At Play in the Fields of the Lord', 'Crazy People', 'Memoirs of an Invisible Man', 'Clan of the Cave Bear, The', 'Final Terror, The', 'Reckless', 'High Spirits', 'Roxanne', 'Blade Runner', 'Wall Street', 'Pope of Greenwich Village', 'After School', 'Flaming Frontiers', 'Libeled Lady', 'Inserts', 'Blue Iguana, The', 'Tender Mercies', 'Nights in White Satin', 'Videodrome', 'Intimate Stranger', 'Highlander', 'Bodycount', 'Tango & Cash', "There's a Girl in My Soup", 'Swing Shift', 'Foul Play', 'Best Friends', 'Butterflies Are Free', 'Overboard', 'Girl from Petrovka, The', 'Housesitter', 'Wildcats', 'Protocol', 'Seems Like Old Times', 'Sugarland Express, The', 'Private Benjamin', 'Deceived', 'Arrowsmith', 'Say Goodbye Maggie Cole', 'Circus World', 'Affair in Trinidad', 'Lady from Shanghai', 'Lady in Question', 'Gilda', 'Loves of Carmen, The', 'Dick Tracy', 'Marnie', 'Hot Child in the City', 'Johnny Dangerously', 'Stark', 'Three Strange Loves', 'My Fair Lady', 'Unforgiven, The', 'Robin & Marian', "Children's Hour, The", 'Rainmaker, The', 'Pat & Mike', 'Lion in Winter, THe', 'Sea of Grass, The', "Guess Who's Coming to Dinner", 'Desk Set', 'Rooster Cogburn', 'On Golden Pond', "Adam's Rib", 'Boom Town', 'Dragon Seed', 'Little Women', 'Philadelphia Story, The', 'Without Love', 'Woman of the Year', 'Juice', 'Hoosiers', 'Tin Men', 'Last Temptation of Christ, The', 'Paris Trout', 'Souvenir', 'A Man for All Seasons', 'Knights & Emeralds', 'Masque of the Red Death', "Adventures of Smilin' Jack, The", 'Adventures in Dinosaur City', 'Allnighter, The', 'Caddyshack', 'Tom Sawyer', 'Rita, Sue & Bob Too', 'Hawk of Powder River', 'Tempest', 'Running Mates', 'Prettykill', 'Judge Priest', 'Harvey', 'If Looks Could Kill', 'Raising Arizona', 'Once Around', 'Loulou', 'World According to Garp, The', 'Virus', 'Northwest Passage', 'Gardens of Stone', 'Enemies, a Love Story', 'Addams Family, The', 'Freaks', 'Necessary Roughness', 'A Show of Force', 'Competition, The', 'Crossing Delancey', 'State of Things, The', 'Business As Usual', 'A Touch of Class', 'Women in Love.', "Salome's Last Dance", 'Casino', 'Smiles of a Summer Night', "New Year's Day", 'Mephisto', 'Easy Virtue', 'Swing It Sailor!', 'Strictly Business', 'Blame It on Rio', 'Straight to Hell', 'A View to a Kill', 'American Anthem', 'Bedtime Story', "Courtship of Eddie's Father, The", 'Night Train to Katmandu, THe', 'Port of Call', 'Paper Moon', 'Yellowbeard', "Adventures of Sherlock Holmes' Smarter", 'Flashback', "World's Greatest Lover, The", "Killer's Kiss", 'Deceivers, The', 'Breathless', 'Born on the Fourth of July', 'Awakenings', 'Annie Hall', 'Manhattan', 'Reds', 'Crimes of the Heart', 'Looking for Mr. Goodbar', 'Godfather, The', 'Godfather, Pt 2., The', 'I Will, I Will...For Now', 'Play It Again, Sam', 'Love & Death', 'Sleeper', 'Fellini Satyricon', 'Formula, The', 'Black Sunday', 'Bobby Deerfield', 'Last of the Red Hot Lovers', 'Mogambo', 'To Catch a Thief', 'Rear Window', 'Woman Who Came Back', 'Stanley & Livingstone', 'Bad Seed, The', 'Lethal Weapon 2', 'Blame It on the Bellboy', 'Drop Kick, The', 'Superman, The Movie', 'Superman IV: The Quest for Peace', 'Quackser Fortune Has a Cousin in the Bronx', 'Dead Calm', 'Days of Thunder', 'My Life As a Dog', 'Moon in the Gutter, The', 'Paris, Texas', 'Unfaithfully Yours', 'Bullseye!', 'Erik the Viking', 'Dragonard', 'Hard Choices', 'Rain People, The', 'A Year of the Quiet Sun', 'Desert Trail, The', 'Almost an Angel', 'Crocodile Dundee', 'American Friend, The', 'See You in the Morning', 'Arrogant, The', "Dracula's Widow", 'Ninja Masters of Death', 'Mystery Train', 'Go Tell the Spartans', 'True Stories', 'Ugetsu Monogatari', 'Rebel Rousers', 'Plain Clothes', 'Whose Life Is It, Anyway?', 'Running on Empty', 'Funny about Love', 'A Chorus Line, The Movie', 'Stewardess School', 'Big Town, The', 'Rumble Fish', 'Outsiders, The', 'Priceless Beauty', 'Streets of Fire', "Men Don't Leave", "Everybody's All American", 'Cape Fear', 'Postman Always Rings Twice, The', 'Crashing Thru', 'Get Out Your Handkerchiefs', 'Boy Friend, THe', 'Hard To Kill', 'Psycho', 'Jet Pilot', 'Under Cover', 'A Streetcar Named Desire', 'Golden Child, The', 'Statue, The', 'Christopher Columbus', 'In Country', 'Wild Geese, The', 'Second Coming of Suzanne., The', 'Bronco Billy', 'Gauntlet, The', 'Ratboy', 'Lady Vanishes', 'Kitchen Toto, THe', 'Carlton-Browne of the F.O.', 'Racketeer', 'Mr. & Mrs. Smith', 'Alrededor de Medianoche', "Losin' It", 'Into the Homeland', 'Boxing Babes', "Shock 'em Dead", 'Heller in Pink Tights', 'Two Women', 'Gold of Naples, The', 'Yesterday, Today & Tomorrow', 'Legend of the Lost', 'Brass Target', 'Fall of the Roman Empire, The', 'El Cid', 'Desire under the Elms', 'Two Nights with Cleo', 'Black Orchid, The', 'Angela', 'A Special Day', 'Blood Feud', 'Sophia Loren, Her Own Story', 'Running Away', 'Man of La Mancha', 'Operation Crossbow', 'Courage', 'RAD', 'Secret Admirer', 'Cocaine Cowboys', 'Test Pilot', 'Ape Man, The', 'Mission, The', 'Curly Sue', 'Lolita', 'Sex, Lies, and Videotape', 'Green Card', 'Gator Bait II', 'Being There', 'Terms of Endearment', 'Woman Times Seven', 'Bliss of Mrs. Blossom, The', 'Postcards from the Edge', 'Two Mules for Sister Sara', 'Dragonfight', 'Back Door to Heaven', 'Ciao Italia, Madonna Live from Italy', 'Madonna, Truth or Dare', 'A Certain Sacrifice', 'National Enquirer, The Untold Story', 'Immaculate Collection, The', 'Madonna Live, The Virgin Tour', 'Madonna, Justify My Love', 'Madonna, Like a Virgin', 'Hot to Trot', 'Fire with Fire', 'Hot Spot', 'Amarcord', 'Casablanca Express', 'Out of the Blue', 'Sands of Iwo Jima', 'Hand, The', 'Deep Cover', 'Il Bidone', 'El Guerrero Solitario', 'Heartbreak Ridge', 'Goodbye Girl, The', 'Audrey Rose', 'Polyester', 'Robin Hood: Prince of Thieves', 'White Sands', 'Color of Money, The', 'Children of a Lesser God', 'Matador', 'Women on the Verge of a Nervous Breakdown', 'Pepi Luci Bom', 'Forgotten, The', 'Flame & the Arrow, The', 'After the Shock', 'Modern Love', 'Riff Raff', 'Glory Stompers, The', 'Dances with Wolves', 'Matewan', 'Mississippi Burning', 'Eiger Sanction, The', 'Unsettled Land', 'Cat Chaser', 'Accused, The', 'Winter People', 'Reuben, Reuben', 'Made in Heaven', 'Top Gun', 'Witness', 'House on Carroll Street, The', 'Racing with the Moon', 'Lovesick', "She's Having a Baby", 'Greatest Story Ever Told, The', 'Hawks', 'So Fine', 'Paths of Glory', 'Tom Jones', 'Sunshine Boys, The', 'Caddyshack 2', 'Internal Affairs', 'JFK', 'New Jack City', 'Scenes from a Mall', 'Hope & Glory', "Ryan's Daughter", 'Man Who Loved Cat Dancing, The', 'Man Who Shot Liberty Valance, The', 'Dead-Bang', 'Big Top Pee-wee', 'Time Machine, The', 'Cabaret', 'Arthur', 'A Matter of Time', 'New York, New York', 'Nightmare on Elm Street, Pt. 5, The Dream Child', 'Fiendish Plot of Dr. Fu Manchu, The', 'Four American Composers', 'Asphalt Jungle, The', 'Ladies of the Chorus', 'How to Marry a Millionaire', 'Hollywood Out-Takes & Rare Footage', 'Nothing But Trouble', 'Wisdom', 'One Crazy Summer', "We're No Angels", 'No Small Affair', 'Ghost', 'About Last Night', 'Six Weeks', 'Return of October', 'Come Back, Little Sheba', 'Going Places', 'Monte Walsh', 'Mr. Arkadin', 'White of the Eye', 'Producers, The', 'Front, The', 'House of the Rising Sun', 'In a Shallow Grave', 'Mc Q', 'Lady from Louisiana', 'Wait Until Spring Bandini', 'Long Voyage Home, The', 'Trouble with Harry, The', 'Encounters', 'Hud', 'Operation Pacific', 'Surf Nazis Must Die', 'Teahouse of the August Moon', 'Back in the U.S.S.R.', 'Man Who Haunted Himself, The', 'Prisoner of Honor.', 'Control', 'Desert Rider', 'Wholly Moses!', 'Star Trek VI: The Undiscovered Country', 'Star Trek V: The Final Frontier', 'Circuitry Man', 'Cobra', 'Beverly Hills Cop II', 'Red Sonja', 'To Joy', 'Macbeth', 'Vertigo', 'Young Love: Lemon Popsicle Seven', 'Crack-Up', 'Bury Me Not on the Lone Prairie', 'Law & Order', 'Man from Montana', 'Long Gray Line, The', 'Rio Grande', 'Wings of Eagles, The', 'Jamaica Inn', 'Big Jake', 'Quiet Man, The', 'After the Rehearsal', 'Big Jim McLain', 'Smith!', 'Wild One, The', 'Manxman, The', 'International Velvet', 'Scanners', 'Trick or Treat', '48 Hrs.', 'Trip to Bountiful, The', 'Mister Roberts', 'Z', 'Maurice', 'Hamlet', 'La Femme Nikita', 'Honeymoon in Vegas', 'Going for the Gold', 'Shout at the Devil', 'A Smoky Mountain Christmas', 'Getting Physical', 'Torn Apart', 'From the Hip', 'Ratings Game, The', 'Class Act', 'Water', 'Silent Movie', 'Pink Cadillac', 'Jerk, The', 'Wild Times', 'Sweet Liberty', 'Grease II', 'Married to the Mob', 'Ladyhawke', 'Fabulous Baker Boys, The', 'Into the Night', 'Russia House, The', 'Tequila Sunrise', 'B. A. D. Cats', 'Last Movie, The', 'Dillinger', 'Little Dorrit', 'My Best Girl', 'Seizure', 'A Chorus of Disapproval', 'Rome Adventure', 'Drowning by Numbers', 'Born to Ride', 'Her Alibi', 'Glitz', 'Dangerous Pursuit', 'Experiment in Terror', 'Hideaways, The', "What's New Pussycat", "What's New Pussycat?", "Packin' It In", 'Naked Gun: From the Files of Police Squad!, THe', 'In Too Deep', 'Twins', 'Experts, The', 'Naked Lie', 'Mistress', 'Pleasure Palace', 'Adam at 6 A.M.', 'Web of Deceit', 'New York Stories', 'Dreams Lost, Dreams Found', 'Au Revoir les Enfants', 'Quo Vadis', 'Fighting Kentuckian, The', 'Zardoz', 'Police Academy 6: City under Siege', 'Police Academy 5: Assignment Miami Beach', 'Police Academy 3: Back in Training', "America's Music, Blues", 'Julia', 'Devils, The', 'Ransom', 'Cadillac Man', 'Best of Times, The', 'Death of a Salesman', 'It Started with a Kiss', 'Money, The', 'Empire of the Sun', 'Comfort of Strangers, The', "On Her Majesty's Secret Service", 'Pretty in Pink', 'PK. & the Kid.', 'Lone Star Trail, The', 'Summer', 'Planes, Trains & Automobiles', 'Pretty Woman', 'Flatliners', 'Hook', 'Riders of Pasco Basin', 'Gotta Dance, Gotta Sing', 'Desperate Hours', 'Gung Ho', 'Shooting Elizabeth', 'Strangers on a Train', 'Sacketts, The', 'To Die Standing', 'Rodeo Girl', 'Butch Cassidy & the Sundance Kid', 'Hellfighters', 'Final Countdown, The', 'Blue Velvet', 'Cousins', 'Black & White in Color', 'Another Woman', 'Night on Earth', 'Permanent Record', 'Fisher King, The', 'Another You', 'Young Lions, The', 'Cheerleader Camp', 'Trapper County War', 'Angel & the Badman', 'Impulse', 'Track Twenty-Nine', 'Freejack', 'John Wayne Matinee Double Feature, No. 1', 'Smallest Show on Earth, The', 'Innerspace', 'Presidio, The', 'Joe Versus the Volcano', 'Doors, The', 'Welcome Home, Roxy Carmichael', 'Cancel My Reservation', 'North by Northwest', 'Russians Are Coming, the Russians Are, The', 'Exodus', 'Ballad of Narayama, The', 'Out of the Darkness', 'Garden of the Finzi-Continis, The', 'Steppenwolf', 'Mackintosh Man, The', 'Partner', 'Conformist, The', 'Dirty Harry', "Ferris Bueller's Day Off", 'Legend', 'Buddy System, The', 'A Dry White Season', 'Rocky Horror Picture Show, The', 'War & Peace', 'Defense of the Realm', 'Basil The Rat', 'Fawlty Towers, Gourmet Night, Waldorf Salad & The Kipper & the Corpse', 'Going Under', 'U S. Sub Standard.', 'Hells Angels on Wheels', 'Passenger, The', 'Last Tango in Paris', 'Indigo Autumn & Lilac Dream', "Kriemhild's Revenge, The Nibelungenlied", 'Johnny Tiger', 'Head Office', 'Live & Let Die', 'Le Charme Discret de la Bourgeoisie', 'Blue City', 'Bad Boys', 'Whoopee Boys, The', 'Last Picture Show, The', 'Diamond Trap, The', 'Endless Love', 'Rocky', 'Cocktail', 'Sabotage', 'Madame Rosa', "Fozzie's Muppet Scrapbook", 'Desiree', 'Spartacus', 'Guys & Dolls', 'Until They Sail', 'Coming to America', 'Lilies of the Field', "River's Edge", 'Ruthless People', 'Secret of My Success, The', 'Shop on Main Street, The', 'Funny Farm', 'Lonely Passion of Judith Hearne, The', 'California Suite', 'Maximum Overdrive', 'Pale Rider', 'Kissing Place, The', 'French Lesson', 'Roller Blade', 'A Shot in the Dark', 'Treasure Seekers, The', 'Missing', 'Picasso Trigger', 'Hard Ticket to Hawaii', 'Diamonds are Forever', 'Baby Face', 'Violent Men, The', 'Cocoon', 'Clockwise', 'Romantic Comedy', 'Outland', "Hang 'em High", 'Basic Instinct', 'Total Recall', 'Stakeout', 'Unnamable II, The Statement of Randolph Carter, The', 'Trip, The', 'Ironweed', 'Kramer vs. Kramer', 'Still of the Night', 'Defending Your Life', 'Deer Hunter, The', 'Falling in Love', 'Heartburn', 'Silkwood', "Sophie's Choice", 'Out of Africa', "French Lieutenant's Woman, The", 'Plenty', 'A Cry in the Dark', 'She-Devil', 'Death Becomes Her', 'Kids & Pesticides', 'On a Clear Day You Can See Forever', 'Nuts', 'Yentl', 'Funny Girl', 'Fellow Traveller', 'Dodesukaden', 'Sicilian, The', 'So Ends Our Night', 'Sword of the Valiant', "Devil's Wanton, The", 'Driving Miss Daisy', 'Seventh Cross, The', 'Between Friends', 'Raintree County', "Driver's Seat, The", 'Reflections in a Golden Eye', 'X, Y & Zee', 'Secret Ceremony', 'Cleopatra', 'Father of the Bride', "Who's Afraid of Virginia Woolf?", 'A Little Night Music', 'Giant', 'Rumor Mill, The', 'Lassie Come Home', 'Return Engagement', 'Hammersmith Is Out', 'Super Duper Bloopers', 'Elizabeth Taylor Collection, The', 'Ash Wednesday', 'Last Time I Saw Paris, The', 'Cimarron', 'Apache Woman', 'Gary Numan - Berzerker', 'Mystic Pizza', 'Dogfight', 'Adventures of Rex & Rinty, The', 'Daphnis & Chloe', 'Marathon', 'Fort Apache', 'Wee Willie Winkie', 'Big Shots', "Doin' Time on Planet Earth", 'All the Right Moves', 'Some Kind of Wonderful', 'All New Tales from the Crypt, A Trilogy', 'Back to the Future', 'Winter Light', 'Silence, The', 'Magician, The', 'Four Horsemen of the Apocalypse, The', 'Critical Condition', 'Center of the Web', 'Border Shootout', 'Lean on Me', 'On Wings of Eagles', 'Texas', 'Allegheny Uprising', 'Dark Command', 'Peggy Sue Got Married', 'Dear America, Letters Home from Vietnam', "Prizzi's Honor", 'Man with Two Brains, The', 'Crimes of Passion', 'Jewel of the Nile, The', 'Romancing the Stone', 'Accidental Tourist, The', 'Sea Chase, The', 'Another Time, Another Place', 'Cannibal Women in the Avocado Jungle of Death', 'Mr Love.', '2001: A Space Odyssey', 'Persona', 'Scenes from a Marriage', 'Hour of the Wolf', 'Passion of Anna, The', 'Dangerous Moves', 'Sayonara', 'Where Eagles Dare', 'Teen Wolf', 'Amazon', 'Paper Chase, The', 'Virgin Spring, The', "Spider's Stratagem", 'Play Misty for Me', 'Going Ape', 'Cool Hand Luke', 'Phantom of the Ritz', 'Crash & Burn', 'After Dark My Sweet', 'Christopher Columbus: The Discovery', 'Young Sherlock Holmes', 'Doc Hollywood', 'Baja Oklahoma', 'Aliens', 'Alien Three', 'Alien: resurrection', 'Alien', 'One Woman or Two', 'Soggy Bottom U. S. A.', 'Bang the Drum Slowly', 'Catamount Killing, The', 'Fuzz', "Shoot Loud, Louder, I Don't Understand!", 'Bedazzled', 'Prince & the Pauper, The', 'One Hundred Rifles', 'Wild Party, The', 'Bandolero!', 'Last of Sheila, The', 'Hannie Caulder', 'Sounds of the Seventies...& the Beat Goes', 'Bird', 'Meet Millie', 'Hell Comes to Frogtown', 'Fortune Cookie, The', 'Sun Shines Bright, The', 'Squeeze, The', 'Start the Revolution Without Me', 'Major League', 'Bright Lights, Big City', 'Lost Boys, The', 'Cookie', 'Conversation, The', 'American Graffiti', 'Dangerous When Wet', 'Stir Crazy', 'Young Einstein', 'Killing, The', 'Cahill, United States Marshal', 'Savage Intruder, The', 'Sheltering Sky, The', 'An Officer & a Gentleman', 'Black Widow', 'Legal Eagles', 'Bloody Mama', 'A Patch of Blue', 'I Died a Thousand Times', 'Tentacles', 'Scalphunters, The', 'A Day in October', 'A Fistful of Dollars', 'My Science Project', 'Great Race, The', 'Searchers, The', 'Meteor', 'Rebel Without a Cause', 'West Side Story', 'Trash', 'A Big Hand for the Little Lady', 'A Fine Madness', 'Glass Menagerie, The', 'Harry & Son', 'Rachel, Rachel', 'Paris Blues', 'Fugitive Kind, The', 'Mr. & Mrs. Bridge', 'State of Grace', 'Shadow of a Doubt', 'Men, The', 'Stage Fright', 'Magic Town', 'That Lucky Touch', 'Lust for Gold', 'Heat', "Employee's Entrance", 'Night Is My Future', 'Witches, The', 'Vera Cruz', 'Apache', "Twilight's Last Gleaming", 'Frisco Kid, The', 'Bank on the Stars', 'Law of Desire', 'Quiller Memorandum, The', 'Longest Day, The', 'Name of the Rose, The', 'Bloodsport', 'Torment', 'Pelle the Conqueror', 'Taps', 'Freshman, The', 'Last Emperor, The', 'Grim Reaper, The', 'Le Dernier Combat', 'Too Beautiful for You', 'Fire, Ice & Dynamite', 'Heavens Above', 'One Eyed Jacks', 'Swing It, Sailor!', 'Wolf at the Door, The', 'Modern Times', 'Thunderbolt & Lightfoot', 'A Nous la Liberte', 'Scum', 'Inside Man, The', 'Apocalypse Now', 'Bellboy & the Playgirls, The', 'Terror, The', 'Raven, The', 'They Came from Within', 'Boy in Blue, The', 'Killer Tomatoes Strike Back', 'Attack of the Killer Tomatoes', 'Untouchables, The', 'Wise Guys', 'American Autobahn', 'Final Alliance, The', 'Bounty, The', 'Little Prince, The', 'Posse', 'Firefox', 'Penitentiary III', 'Ginger & Fred', 'Wrong Box, The', 'Wagonmaster', 'They Were Expendable', 'Last Hurrah, The', 'Law of the Golden West', 'Pioneer Marshal', 'Ranger of the Cherokee Strip', 'Vanishing Westerner', 'Bandits of Dark Canyon', 'Bold Frontiersman, The', 'Wild Frontier, The', "Firemen's Ball, The", 'Local Hero', 'French Connection, The', 'To Live & Die in L. A.', 'Ferry to Hong Kong', 'Eddie Murphy, Delirious', "Secret Policeman's Private Parts, The", 'Up the Creek', 'Yol', 'Sara Dane', 'Night Tide', "His Majesty O'Keefe", 'North to Alaska', 'Flight to Fury', 'Ride in the Whirlwind', 'Powderkeg', 'I Confess', 'Thirty-Nine Steps, The', 'Topaz', 'Murder', 'Dial M for Murder', 'Young & Innocent', 'Creature from Black Lake', 'Chariots of Fire', 'Monty Python Live at the Hollywood Bowl', 'Man Who Would Be King, The', 'Victory', "Kelly's Heroes", 'Next of Kin', 'Chattahoochee', 'Angelic Conversation, The', 'Down by Law', 'Killing Fields, The', 'Survival Zone', "Monty Python's Life of Brian", "Monty Python's the Meaning of Life", 'Red Tent, The', 'Dakota', 'Viva Zapata!', 'Green Berets, The', 'Big Bad John', 'Ticket of Leave Man, The', 'D-Day, The Sixth of June', 'Apprenticeship of Duddy Kravitz, The', 'A Clockwork Orange', 'Full Metal Jacket', 'Sanshiro Sugata', 'Rhapsody in August', 'No Regrets for Our Youth', 'Bad Sleep Well, The', 'Idiot, The', 'Rashomon', 'Sanjuro', 'Seven Samurai', 'Throne of Blood', 'Yojimbo', 'Kagemusha', 'Ikiru', 'Empire of Spiritual Ninja', 'Ninja, the Violent Sorcerer', 'Metropolis', 'Cloak & Dagger', 'Spiders', 'Human Desire', 'Spies', 'Testament of Dr. Mabuse, The', 'Fury', "Mo' Better Blues", 'Matt Talbot', 'Will Rogers, Look Back in Laughter', 'For a Few Dollars More', 'Thirty Seconds over Tokyo', 'Class of 1984', 'Juggernaut', 'Good Morning, Vietnam', 'Blood on the Sun', 'Paint Your Wagon', 'Ensign Pulver', 'Street People', 'Manhunt, The', 'Operation Nam', 'Fighting Seabees, The', 'Let It Rock', 'Eraserhead', 'Ladykillers, The', 'Sweet Smell of Success', 'And Now for Something Completely Different', 'Crackers', 'Green Glove', 'Menace on the Mountain', 'In Old California', 'Thirty Is a Dangerous Age, Cynthia', 'Ffolkes', 'Chisum', 'Hunt for Red October, The', 'Closely Watched Trains', 'Executive Action', 'Flying Tigers', "Father's Little Dividend", 'An Evening with Robin Williams', 'Eddie Murphy Raw', 'Harlem Nights', 'Santee', 'Good Father, The', 'Sometimes a Great Notion', 'Catch Twenty-Two', 'Dark Age', 'Deadline', 'Mysterious Mr. Wong', 'A Month in the Country', 'Prom Night III, The Last Kiss', 'Blood in, Blood Out', 'Wrong Arm of the Law, The', 'Orphans', "All the President's Men", 'J-Men Forever', 'Wild Bunch, The', 'Judgement in Berlin', 'Hot Line, The', 'Rocket Gibraltar', 'Yakuza, The', 'Jeremiah Johnson', 'Burn!', 'Magnum Force', 'Cyborg', 'Prisoner of Zenda, The', 'Scream', 'Assault, The', 'Flying Leathernecks', 'What Comes Around', "Mon Oncle D'Amerique", 'Culpepper Cattle Company, The', 'Survivors, The', 'Roadhouse Sixty-Six', 'Burning Poles, Cecil Taylor in Performance', 'Russkies', 'My Blue Heaven', 'Altered States', 'Cowboys, The', 'Code Name, Emerald', 'Patton', 'Midnight Cowboy', 'Falcon & the Snowman, The', 'Maitresse', 'Disorderlies', 'Raging Bull', "Garrison Keillor's Home", 'Overland Stage Raiders', 'Pals of the Saddle', 'Alone in the Dark', 'Beguiled, The', 'Escape from Alcatraz', 'Criss Cross', 'Midway', 'Indiana Jones & the Last Crusade', 'Duel', 'Separate but Equal', "Gosta Berling's Saga", 'Platoon', 'Crawling Hand, The', 'Willy Wonka & the Chocolate Factory', 'Joe Kidd', 'Santa Claus, The Movie', 'Boys Town', 'Erasure, Live Wild!', 'A Question of Honor', 'Check Your Guns', 'West to Glory', 'Throwback, The', 'Border Feud', 'Fighting Vigilantes, The', 'Law of the Lash', 'Outlaw Country', 'Return of the Lash', 'Mystery of the Hooded Horsemen', 'Tex Rides with the Boy Scouts', 'Shadows of the West', 'Instant Karma', 'Time Lock', 'Appointment in Honduras', 'Danton', 'Alamo, The', 'La Chevre, (The Goat)', 'Les Comperes', 'Dead Poets Society', 'Othello, The Lost Masterpiece', 'Battleground, The', 'Kings of the Road (In the Course of Time)', 'Hiroshima', 'Return of Martin Guerre, The', 'Somebody up There Likes Me', 'Jack Benny Show', 'Mutiny on the Bounty', 'Death Valley Days, Deadly Decision', "Monty Python's Flying Circus", "Monty Python's Flying Circus, Vol 1.", "Monty Python's Flying Circus, Vol 2.", "Monty Python's Flying Circus, Vol 3.", 'Valkenvania', "Secret Policeman's Other Ball, The", 'Taming of the Shrew, The', 'From Russia with Love', 'Offence, The', 'Hollywood Mavericks', "Live at Harrah's", 'Persuaders, The Overture, The', 'Nineteen Hundred', 'Van, The', 'My Country Right or Wrong', 'Clint Eastwood Collection, The', 'Complete Dirty Harry, Magnum Force, The', 'Dead Pool, The', 'Good, the Bad & the Ugly, The', 'Rawhide, Premiere Episode', 'Tightrope', 'Hearts of Fire', 'How the West Was Won', "Mummy's Hand, The", 'Great White Death', 'Mosquito Coast, The', 'Today We Kill....Tomorrow We Die', 'Tormenta Sobre Arizona', 'Back to the Future II', 'Maverick, Duel at Sundown', 'Shakespeare Series', 'Deadly Trackers', 'American Film Institute, Alfred Hitchcock', 'A Married Man', 'Othello', 'Only Way Home, The', 'Tales of Tomorrow', 'Inherit the Wind', 'This Is Horror', 'Conversation Piece', 'Crimson Pirate, The', "Devil's Disciple, The", 'Hallelujah Trail, The', 'Train, The', 'Jay Leno: The American Dream', 'Primal Rage', 'Industrial Symphony, The Dream of the Broken-Hearted', "Howie Mandel's North American Watusi Tour", 'Branford Marsalis, Steep', 'L. A. Story', 'Steve Martin Live!', 'Steve Martin, The Funnier Side of Eastern Canada', 'Runaway Barge, The', 'Romulus & the Sabines', 'Saint, The', 'Strange Brew', 'Another Forty-Eight Hours', 'Best of Eddie Murphy, Saturday Night Live, The', 'What about Bob?', "Mummy's Revenge, The", 'Harper', 'Left Handed Gun, The', 'Once upon a Wheel', 'Prize, The', 'Secret War of Harry Frigg, The', 'Two Jakes, The', 'Exile in Concert', 'Joe Piscopo New Jersey Special', 'Joe Piscopo Video, The', 'Death Valley Days, No Gun Behind His Badge', 'Salsa: The Motion Picture', "Hollywood's Greatest War Movies", 'Out for Justice', 'Case of the Mukkinese Battle Horn, The', 'Goon Show Movie, The', 'Great McGonagall, The', "I'm All Right Jack", 'Magic Christian, The', 'Never Let Go', 'Pink Panther, The', 'Two-Way Stretch', 'Face at the Window, The', 'Tom Thumb', 'Beartooth', 'James Taylor in Concert', 'Gangbusters', 'El Rublo de las Dos Caras', 'Law & Jake Wade, The', 'Chuka', 'Cry of the Innocent', 'Edison the Man', 'Keeper of the Flame', 'Spencer Tracy Legacy, The', 'Cheyenne, The Iron Trail', 'Dawn Rider, The', 'Duke, The Films of John Wayne', 'Frontier Horizon', 'Hell Town', 'Hurricane Express', 'Hurricane Express, The', "In Harm's Way", 'John Wayne Collection, Red River, The', "John Wayne Collector's Limited Edition", 'John Wayne Four Pack', 'John Wayne Matinee Double Feature, No. 2', 'John Wayne Matinee Double Feature, No. 3', 'John Wayne Matinee Double Feature, No. 4', 'John Wayne Six Pack', 'John Wayne Western Greats, Rio Bravo', 'King of the Pecos', 'Lawless Frontier', 'Lawless Frontier, The', 'Lawless Nineties, The', 'Lucky Texan', 'McQ', 'Neath Arizona Skies', 'Neath the Arizona Skies', 'Randy Rides Alone', 'Range Feud', 'Red River', 'Riders of Destiny', 'Sagebrush Trail', 'Shadow of the Eagle, The', 'Blood & Guns', 'Hot Money', 'Comedy Tonight', 'Robin Williams'];
  }

  /*initiate the autocomplete function on the "search" element, and pass along the list_of_movies array as possible autocomplete values:*/
  autocomplete(document.getElementById("search"), list_of_movies);
  //-------------------------------------------------------------------------------

  return svg1.node();
}
);

// window.refresh_search=function()
//   {
//     var entry = document.getElementById('entry').innerText;
//     console.log(entry);
//     search(entry);
//   }

  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.json("https://gist.githubusercontent.com/Guanaco2569/adc35cffd1c88d2cb05c470cd0f37a3f/raw/1b490ad486f06d558ff7e626513b2e1d8d734ffd/parsed2.json")
)});

  main.variable(observer("dataTemp1")).define("dataTemp1", ["d3"], function(d3){return(
d3.json("https://gist.githubusercontent.com/Guanaco2569/ea551601561e1a9e6739bdbf7ad7c6ab/raw/5350f71b8f001855d23fed66ac08dec267dcbe93/parsed.json")
)});

  main.variable(observer("dataTemp2")).define("dataTemp2", ["d3"], function(d3){return(
d3.json("https://gist.githubusercontent.com/Guanaco2569/adc35cffd1c88d2cb05c470cd0f37a3f/raw/9e58c72ced5aeb6801e29a0a68ec152e2f289537/parsed2.json")
)});

main.variable(observer("dataFilms")).define("dataFilms", ["d3"], function(d3){return(
d3.json("https://gist.githubusercontent.com/Guanaco2569/e85279ced24808ec38eaa940de871697/raw/40ce703c81a90ae1e7cc74df94bf0b987f959581/summary.json")
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
