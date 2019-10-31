<template>
  <div>
    <el-tabs style="margin:20px;"  v-model="active_index">
      <el-tab-pane name="first">
        <span slot="label">未读信息({{unread_array.length}})</span>
        <el-card class="box-card">
          <div v-if="unread_array.length !=0 ">
            <div v-for="(item, index) in unread_array" :key="item.id">
              <div class="news-item">
                <div>{{ item.news }}</div>
                <div>
                  {{ item.date }}
                  <el-button @click="markedRead(index)">标为已读</el-button>
                </div>
              </div>
            </div>
            <el-button type="primary" style="margin-top:20px;"
                       @click="markedAllRead"
            >全部标记为已读</el-button
            >
          </div>
          <div v-else align="center" style="line-height: 30px">
              暂无数据
          </div>

        </el-card>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">已读信息({{read_arr.length}})</span>
        <el-card class="box-card">
          <div v-if="read_arr.length !== 0">
            <div v-for="(item, index) in read_arr" :key="item.iid" class="news-list">
                <div class="news-item">
                  <div>{{item.news}}</div>
                  <div>
                    {{ item.date}}
                    <el-button @click="markedRecycle(index)">删除</el-button>
                  </div>
                </div>
            </div>
            <el-button type="danger" style="margin-top:20px;" @click="markedAllRecycle">
              删除全部</el-button>
          </div>
          <div v-else align="center" style="line-height: 30px">暂无数据</div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label">回收站({{recycle_arr.length}})</span>
        <el-card class="box-card">
          <div v-if="recycle_arr.length !== 0">
            <div v-for="(item, index) in recycle_arr" :key="item.id">
              <div class="news-item">
                <div>{{ item.news }}</div>
                <div>
                  {{ item.date }}
                  <el-button @click="reduction(index)">还原</el-button>
                </div>
              </div>
            </div>
            <el-button type="info" style="margin-top:20px;" @click="emptyRecycle">清空回收站</el-button>
          </div>
          <div v-else align="center" style="line-height: 30px">
            暂无数据
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "TablePage",
  components: {},
  props: {},
  data() {
    return {
      unread_array: [
        {
          news: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          date: "2018-04-19 20:00:00"
        },
        { news: "今晚12点整发大红包，先到先得", date: "2018-04-19 21:00:00" },
        { news: "今晚12点整发大红包，先到先得", date: "2018-04-19 21:00:00" }
      ], //存放未读信息
      read_arr: [], //存放已读信息
      recycle_arr: [
        { news: "【系统通知】您的优惠券已经过期", date: "2018-04-19 20:00:00" }
      ], //存放回收站的信息
      active_index: "first"
    };
  },
  methods: {
    //将未读数组中的index下的元素转移到已读数组中
    markedRead(index){
      this.read_arr.push(this.unread_array[index]);
      this.unread_array.splice(index, 1);
    },
    //将所有的未读数据标记为已读
    markedAllRead(){
      this.unread_array.forEach((item)=>{
        this.read_arr.push(item);
      })
      this.unread_array = [];
    },
    //将已读信息转移到回收站中----已读删除
    markedRecycle(index){
      this.recycle_arr.push(this.read_arr[index]);
      this.read_arr.splice(index, 1);
    },
    //将所有的已读数据删除
    markedAllRecycle(){
      this.read_arr.forEach((item)=>{
        this.recycle_arr.push(item);
      })
      this.read_arr = [];
    },
    //还原回收站
    reduction(index){
      this.read_arr.push(this.recycle_arr[index]);
      this.recycle_arr.splice(index, 1);
    },
    //清空回收站
    emptyRecycle(){
      this.recycle_arr = [];
    },
  },
  mounted() {
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style>
  .el-card__body{
    padding:20px;
    box-sizing: border-box;
  }
</style>
<style scoped lang="scss">
.news-item {
  display: flex !important;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  line-height: 60px;
}

</style>
