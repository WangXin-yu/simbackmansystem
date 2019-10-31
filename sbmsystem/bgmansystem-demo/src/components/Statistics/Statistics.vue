<template>
  <div class="statistics-container">
    <div class="charts-container">
      <Category ></Category>
    </div>
    <div class="bottom-charts">
      <WaterFall></WaterFall>
    </div>
  </div>
  
</template>

<script>
  import Category from "./PieChart/PieCharts"
  import WaterFall from "./PieChart/WaterFall"
  export default {
    name: "Statistics",
    components: {
      Category,
      WaterFall,
    },
    props: {

    },
    data() {
      return {}
    },
    methods: {},
    mounted() {

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
  .statistics-container{
    padding: 20px;
  }
  .charts-container{
    width: 100%;
  }
  .bottom-charts{
    width: 100%;
    margin: 40px 0;
  }
</style>