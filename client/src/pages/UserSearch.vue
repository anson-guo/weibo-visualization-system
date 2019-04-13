<template>
  <div class="container">
    <div class="user-search">
      <search-input class="input"/>
    </div>
  </div>
</template>

<script>
import SearchInput from "../components/common-components/SearchInput";

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
.container {
  height: 100vh;
  .user-search {
    .input {
      width: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

