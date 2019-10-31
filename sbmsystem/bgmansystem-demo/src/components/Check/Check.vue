<template>
  <div>
    <el-button type="primary" style="margin:20px" @click="goToPublished">返回</el-button>
    <div class="article-title">
      {{article_info.text}}
    </div>
    <div class="article-summary">
      {{article_info.abstract}}
    </div>
    <div class="release-date">
      {{article_info.date}}
    </div>
    <mavon-editor
        class="md"
        :value="article_info.text"
        :subfield = "false"
        :defaultOpen = "'preview'"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="true"
        :ishljs = "true"
        style="margin: 20px"
    ></mavon-editor>
  </div>
  
</template>

<script>
  export default {
    name: "Check",
    components: {},
    props: {},
    data() {
      return {
        article_info: '',
        article_id:'',
      }
    },
    methods: {
      getArticleInfo(){
        this.article_id = this.$route.query.id;
        this.$axios.req("api/article/article", {_id: this.article_id}).
            then((res)=>{
          this.article_info = res.data;
          console.log(this.article_info);
        }).catch((err)=>{
          console.log(err);
        })
      },
      //返回到发布页面
      goToPublished(){
        this.$router.push("/published");
      }
    },
    mounted() {
      this.getArticleInfo();
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
  .article-title{
    text-align: center;
    line-height: 60px;
    font-size:20px;
    font-weight: bold;
  }
  .article-summary{
    text-align: center;
    line-height: 30px;
    font-size:16px;
  }
  .release-date{
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color:#ccc;
  }
  .box-card{
    margin: 20px;
    min-height: 500px;
  }
</style>