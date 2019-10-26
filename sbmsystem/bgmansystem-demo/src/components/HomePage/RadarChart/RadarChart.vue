<template>
  <div>
    <el-card class="box-card">
      <ve-radar :data="radar_datas"></ve-radar>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "RadarChart",
    components: {},
    props: {},
    data() {
      return {
        radar_datas:{},
      }
    },
    methods: {
      getRadarData(){
        //处理得到数据对象，添加一个rows存键值的数组, 将data键值改为columns
        this.$axios.req("api/radarChat").then(res=>{
          this.radar_datas = res;
          let columns = Object.keys(this.radar_datas.data[0]);   //添加rows存键值的数组
          this.radar_datas.columns = columns;
          let rows = this.radar_datas.data;
          delete(this.radar_datas.data);
          delete(this.radar_datas.code);
          this.radar_datas.rows = rows ;      //将data键值名修改为columns
        }).catch(error=>{
          console.log(error);
        })
      }
    },
    mounted() {
      this.getRadarData();
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