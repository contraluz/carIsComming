<template>
  <div class="userinfo">
    <div class="table-top">
      <el-button class="to-right" type="danger" size="small" @click="handleDelete">批量删除</el-button>
      <span>搜索用户名：</span>
      <el-input
        v-model="keyName"
        class="keyword"
        size="small"
        placeholder="输入用户名搜索"
        clearable
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索手机号：</span>
      <el-input
        v-model="keyPhone"
        class="keyword"
        size="small"
        placeholder="输入手机号搜索"
        clearable
        @change="handleSearch"
      ></el-input>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      ref="form"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="money" label="余额" align="center"></el-table-column>
      <el-table-column prop="reputation" label="积分" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleOpenEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next, total"
      :total="total"
    ></el-pagination>
    <el-dialog
      title="编辑"
      width="30%"
      append-to-body
      :visible="editDialogVisible"
      :before-close="handleCloseEdit"
    >
      <el-form ref="form" class="form" :model="formDataEdit" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="formDataEdit.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="formDataEdit.phone"></el-input>
        </el-form-item>
        <el-form-item label="余额：">
          <el-input v-model="formDataEdit.money"></el-input>
        </el-form-item>
        <el-form-item label="积分：">
          <el-input v-model="formDataEdit.reputation"></el-input>
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
import { listAllSfcUser, updateSfcUser, deleteSfcUser } from "@/api/indexPage";
export default {
  name: "userinfo",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      keyName: "",
      keyPhone: "",
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
        name: this.keyName,
        phone: this.keyPhone
      };
      listAllSfcUser(param).then(res => {
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
      this.formDataEdit = JSON.parse(JSON.stringify(row));
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      const param = this.formDataEdit;
      updateSfcUser(param).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "seccess",
            message: "修改成功"
          });
          this.handleSearch();
        }
      });
    },
    handleDelete() {
      this.$confirm("删除后数据无法恢复，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSfcUser(
            this.multipleSelection.map(item => item.id).join()
          ).then(res => {
            console.log(res);
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

<style lang="less">
</style>
