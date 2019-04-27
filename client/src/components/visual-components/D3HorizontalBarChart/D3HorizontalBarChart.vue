<template>
  <svg class="chart"></svg>
</template>

<script>
export default {
  name: "D3HorizontalBarChart",
  data() {
    return {};
  },
  methods: {
    init() {
      var data = {
        labels: ["图表数据展示"],
        series: [
          {
            label: "粉丝数量",
            values: [12121]
          },
          {
            label: "关注数量",
            values: [121121]
          },
          {
            label: "微博数量",
            values: [3123]
          }
        ]
      };
      const colors = ["#ef4c69", "#facd3c", "#398dff"];

      var chartWidth = 300,
        barHeight = 20,
        groupHeight = barHeight * data.series.length,
        gapBetweenGroups = 10,
        spaceForLabels = 150,
        spaceForLegend = 450;

      // Zip the series data together (first values, second values, etc.)
      var zippedData = [];
      for (var i = 0; i < data.labels.length; i++) {
        for (var j = 0; j < data.series.length; j++) {
          zippedData.push(data.series[j].values[i]);
        }
      }

      // Color scale
      var color = d3.scale.category20();
      var chartHeight =
        barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

      var x = d3.scale
        .linear()
        .domain([0, d3.max(zippedData)])
        .range([0, chartWidth]);

      var y = d3.scale.linear().range([chartHeight + gapBetweenGroups, 0]);

      var yAxis = d3.svg
        .axis()
        .scale(y)
        .tickFormat("")
        .tickSize(0)
        .orient("left");

      // Specify the chart area and dimensions
      var chart = d3
        .select(".chart")
        .attr("width", spaceForLabels + chartWidth + spaceForLegend)
        .attr("height", chartHeight);

      // Create bars
      var bar = chart
        .selectAll("g")
        .data(zippedData)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          return (
            "translate(" +
            spaceForLabels +
            "," +
            (i * barHeight +
              gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) +
            ")"
          );
        });

      // Create rectangles of the correct width
      bar
        .append("rect")
        .attr("fill", function(d, i) {
          console.log(i % data.series.length);
          return color(i % data.series.length);
        })
        .style("fill", function(d, i) {
          return colors[i];
        })
        .attr("class", "bar")
        .attr("width", x)
        .attr("height", barHeight - 1);

      // Add text label in bar
      bar
        .append("text")
        .attr("x", function(d) {
          return x(d) + 10;
        })
        .attr("y", barHeight / 2)
        .attr("fill", "#343434")
        .attr("dy", ".35em")
        .text(function(d) {
          return d;
        });

      // Draw labels
      bar
        .append("text")
        .attr("class", "label")
        .attr("x", function(d) {
          return -120;
        })
        .attr("y", groupHeight / 2)
        .attr("dy", ".35em")
        .text(function(d, i) {
          if (i % data.series.length === 0)
            return data.labels[Math.floor(i / data.series.length)];
          else return "";
        });

      chart
        .append("g")
        .attr("class", "y axis")
        .attr(
          "transform",
          "translate(" + spaceForLabels + ", " + -gapBetweenGroups / 2 + ")"
        )
        .call(yAxis);

      // Draw legend
      var legendRectSize = 18,
        legendSpacing = 4;

      var legend = chart
        .selectAll(".legend")
        .data(data.series)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = -gapBetweenGroups / 2;
          var horz = spaceForLabels + chartWidth + 120 - legendRectSize;
          var vert = i * height - offset;
          return "translate(" + horz + "," + vert + ")";
        });

      legend
        .append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", function(d, i) {
          return colors[i];
        });

      legend
        .append("text")
        .attr("class", "legend")
        .attr("x", legendRectSize + legendSpacing)
        .attr("y", legendRectSize - legendSpacing)
        .text(function(d) {
          return d.label;
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.chart .legend {
  fill: #000;
  font: 12px sans-serif;
  text-anchor: start;
  font-size: 12px;
}

.chart text {
  fill: white;
  font: 10px sans-serif;
  text-anchor: end;
}

.chart .label {
  fill: #343434;
  font: 14px sans-serif;
  text-anchor: end;
}

.bar:hover {
  fill: brown;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}
</style>
