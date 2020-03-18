<template>
  <div class="seats">
    <div class="table-top">
      <el-button class="to-right" type="danger" size="small" @click="handleDelete">批量删除</el-button>
      <el-button class="to-right mr20" type="primary" size="small" @click="handleOpenAdd">新增</el-button>
      <span>搜索上车点：</span>
      <el-input
        v-model="start"
        class="keyword"
        size="small"
        placeholder="输入上车点"
        clearable
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索手机：</span>
      <el-input
        v-model="phone"
        class="keyword"
        size="small"
        placeholder="输入手机号"
        clearable
        @change="handleSearch"
      ></el-input>
      <span class="ml30">始发地：</span>
      <el-input
        v-model="startPoint"
        class="keyword"
        size="small"
        placeholder="输入始发地"
        clearable
        @change="handleSearch"
      ></el-input>
      <span class="ml30">目的地：</span>
      <el-input
        v-model="endPoint"
        class="keyword"
        size="small"
        placeholder="输入目的地"
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
      <el-table-column prop="name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="start" label="上车点" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机" align="center"></el-table-column>
      <el-table-column prop="num" label="空座位" align="center"></el-table-column>
      <el-table-column prop="startpoint" label="始发地" align="center"></el-table-column>
      <el-table-column prop="endpoint" label="目的地" align="center"></el-table-column>
      <!-- <el-table-column prop="insettime" label="时间" align="center"></el-table-column> -->
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
        <!-- <el-form-item label="任务ID：">
          <el-input v-model="formDataEdit.id"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="用户ID：">
          <el-input v-model="formDataEdit.userId"></el-input>
        </el-form-item>-->
        <el-form-item label="上车点：">
          <el-input v-model="formDataEdit.start"></el-input>
        </el-form-item>
        <el-form-item label="始发地：">
          <el-input v-model="formDataEdit.startPoint"></el-input>
        </el-form-item>
        <el-form-item label="目的地：">
          <el-input v-model="formDataEdit.endPoint"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="formDataEdit.phone"></el-input>
        </el-form-item>
        <el-form-item label="空座位：">
          <el-input v-model="formDataEdit.num"></el-input>
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
        <el-form-item label="任务ID：">
          <el-input v-model="formDataEdit.id"></el-input>
        </el-form-item>
        <el-form-item label="乘客ID：">
          <el-input v-model="formDataEdit.userId"></el-input>
        </el-form-item>
        <el-form-item label="上车点：">
          <el-input v-model="formDataEdit.start"></el-input>
        </el-form-item>
        <el-form-item label="始发地：">
          <el-input v-model="formDataEdit.startPoint"></el-input>
        </el-form-item>
        <el-form-item label="目的地：">
          <el-input v-model="formDataEdit.endPoint"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="formDataEdit.phone"></el-input>
        </el-form-item>
        <el-form-item label="空座位：">
          <el-input v-model="formDataEdit.num"></el-input>
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
  mapListSfcReserve,
  updateSfcReserve,
  insertSfcReserve,
  deleteSfcReserve
} from "@/api/indexPage";
export default {
  name: "seats",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      start: "",
      phone: "",
      startPoint: "",
      endPoint: "",
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
        start: this.start,
        phone: this.phone,
        startPoint: this.startPoint,
        endPoint: this.endPoint
      };
      mapListSfcReserve(param).then(res => {
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
      insertSfcReserve(param).then(res => {
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
        id: row.id,
        userId: row.userid,
        start: row.start,
        end: row.end,
        phone: row.phone,
        startPoint: row.startpoint,
        endPoint: row.endpoint,
        num: row.num
      };
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      const param = this.formDataEdit;
      updateSfcReserve(param).then(res => {
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
            id: this.multipleSelection.map(item => item.id).join(),
            userId: this.multipleSelection.map(item => item.userid).join()
          };
          deleteSfcReserve(param).then(res => {
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
