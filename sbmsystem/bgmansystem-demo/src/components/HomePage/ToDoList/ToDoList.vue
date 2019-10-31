<template>
  <el-card class="box-card" style="padding: 10px;">
    <div class="header">
      <div><i class="el-icon-check" @click="all_election"></i></div>
      <div>ToDoList</div>
    </div>
    <!--展示所有的数据-->
    <div v-if="show_all">
      <div  v-for="(item, index) in plug_in_list" :key="item.id">
        <div class="list-item" @mouseenter="showClose(item)" @mouseleave="hideClose(item)">
          <i
              :class="{ 'el-icon-check': item.toggle }"
              class="toggle"
              @click="clickToggle(index)"
          ></i>
          <div>{{ item.name }}</div>
          <i :class="{ 'el-icon-close': item.show_close }" class="close-btn" @click="deleteItem(index)"></i>
        </div>
      </div>
    </div>

<!--    展示未完成的-->
    <div  v-else-if="show_active" >
      <div v-for="(item, index) in plug_in_list" :key="item.id">
        <div v-if="item.toggle===false" class="list-item" @mouseenter="showClose(item)" @mouseleave="hideClose(item)">
          <i
              :class="{ 'el-icon-check': item.toggle }"
              class="toggle"
              @click="clickToggle(index)"
          ></i>
          <div>{{ item.name }}</div>
          <i :class="{ 'el-icon-close': item.show_close }" class="close-btn" @click="deleteItem(index)"></i>
        </div>
      </div>
    </div>
    <!--展示已完成的-->
    <div v-else-if="show_completed">
      <div v-for="(item, index) in plug_in_list" :key="item.id">
        <div v-if="item.toggle===true" class="list-item" @mouseenter="showClose(item)" @mouseleave="hideClose(item)">
          <i
              :class="{ 'el-icon-check': item.toggle }"
              class="toggle"
              @click="clickToggle(index)"
          ></i>
          <div>{{ item.name }}</div>
          <i :class="{ 'el-icon-close': item.show_close }" class="close-btn" @click="deleteItem(index)"></i>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>{{Incomplete}} items left</div>
      <el-button plain class="all-btn" @click="showAll">All</el-button>
      <div @click="showActive" class="active-btn">Acive</div>
      <div @click="showCompleted" class="completed-btn">Completed</div>
    </div>
  </el-card>
</template>

<script>

export default {
  name: "ToDoList",
  components: {},
  props: {},
  data() {
    return {
      plug_in_list: [
        { name: "star in repository", toggle: false , show_close:false},
        { name: "fork in repository", toggle: false , show_close:false},
        { name: "follow author", toggle: false , show_close:false},
        { name: "vue-admin", toggle: true , show_close:false},
        { name: "vue", toggle: false , show_close:false},
        { name: "element-ui", toggle: true , show_close:false},
        { name: "axios", toggle: false , show_close:false},
        { name: "webpack", toggle: false , show_close:false}
      ],
      is_all_election: false,
      show_close: false,

      show_all:true,         //展示所有数据的按钮
      show_active:false,      //展示未完成的数据的按钮
      show_completed:false,   //展示已完成的数据的按钮
    };
  },
  methods: {
    clickToggle(index) {
      this.plug_in_list[index].toggle = !this.plug_in_list[index].toggle;
    },
    all_election() {
      this.is_all_election = !this.is_all_election;
      if (this.is_all_election) {
        this.plug_in_list.map((item) => {
          item.toggle = true;
        })
      }
    },
    showClose(item){
      item.show_close = true;
    },
    hideClose(item){
      item.show_close = false;
    },
    deleteItem(index){
      this.plug_in_list.splice(index, 1);
    },

    //展示所有的数据
    showAll(){
      this.show_all = true;
      this.show_active = false;
      this.show_completed = false;
    },
    //展示问完成的数据
    showActive(){
      this.show_all = false;
      this.show_active = true;
      this.show_completed = false;
    },
    //展示已完成的数据
    showCompleted(){
      this.show_all = false;
      this.show_active = false;
      this.show_completed = true;
    }
  },
  mounted() {
  },
  created() {},
  filters: {},
  computed: {
    Incomplete:function() {
      return this.$lodash.filter(this.plug_in_list, {"toggle": false}).length;
    },
  },
  watch: {

  },
  directives: {}
};
</script>
<style>
.el-checkbox__input {
  border-radius: 5px;
}
</style>
<style scoped lang="scss">
.toggle {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 17px;
  margin: 0 15px;
  margin-top:4px;
}
.list-item {
  display: flex;
  margin: 5px 0;
    font-size: 14px;
    line-height:25px;
  position:relative;
}
.list-item:hover{
  cursor: pointer;
}
.header {
  height: 30px;
  border-bottom: 1px solid #f0f2f5;
  text-align: right;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding-left:15px;
}
    .footer{
        height: 77px;
        width: 100%;
      padding-top:20px;
      padding-left: 20px;
      font-size:12px;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      border-top: 1px solid #ccc;
    }
    .footer>div{
      margin-top: 5px;
    }
  .all-btn {
    height: 5px;
    text-align: center;
    line-height: 5px;
    font-size: 12px;
  }
  .close-btn{
    height:5px;
    width: 5px;
    position: absolute;
    right:10px;
    color:red;
    margin-top:5px;
  }
  .active-btn:hover, .completed-btn:hover{
    cursor: pointer;
  }

</style>
