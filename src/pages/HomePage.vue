<template>  
  <div>
    主页
    <router-link to="/user-search">查找用户</router-link>
    <p>Vue + d3 测试</p>
    <area-chart />

  </div>
</template>

<script>
import AreaChart from '../components/visual-components/AreaChart';

export default {
  name: 'HomePage',
  components: {
    AreaChart
  }
}
</script>

<style lang="scss" scoped>

</style>


