<template>
  <div>
    <el-card class="box-card">
      <el-table
        :data="
          table_datas.slice(
            (current_page - 1) * page_size,
            current_page * page_size - 1
          )
        "
        stripe
        style="width: 100%"
        class="paging-table">
        <el-table-column prop="NAME" label="名称" width="280" align="center">
        </el-table-column>
        <el-table-column prop="ID" label="商品编号" width="280" align="center">
        </el-table-column>
        <el-table-column prop="ORI_PRICE" label="原价" align="center">
        </el-table-column>
        <el-table-column prop="PRESENT_PRICE" label="现价" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i>修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
            >
              <i class="el-icon-delete"></i>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="block">
      <Pagination
        :total_pages="total_pages"
        @getPageSize="getPageSize"
        @getCurrentPage="getCurrentPage"
      ></Pagination>
    </div>
    <div style="margin: 20px 20px;">
      <el-button size="mini" type="primary">导出xls</el-button>

      <el-button size="mini" type="danger">导出csv</el-button>
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination/Pagination";
export default {
  name: "PagingForm",
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      table_datas: [], //table的表数据
      page_size: 50, //分页中每页的数据条数
      current_page: 1, //当前的在第几页
      total_pages: 0,

      state: "",
      timeout: null
    };
  },
  methods: {
    getPagingForm() {
      this.$axios.req("/api/tableData ").then(res => {
        this.table_datas = res.data;
        this.total_pages = res.data.length;
      });
    },
    getPageSize(value) {
      this.page_size = value;
    },
    getCurrentPage(value) {
      this.current_page = value;
    },
    //删除功能
    handleDelete(index) {
      this.table_datas.splice(index, 1);
    }
  },
  mounted() {
    this.getPagingForm();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .box-card{
    margin: 20px 20px
  }
</style>
