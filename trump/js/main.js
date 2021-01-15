// Bind leftward scroll to mousewheel
$(document).ready(function() {
  $('.box').mousewheel(function(e, delta) {
    if (Math.abs(e.deltaX)) {
      return
    } else {
      this.scrollLeft += (e.deltaY * 15);
    }
    e.preventDefault();
  });
});

function BuildLine() {
  // data range
  var launchcamp = new Date(2015, 5, 16);
  var fday = new Date(2021, 1, 20);

  //Load Tweets
  d3.csv("data/tweets.csv",
    function(d) {
      d.date = d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date);
      d.id = d.id;
      d.text = d.text;
      d.rt = (d.isRetweet === "f") ? false : true;
      d.delete = (d.isDeleted === "f") ? false : true;
      d.flag = (d.isFlagged === "f") ? false : true;
      d.type = (d.flag === true) ? "f" : (d.delete === true) ? "d" : (d.rt === true) ? "rt" : false;
      d.fav = parseInt(d.favorites);
      d.rtno = parseInt(d.retweets);
      d.device = d.device;
      return d;
    },
    function(data) {
      //remove self-rt
      function selfrt(text, rt){
        if (rt === true){
            regex = /^RT /g,
            text = text.replace(regex, '');
            regex = /^@(\w{1,15}):(.*)/i,
            matches = text.match(regex);
            if (matches === null){
              return false;
            }
            if (matches[1] == "realDonaldTrump"){
              return true;
            }else{
              return false;
            }
        }else{
          return false;
        }
      }
       //filter by date range + remove Trump self rts + Twitter Ads
      data = data.filter(function(d) {
        return d.date >= launchcamp & d.date < fday & selfrt(d.text,d.rt) === false & d.device != "Twitter Ads";
      })
      // Add number of tweets
      d3.select(".dl")
        .html(data.length)

      // Calculate ticks + svg length
      diff = d3.timeDay.count(launchcamp, fday);
      bwidth = (window.innerWidth / 20) * diff;
      width = window.innerWidth;
      wheight = window.innerHeight;
      // build svg
      var svg = d3.select('.box').append("svg")
        .style("width", bwidth + "px")
        .style("height", 0.95 * wheight + "px")
        .attr('viewBox', '0 0 ' + bwidth + ' ' + wheight)
        .attr('preserveAspectRatio', 'none')
        .attr("class", "svg")
      // add margins
      var margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 100
      }
      g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      width = bwidth - margin.left - margin.right,
        height = wheight - margin.top - margin.bottom;

      // Scales
      var x = d3.scaleTime()
        .domain([new Date(2015, 5, 14), fday])
        .range([0, width])
        .clamp(true);
      var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
          return d.fav;
        }) * 1.3])
        .range([height, 0]);
      var z = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
          return d.rtno;
        })])
        .range([4, 40]);
      var myColor = d3.scaleOrdinal()
        .domain(["f", "d", false, "rt"])
        .range(["#e22847", "#BDC3C7", "#55acee", "#17bf63"]);

      //Axis
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
          .ticks(diff / 4)
          .tickFormat(d3.timeFormat("%y-%m-%d")));


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
        .text("Total Favourites");

      //Build disappearing title box
      d3.select(".box")
        .on("scroll", function() {
          box = document.getElementById("test");
          scroll = box.scrollLeft;
          wwidth = window.innerWidth;
          opacity = 1 - (scroll * (1 / wwidth));
          title = d3.select(".titlewrapper");
          end = d3.select(".endwrapper");
          if (opacity >= 0) {
            title
              .style("opacity", opacity);
          }

          if (scroll > wwidth) {
            title
              .style("display", "none");
          }
          if (scroll < wwidth) {
            title
              .style("display", "initial");
          }
          if (scroll > bwidth - 2 * wwidth) {
            end
              .style("display", "initial");
            opacity = -1 * ((scroll - (bwidth - 2 * wwidth)) / (-wwidth)); //min-max normilization for opacity scale
            if (opacity >= 0) {
              end
                .style("opacity", opacity);
            }
          }
          if (scroll < bwidth - 2 * wwidth) {
            end
              .style("display", "none");
          }



        });

      //to wrangle tweet text for tooltip
      function textToTweet(tweet, rt) {
        if (rt === true) {
          //replace "RT" if retweet
          regex = /^RT /g,
            tweet = tweet.replace(regex, '');

          // seperate headline from rest of tweet
          regex = /^@(\w{1,15}):(.*)/i,
            matches = tweet.match(regex);
          if (matches != null) {
            headline = '<span class="abovetext"><img src="data/rtgrey.png" class="logo" />Donald Trump Retweeted </span><div class="subtweet"><span class="subtitle">@' + matches[1] + '</span><br />';
            tweet = matches[2];
          }
        }
        //Remove exra speech markst
        regex = /(["])(?=\1)/g;
        tweet = tweet.replace(regex, '');

        regex = /^"|"$/g
        tweet = tweet.replace(regex, '');

        //convert links
        regex = /(https?:\/\/[^\s]+)/g,
          replace = '<a href="https://web.archive.org/web/$1">$1</a>';
        tweet = tweet.replace(regex, replace);

        //Replace Tags
        regex = /(^|[^@\w])@(\w{1,15})\b/g,
          replace = '$1<a href="http://twitter.com/$2">@$2</a>';
        tweet = tweet.replace(regex, replace);

        // hashtags
        regex = /(?:^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(?:\b|\r)/g,
          replace = '<a href="https://twitter.com/hashtag/$1">#$1</a>';
        tweet = tweet.replace(regex, replace);

        //Add headline if rt
        if (rt === true) {
          tweet = headline + tweet + "</div>";
        }
        return tweet;
      }

      //vals for tooltip
      tooltip = d3.select(".tooltip");
      tooltext = d3.select(".text");
      favs = d3.select(".fav");
      rts = d3.select(".rts");
      hour = d3.select(".hour");
      day = d3.select(".day");
      device = d3.select(".device");
      link = d3.select(".link");

      //Tooltip
      var showTooltip = function(d) {
        tooltip
          .style("display", "initial")

        //Make Circle Brighter
        d3.select(this)
          .style("opacity", 0.7)
        //Find point to get top/left values
        rect = d3.select(this).node().getBoundingClientRect();
        // convert dates to twitter style
        days = d.date.toLocaleDateString(navigator.language, {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        });
        hours = d.date.toLocaleTimeString(navigator.language, {
          hour: '2-digit',
          minute: '2-digit'
        });
        // enter data
        tooltext
          .html(textToTweet(d.text, d.rt))
        favs
          .html(Number(d.fav).toLocaleString('en'))
        rts
          .html(Number(d.rtno).toLocaleString('en'))
        hour
          .html(hours)
        day
          .html(days)
        link
          .attr("href", "https://web.archive.org/web/https://twitter.com/realdonaltrump/status/" + d.id)
        device
          .html(d.device)
        tooltip
          .transition()
          .duration(200)
        tooltip
          .style("opacity", 1)
          .style("left", rect.left + rect.width + 30 + "px")
          .style("top", rect.top - 150 + "px")
      }

      //Hide tooltip (w/ slow transition)
      var hidetooltip = function(d) {
        d3.select(this)
          .style("opacity", 1)

        tooltip
          .transition()
          .duration(3000)
          .style("opacity", 0)
        setTimeout(function() {
          tooltip
            .style("display", "none")
        }, 3100);

      }
      //Annotations
      var pt = d3.timeParse("%Y-%m-%d %H:%M:%S");
      var makeAnnotations = d3.annotation()
        .accessors({
          x: function(d) {
            return x(pt(d.x));
          },
          y: function(d) {
            return y(parseInt(d.y));
          }
        })
        .annotations(annotations)

      d3.select("svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations)

      //add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function(d) {
          return x(d.date);
        })
        .attr("cy", function(d) {
          return y(d.fav);
        })
        .attr("r", function(d) {
          return z(d.rtno);
        })
        .style("fill", function(d) {
          return myColor(d.type);
        })
        .on("mouseover", showTooltip)
        .on("mouseout", hidetooltip)
    })
}
