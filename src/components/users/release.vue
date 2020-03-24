<template>
  <div class="release">
    <div class="table-top">
      <el-button class="to-right" type="danger" size="small" @click="handleDelete">批量删除</el-button>
      <el-button class="to-right mr20" type="primary" size="small" @click="handleOpenAdd">新增</el-button>
      <span>搜索始发地：</span>
      <el-input
        v-model="start"
        class="keyword"
        size="small"
        placeholder="输入始发地搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索目的地：</span>
      <el-input
        v-model="end"
        class="keyword"
        size="small"
        placeholder="输入目的地搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索车型：</span>
      <el-input
        v-model="type"
        class="keyword"
        size="small"
        placeholder="输入车型"
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
      <el-table-column prop="id" label="车主发布ID" align="center"></el-table-column>
      <el-table-column prop="userId" label="车主ID" align="center"></el-table-column>
      <el-table-column prop="name" label="车主姓名" align="center"></el-table-column>
      <el-table-column prop="start" label="始发地" align="center"></el-table-column>
      <el-table-column prop="end" label="目的地" align="center"></el-table-column>
      <el-table-column prop="outtime" label="出发时间" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{handleTimeFormat(scope.row.outtime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="freeSeat" label="座位数" width="80" align="center"></el-table-column>
      <el-table-column prop="motorType" label="车型" align="center"></el-table-column>
      <el-table-column prop="roadline" label="路线" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="cost" label="价格/座" width="80" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip align="center"></el-table-column>
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
          <el-input v-model="formDataEdit.userID"></el-input>
        </el-form-item>-->
        <el-form-item label="始发地：">
          <el-input v-model="formDataEdit.start"></el-input>
        </el-form-item>
        <el-form-item label="目的地：">
          <el-input v-model="formDataEdit.end"></el-input>
        </el-form-item>
        <el-form-item label="出发时间：">
          <el-input v-model="formDataEdit.outTime"></el-input>
        </el-form-item>
        <el-form-item label="路线：">
          <el-input v-model="formDataEdit.roadLine"></el-input>
        </el-form-item>
        <el-form-item label="车型：">
          <el-input v-model="formDataEdit.type"></el-input>
        </el-form-item>
        <el-form-item label="空座位：">
          <el-input v-model="formDataEdit.free"></el-input>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input v-model="formDataEdit.cost"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formDataEdit.remake"></el-input>
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
        <el-form-item label="车主ID：">
          <el-input v-model="formDataAdd.id"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户ID：">
          <el-input v-model="formDataAdd.userID"></el-input>
        </el-form-item>-->
        <el-form-item label="始发地：">
          <el-input v-model="formDataAdd.start"></el-input>
        </el-form-item>
        <el-form-item label="目的地：">
          <el-input v-model="formDataAdd.end"></el-input>
        </el-form-item>
        <el-form-item label="出发时间：">
          <el-tag
            style="margin-right: 6px"
            v-for="tag in tagsAdd"
            :key="tag.key"
            closable
            :type="tag.label"
            @close="handleTagsAddDel(tag.key)"
          >{{tag.label}}</el-tag>
          <el-date-picker
            v-model="addDialogTime"
            @change="handleAddTime"
            type="datetime"
            :clearable="false"
            placeholder="选择出发时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="路线：">
          <el-input v-model="formDataAdd.roadLine"></el-input>
        </el-form-item>
        <el-form-item label="车型：">
          <el-input v-model="formDataAdd.type"></el-input>
        </el-form-item>
        <el-form-item label="空座位：">
          <el-input v-model="formDataAdd.free"></el-input>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input v-model="formDataAdd.cost"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formDataAdd.remake"></el-input>
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
  mapListSfcOwnerRelease,
  updateSfcOwnerRelease,
  insertSfcOwnerRelease,
  deleteSfcOwnerRelease
} from "@/api/indexPage";
export default {
  name: "release",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      start: "",
      end: "",
      type: "",
      tableData: [],
      multipleSelection: [],
      editDialogVisible: false,
      addDialogVisible: false,
      formDataEdit: {},
      formDataAdd: {},
      addDialogTime: "",
      tagsAdd: []
    };
  },
  components: {},
  methods: {
    handleTimeFormat(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    handleCurrentChange(val) {
      this.page = val;
      this.handleSearch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAddTime(val) {
      if (!this.tagsAdd) {
        this.tagsAdd = [];
      }
      this.tagsAdd.push({
        label: moment(val).format("YYYY-MM-DD HH:mm:ss"),
        key: +new Date() + ""
      });
    },
    handleTagsAddDel(key) {
      const id = this.tagsAdd.findIndex(item => item.key === key);
      this.tagsAdd.splice(id, 1);
    },
    handleSearch() {
      const param = {
        page: this.page,
        size: this.size,
        start: this.start,
        end: this.end,
        type: this.type
      };
      mapListSfcOwnerRelease(param).then(res => {
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
      this.tagsAdd = [];
      this.addDialogTime = "";
      this.addDialogVisible = false;
    },
    handleOpenAdd() {
      this.formDataAdd = {};
      this.addDialogVisible = true;
    },
    handleSubmitAdd() {
      const param = this.formDataAdd;
      param.outTime = this.tagsAdd.map(item => item.label).join();
      insertSfcOwnerRelease(param).then(res => {
        this.tagsAdd = [];
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
      console.log(row);
      this.formDataEdit = {
        id: row.id,
        userID: row.userId,
        start: row.start,
        end: row.end,
        roadLine: row.roadline,
        type: row.motorType,
        remake: row.remark,
        cost: row.cost,
        free: row.freeSeat,
        outTime: moment(row.outtime).format("YYYY-MM-DD HH:mm:ss")
      };
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      const param = this.formDataEdit;
      updateSfcOwnerRelease(param).then(res => {
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
            id: this.multipleSelection.map(item => item.id).join()
          };
          deleteSfcOwnerRelease(param).then(res => {
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
