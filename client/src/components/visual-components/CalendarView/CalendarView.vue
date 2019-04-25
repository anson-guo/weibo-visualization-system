<template>
  <div id="mountNode"></div>
</template>

<script>
import testData from "../../../mock/calendarViewTestData.json";

export default {
  name: "CalendarView",
  data() {
    return {
      calendarData: testData
    };
  },
  mounted() {
    var Shape = G2.Shape;
    var Util = G2.Util;
    Shape.registerShape("polygon", "boundary-polygon", {
      draw: function draw(cfg, container) {
        if (!Util.isEmpty(cfg.points)) {
          var attrs = {
            stroke: "#fff",
            lineWidth: 1,
            fill: cfg.color,
            fillOpacity: cfg.opacity
          };
          var points = cfg.points;
          var path = [
            ["M", points[0].x, points[0].y],
            ["L", points[1].x, points[1].y],
            ["L", points[2].x, points[2].y],
            ["L", points[3].x, points[3].y],
            ["Z"]
          ];
          attrs.path = this.parsePath(path);
          var polygon = container.addShape("path", {
            attrs: attrs
          });

          if (cfg.origin._origin.lastWeek) {
            var linePath = [
              ["M", points[2].x, points[2].y],
              ["L", points[3].x, points[3].y]
            ];
            // 最后一周的多边形添加右侧边框
            container.addShape("path", {
              zIndex: 1,
              attrs: {
                path: this.parsePath(linePath),
                lineWidth: 1,
                stroke: "#404040"
              }
            });
            if (cfg.origin._origin.lastDay) {
              container.addShape("path", {
                zIndex: 1,
                attrs: {
                  path: this.parsePath([
                    ["M", points[1].x, points[1].y],
                    ["L", points[2].x, points[2].y]
                  ]),
                  lineWidth: 1,
                  stroke: "#404040"
                }
              });
            }
          }
          container.sort();
          return polygon;
        }
      }
    });

    var chart = new this.$G2.Chart({
      container: "mountNode",
      forceFit: true,
      height: 300,
      padding: [window.innerHeight / 3, 20, window.innerHeight / 3, 80]
    });
    chart.source(this.calendarData, {
      day: {
        type: "cat",
        values: [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ]
      },
      week: {
        type: "cat"
      },
      commits: {
        sync: true
      }
    });

    chart.axis("week", {
      position: "top",
      tickLine: null,
      line: null,
      label: {
        offset: 12,
        textStyle: {
          fontSize: 12,
          fill: "#666",
          textBaseline: "top"
        },
        formatter: function formatter(val) {
          console.log(val);
          if (val === "2") {
            return "MAY";
          } else if (val === "6") {
            return "JUN";
          } else if (val === "10") {
            return "JUL";
          } else if (val === "15") {
            return "AUG";
          } else if (val === "19") {
            return "SEP";
          } else if (val === "24") {
            return "OCT";
          } else if (val === '26') {
            return 'aaa';
          }
          return "";
        }
      }
    });
    chart.axis("day", {
      grid: null
    });
    chart.legend(false);
    chart.tooltip({
      title: "date"
    });
    chart.coord().reflect("y");
    chart
      .polygon()
      .position("week*day*date")
      .color("commits", "#BAE7FF-#1890FF-#0050B3")
      .shape("boundary-polygon");
    chart.render();
  }
};
</script>




