<template>
  <div style="text-align: center">
    <div class="saygoodbye">期待您的下次光临</div>
    <el-button type="primary" @click="exitSystem">确定退出</el-button>
  </div>
  
</template>

<script>
  export default {
    name: "Exit",
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {
      exitSystem(){
        this.exitSuccess();
        this.$router.push("/")
        localStorage.setItem("username", '');
      },
      exitSuccess(){
        this.$message({
          message: "欢迎下次登录",
          type:"success",
        });
      }
    },
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
  .saygoodbye{
    text-align: center;
    margin-top:100px;
    font-size: 30px;
    line-height: 100px;
    font-weight: bold;
  }
</style>