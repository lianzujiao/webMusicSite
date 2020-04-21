<template>
  <div class="regis-width">
    <div class="msg-box">
      <el-row>
        <el-col class="left-bg" :span="11">
          <img src="../../../assets/img/regis.png" alt />
        </el-col>
        <el-col class="right-user" :span="13" v-if="type=='register'">
          <p>注册</p>
          <el-form
            :model="userForm"
            :rules="rules"
            ref="userForm"
            label-width="100px"
            class="demo-userForm"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col class="right-user" :span="13" v-else>
          <p>修改密码</p>
          <el-form
            :model="updateForm"
            :rules="updateRules"
            ref="updateForm"
            label-width="100px"
            class="demo-userForm"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="updateForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="name">
              <el-input v-model="updateForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
              <el-input v-model="updateForm.checkPassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('updateForm')">确认修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import * as user from "api/user";
export default {
  data() {
    var  validatePass=(rule,value,callback)=>{
        if(value===''){
            callback(new Error('请再次输入密码'))
        }else if(value!==this.updateForm.password){
            callback(new Error('两次密码不一致'))
        }
        else{
            callback()
        }
    }
    return {
      type: "",
      userForm: {
        email: "",
        name: "",
        password: ""
      },
      updateForm: {
        email: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 9, message: "长度在 6 到 9 个字符", trigger: "blur" }
        ]
      },
      updateRules:{
          email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }, { min: 6, max: 9, message: "长度在 6 到 9 个字符", trigger: "blur" }],
        checkPassword: [
          {validator:validatePass, trigger: "blur" },
         
        ]
      }
    };
  },
  methods: {
      register(){
          user
            .register({
              email: this.userForm.email,
              name: this.userForm.name,
              password: this.userForm.password
            })
            .then(res => {
              if (res.code == 200) {
                  this.$message({
                      message:'注册成功',
                      type:"success"
                  })
                   
                     this.$router.push({path:'/recommend'})
                //   console.log('注册成功')
              }
            });
      },

      //忘记密码
      updatePass(){
          user.updatePass({
              email:this.updateForm.email,
              password:this.updateForm.password,
          }).then(res=>{
              if(res.code==200){
                  this.$message({
                      msg:"修改成功",
                      type:'success'
                  })
                localStorage.removeItem('user')
                this.$store.dispatch('setUser')
                this.$router.push({path:'/recommend'})
              }
              else{
                  this.$message({
                      msg:'修改失败',
                      type:'fail'
                  })
                 
              }
          })
      },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            switch(this.type){
                case 'register':this.register();break;
                case 'updatePass':this.updatePass();break;
            }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function(routeType, oldValue){
       
        this.type = routeType.query.action;
      
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.regis-width {
  width: 1000px;
  margin: 0 auto;
  padding: 40px 0;
  box-sizing: border-box;
  .msg-box {
    background: white;
    height: 470px;
    .right-user {
      padding: 40px 0 40px 70px;
      p {
        font-size: 24px;
        margin-bottom: 20px;
        color: $color-text-actived;
      }
      .demo-userForm {
        padding-right: 84px;
        .el-form-item {
          margin-bottom: 30px;
          .el-form-item__label {
            text-align: center;
            font-size: 20px;
          }
          .el-input__inner {
            height: 55px;
          }
          .el-button--primary {
            background-color: $color-text-actived;
            border-color: $color-text-actived;
            span {
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>