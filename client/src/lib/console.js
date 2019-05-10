/**
 * console 窗口信息
 */

export default function loadConsole() {
  try {
    if (window.console && window.console.log) {
      // console内容  
      const consoleConfig = {
        // 项目简介
        staff: "\n\n\nWeble 项目是我的毕业设计作品，主要使用图表描述用户的微博数据。\n\n"
          + "相关的技术栈：Vue.js、node.js、Python\n\n"
          + "感谢开源团队：ElementUI 和 F2 的开发团队\n\n"
          + "如果你感兴趣，欢迎访问我的github： https://github.com/JinganGuo/\n\n"
          + "三人行必有我师焉\n"
          + "如果你发现了项目的bug\n"
          + "又或是有更好的实现方法\n"
          + "欢迎交流！ ",
      };

      // 输出config中内容
      var consoleInfo = (function (consoleConfig) {

        console.log("%c    ", "background: url(http://pr8jlwqml.bkt.clouddn.com/leave-school.png) no-repeat left center;font-size: 100px;", "\n");

        console.log(consoleConfig.staff + "%c❤❤❤\n\n\n", "color: red");

      }(consoleConfig));
    }
  } catch (e) { }
}