<template>
  <el-card class="box-card">
    <div class="card-item">
      <ve-line :data="line_datas"></ve-line>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "VLine",
  components: {},
  props: {},
  data: function() {
    return {
      line_datas: []
    };
  },
  methods: {
    getLineDate() {
      this.$axios
        .req("api/homeChat")
        .then(res => {
          this.line_datas = res;
          let columns = [];
          for(let key in this.line_datas.data[1]){
              columns.push(key);
          }
          this.line_datas.columns = columns;
          let temp = this.line_datas.data;
          delete(this.line_datas.data);
          this.line_datas.rows = temp;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getLineDate();
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
    width: 98%;
    margin: 10px auto;
  }

</style>
