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
        @change="handleSearch"
      ></el-input>
      <el-select
        class="ml30"
        size="small"
        v-model="isNonG"
        clearable
        placeholder="选择支付状态搜索"
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
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="id" label="车主发布ID" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="number" label="次数" align="center"></el-table-column>
      <el-table-column prop="czid" label="车主ID" align="center"></el-table-column>
      <el-table-column prop="isnong" label="是否支付" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.isnong === 1 ? '已支付' : '尚未支付'}}</span>
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
  </div>
</template>

<script>
import { sfcZfService } from "@/api/indexPage";
export default {
  name: "paying",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      number: "",
      isNonG: ""
    };
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.handleSearch();
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
