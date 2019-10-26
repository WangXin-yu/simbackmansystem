<template>
    <div class="carlist">
      <el-card class="box-card">
        <div class="card-item">
          <div><img src="../../../icons/people.png" alt=""></div>
          <div>
            <div class="title">New Visits</div>
            <countTo :startVal="0" :endVal="card_datas.visits"
              :duration="2000"></countTo>
          </div>
        </div>

      </el-card>
      <el-card class="box-card">
        <div class="card-item">
          <div><img src="../../../icons/message.png" alt=""></div>
          <div>
            <div class="title">Messages</div>
            <countTo :startVal="0" :endVal="card_datas.messages"
                     :duration="2000"></countTo>
          </div>
        </div>

      </el-card>
      <el-card class="box-card">
        <div class="card-item">
          <div><img src="../../../icons/rmb.png" alt=""></div>
          <div>
            <div class="title">Purchases</div>
            <countTo :startVal="0" :endVal="card_datas.purchases"
                     :duration="2000"></countTo>
          </div>
        </div>

      </el-card>
      <el-card class="box-card">
        <div class="card-item">
          <div><img src="../../../icons/car.png" alt=""></div>
          <div>
            <div class="title">Shoppings</div>
            <countTo :startVal="0" :endVal="card_datas.shopping"
                     :duration="2000"></countTo>
          </div>
        </div>
      </el-card>
    </div>
</template>

<script>
  import countTo from 'vue-count-to';
  export default {
    name: "CarList",
    components: {countTo},
    props: {},
    data() {
      return {
        card_datas:{},
      }
    },
    methods: {
      //获取card里面的数据
      getCardDate(){
        this.$axios.req('api/homeData').then(res=>{
          this.card_datas = res.data;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.getCardDate();
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style>
  .el-card__body{
    width:100%;
    padding:20px 30px;
  }
</style>

<style scoped lang="scss">
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 280px;
    height: 94px;
    display: flex;
    justify-content: space-between;
  }
  .carlist{
    width: 98%;
    margin: 0 auto;
    margin-top: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  img{
    width: 50px;
    height: 50px;
  }
  .card-item{
    padding-top:15px;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  .title{
    color: #ccc;
    margin: 5px 0;
  }
</style>