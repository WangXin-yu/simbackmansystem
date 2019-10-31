<template>
  <div>
    <el-card class="box-card">
      <div class="header">欢迎来到王大锤后台系统</div>
      <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="120px" >
        <el-form-item
            prop="username"
            label="请输入用户名"
            style="padding-left:20px;">
          <el-input v-model="loginForm.username" @input="loginForm.username=
          loginForm.username.replace(/[\u4E00-\u9FA5]/g, '')" class="login-input"></el-input>
        </el-form-item>
        <el-form-item
            label="请输入密码"
            prop= "password"
            style="padding-left:20px;">
          <el-input v-model="loginForm.password" type="password" class="login-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
                     style="margin-left: 20px">立即注册</el-button>
          <span @click="goToLogin">
          <el-button type="primary" @click="submitForm('loginForm')"
                     style="margin-left: 50px">立即登录</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  
</template>

<script>
  export default {
    name: "Register",
    components: {},
    props: {},
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          verification: '',
        },
        rules:{
          username: [{required: true,  trigger: 'blur'},
            { min: 6, max: 20,message: '6至20位，以字母开头不能有中文'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, max: 12, message: '密码必须大于6位',trigger: 'blur'}],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送post请求将账号信息存到数据库
            this.$axios.req("api/user/register",
                {username:this.loginForm.username,
                password: this.loginForm.password})
                .then((res)=>{
              //用户已存在
              if(res.code === 1){
                this.userExists();
              };
              //注册成功
              if(res.code === 200){
                this.registerSuccess();
                this.goToLogin();
              }
            }).catch((err)=>{
              console.log(err);
            })
          } else {
            return false;
          }
        });
      },
      goToLogin(){
        this.$router.push("/login");
      },
      registerSuccess(){
        this.$message({
          message: "注册成功",
          type: 'success'
        });
      },
      userExists(){
        this.$message({
          message: "用户已存在",
          type: 'warning'
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
  .box-card{
    width: 30%;
    margin: 0 auto;
    margin-top: 200px;
  }
  .header{
    text-align: center;
    line-height: 60px;
    font-size:16px;
    border-bottom: 1px solid #f0f2f5;
    margin: 0 20px;
    margin-bottom: 20px;

  }
  .login-input{
    width: 90%;
  }
</style>