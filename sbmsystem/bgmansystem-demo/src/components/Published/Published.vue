<template>
  <div>
    <el-card class="box-card">
      <el-table
          :data="article_datas.slice(
            (current_page - 1) * page_size,
            current_page * page_size
          )"
          stripe
          border
          style="width: 100%">
        <el-table-column
            align="center"
            label="#"
            width="50"
            type="index">
        </el-table-column>
        <el-table-column
            align="center"
            prop="title"
            label="标题"
            width="250">
        </el-table-column>
        <el-table-column
            align="center"
            prop="author"
            label="作者">
        </el-table-column>
        <el-table-column
            align="center"
            prop="category"
            label="类目"
            width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.category===`Rect`">
                <el-button type="info" plain>{{scope.row.category}}</el-button>
            </div>
            <div v-else-if="scope.row.category===`JavaScript`">
              <el-button type="warning" plain>{{scope.row.category}}</el-button>
            </div>
            <div v-else-if="scope.row.category===`工具类`">
              <el-button type="danger" plain>{{scope.row.category}}</el-button>
            </div>
            <div v-else-if="scope.row.category===`Vue`">
              <el-button type="success" plain>{{scope.row.category}}</el-button>
            </div>
            <div v-else-if="scope.row.category===`性能优化`">
              <el-button  plain>{{scope.row.category}}</el-button>
            </div>
            <div v-else>
              <el-button type="primary" plain>其他</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="source"
            label="来源" width="100">
        </el-table-column>
        <el-table-column
            align="center"
          prop="star"
          label="重要性"
          width="150">
          <template slot-scope="scope">
            <el-rate :value=parseInt(scope.row.star)>{{scope.row.star}}</el-rate>
          </template>
        </el-table-column>

        <el-table-column
            align="center"
            prop="date"
            label="发布时间"
            width="150">
        </el-table-column>

        <el-table-column
            align="center"
            label="操作"
            width="300"
            >
          <template slot-scope="scope" >
            <el-button type="primary" @click="goToEdit(scope.row)">编辑</el-button>
            <el-button style="margin: 0 20px;" type="danger" @click="deleteArticle(scope.row)">删除</el-button>
            <el-button type="success" @click="goToCheck(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--    分页-->
    <div class="block">
      <Pagination
          :total_pages="total_pages"
          @getPageSize="getPageSize"
          @getCurrentPage="getCurrentPage"
      ></Pagination>
    </div>
  </div>
  
</template>

<script>
  import Pagination from "./Pagination/Pagination";
  export default {
    name: "Published",
    components: {
      Pagination,
    },
    props: {},
    data() {
      return {
        article_id: 0,
        article_datas:[],
        score: 2,
        page_size:4,
        current_page:1,
        total_pages: 8,
        date:'',
      }
    },
    methods: {
      getArticleDatas(){
        this.$axios.req("api/article/allArticle").then((res)=>{
          this.article_datas = res.data;
          this.total_pages = this.article_datas.length;
        }).catch((err)=>{
          console.log(err);
        })
      },
      getPageSize(value) {
        this.page_size = value;
      },
      getCurrentPage(value) {
        this.current_page = value;
      },
      deleteArticle(row){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.req("api/article/delete", {_id: row._id}).then((res)=>{
              console.log(res);
              this.getArticleDatas();
              this.total_pages--;
            }).catch((err)=>{
              console.log(err);
            });
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

      },
      deleteSuccess(){
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      },
      //跳转到编辑页面
      goToEdit(row){
        this.$router.push({path: "/published-edit",query:{id:row._id}});
      },
      //跳转到预览界面
      goToCheck(row){
        this.$router.push({path: "/Check",query:{id:row._id}});
      }
    },
    mounted() {
      this.getArticleDatas();
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .box-card{
    margin: 20px 20px;
    text-align: center;
  }
</style>