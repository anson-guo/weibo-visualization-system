<template lang="html">
  <div>
    <calendar-view></calendar-view>
  </div>
</template>

<script>
import CalendarView from "../components/visual-components/CalendarView";

export default {
  name: "BaseInfo",
  components: {
    CalendarView
  },
  mounted() {

    // 获取数据
    this.$axios
      .get("/api/user-info/base", {
        id: '5342249696'
      })
      .then(res => {
        console.log(res);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>


