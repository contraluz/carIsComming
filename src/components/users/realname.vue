<template>
  <div class="realname">
    <div class="table-top">
      <el-button class="to-right" type="danger" size="small" @click="handleDelete">批量删除</el-button>
      <el-button class="to-right mr20" type="primary" size="small" @click="handleOpenAdd">新增</el-button>
      <span>搜索用户名：</span>
      <el-input
        v-model="name"
        class="keyword"
        size="small"
        placeholder="输入用户名搜索"
        clearable
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索身份证号：</span>
      <el-input
        v-model="card"
        class="keyword"
        size="small"
        placeholder="输入身份证号搜索"
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
      <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
      <el-table-column prop="cardId" label="身份证号" align="center"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
      <!-- <el-table-column prop="isnong" label="isnong" align="center"></el-table-column> -->
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
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
    <el-dialog
      title="编辑"
      width="30%"
      append-to-body
      :visible="editDialogVisible"
      :before-close="handleCloseEdit"
    >
      <el-form ref="editform" class="form" :model="formDataEdit" label-width="120px">
        <!-- <el-form-item label="用户ID：">
          <el-input v-model="formDataEdit.userId"></el-input>
        </el-form-item>-->
        <el-form-item label="用户名：">
          <el-input v-model="formDataEdit.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="formDataEdit.cardId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseEdit">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增"
      width="30%"
      append-to-body
      :visible="addDialogVisible"
      :before-close="handleCloseAdd"
    >
      <el-form ref="addform" class="form" :model="formDataAdd" label-width="120px">
        <el-form-item label="用户ID：">
          <el-input v-model="formDataAdd.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="formDataAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="formDataAdd.cardId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseAdd">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapListSfcAuthorize,
  updateSfcAuthorize,
  insertSfcAuthorize,
  deleteSfcAuthorize
} from "@/api/indexPage";
export default {
  name: "realname",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      name: "",
      card: "",
      tableData: [],
      multipleSelection: [],
      editDialogVisible: false,
      addDialogVisible: false,
      formDataEdit: {},
      formDataAdd: {}
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
        name: this.name,
        card: this.card
      };
      mapListSfcAuthorize(param).then(res => {
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
    handleCloseAdd() {
      this.addDialogVisible = false;
    },
    handleOpenAdd() {
      this.formDataAdd = {};
      this.addDialogVisible = true;
    },
    handleSubmitAdd() {
      const param = this.formDataAdd;
      insertSfcAuthorize(param).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.handleSearch();
        } else {
          this.$message({
            type: "error",
            message: res.data
          });
        }
      });
      this.handleCloseAdd();
    },
    handleCloseEdit() {
      this.editDialogVisible = false;
    },
    handleOpenEdit(row) {
      this.formDataEdit = {
        id: row.userId,
        name: row.name,
        cardId: row.cardId
      };
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      const param = this.formDataEdit;
      updateSfcAuthorize(param).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.handleSearch();
        } else {
          this.$message({
            type: "error",
            message: res.data
          });
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
            id: this.multipleSelection.map(item => item.userId).join()
          };
          deleteSfcAuthorize(param).then(res => {
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
