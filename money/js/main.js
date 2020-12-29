window.scrollTo(0,0);
function BuildLine(){
  //Declare scrollheight, build svg box

  var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 20, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/treasury10year.csv",
  function(d){
    return { date : d3.timeParse("%d/%m/%Y")(d.date),
             value : d.rate }
  },


function(data) {
  // Build original axis
  var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([0, width]);


  var y = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.value; }), d3.max(data, function(d) { return d.value; })])
      .range([height, 0]);
  // To work out datapoint per scroll we divide total scrollable distance by number of data points
  // Declare Important variables


  // Build rest of original graph
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + y(d3.min(data, function(d) { return d.value; })) + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y));

  g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height/ 2))
      .attr("dy", "1em")
      .attr("class", "axis-title")
      .style("text-anchor", "middle")
      .text("10-year US Treasury yeilds, %");


//Build Initial Line
  var line = g
    .append("g")
    .append("path")
      .datum(data.filter(function(d, i){return i === 0}))
      .attr("class", "line")
      .attr("d", d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); })
    )

//Calculate Sections
//Important variables
var sp = false;
var ft = true;
var graphCs = 0;
var graphTs = 2;
var activated = false;
var activated1 = false;
var oldscroll = 0;
var activated2 = false;
var activatef4 = false;

//1. Calculate document length
// window length included
// 1/3 of view height for title
// each data point on main graph is 1/5 of scrollheight
// each viz is 1  scrollheight

var scrollheight = $(window).height() + $(window).height()/3 + data.length*($(window).height()/5) + $(window).height()*graphTs +
$(window).height()/3 + $(window).height();
scrollword = scrollheight + "px";
d3.select('body')
  .style("height", scrollword);

console.log(scrollheight);


conctop = (scrollheight - $(window).height()/2) + "px";
d3.select('.conc')
  .style("top", conctop);




//1. title
var top = $(window).height()/3 + "px";
d3.select('.title')
  .style("top", top);

//2. Description Boxes
var points = [9,11,15,16,17,22,34];
var sections = d3.selectAll('.desc');
$.each(points, function(i, d) {
  console.log(i);
    if(i > 0){
      elemt = d3.select(sections.nodes()[(i-1)]).node();
      console.log(elemt);
      mh = elemt.getBoundingClientRect().height;
      // if (((d+1)*($(window).height()/5) - mh) < oldtop){
      //   console.log("too big");
      //     top = oldtop + mh + ($(window).height()/10) + "px";
      //     console.log(top);
      // }else{
        top = ((d-1)*($(window).height()/5));
      if (top < oldtop){
        top = oldtop + $(window).height()/20
        console.log(d);
      }

    }else{
      top = ((d-1)*($(window).height()/5)) + $(window).height()/5
    }
    oldtop = top;
    top = top + "px";

    d3.select(sections.nodes()[i])
      .style("top", top);
});

//3. Colours
var colours = [9,11];
scrolls = [];
$.each(colours, function(i, d) {
    pxlval = (d)*($(window).height()/5);
    scrolls.push(pxlval);
});







//Update Line

d3.select(window)
  .on("scroll", function() {
    scroll = $(window).scrollTop();
    if (scroll >= scrollheight - 2*$(window).height() & activatef4 === false){
      activatef4 = true;
      d3.select(".box")
        .style("position", "absolute")
        .style("top", scrollheight - 2*$(window).height() + "px");

    }
    if (scroll > scrollheight - $(window).height()){
      d3.selectAll(".desc")
        .remove()
        d3.select(".box")
          .remove()
      d3.select(".title")
        .remove()
      var bheight = d3.select(".conc").node().getBoundingClientRect().height + "px";

      d3.select('body')
        .style("height", bheight);
      d3.select(".conc")
        .style("top", 0);


    }
      $.each(scrolls, function(i, d) {
        if (parseInt(scroll) >= d & scroll <= (d+$(window).height()/5)){
          var reds = d3.selectAll('.red')
          d3.select(reds.nodes()[i])
            .style("color", "#C85E2F");
        } else{
          var reds = d3.selectAll('.red')
          d3.select(reds.nodes()[i])
            .style("color", "#E9DEB5");
        }

      });

      if (sp === true){
        if (ft === true){
          oldno = $(window).scrollTop()/($(window).height()/5);
          console.log("Oldno" + oldno);
          oldscroll = $(window).scrollTop() + $(window).height();
          ft = false;
        }
        scroll = $(window).scrollTop();
        if (scroll > oldscroll){
          sp = false;
          ft = true;
          graphCs++;
          update(data, "10-year US Treasury yeilds, %", df, true);
        }
      }
      if (sp === false){
        scroll = ($(window).scrollTop()- graphCs*$(window).height())/($(window).height()/5);
        console.log("Scroll " + scroll); //scroll level
        var df = data.filter(function(d, i){
          return i <= scroll;
        })
        if (colours.indexOf(parseInt(scroll)) >= 0){
          col1 = colours[colours.indexOf(parseInt(scroll))];
          df = data.filter(function(d, i){

            return i < (parseInt(scroll));
          })
          var newline =  g
            .append("g")
            .append("path")
              .datum(data.filter(function(d, i){return i >= col1-1 & i <= col1; }))
              .attr("fill", "#C85E2F")
              .attr("class", "redline")
              .attr("stroke", "#C85E2F")
              .attr("d", d3.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.value); })
            )
        }else{
          d3.select(".redline").remove();
        }
        line
            .datum(df)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.value); })
            )
      }
      if (parseInt(scroll) == 15 & activated === false){
        activated = true;
        sp = true;
        d3.csv("data/TreasuryTransactions1.csv",
          function(d){
            return { date : d3.timeParse("%d/%m/%Y")(d.date),
                     value : parseFloat(d.value) }
          },
        function(data) {update(data, "High Yield Index Option-Adjusted Spread")})

      }
      if (parseInt(scroll) == 17 & activated1 === false){
        console.log("test");
        activated1 = true;
        sp = true;
        d3.csv("data/TranbyF09-20.csv",
          function(d){
            return { date : d3.timeParse("%Y-%m")(d.date),
                     value : parseFloat(d.value) }
          },
        function(data) {update(data, "High Yield Index Option-Adjusted Spread")})

      }
      if (parseInt(scroll) == 19 & activated2 === false){
        console.log("test");
        activated2 = true;
        sp = true;
        d3.csv("data/FRB-2.csv",
          function(d){
            return { date : d3.timeParse("%d/%m/%Y")(d.date),
                     value : parseFloat(d.value) }
          },
        function(data) {addgraph(data)})

      }
        if (parseInt(scroll) == 30){
          g.selectAll(".line2")
            .remove()

          g.selectAll(".axis--y1")
              .remove()
        }

  });
function addgraph(data, reset = false){


  var y1 = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.value; }), d3.max(data, function(d) { return d.value; })])
      .range([height, 0]);

  g.append("g")
      .attr("class", "axis axis--y1")
      .attr("transform", "translate(" + width + " ,0)")
      .call(d3.axisRight(y1));

  line2 = g
      .append("g")
      .append("path")
      .datum(data)
      .attr("class", "line2")
      .attr("d", d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y1(d.value); }))

  var totalLength = line2.node().getTotalLength();

  line2
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(2000)
      .ease(d3.easeSin)
      .attr("stroke-dashoffset", 0);




}




function update(data, title, df = data, reset = false) {


    // Create the X axis:
    x.domain(d3.extent(data, function(d) { return d.date; }))


    g.selectAll(".axis--x")
      .transition()
      .duration(1000)
      .call(d3.axisBottom(x));
    // create the Y axis
    y.domain([d3.min(data, function(d) { return d.value; }), d3.max(data, function(d) { return d.value;  }) ]);

    g.selectAll(".axis--y")
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    g.selectAll(".axis-title")
      .text(title)

    g.selectAll(".line")
      .remove()



    line = g
        .append("g")
        .append("path")
        .datum(df)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.value); }))
    if (reset === false){//Only animate in if its a new graph, otherwise just revert

      var totalLength = line.node().getTotalLength();

      line
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(2000)
          .ease(d3.easeSin)
          .attr("stroke-dashoffset", 0);
    }

  }





})
}
