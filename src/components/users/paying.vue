<template>
  <div class="paying">
    <div class="table-top">
      <span>搜索次数：</span>
      <el-input
        v-model="number"
        class="keyword"
        size="small"
        placeholder="输入次数搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <el-select
        class="ml30"
        size="small"
        v-model="isNonG"
        clearable
        placeholder="选择支付状态搜索"
        suffix-icon="el-icon-search"
        @change="handleSearch"
      >
        <el-option
          v-for="item in [{value:0,label:'尚未支付'},{value:1,label:'已支付'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-table :data="tableData" ref="table" stripe border style="width: 100%">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="id" label="车主发布ID" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="czid" label="车主ID" align="center"></el-table-column>
      <el-table-column prop="inserttime" label="时间" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{scope.row.inserttime.slice(0, 19).replace("T", " ")}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="次数" align="center"></el-table-column>
      <el-table-column prop="isnong" label="是否支付" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.isnong === 1 ? '已支付' : '尚未支付'}}</span>
        </template>
      </el-table-column>
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
        <el-form-item label="列表时间：">
          <el-input v-model="formDataEdit.time"></el-input>
        </el-form-item>
        <el-form-item label="乘坐次数：">
          <el-input v-model="formDataEdit.number"></el-input>
        </el-form-item>
        <el-form-item label="支付状态：">
          <el-input v-model="formDataEdit.isNonG"></el-input>
        </el-form-item>
        <el-table-column label="操作" align="center" width="140">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleOpenEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseEdit">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sfcZfService, updateSfcZf } from "@/api/indexPage";
export default {
  name: "paying",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      number: "",
      isNonG: "",
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
    handleCloseEdit() {
      this.editDialogVisible = false;
    },
    handleOpenEdit(row) {
      this.formDataEdit = {
        id: row.id,
        time: moment(row.inserttime).format("YYYY-MM-DD HH:mm:ss"),
        number: row.number,
        isNonG: row.isnong
      };
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      const param = this.formDataEdit;
      updateSfcZf(param).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.handleSearch();
        } else {
          this.$message({
            type: "error",
            message: res.data || "编辑失败"
          });
        }
      });
      this.handleCloseEdit();
    },
    handleSearch() {
      const param = {
        page: this.page,
        size: this.size,
        number: this.number,
        isNonG: this.isNonG
      };
      sfcZfService(param).then(res => {
        if (!res.data) {
          this.total = 0;
          this.tableData = [];
        }
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
