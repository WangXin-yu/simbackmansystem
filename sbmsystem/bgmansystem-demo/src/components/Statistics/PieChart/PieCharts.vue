<template>
  <div>
    <div class="header-container">
        <div class="header-box">
          <div>今日发布</div>
          <div>{{release_today}}</div>
          <i class="el-icon-check icon"></i>
        </div>
        <div class="header-box">
          <div>原创文章</div>
          <div>{{source.Original}}</div>
          <i class="el-icon-tickets icon"></i>
        </div>
        <div class="header-box">
          <div>新留言</div>
          <div>1</div>
          <i class="el-icon-bell icon"></i>
        </div>
        <div class="header-box">
          <div>新消息</div>
          <div>1</div>
          <i class="el-icon-phone-outline icon"></i>
        </div>
      </div>
    <div class="pie-container">
      <div>
        <ve-pie :data="category_datas" style="width: 400px;"></ve-pie>
      </div>
       <div>
         <ve-pie :data="source_datas" style="width: 400px;"></ve-pie>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PieChart",
  components: {},
  props: {},
  data() {
    return {
      article_datas: [],
      category_datas: {}, //存储类目的各项数量
      source_datas: {}, //存储来源的各项数量
      release_today: 0,//存储今日发布文章的书数量
      category: {
        Vue: 0,
        Tool: 0,
        JavaScript: 0,
        Rect: 0,
        Other: 0,
        SmallProgram: 0,
        Optimization: 0,
        Node_js: 0
      },
      source: {
        Original: 0,
        Reprint: 0,
        Cooperation: 0
      }
    };
  },
  methods: {
    getAllAritcle() {
      this.$axios
        .req("/api/article/allArticle")
        .then(res => {
          this.article_datas = res.data;
          this.computedCategory();
          this.computedFrom();
          this.releaseToday()//计算今日发布的数量
        })
        .catch(err => {
          console.log(err);
        });
    },
    computedCategory() {
      this.category.Vue = this.$lodash.filter(this.article_datas, [
        "category",
        "Vue"
      ]).length;
      this.category.Tool = this.$lodash.filter(this.article_datas, [
        "category",
        "工具类"
      ]).length;
      this.category.JavaScript = this.$lodash.filter(this.article_datas, [
        "category",
        "JavaScript"
      ]).length;
      this.category.Rect = this.$lodash.filter(this.article_datas, [
        "category",
        "Rect"
      ]).length;
      this.category.Other = this.$lodash.filter(this.article_datas, [
        "category",
        "其他"
      ]).length;
      this.category.SmallProgram = this.$lodash.filter(this.article_datas, [
        "category",
        "小程序"
      ]).length;
      this.category.Optimization = this.$lodash.filter(this.article_datas, [
        "category",
        "性能优化"
      ]).length;
      this.category.Node_js = this.$lodash.filter(this.article_datas, [
        "category",
        "Node.js"
      ]).length;
      //将得到的数据转换成饼图需要的格式
      let columns = ["category", "number"];
      this.$set(this.category_datas, 'columns', columns)
      let rows = [
        { category: "Vue", number: this.category.Vue },
        { category: "Tool", number: this.category.Tool },
        { category: "JavaScript", number: this.category.JavaScript },
        { category: "Rect", number: this.category.Rect },
        { category: "Other", number: this.category.Other },
        { category: "SmallProgram", number: this.category.SmallProgram },
        { category: "Optimization", number: this.category.Optimization },
        { category: "Node.js", number: this.category.Node_js }
      ];
      this.$set(this.category_datas, 'rows', rows)
    },
    computedFrom(){
      this.source.Original = this.$lodash.filter(this.article_datas, ['source', '原创']).length;
      this.source.Reprint = this.$lodash.filter(this.article_datas, ['source', '转载']).length;
      this.source.Cooperation = this.$lodash.filter(this.article_datas, ['source', '与他人合作']).length;
      //将得到的数据转换成饼图需要的格式
      let columns = ["source", "number"];
      this.$set(this.source_datas, "columns", columns);
      let rows = [
        {"source": "转载", "number": this.source.Original},
        {"source": "原创", "number": this.source.Reprint},
        {"source": "与他人合作", "number": this.source.Cooperation},
      ];
      // this.source_datas.rows = rows;
      this.$set(this.source_datas, "rows", rows);
    },
    releaseToday(){
      let today = this.$dayjs(new Date()).format("YYYY年MM月DD日");
      console.log(today);
      let date_datas = this.article_datas.map((item)=>{
        return item.date.slice(0, item.date.indexOf("日")+1);
      });
     let length = 0;
     for(let i = 0; i < date_datas.length; i++){
       if(date_datas[i] === today){
          length++;
       }
     }
      this.release_today = length;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getAllAritcle();
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .pie-container{
    width: 90%;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
  }
  .pie-container>div{
    margin: 0 130px;
  }
  .header-container{
    width: 100%;
    background: red;
    height: 80px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 40px;
  }
  .header-container>.header-box{
    width: 25%;
    height: 100%;
    background: blue;
    color: #fff;
    padding-top: 20px;
    box-sizing: border-box;
    position: relative;
  }
  .header-container>.header-box:first-child{
    background: #77cabf;
  }
  .header-container>.header-box:nth-child(2){
    background: #e88a8f;
  }
  .header-container>.header-box:nth-child(3){
    background: #8375a3;
  }
  .header-container>.header-box:last-child{
    background: #9fcec1;
  }
  .icon{
    position: absolute;
    right: 10%;
    bottom: 45%;
  }
</style>
