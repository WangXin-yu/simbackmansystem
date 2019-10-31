<template>
  <div>
    <div class="top">
      <div class="top-btn" >
        <el-button type="danger">查看</el-button>
        <el-button type="primary">发布</el-button>
      </div>
    </div>
    <el-form :rules="rules" :model="ruleForm" ref="ruleForm" label-width="100px">
      <el-form-item label="文章标题" prop="title" style="margin-right:20px;">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary" style="margin-right:20px;">
        <el-input v-model="ruleForm.summary"></el-input>
      </el-form-item>
      <div class="other-input">
        <el-form-item label="作者" prop="author" label-width="100px">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="类目" prop="category" >
          <el-select v-model="ruleForm.category">
            <el-option
                v-for="item in category_datas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="from">
          <el-select v-model="ruleForm.from">
            <el-option
                v-for="item in from_datas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要性" prop="importance">
          <el-select v-model="ruleForm.importance" >
            <el-option
                v-for="item in importance_datas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="ruleForm.date" type="datetime"
                          :picker-options="expireTimeOption">
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>
    <mavon-editor v-model="ruleForm.text_content" style="width: 95%;margin:0 auto;">

    </mavon-editor>
    <div style="height: 50px; margin: 20px auto;text-align: center">
      <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "PublishArticle",
    components: {},
    props: {},
    data() {
      return {
        //类目的数组信息
        category_datas:[{

            value: 'Vue',
            label: 'Vue'
          },{
          value: 'Rect',
          label: 'Rect'
        },{
          value: 'Node.js',
          label: 'Node.js'
        },{
          value: '性能优化',
          label: '性能优化'
        },{
          value: 'JavaScript',
          label: 'JavaScript'
        },{
          value: '小程序',
          label: '小程序'
        },{
          value: '工具类',
          label: '工具类'
        },{
          value: '其他',
          label: '其他'
        },],
        //来源的数组信息
        from_datas:[
          {value:'原创',label:'原创'},
          {value:'转载',label:'转载'},
          {value:'与他人合作',label:'与他人合作'},
        ],
        //重要性的数组信息
        importance_datas:[
          {value:1,label:1},
          {value:2,label:2},
          {value:3,label:3},
          {value:4,label:4},
          {value:5,label:5},
        ],
        total_datas:{},
        expireTimeOption: {
          disabledDate(date) { //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return date.getTime() >= Date.now();
          }
        },
        ruleForm: {
          title: '',    //文章标题选择框绑定的值
          summary: '',  //文章摘要选择框绑定的值
          author:'',     //作者输入框绑定的值
          category: '', //类目选择框绑定的值
          from: '',     //来源选择框绑定的值
          importance: 1,//重要性选择框绑定的值
          date: new Date(),     //发布日期选择框绑定的值
          text_content: '',   //编辑框绑定的值
        },
        rules: {
          title: [
            { required: true,message: '请输入文章标题', trigger: 'blur'},
            { min: 5, max: 25 ,message: '长度在 5 到 25 个字符', trigger: 'blur'},
          ],
          summary: [
            { required: true,message: '请输入文章摘要', trigger: 'blur'},
            { min: 5, max: 25 ,message: '长度在 5 到 15 个字符', trigger: 'blur'},
          ],
          author: [
            { required: true,message: '请输入作者名', trigger: 'blur'},
            { min: 2, max: 5 ,message: '长度在 2 到 5 个字符', trigger: 'blur'},
          ],
          category: [
            { required: true, message: '请输入类别',trigger: 'blur'},
          ],
          from:[
            { required: true,  message: '请输入来源',trigger: 'blur'},
          ],
          importance: [
            { required: true,trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      //更新文章信息
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.uploadToDatabase();
            } else {
              return false;
            }
          });
      },

      uploadToDatabase(){
        this.$axios.req("api/article/create", {
              title:this.ruleForm.title,
              abstract:this.ruleForm.summary,
              author:this.ruleForm.author,
              category:this.ruleForm.category,
              source:this.ruleForm.from,
              star:this.ruleForm.importance,
              text:this.ruleForm.text_content,
              date:this.$dayjs(this.ruleForm.date).format("YYYY年MM月DD日HH点MM分ss秒")})
            .then((res)=>{
              if(res.code === 200){
                this.releaseSuccess();
                this.$router.push("/home-page");
              }
            }).catch((err)=>{
              console.log(err);
        })
      },
      releaseSuccess(){
        this.$message({
          message: '发布成功',
          type: 'success'
        });
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
<style>
</style>
<style scoped lang="scss">
  .top{
    width: 98%;
    background: #008c8c;
    margin: 20px 0;
    margin-left:10px;
    height:40px;
  }
  .top .top-btn{
    position:absolute;
    right: 40px;
  }
  .text-input{
    width: 98% ;
    margin:20px auto;
    padding-left:20px;
    display: flex;
    align-items: center;
    font-size:12px;
  }
  .important-icon{
    width: 20px;
    height:20px;
  }
  .other-input{
    display: flex;
    padding-right:140px;
  }
</style>