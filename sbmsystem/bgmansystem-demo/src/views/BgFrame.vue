<template>
  <div>
    <div class="header">
      <div>欢迎{{username}}来到{{username}}后台管理系统</div>
      <div>
        <span>{{sayhi}}</span>,
        亲爱的{{username}} 上次登录时间：2019年10月23日17时44分15秒</div>
    </div>
    <div class="content-box">
      <div>
        <div class="side">
          <el-menu
              class="el-menu-vertical-demo"
              background-color="#344055"
              text-color="#fff"
              active-text-color="#ffd04b"
              :default-active="$route.path"
              router
              >
            <el-menu-item index="/home-page" @click="goToHomePage">
              <i class="el-icon-location-outline" ></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/paging-form" @click="goToPagingForm">
              <i class="el-icon-menu"></i>
              <span slot="title">分页表格</span>
            </el-menu-item>
            <el-menu-item index="/tab-page" @click="goToTabPage">
              <i class="el-icon-document"></i>
              <span slot="title">标签页</span>
            </el-menu-item>
            <el-menu-item index="/picture-upload" @click="goToPicturUpload">
              <i class="el-icon-check"></i>
              <span slot="title">图片上传</span>
            </el-menu-item>
            <el-menu-item index="/published" @click="goToPublished">
              <i class="el-icon-lock"></i>
              <span slot="title">已发表</span>
            </el-menu-item>
            <el-menu-item index="/publish-article" @click="goToPublishArticle">
              <i class="el-icon-message"></i>
              <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/statistics" @click="goToStatistics">
              <i class="el-icon-setting"></i>
              <span slot="title">统计</span>
            </el-menu-item>
            <el-menu-item index="/export-excel" @click="goToExportExcel">
              <i class="el-icon-setting"></i>
              <span slot="title">导出excel</span>
            </el-menu-item>
            <el-menu-item index="/exit" @click="goToExit">
              <i class="el-icon-delete"></i>
              <span slot="title">退出系统</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>

      <div class="main">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "BgFrame",
    components: {},
    props: {},
    data() {
      return {
        username:'',
        sayhi: '',
        dataArray:[],
        active_index:1,
      }
    },
    methods: {
      getCity () {
        this.$axios.req('api/Showtime/HotCitiesByCinema.api').then(res => {
          this.dataArray = res.p
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      goToHomePage(){
        this.$router.push("/home-page");
      },
      goToPagingForm(){
        this.$router.push("/paging-form");
      },
      goToTabPage(){
        this.$router.push("/tab-page");
      },
      goToPicturUpload(){
        this.$router.push("/picture-upload");
      },
      goToPublished(){
        this.$router.push("/published");
      },
      goToPublishArticle(){
        this.$router.push("/publish-article");
      },
      goToStatistics(){
        this.$router.push("/statistics");
      },
      goToExportExcel(){
        this.$router.push("/export-excel");
      },
      goToExit(){
        this.$router.push("/exit");
      },
      initArticle(){
        this.$store.state.article = this.init_article_datas;
      },
      SayHello(){
        let date = (new Date()).getHours();
        if(date < 11 && date > 6) {
          this.sayhi = "上午好"
        }else if(date < 14){
          this.sayhi = "中午好"
        }else if(date < 17){
          this.sayhi = "下午好"
        }else if(date < 24){
          this.sayhi = "晚上好"
        }else{
          this.sayhi = "该睡觉了"
        }
      }
    },

    computed: {
      onRoutes(){

        let path = this.$route.path.replace('/','');

        return path ? path : '/';

      }
    },
    mounted() {
      this.initArticle();
      this.username = this.$store.state.userInfo.username;
      this.SayHello();
    },
    created() {

    },
    filters: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .header{
    display: flex;
    justify-content: space-between;
    background: #2e5e85;
    color: #fff;
    position:fixed;
    line-height: 40px;
    width: 100%;
    top: 0px;
    overflow: hidden;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 1000;
  }
  .side{
    background: #344055;
    position: fixed;
    top: 40px;
    bottom: 0;
    width: 13%;
  }
  .content-box{
    display: flex;
    justify-content: space-between;
  }
  .main{
    background: #f0f2f5;
    width: 87%;
    margin:40px 0;
  }
</style>