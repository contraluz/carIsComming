<template>
  <el-container class="main-container">
    <el-aside width="300px" class="aside">
      <el-menu :default-active="activedMenu" text-color="#fff" @select="handleMenuSelect">
        <el-menu-item
          class="menu-item"
          :index="item.id + ''"
          v-for="item in menuName"
          :key="item.menu"
        >
          <i class="el-icon-menu"></i>
          <span>{{item.menu}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import maps from "@/static/js/menu";

export default {
  name: "index",
  data() {
    return {
      activedMenu: "",
      menuName: []
    };
  },
  components: {},
  methods: {
    handleMenuSelect(val) {
      this.$router.push(`/index/${maps[val - 1].router}`);
    }
  },
  mounted() {
    if (sessionStorage) {
      this.menuName = JSON.parse(sessionStorage.getItem("menuName"));
      if (location.hash.split("index/")[1]) {
        const route = location.hash.split("index/")[1];
        const activeID = maps.find(item => {
          return item.router === route;
        }).id;
        this.activedMenu = activeID + "";
      } else {
        this.activedMenu = this.menuName[0].id + "";
        const activeRoute = maps.find(item => item.id === this.menuName[0].id)
          .router;
        this.$router.push("/index/" + activeRoute);
      }
    } else {
      this.$router.push("/index/user");
    }
  }
};
</script>

<style lang="less">
.main-container {
  overflow-y: auto;
  .aside {
    background: #202739;
    .el-menu {
      border-color: #202739;
      background: #202739;
      // background: #293452;
    }
    .menu-item {
      margin-bottom: 4px;
      background: #293452;
    }
  }
  .el-main {
    .el-pagination {
      margin-top: 20px;
      text-align: right;
    }
  }

  // 子组件的table-top
  .table-top {
    background: #fff;
    padding: 12px;
    font-size: 16px;
    color: #666;
    border: 1px solid #eeeeee;
    margin-bottom: 16px;
    overflow: hidden;

    .keyword {
      width: 220px;
    }
    .to-right {
      float: right;
    }
    .ml30 {
      margin-left: 30px;
    }
    .mr20 {
      margin-right: 20px;
    }
  }
  //  设置模块所有列表表头及 斑马纹
  .el-table .el-table__header th {
    text-align: center;
    font-size: 14px;
    border: none;
    background: #ececec;
    color: #242424;
  }
  .el-table .el-table__row--striped td {
    background: #f7f7f7;
  }
}
.el-dialog__footer {
  text-align: center;
}
</style>
