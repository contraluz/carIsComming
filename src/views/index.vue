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
const maps = [
  { menu: "用户管理", id: 1, router: "user" },
  { menu: "支付管理", id: 2, router: "paying" },
  { menu: "预约管理", id: 3, router: "appointment" },
  { menu: "用户信息管理", id: 4, router: "userInfo" },
  { menu: "取消预订管理", id: 5, router: "subscribe" },
  { menu: "乘客预定座位管理", id: 6, router: "seats" },
  { menu: "热门路线管理", id: 7, router: "route" },
  { menu: "车费价格表管理", id: 8, router: "price" },
  { menu: "车主发布信息管理", id: 9, router: "release" },
  { menu: "行驶,驾驶证管理", id: 10, router: "credentials" },
  { menu: "日志信息管理", id: 11, router: "log" },
  { menu: "热门城市管理", id: 12, router: "cities" },
  { menu: "实名认证管理", id: 13, router: "realname" }
];
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
      this.activedMenu = this.menuName[0].id + "";
      this.$router.push(`/index/${maps[this.menuName[0].id - 1].router}`);
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
    .keyword {
      width: 220px;
    }
    .to-right {
      float: right;
    }
    .ml30 {
      margin-left: 30px;
    }
  }
}
.dialog-footer {
  text-align: center;
}
</style>
