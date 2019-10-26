<template>
  <div>
    <CarList></CarList>
    <VeLine></VeLine>
    <div class="chart-list">
      <RadarChart class="chart"></RadarChart>
      <Ring class="chart"></Ring>
      <Histogram class="chart"></Histogram>
    </div>
    <div class="bottom-chart-list">
      <div class="orders-component"><Orders></Orders></div>
      <div class="todolist-component"><ToDoList></ToDoList></div>
      <div class="progress-component"><Progress></Progress></div>
    </div>
  </div>
</template>

<script>
import CarList from "./CarList/CarList";
import VeLine from "./VLine/VLine";
import RadarChart from "./RadarChart/RadarChart";
import Ring from "./Ring/Ring";
import Histogram from "./Histogram/Histogram";
import Orders from "./Orders/Orders";
import Progress from "./Projress/Projress";
import ToDoList from "./ToDoList/ToDoList";
export default {
  name: "HomePage",
  components: {
    CarList, //顶部卡品
    VeLine, //折线图
    RadarChart, //雷达图
    Ring, //饼图
    Histogram, //柱状图
    Orders, //订单
    Progress, //进度条
    ToDoList //ToDoList
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style>
.el-card__body {
  padding: 0;
}
</style>

<style scoped lang="scss">
.chart {
  width: 33%;
}
.chart-list {
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 0 auto;
}
.bottom-chart-list {
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 0 auto;
}
.orders-component {
  width: 49%;
  margin-top: 10px;
  box-sizing: border-box;
}
.todolist-component {
  width: 25%;
  height: 340px;
  margin-top: 10px;
  box-sizing: border-box;
}
.progress-component {
  width: 25%;
  height: 340px;
  margin-top: 10px;
  box-sizing: border-box;
}
</style>
