<template>
  <div>
    <el-card class="box-card">
      <el-table
          :data="show_table_datas.slice((current_page-1)*page_size, current_page*page_size)"
          stripe
          style="width: 100%"
          class="paging-table">
        <el-table-column prop="NAME" label="名称" width="280" align="center">
        </el-table-column>
        <el-table-column prop="ID" label="商品编号" width="290" align="center">
        </el-table-column>
        <el-table-column prop="ORI_PRICE" label="原价" align="center">
        </el-table-column>
        <el-table-column prop="PRESENT_PRICE" label="现价" align="center">
        </el-table-column>
      </el-table>
    </el-card>
    <!--生成一个蒙版-->
    <div class="cover" v-if="show_edit_interface">
    </div>
    <!--如果点击编辑按钮显示编辑面板-->
    <div v-if="show_edit_interface" class="edit-interface">
      <div class="row-item">名称: <el-input v-model="goods_name" class="edit-input" ></el-input></div>
      <div class="row-item">原价: <el-input v-model="original_post" class="edit-input"></el-input></div>
      <div class="row-item">现价: <el-input v-model="present_price" class="edit-input"></el-input></div>
      <div style="height: 60px; position: relative; margin-top:40px; z-index:3000">
        <div class="bottom-btn">
          <el-button plain @click="cancelEdit">取消</el-button>
          <el-button type="primary" @click="confirmEdit()">确定</el-button>
        </div>
      </div>
    </div>
    <div class="block">
      <Pagination
          :total_pages="total_pages"
          :page_sizes_arr="page_sizes_arr"
          @getPageSize="getPageSize"
          @getCurrentPage="getCurrentPage"
      ></Pagination>
    </div>
    <div style="margin: 20px 20px; display: flex">
      <download-excel
          :data   = "show_table_datas" type="xls">
        <el-button size="mini" type="primary">导出xls</el-button>
      </download-excel>
      <download-excel
          :data   = "show_table_datas" type="csv" style="margin: 0 20px">
        <el-button size="mini" type="danger">导出csv</el-button>
      </download-excel>
    </div>

  </div>
</template>

<script>
  import Pagination from "../PagingForm/Pagination/Pagination";
  export default {
    name: "ExportEcel",
    components: {
      Pagination
    },
    props: {},
    data() {
      return {
        table_datas: [], //table的表数据
        show_table_datas:[],
        page_size: 50, //分页中每页的数据条数
        page_sizes_arr: [500, 200, 100, 50],
        current_page: 1, //当前的在第几页
        total_pages: 0,
        state: "",
        timeout: null,
        show_edit_interface: false, //是否展示编辑面板
        goods_name: '',   //绑定编辑面板中的商品名称的输入框
        original_post:0, //绑定编辑面板中的原价输入框
        present_price:0, //绑定编辑面板中的现价输入框
        current_index: 0, //绑定当前选中的商品
        search_keys:'',   //绑定搜索框的输入的关键字
      };
    },
    methods: {
      getPagingForm() {
        this.$axios.req("/api/tableData ").then(res => {
          this.table_datas = res.data;
          this.total_pages = res.data.length;
          this.show_table_datas = res.data;
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
        this.total_pages = this.total_pages-1;
      },
      //编辑功能
      handleEdit(row_item){
        //找到该行数据在数组中的下表
        let index = this.table_datas.indexOf(row_item);
        this.current_index = index;
        this.goods_name = this.table_datas[index].NAME;
        this.original_post = this.table_datas[index].ORI_PRICE;
        this.present_price = this.table_datas[index].PRESENT_PRICE;
        this.show_edit_interface = true;
      },
      //取消编辑面板
      cancelEdit(){
        this.show_edit_interface = false;
      },
      //确认编辑面板
      confirmEdit(){
        this.table_datas[this.current_index].NAME = this.goods_name;
        this.table_datas[this.current_index].ORI_PRICE = this.original_post;
        this.table_datas[this.current_index].PRESENT_PRICE = this.present_price;
        this.show_edit_interface = false;
      },
    },
    mounted() {
      this.getPagingForm();

    },
    created() {},
    filters: {},
    computed: {},
    watch: {
      search_keys(val) {
        if (val.trim() !== '') {
          this.show_table_datas = this.table_datas.filter((item) => {
            return JSON.stringify(item.NAME).includes(val);
          });
          this.total_pages = this.show_table_datas.length;
        } else {
          this.show_table_datas = this.table_datas;
          console.log(this.table_datas);
          this.total_pages = this.show_table_datas.length;
        }
      },
    },
    directives: {}
  };
</script>

<style scoped lang="scss">
  .box-card{
    margin: 20px 20px
  }
  .edit-interface{
    position:fixed;
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 30%;
    background: #fff;
    padding-top: 80px;
    box-sizing: border-box;
    z-index: 1000;
  }
  .row-item{
    padding: 0 20px;
  }
  .edit-input{
    width: 80%;
    line-height: 70px;
    padding-left:20px;
  }
  .bottom-btn{
    position: absolute;
    height: 20px;
    right:50px;
  }
  .cover{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
  }
</style>
