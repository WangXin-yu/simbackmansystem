<template>
  <div>
    <div class="header">
      <div>欢迎**来到**后台管理系统</div>
      <div>下午好,亲爱的** 上次登录时间：2019年10月23日17时44分15秒</div>
    </div>
    <div class="content-box">
      <div>
        <div class="side">
          <el-menu
              class="el-menu-vertical-demo"
              background-color="#344055"
              text-color="#fff"
              active-text-color="#ffd04b"
              default-active="1">
            <el-menu-item index="1" @click="goToHomePage">
              <i class="el-icon-location-outline" ></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="goToPagingForm">
              <i class="el-icon-menu"></i>
              <span slot="title">分页表格</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goToTabPage">
              <i class="el-icon-document"></i>
              <span slot="title">标签页</span>
            </el-menu-item>
            <el-menu-item index="4" @click="goToPicturUpload">
              <i class="el-icon-check"></i>
              <span slot="title">图片上传</span>
            </el-menu-item>
            <el-menu-item index="5" @click="goToPublished">
              <i class="el-icon-lock"></i>
              <span slot="title">已发表</span>
            </el-menu-item>
            <el-menu-item index="6" @click="goToPublishArticle">
              <i class="el-icon-message"></i>
              <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="7" @click="goToStatistics">
              <i class="el-icon-setting"></i>
              <span slot="title">统计</span>
            </el-menu-item>
            <el-menu-item index="8" @click="goToExportExcel">
              <i class="el-icon-setting"></i>
              <span slot="title">导出excel</span>
            </el-menu-item>
            <el-menu-item index="9" @click="goToExit">
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
      }
    },

    computed: {
    },
    mounted() {
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