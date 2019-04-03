<template>  
  <div>
    主页
    <router-link to="/user-search">查找用户</router-link>
    <p>Vue + d3 测试</p>
    <area-chart />
    <f-demo />

  </div>
</template>

<script>
import AreaChart from '../components/visual-components/AreaChart';
import FDemo from '../components/visual-components/FDemo';


export default {
  name: 'HomePage',
  components: {
    AreaChart,
    FDemo
  }
}
</script>

<style lang="scss" scoped>

</style>


