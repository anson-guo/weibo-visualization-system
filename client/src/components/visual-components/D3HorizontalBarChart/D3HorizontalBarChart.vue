<template>
<div>
  <h3>{{title}}</h3>
  <svg v-if="this.charData.series" class="chart"></svg>
</div>
</template>

<script>
export default {
  name: "D3HorizontalBarChart",
  props: {
    title: String,
    userCharData: Object
  },
  data() {
    return {
      charData: {
        labels: ["图表数据展示"],
        series: this.userCharData
      }
    };
  },
  methods: {
    init() {
      console.log(this.charData);

      const colors = ["#ef4c69", "#facd3c", "#398dff"];

      const _this = this;

      var chartWidth = 800,
        barHeight = 20,
        groupHeight = barHeight * this.charData.series.length,
        gapBetweenGroups = 10,
        spaceForLabels = 0,
        spaceForLegend = 450;

      // Zip the series data together (first values, second values, etc.)
      var zippedData = [];
      for (var i = 0; i < this.charData.labels.length; i++) {
        for (var j = 0; j < this.charData.series.length; j++) {
          zippedData.push(this.charData.series[j].values[i]);
        }
      }

      // Color scale
      var color = d3.scale.category20();
      var chartHeight =
        barHeight * zippedData.length + gapBetweenGroups * this.charData.labels.length;

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
              gapBetweenGroups * (0.5 + Math.floor(i / _this.charData.series.length))) +
            ")"
          );
        });

      // Create rectangles of the correct width
      bar
        .append("rect")
        .attr("fill", function(d, i) {
          return color(i % _this.charData.series.length);
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
        .attr("fill", "#303133")
        .attr("dy", ".35em")
        .text(function(d) {
          return d;
        });

      // // Draw labels
      // bar
      //   .append("text")
      //   .attr("class", "label")
      //   .attr("x", function(d) {
      //     return -120;
      //   })
      //   .attr("y", groupHeight / 2)
      //   .attr("dy", ".35em")
      //   .text(function(d, i) {
      //     if (i % data.series.length === 0)
      //       return data.labels[Math.floor(i / data.series.length)];
      //     else return "";
      //   });

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
        .data(this.charData.series)
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
h3 {
  color: #303133;
  font-size: 16px;
}

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
  fill: #303133;
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
