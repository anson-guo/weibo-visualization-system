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
    const id = this.$route.path.split("/")[2];
    const url = `/api/user-info/${id}/base`;

    // 获取数据
    this.$axios
      .get(url, {
        id
      })
      .then(res => {
        console.log(res);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>


