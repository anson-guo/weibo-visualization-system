<template>
  <div>
    <el-row>
      <el-col>
        <search-input/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchInput from '_c/common/SearchInput';

export default {
  name: "UserSearch",
  components: {
    SearchInput
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>

