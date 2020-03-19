<template>
  <div class="log">
    <div class="table-top">
      <el-button class="to-right" type="danger" size="small" @click="handleDelete">批量删除</el-button>
      <span>搜索日志类型：</span>
      <el-input
        v-model="outs"
        class="keyword"
        size="small"
        placeholder="输入类型搜索"
        clearable
        @change="handleSearch"
      ></el-input>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      ref="table"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="outs" label="类型" align="center"></el-table-column>
      <el-table-column prop="ramake" label="信息" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="time" label="操作时间" align="center"></el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      @current-change="handleCurrentChange"
      background
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapSfcLog, deleteSfcLog } from "@/api/indexPage";
export default {
  name: "log",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      outs: "",
      tableData: [],
      multipleSelection: []
    };
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.handleSearch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSearch() {
      const param = {
        page: this.page,
        size: this.size,
        outs: this.outs
      };
      mapSfcLog(param).then(res => {
        if (!res.data) {
          this.total = 0;
          this.tableData = [];
        }
        if (res.code === 200 && res.data) {
          this.total = res.data.total || 0;
          this.tableData = res.data.dataMap || [];
        }
      });
    },
    handleDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "warning",
          message: "未选中任何记录"
        });
        return;
      }
      this.$confirm("删除后数据无法恢复，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSfcLog(
            this.multipleSelection.map(item => item.ids).join()
          ).then(res => {
            this.$refs.table.clearSelection();
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.handleSearch();
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style lang="less">
</style>
