<template>
  <div>
    <el-card class="box-card">
      <div class="header">欢迎来到王大锤后台系统</div>
      <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="120px" >
        <el-form-item
            prop="username"
            label="请输入用户名"
            style="padding-left:20px;">
          <el-input v-model="loginForm.username" class="login-input"
        @input="loginForm.username=loginForm.username.replace(/[\u4E00-\u9FA5]/g, '')" ></el-input>
        </el-form-item>
        <el-form-item
            label="请输入密码"
            prop= "password"
            style="padding-left:20px;">
          <el-input v-model="loginForm.password" type="password" class="login-input"></el-input>
        </el-form-item>
        <el-form-item
            label="请输入验证码"
            prop= "verification"
            style="padding-left:20px;">
          <el-input v-model="loginForm.verification" style="width: 50%;vertical-align:20px"></el-input>
          <div v-html="verification" style="display: inline-block;" @click="getVerification"></div>
        </el-form-item>

        <el-form-item>
          <span  @click="goToRegister">
            <el-button type="primary" @click="goToRegister"
                       style="margin-left: 20px">立即注册</el-button>
          </span>

          <el-button type="primary" @click="submitForm(`loginForm`)"
                     style="margin-left: 50px">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
  
</template>

<script>
  export default {
    name: "Login",
    components: {},
    props: {},
    data() {
      return {
        verification:'',
        loginForm: {
          username: '',
          password: '',
          verification: '',
        },
        rules:{
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'},
                    { min: 5, max: 12, trigger: 'blur'}],
          verification: [{required: true, message: '请输入验证码', trigger: 'blur'},]
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$axios.req("api/user/login",
                    {
                      username: this.loginForm.username,
                      password: this.loginForm.password,
                      code: this.loginForm.verification
                    }).then((res) => {
                  //登录成功
                  if (res.code === 200) {
                    this.loginSuccess();
                    //把个人信息存放到共享数据中
                    this.$store.state.userInfo.username = this.loginForm.username;
                    //将用户名添加到localstorage中
                    localStorage.setItem('username', this.loginForm.username);
                    //跳转到主页
                    this.$router.push("/home-page");
                  } else {
                    //弹出验证码不正确
                    this.$message.error('验证码或密码错误!');
                  }
                }).catch((err) => {
                  //登录失败 1.用户名不存在 2.密码错误
                  console.log(err);
                })
              }else {
                console.log('error submit!!');
                return false;
              }
        })
      },
      goToRegister(){
        this.$router.push("/register");
      },
      getVerification(){
        this.$axios.req("api/captcha").then((response)=>{
          this.verification = response
        }).catch((err)=>{
          console.log(err);
        })
      },
      loginSuccess(){
        this.$message({
          message: "登录成功",
          type: 'success'
        });
      }
    },
    mounted() {
      console.log(this.$store.state.userInfo.username);
      this.getVerification();
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
  .el-card__body{
    padding: 0;
  }
</style>
<style scoped lang="scss">
  body{

  }
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