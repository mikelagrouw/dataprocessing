//mike la grouw 10626700

// select svg 
var svg = d3.select("svg"),
//set margins width and height 
margin = {top: 50, bottom: 50, left: 50, right: 50},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// divide date
bisectDate = d3.bisector(function(d) { return d.date; }).left;
// parse time
var parseTime = d3.timeParse("%Y%m%d");


// open json 
d3.json("file.json", function(data){
	// make integers of data
  for(i = 0; i < 365; i++)
  {
  	data.stat[i].bewolking = Number(data.stat[i].bewolking);
    data.stat[i].date = parseTime(data.stat[i].date);
    data.stat[i].neeslag = Number(data.stat[i].neeslag);
    data.stat[i].hoogstewindstoot = Number(data.stat[i].hoogstewindstoot)

  }
// x scale
var x = d3.scaleTime()
.rangeRound([0, width]);
// y scale
var y = d3.scaleLinear()
.rangeRound([height, 0]);
// focus variable for crosshair
var focus = svg.append("g")                                
    .style("display", "none");
  // set domains
  y.domain(d3.extent(data.stat, function(d){return d.bewolking; }));
  x.domain(d3.extent(data.stat, function(d){return d.date;}));
// set lines
var line = d3.line()
    .x(function(d) { return x(d.date);})
    .y(function(d) { return y(d.bewolking);});
var line_2 = d3.line()
    .x(function(d) { return x(d.date);})
    .y(function(d) { return y(d.neeslag);});
var line_3 = d3.line()
    .x(function(d) { return x(d.date);})
    .y(function(d) { return y(d.hoogstewindstoot);});

    // draw x axis
  g.append("g")
      .attr("class", "x_axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

   // and y axis
  g.append("g")
      .attr("class", "yaxis")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .style("text-anchor", "end")
      .text("bewolking");

// draw lines 
  g.append("path")
      .datum(data.stat)
      .attr("class", "lijn")
      .attr("fill", "none")
      .style("stroke", "blue")
      .attr("d" , line);
  // set domain for next line
  y.domain(d3.extent(data.stat, function(d){return d.neeslag; }));
  // draw line
  g.append("path")
      .datum(data.stat)
      .attr("class", "lijn")
      .attr("fill", "none")
      .style("stroke", "red")
      .attr("d" , line_2);
    // set domainfor new line
    y.domain(d3.extent(data.stat, function(d){return d.hoogstewindstoot; }));
  // draw line
  g.append("path")
      .datum(data.stat)
      .attr("class", "lijn")
      .attr("fill", "none")
      .style("stroke", "grey")
      .attr("d" , line_3);
      // set domain for crosshair
  y.domain(d3.extent(data.stat, function(d){return d.bewolking; }));


  //im gonna make that crosshair
  focus.append("circle")
  .attr("class", "y")
  .style("fill", "none")
  .style("stroke", "black")
  .attr("r", 10);

  // add text canvas
  focus.append("text")
      .attr("x", 15)
  // append rectangle for mouseover
  svg.append("rect")                                     
        .attr("width", width)                              
        .attr("height", height)                            
        .style("fill", "none")                             
        .style("pointer-events", "all")                    
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mouse);
  // move crosshair and fill data corresponding to mouse position
  function mouse(){ 
    var x0 = x.invert(d3.mouse(this)[0]),
    i = bisectDate(data.stat, x0, 1),
    d0 = data.stat[i - 1],
    d1 = data.stat[i],
    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.bewolking) + ")");
    focus.select("text").text("bewolking: " + data.stat[i].bewolking + " neerslag(rood): " + data.stat[i].neeslag + " hoogste windstoot(grijs): " + data.stat[i].hoogstewindstoot);


    
  }

  

  return data;
} );
