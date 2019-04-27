<template lang="html">
  <div>
    <personal-info></personal-info>
    <d3-horizontal-bar-chart></d3-horizontal-bar-chart>
  </div>
</template>

<script>
import PersonalInfo from './PageComponents/PersonalInfo';
import D3HorizontalBarChart from '../components/visual-components/D3HorizontalBarChart';


export default {
  name: "BaseInfo",
  components: {
    PersonalInfo,
    D3HorizontalBarChart,
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
</style>


