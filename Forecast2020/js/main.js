//Set global variables to access csv data
var AllData;
var CurrentState;
var ElectoralData;

//buildstate graphs
function BuildGraph(state, box, longstate) {
  //set variables
  CurrentState = state;
  var filename = "https://raw.githubusercontent.com/tomsaunders98/2020ElectionModel/master/output/states/" + state + ".csv";
  var box = "#" + box;

  //build svg box and append to div
  var margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 60
    };
    width = 800 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;
    aspratio = 50*height/width + "%";
    var viewbox = [0, 0, 800, 800];
  var svg2 = d3.select(box)
    .append("div") //clever hack to make svg responsive
    .classed("svg-container", true)
    .style("padding-bottom", aspratio) //container class to make it responsive
    .append("svg")
    .attr("viewBox", viewbox)
    .attr("preserveAspectRatio","xMinYMin meet")
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  //Load state data
  d3.csv(filename,
    function(d) { //Parse data
      d.date = d3.timeParse("%Y-%m-%d")(d.date);
      d.CIRight = d.CIRight;
      d.CILeft = d.CILeft;
      d.Pred = (d.Pred === "NA") ? null : +d.Pred;
      d.Poll = (d.Poll === "NA") ? null : +d.Poll;
      return d;
    },

    function(data) {
      AllData = data;

      //build line, ensure that null values ignored
      var line = d3.line()
        .defined(function(d) {
          return d.Pred
        })
        .x(d => x(d.date))
        .y(d => y(d.Pred))

      //set x date scale
      var x = d3.scaleTime()
        .domain([new Date(2020, 2, 3), new Date(2020, 10, 3)])
        .clamp(true)
        .range([0, width]);

      //append x scale
      svg2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      //set y scale
      var y = d3.scaleLinear()
        .domain([0, 0.8])
        .range([height, 0]);
      //append y scale
      svg2.append("g")
        .call(d3.axisLeft(y));

      //build condifence interval area
      svg2.append("path")
        .datum(data)
        .attr("fill", "#cce5df")
        .attr("stroke", "none")
        .attr("d", d3.area()
          .x(function(d) {
            return x(d.date)
          })
          .y0(function(d) {
            return y(d.CIRight)
          })
          .y1(function(d) {
            return y(d.CILeft)
          })
        )

      //append projection line (interpolates from current day to election day)
      svg2.append("path")
        .datum(data.filter(line.defined()))
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("d", line);

      //append latent voter line (up until current day)
      svg2.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      //add poll points
      svg2.append('g')
        .selectAll("dot")
        .data(data.filter(function(d) {
          return d.Poll != null
        }))
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return x(d.date);
        })
        .attr("cy", function(d) {
          return y(d.Poll);
        })
        .attr("r", 2.5)
        .style("fill", "#69b3a2")

      //add line denoting election day + text
      svg2.append("text")
        .attr("x", x(new Date(2020, 9, 0)))
        .attr("y", y(0.7))
        .text("Election Day")
        .style("font-size", "15px")

      svg2.append('line')
        .attr("stroke", "#b2b2b2")
        .attr("stroke-dasharray", "4")
        .attr("x1", x(new Date(2020, 10, 3)))
        .attr("y1", y(0))
        .attr("x2", x(new Date(2020, 10, 3)))
        .attr("y2", y(0.8));

      //add y axis label
      svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Biden's share of the vote");

      //build description that goes under the graph
      var Preds = AllData.map(x => x.Pred);
      var Polls = AllData.map(x => x.Poll);
      var Polls = Polls.filter(poll => poll != null);
      var VisPoll = Math.round(Polls[Polls.length - 1] * 100);
      var FinalPred = Preds[Preds.length - 1];
      var VisPred = Math.round(FinalPred * 100);
      var $closedem = $('<ul></ul>').html("<li>This state will likely be <span class='demblue'>Democrat</span>.</li>")
        .append("<li>Biden's predicted vote share is <span class='demblue'>" + VisPred + "%</span>.</li>")
        .append("<li>The last available poll gave Biden <span class='demblue'>" + VisPoll + "%</span> of the vote.</li>");
      var $defdem = $('<ul></ul>').html("<li>This state will probably be <span class='demblue'>Democrat</span>.</li>")
        .append("<li>Biden's predicted vote share is <span class='demblue'>" + VisPred + "%</span>.</li>")
        .append("<li>The last available poll gave Biden <span class='demblue'>" + VisPoll + "%</span> of the vote.</li>");
      var $closegop = $('<ul></ul>').html("<li>This state will likely be <span class='gopred'>Republican</span>.</li>")
        .append("<li>Biden's predicted vote share is <span class='gopred'>" + VisPred + "%</span>.</li>")
        .append("<li>The last available poll gave Biden <span class='gopred'>" + VisPoll + "%</span> of the vote.</li>");
      var $defgop = $('<ul></ul>').html("<li>This state will probably be <span class='gopred'>Republican</span>.</li>")
        .append("<li>Biden's predicted vote share is <span class='gopred'>" + VisPred + "%</span>.</li>")
        .append("<li>The last available poll gave Biden <span class='gopred'>" + VisPoll + "%</span> of the vote.</li>");
      if (FinalPred > 0.5 && FinalPred < 0.56) {
        $("#title1").html("<h4>" + longstate + "</h4>");
        $("#desc").html($closedem);
      }
      if (FinalPred > 0.56) {
        $("#title1").html("<h4>" + longstate + "</h4>");
        $("#desc").html($defdem);
      }
      if (FinalPred < 0.5 && FinalPred > 0.44) {
        $("#title1").html("<h4>" + longstate + "</h4>");
        $("#desc").html($closegop);
      }
      if (FinalPred < 0.44) {
        $("#title1").html("<h4>" + longstate + "</h4>");
        $("#desc").html($defgop);
      }
    })
  return state;
}

//Electoral Vote distribution + topline
function ElectoralVotes(Graph) {
  if (Graph == true) { //build box only if graph specified true
    //build box and attach to div
    var margin1 = {
        top: 30,
        right: 20,
        bottom: 40,
        left: 60
      },
      width1 = 800 - margin1.left - margin1.right,
      height1 = 400 - margin1.top - margin1.bottom;
      aspratio = 50*height1/width1 + "%";
      var viewbox = [0, 0, 900, 900];
    var svg1 = d3.select("#hist_elect")
      .append("div") //clever hack to make svg responsive
      .classed("svg-container", true)
      .style("padding-bottom", aspratio) //container class to make it responsive
      .append("svg")
      .attr("viewBox", viewbox)
      .attr("preserveAspectRatio","xMinYMin meet")
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform",
        "translate(" + margin1.left + "," + margin1.top + ")");

    // build scales
    var x = d3.scaleLinear()
      .domain([150, 400])
      .range([0, width1]);

    var y = d3.scaleLinear()
      .range([height1, 0]);
    y.domain([0, 1500]);
  }

  d3.csv("https://raw.githubusercontent.com/tomsaunders98/2020ElectionModel/master/output/ev_prediction.csv", function(data) {
    ElectoralData = data;
    //Calculate mean electoral vote
    var VotesInt = data.map(x => Number(x.result_ev_all_states));
    var reducer = (accumulator, currentValue) => accumulator + currentValue;
    var avg = Math.round(VotesInt.reduce(reducer) / VotesInt.length);

    if (Graph == true) { // if graph is true build histogram

      //define histogram
      var histogram = d3.histogram()
        .value(function(d) {
          return d.result_ev_all_states;
        })
        .domain(x.domain())
        .thresholds(x.ticks(70));

      var bins = histogram(data);

      //attach histogram
      svg1.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) {
          return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function(d) {
          return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function(d) {
          return height1 - y(d.length);
        })
        .style("fill", "#69b3a2")

      //build line at 270 votes + text
      svg1.append('line')
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4")
        .attr("x1", x(270))
        .attr("y1", y(0))
        .attr("x2", x(270))
        .attr("y2", y(1400))

      svg1.append("text")
        .attr("x", x(185))
        .attr("y", y(1300))
        .text("Winning Majority of Electoral Votes")
        .style("font-size", "15px")

      //build line at average electoral votes + text
      svg1.append('line')
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4")
        .attr("x1", x(avg))
        .attr("y1", y(0))
        .attr("x2", x(avg))
        .attr("y2", y(1400))

      svg1.append("text")
        .attr("x", x(avg + 5))
        .attr("y", y(1300))
        .text("Biden expected to win " + avg + " Electoral Votes")
        .style("font-size", "15px")

      //attach axis
      svg1.append("g")
        .attr("transform", "translate(0," + height1 + ")")
        .call(d3.axisBottom(x));

      svg1.append("g")
        .call(d3.axisLeft(y));

      //build axis headings
      svg1.append("text")
        .attr("transform", "translate(" + (width1 / 2) + " ," + (height1 + margin1.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Number of Electoral Votes")

      svg1.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin1.left)
        .attr("x", 0 - (height1 / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Simulations")
    }

    if (Graph == false) { //if no graph then build topline
      //find percentage that are over 270 (= likelihood that Biden wins)
      var Votes = ElectoralData.map(x => x.result_ev_all_states);
      var WinningVotes = Votes.filter(vote => vote >= 270);
      var Prob = Math.round((WinningVotes.length / Votes.length) * 100);
      $("#BigNumber").html("<h2> There is a <span class='demblue'>" + Prob + "%</span> chance of Biden winning the Presidency.</h2>");
    }
  });
}

//Electoral Map
function BuildMap() {

  //build box and attach to div
  var width = 960;
  var height = 500;
  var mapviewbox = [0, 0, 900, 900];
  aspratio = 50*height/width + "%";
  var svg3 = d3.select("#map")
    .append("div") //clever hack to make svg responsive
    .classed("svg-container", true)
    .style("padding-bottom", aspratio) //container class to make it responsive
    .append("svg")
    .attr("viewBox", mapviewbox)
    .attr("preserveAspectRatio","xMinYMin meet")
    .classed("svg-content-responsive", true)

  //assign colours for two scales (Dem + GOP)
  var HighGOPColour = "#f7a0a3";
  var LowGOPColour = "#E9141D";
  var HighDemColour = "#0015BC";
  var LowDemColour = "#5769ff";

  //get usa projection and add to path
  var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale([1000]);

  var path = d3.geoPath()
    .projection(projection);

  //build tooltip box
  var div = d3.select("#map")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("https://raw.githubusercontent.com/tomsaunders98/2020ElectionModel/master/output/FinalResults.csv", function(data) {

    //build two scales from red -> pale red for GOP states, blue -> pale blue for Dem states
    var DataArray = data.map(x => x.pred);
    var GOPstates = DataArray.filter(x => x < 0.5);
    var Demstates = DataArray.filter(x => x > 0.5);
    var MinGOPVal = d3.min(GOPstates);
    var MaxGOPVal = d3.max(GOPstates);
    var MinDemVal = d3.min(Demstates);
    var MaxDemVal = d3.max(Demstates);
    var GOPscale = d3.scaleLinear().domain([MinGOPVal, MaxGOPVal]).range([LowGOPColour, HighGOPColour]);
    var Demscale = d3.scaleLinear().domain([MinDemVal, MaxDemVal]).range([LowDemColour, HighDemColour]);

    d3.json("us-states.json", function(json) {

      //load json and check for matching states
      for (var i = 0; i < data.length; i++) {
        var dataState = data[i].state;
        var dataValue = data[i].pred;

        for (var j = 0; j < json.features.length; j++) {
          var jsonState = states[json.features[j].properties.name.toLowerCase()];
          if (dataState == jsonState) {
            var Longstate = json.features[j].properties.name;

            //input csv data into json to use in building map
            json.features[j].properties.pred = dataValue;
            json.features[j].properties.poll = data[i].polls;
            break;
          }
        }
      }

      //input json data into map
      svg3.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function(d) { //seperate scales for Dem/GOP states
          if (d.properties.pred > 0.5) {
            return Demscale(d.properties.pred);
          }
          if (d.properties.pred < 0.5) {
            return GOPscale(d.properties.pred);
          }
        })

        //add mousreover tooltip functionality
        .on("mouseover", function(d) {
          div.transition()
            .duration(200)
            .style("opacity", .8);
          if (d.properties.poll == "FALSE") {
            div.html("<ul><li><b>" + d.properties.name + "</b></li><li>" + Math.round(d.properties.pred * 100) + "% chance of Biden winning</li><li>No Polls Available</li></ul>");
          } else {
            div.html("<ul><li><b>" + d.properties.name + "</b></li><li>" + Math.round(d.properties.pred * 100) + "% chance of Biden winning</li></ul>");
          }
          div.style("left", (d3.event.pageX - 300) + "px") //position linked to mouse position
            .style("top", (d3.event.pageY - 150) + "px");
        })

        .on("mouseout", function(d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });
    });
  });
}

//dictionary for moving from state names to codes
var states = {
  "alaska": "AK",
  "alabama": "AL",
  "arizona": "AZ",
  "arkansas": "AR",
  "california": "CA",
  "colorado": "CO",
  "connecticut": "CT",
  "delaware": "DE",
  "florida": "FL",
  "georgia": "GA",
  "hawaii": "HI",
  "iowa": "IA",
  "idaho": "ID",
  "illinois": "IL",
  "indiana": "IN",
  "kansas": "KS",
  "kentucky": "KY",
  "louisiana": "LA",
  "maine": "ME",
  "maryland": "MD",
  "massachusetts": "MA",
  "michigan": "MI",
  "minnesota": "MN",
  "mississippi": "MS",
  "missouri": "MO",
  "montana": "MT",
  "nebraska": "NE",
  "nevada": "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  "ohio": "OH",
  "oklahoma": "OK",
  "oregon": "OR",
  "pennsylvania": "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  "tennessee": "TN",
  "texas": "TX",
  "utah": "UT",
  "vermont": "VT",
  "virginia": "VA",
  "washington": "WA",
  "west virginia": "WV",
  "wisconsin": "WI",
  "wyoming": "WY"
};
//list of all states with polls
var StatesWPolls = ["AK", "AL", "AZ", "CA", "CO", "FL", "GA", "HI", "IA", "ID", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NH", "NJ", "NM", "NV", "OH", "OK", "OR", "PA", "SC", "TN", "TX", "UT", "VA", "WA", "WI"];
//list of all states built from dictionary
var SearchTerms = Object.keys(states);
var SearchTerms = SearchTerms.map(SearchTerms => SearchTerms.toLowerCase());

//smoothing movement on inbound # links
$(document).on('click', '.nav-link', function(event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});

//Math symbols
(function () {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src  = "https://mathjax.rstudio.com/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
  document.getElementsByTagName("head")[0].appendChild(script);
})();
