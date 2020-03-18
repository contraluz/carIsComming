<template>
  <div class="user">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="idUser" label="权限" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.userRole === 1 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.userRole === 1 ? '管理员' : '用户'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="telephone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <!-- <el-table-column prop="timeInsert" label="时间" align="center"></el-table-column> -->
      <el-table-column prop="userAddress" label="家庭地址" align="center"></el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next, total"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { selectAllUser } from "@/api/indexPage";
export default {
  name: "user",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableData: []
    };
  },
  components: {},
  methods: {
    handleCurrentChange() {
      this.handleSearch();
    },
    handleSearch() {
      const param = {
        page: this.page,
        size: this.size
      };
      selectAllUser(param).then(res => {
        if (res.code === 200 && res.data) {
          this.total = res.data.total || 0;
          this.tableData = res.data.dataMap || [];
        }
      });
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style lang="less">
</style>
