<template>
  <div>
    <el-card class="box-card">
      <div class="order-header">
        <div class="column1">Order_No</div>
        <div class="column2">Price</div>
        <div class="column3">Status</div>
      </div>
      <div class="order-rows" v-for="item in orders_datas" :key="item.id"
        >
          <div class="column1">{{item.num}}</div>
          <div class="column2">￥{{item.price}} </div>
          <div class="column3"  v-if="item.status===0">
            <button class="pending-btn">pending</button>
          </div>
          <div class="column3"  v-else>
            <button class="success-btn">success</button>
          </div>
      </div>
    </el-card>

  </div>
  
</template>

<script>
  export default {
    name: "Orders",
    components: {},
    props: {},
    data() {
      return {
        orders_datas:{},
        chosed_bg: true,
      }
    },
    methods: {
      getHistogramData(){
        //处理得到数据对象，添加一个rows存键值的数组, 将data键值改为columns
        this.$axios.req("api/orderData ").then(res=>{
          this.orders_datas = res.data;
          this.orders_datas.chosed = true;
        }).catch(error=>{
          console.log(error);
        })
      },
      chosed(){

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
  .entry{
    display: flex;
    justify-content: space-around;
  }
  .order-header, .order-rows{
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f0f2f5;
    line-height: 40px;
    color: #666;
    margin: 0 10px;
    box-sizing: border-box;
    font-size:14px;
    box-sizing: border-box;
  }
  .order-header:hover, .order-rows:hover{
    cursor: pointer;
  }
  .column1{
    width: 60%;
    text-align: center;
  }
  .column2{
    width: 35%;
    text-align: center;
  }
  .column3{
    width: 30%;
    text-align: center;
    box-sizing: border-box;
    line-height: 30px;
  }
  .pending-btn{
    width: 60px;
    height:25px;
    margin-top: 8px;
    border-radius: 3px;
    color:#f56c6c;
    border: none;
    background: #fef0f0;
    border: 1px solid #fde5e5;
  }
  .success-btn{
    width: 60px;
    height:25px;
    margin-top: 8px;
    border-radius: 3px;
    border: 1px solid #e1f3d8;
    color:#afc53a;
    border: none;
    background: #f0f9eb;
  }
</style>