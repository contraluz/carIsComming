<template>
  <div class="cities">
    <div class="table-top">
      <el-button class="to-right" type="danger" size="small" @click="handleDelete">批量删除</el-button>
      <el-button class="to-right mr20" type="primary" size="small" @click="handleOpenEdit">新增</el-button>
      <span>搜索城市代码：</span>
      <el-input
        v-model="code"
        class="keyword"
        size="small"
        placeholder="输入城市代码搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索城市名：</span>
      <el-input
        v-model="cityName"
        class="keyword"
        size="small"
        placeholder="输入城市名搜索"
        clearable
        suffix-icon="el-icon-search"
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
      <el-table-column prop="airportcode" label="城市代码" align="center"></el-table-column>
      <el-table-column prop="cityname" label="城市名" align="center"></el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      @current-change="handleCurrentChange"
      background
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
    <el-dialog
      title="新增"
      width="30%"
      append-to-body
      :visible="editDialogVisible"
      :before-close="handleCloseEdit"
    >
      <el-form ref="form" class="form" :model="formDataEdit" label-width="120px">
        <el-form-item label="城市代码：">
          <el-input v-model="formDataEdit.code"></el-input>
        </el-form-item>
        <el-form-item label="城市名：">
          <el-input v-model="formDataEdit.cityName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseEdit">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapSfcCountry,
  insertSfcCountry,
  deleteSfcCountry
} from "@/api/indexPage";
export default {
  name: "cities",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      code: "",
      cityName: "",
      tableData: [],
      multipleSelection: [],
      editDialogVisible: false,
      formDataEdit: {}
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
        code: this.code,
        cityName: this.cityName
      };
      mapSfcCountry(param).then(res => {
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
    handleCloseEdit() {
      this.editDialogVisible = false;
    },
    handleOpenEdit(row) {
      this.formDataEdit = {};
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      const param = this.formDataEdit;
      insertSfcCountry(param).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.handleSearch();
        }
      });
      this.handleCloseEdit();
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
          const param = {
            code: this.multipleSelection.map(item => item.airportcode).join(),
            cityName: this.multipleSelection.map(item => item.cityname).join()
          };
          deleteSfcCountry(param).then(res => {
            if (res.code === 200) {
              this.$refs.table.clearSelection();
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

<style>
.cities .mr20 {
  margin-right: 20px;
}
</style>