window.scrollTo(0, 0);

$(document).ready(function() {




});



function BuildLine() {
  //Declare scrollheight, build svg box

  var svg = d3.select("svg"),
    margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 80
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("data/CovidExeter.csv",
    function(d) {
      return {
        date: d3.timeParse("%d-%b")(d.date),
        value: parseInt(d.Halls)
      }
    },


    function(data) {
      // Build original axis
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) {
          return d.date;
        }))
        .range([0, width]);


      var y = d3.scaleLinear()
        .domain([d3.min(data, function(d) {
          return d.value;
        }), d3.max(data, function(d) {
          return d.value;
        })])
        .range([height, 0]);
      // To work out datapoint per scroll we divide total scrollable distance by number of data points
      // Declare Important variables


      // Build rest of original graph
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + y(d3.min(data, function(d) {
          return d.value;
        })) + ")")
        .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axis-title")
        .style("text-anchor", "middle")
        .text("Cases of COVID-19 among Exeter students");


      //Build Initial Line
      var line = g
        .append("g")
        .append("path")
        .datum(data.filter(function(d, i) {
          return i === 0
        }))
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) {
            return x(d.date);
          })
          .y(function(d) {
            return y(d.value);
          })
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
      var oldtop = 0;
      var mh;

      //1. Calculate document length
      // window length included
      // 1/3 of view height for title
      // each data point on main graph is 1/5 of scrollheight
      // each viz is 1  scrollheight

      var scrollheight = $(window).height() + $(window).height() / 3 + data.length * ($(window).height() / 5) + $(window).height() * graphTs +
        $(window).height() / 3 + $(window).height();
      scrollword = scrollheight + "px";
      d3.select('body')
        .style("height", scrollword);





      conctop = (scrollheight - $(window).height() / 2) + "px";
      d3.select('.conc')
        .style("top", conctop);

      d3.select('.conc')
        .style("height", $(window).height() + "px");






      //1. title
      var top = $(window).height() / 3 + "px";
      d3.select('.title')
        .style("top", top);

      //2. Description Boxes
      var points = [9, 13, 20, 25, 30, 35, 40, 45, 50, 55];
      graphTL = [20, 35];

      var sections = d3.selectAll('.desc');
      setTimeout(function() {
        $.each(points, function(i, d) {
          var count = 0;
          $.each(graphTL, function(ib, db) {
            if (d >= db) {
              count++;
            }

          });
          top = d * ($(window).height() / 5) + $(window).height() / 3 + count * $(window).height();


          if (i > 0) {

            let elem = document.getElementsByClassName("desc");
            let rect = elem[i - 1].getBoundingClientRect();
            mh = rect.height;

            if (oldtop + mh >= top) {
              top = oldtop + mh + $(window).height() / 10;

            }


          }
          oldtop = top;
          top = top + "px";

          d3.select(sections.nodes()[i])
            .style("top", top);
        });
      }, 100);

      //3. Colours
      var colours = [10];
      scrolls = [];
      $.each(colours, function(i, d) {
        pxlval = (d) * ($(window).height() / 5);
        scrolls.push(pxlval);
      });







      //Update Line

      d3.select(window)
        .on("scroll", function() {
          scroll = $(window).scrollTop();
          console.log(scroll);
          console.log(scrollheight);
          if (scroll >= scrollheight - 2 * $(window).height() & activatef4 === false) {
            activatef4 = true;
            d3.select(".box")
              .style("position", "absolute")
              .style("top", scrollheight - 2 * $(window).height() + "px");


          }
          if (scroll > scrollheight - $(window).height()) {
            d3.selectAll(".desc")
              .remove()
            d3.select(".box")
              .remove()
            d3.select(".title")
              .remove()
            var bheight = d3.select(".conc").node().getBoundingClientRect().height;
            if (bheight < $(window).height()) {
              bheight = $(window).height() + "px";
            } else {
              bheight = bheight + "px";
            }
            console.log(bheight);

            d3.select('body')
              .style("height", bheight);
            d3.select(".conc")
              .style("top", 0);


          }
          $.each(scrolls, function(i, d) {
            if (parseInt(scroll) >= d & scroll <= (d + $(window).height() / 5)) {
              var reds = d3.selectAll('.red')
              d3.select(reds.nodes()[i])
                .style("color", "#67A8C4");
            } else {
              var reds = d3.selectAll('.red')
              d3.select(reds.nodes()[i])
                .style("color", "#67A8C4");
            }

          });

          if (sp === true) {
            if (ft === true) {
              oldno = $(window).scrollTop() / ($(window).height() / 5);
              oldscroll = $(window).scrollTop() + $(window).height();
              ft = false;
            }
            scroll = $(window).scrollTop();
            if (scroll > oldscroll) {
              sp = false;
              ft = true;
              graphCs++;
              update(data, "Cases of COVID-19 among Exeter students", df, true);
            }
          }
          if (sp === false) {
            scroll = ($(window).scrollTop() - graphCs * $(window).height()) / ($(window).height() / 5);
            var df = data.filter(function(d, i) {
              return i <= scroll;
            })
            if (colours.indexOf(parseInt(scroll)) >= 0) {
              col1 = colours[colours.indexOf(parseInt(scroll))];
              df = data.filter(function(d, i) {

                return i < (parseInt(scroll));
              })
              var newline = g
                .append("g")
                .append("path")
                .datum(data.filter(function(d, i) {
                  return i >= col1 - 1 & i <= col1;
                }))
                .attr("fill", "#67A8C4")
                .attr("class", "redline")
                .attr("stroke", "#67A8C4")
                .attr("d", d3.line()
                  .x(function(d) {
                    return x(d.date);
                  })
                  .y(function(d) {
                    return y(d.value);
                  })
                )
            } else {
              d3.select(".redline").remove();
            }
            line
              .datum(df)
              .transition()
              .duration(1000)
              .attr("d", d3.line()
                .x(function(d) {
                  return x(d.date);
                })
                .y(function(d) {
                  return y(d.value);
                })
              )
          }
          if (parseInt(scroll) == 20 & activated === false) {
            activated = true;
            sp = true;
            d3.csv("data/MeanDepression.csv",
              function(d) {
                return {
                  date: d3.timeParse("%d-%b")(d.date),
                  value: parseFloat(d.PHQ)
                }
              },
              function(data) {
                update(data, "Mean depression scores (PHQ-9) for students")
              })

          }
          if (parseInt(scroll) == 35 & activated1 === false) {
            activated1 = true;
            sp = true;
            d3.csv("data/MeanLonely.csv",
              function(d) {
                return {
                  date: d3.timeParse("%d-%b")(d.date),
                  value: parseFloat(d.lonely)
                }
              },
              function(data) {
                update(data, "Mean loneliness scores among students ")
              })

          }
          if (parseInt(scroll) == 13 & activated2 === false) {
            activated2 = true;
            sp = true;
            d3.csv("data/CovidExeterPop.csv",
              function(d) {
                return {
                  date: d3.timeParse("%d-%b")(d.date),
                  value: parseInt(d.people)
                }
              },
              function(data) {
                addgraph(y, data)
              })

          }
          if (parseInt(scroll) == 14) {
            g.selectAll(".line2")
              .remove()

            g.selectAll(".axis--y1")
              .remove()
          }

        });

      function addgraph(scale, data, reset = false) {


        // var y1 = d3.scaleLinear()
        //   .domain([d3.min(data, function(d) {
        //     return d.value;
        //   }), d3.max(data, function(d) {
        //     return d.value;
        //   })])
        //   .range([height, 0]);
        var y1 = scale

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
            .x(function(d) {
              return x(d.date);
            })
            .y(function(d) {
              return y1(d.value);
            }))

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
        x.domain(d3.extent(data, function(d) {
          return d.date;
        }))


        g.selectAll(".axis--x")
          .transition()
          .duration(1000)
          .call(d3.axisBottom(x));
        // create the Y axis
        y.domain([0, d3.max(data, function(d) {
          return d.value;
        })]);

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
            .x(function(d) {
              return x(d.date);
            })
            .y(function(d) {
              return y(d.value);
            }))
        if (reset === false) { //Only animate in if its a new graph, otherwise just revert

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
