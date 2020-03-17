<template>
  <el-container class="main-container">
    <el-aside width="300px" class="aside">
      <el-menu
        default-active="1-1"
        background-color="#293452"
        text-color="#fff"
        @select="handleMenuSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>选项1
        </el-menu-item>

        <el-menu-item index="2">
          <i class="el-icon-menu"></i>选项2
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// import login from "@/api/indexPage";

export default {
  name: "index",
  data() {
    return {};
  },
  components: {},
  methods: {
    handleMenuSelect(val) {
      console.log("handleMenuSelect", val);
    }
  }
};
</script>

<style lang="less">
.main-container {
  overflow-y: auto;
  .aside {
    background: #202739;
    overflow: hidden;
  }
}
</style>
