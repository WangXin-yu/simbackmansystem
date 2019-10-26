<template>
  <div>
    <el-card class="box-card">
      <ve-pie :data="ring_datas" :settings="chartSettings"></ve-pie>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Ring",
  components: {},
  props: {},
  data() {
    this.chartSettings = {
      roseType: 'radius'
    }
    return {
      ring_datas:{},

    };
  },
  methods: {
    getRingData(){
      //处理得到数据对象，添加一个rows存键值的数组, 将data键值改为columns
      this.$axios.req("api/ringChat").then(res=>{
        this.ring_datas = res;
        let columns = Object.keys(this.ring_datas.data[0]);   //添加rows存键值的数组
        this.ring_datas.columns = columns;
        let rows = this.ring_datas.data;
        delete(this.ring_datas.data);
        delete(this.ring_datas.code);
        this.ring_datas.rows = rows ;      //将data键值名修改为columns
      }).catch(error=>{
        console.log(error);
      })
    }
  },
  mounted() {
    this.getRingData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
