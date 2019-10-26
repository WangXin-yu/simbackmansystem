<template>
  <div>
    <el-card class="box-card">
      <div class="bg">
      </div>
      <div v-for="item in progress_datas" :key="item.id">
        <div class="name">{{item.name}}</div>
        <el-progress :percentage="item.progress*100"></el-progress>
      </div>

    </el-card>

  </div>
  
</template>

<script>
  export default {
    name: "Projress",
    components: {},
    props: {},
    data() {
      return {
        progress_datas:{}
      }
    },
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      },
      getProgressData(){
        this.$axios.req("api/progress ").then(res=>{
          this.progress_datas = res.data;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.getProgressData();
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
  .bg{
    margin: 15px auto;
    width: 90%;
    height: 200px;
    background: url("../../../images/gutar.jpg") no-repeat center center;

  }
  .el-progress{
    height:19px;
    width: 90%;
    margin: 0 auto;
  }
  .name{
    margin-left: 20px;
    font-size:12px;
  }
</style>