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
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索手机号：</span>
      <el-input
        v-model="keyPhone"
        class="keyword"
        size="small"
        placeholder="输入手机号搜索"
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
      <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="money" label="余额" align="center"></el-table-column>
      <el-table-column prop="createtime" label="时间" align="center"></el-table-column>
      <el-table-column prop="reputation" label="积分" align="center"></el-table-column>
      <!-- 新增 -->
      <el-table-column prop="realName" label="身份认证" align="center"></el-table-column>
      <el-table-column prop="realOwner" label="车主认证" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button size="small" type="primary" class="mr20" @click="handleOpenEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="primary" @click="handleOpenRelease(scope.row)">车主发布</el-button>
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
      <el-form ref="form" class="form" :model="formDataEdit" label-width="120px">
        <el-form-item label="姓名：">
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
  listAllSfcUser,
  updateSfcUser,
  deleteSfcUser,
  insertSfcOwnerRelease
} from "@/api/indexPage";
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
      formDataEdit: {},
      addDialogVisible: false,
      formDataAdd: {},
      addDialogTime: "",
      tagsAdd: []
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
    handleAddTime(val) {
      if (!this.tagsAdd) {
        this.tagsAdd = [];
      }
      this.tagsAdd.push({
        label: moment(val).format("YYYY-MM-DD HH:mm:ss"),
        key: +new Date() + ""
      });
    },
    handleCloseAdd() {
      this.tagsAdd = [];
      this.addDialogTime = "";
      this.addDialogVisible = false;
    },
    handleTagsAddDel(key) {
      const id = this.tagsAdd.findIndex(item => item.key === key);
      this.tagsAdd.splice(id, 1);
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
    handleSearch() {
      const param = {
        page: this.page,
        size: this.size,
        name: this.keyName,
        phone: this.keyPhone
      };
      listAllSfcUser(param).then(res => {
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
    handleOpenRelease(row) {
      this.formDataAdd = {
        id: row.id
      };
      this.addDialogVisible = true;
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
            type: "success",
            message: "修改成功"
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
