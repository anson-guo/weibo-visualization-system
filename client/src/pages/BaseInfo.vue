<template>
  <div>
    <calendar-view></calendar-view>
  </div>
</template>

<script>
import HeatMap from "../components/visual-components/HeatMap";
import CalendarView from "../components/visual-components/CalendarView";

export default {
  name: "BaseInfo",
  components: {
    HeatMap,
    CalendarView
  }
};
</script>

<style lang="scss" scoped>
</style>


