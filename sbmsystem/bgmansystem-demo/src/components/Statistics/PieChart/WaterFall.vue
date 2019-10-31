<template>
  <div>
    <ve-waterfall :data="uniquedate_datas" ></ve-waterfall>
  </div>
  
</template>

<script>
  export default {
    name: "WaterFall",
    components: {},
    props: {},
    data() {
      return {
        article_datas:[],
        date_datas:[],
        uniquedate_datas:[],
      }
    },
    methods: {
      getAllAritcle() {
        this.$axios
            .req("/api/article/allArticle")
            .then(res => {
              this.article_datas = res.data;
              this.computedDate();
            })
            .catch(err => {
              console.log(err);
            });
      },
      computedDate(){
        this.date_datas = this.article_datas.map((item)=>{
          return item.date.slice(0, item.date.indexOf("日")+1);
        });
        let temp = [];
        for(let i = 0; i < this.date_datas.length; i++){
          temp.push(this.date_datas[i]);
        };
        this.uniqueArray(this.date_datas);
        let rows = [];
        for(let i = 0; i < this.date_datas.length; i++){
          let unique_date = {};
          let count = 0;
          for(let j = 0; j < temp.length; j++){
            if(temp[j] === this.date_datas[i]){
              count++;
            }
          }
          this.$set(unique_date, '时间', this.date_datas[i]);
          this.$set(unique_date, '数量', count);
          rows.push(unique_date);
        }
        // console.log(rows);
        let columns = ["时间", "数量"];
        this.$set(this.uniquedate_datas, 'columns', columns);
        this.$set(this.uniquedate_datas, 'rows', rows);
      },
      //数组去重
      uniqueArray(arr){
        for(let i = 0; i < arr.length;i++){
          for(let j = i+1; j <=arr.length; j++){
            if(arr[j] === arr[i]){
              arr.splice(j, 1);
              j--;
            }
          }
        }
      }
    },
    mounted() {
      this.getAllAritcle();
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

</style>