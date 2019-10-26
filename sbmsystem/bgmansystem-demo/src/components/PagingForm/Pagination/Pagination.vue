<template>
  <div>
    <el-pagination style="margin-left:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[500, 200, 100, 50]"
        :page-size="50"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_pages">
    </el-pagination>
  </div>
  
</template>

<script>
  export default {
    name: "Pagination",
    components: {},
    props: {
      total_pages:{
        type:Number,
        default: 50,
      }
    },
    data() {
      return {}
    },
    methods: {
      handleSizeChange(val) {
        //每页的条数即为循环的条数
        this.$emit("getPageSize", val)
      },
      handleCurrentChange(val) {
        //获取当前在第几页
        this.$emit("getCurrentPage", val)
      },
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

</style>