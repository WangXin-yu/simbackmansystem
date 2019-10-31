<template>
  <div>
    <el-card class="box-card">
      <ve-histogram :data="histogramData"></ve-histogram>
    </el-card>
  </div>
  
</template>

<script>
  export default {
    name: "Histogram",
    components: {},
    props: {},
    data() {
      return {
        histogramData:{},
      }
    },
    methods: {
      getHistogramData(){
        //处理得到数据对象，添加一个rows存键值的数组, 将data键值改为columns
        this.$axios.req("api/homeChat").then(res=>{
          this.histogramData = res;
          let columns = Object.keys(this.histogramData.data[0]);   //添加rows存键值的数组
          this.histogramData.columns = columns;
          let rows = this.histogramData.data;
          delete(this.histogramData.data);
          delete(this.histogramData.code);
          this.histogramData.rows = rows ;      //将data键值名修改为columns
        }).catch(error=>{
          console.log(error);
        })
      }
    },
    mounted() {
      this.getHistogramData();
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

</style>