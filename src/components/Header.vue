<template>
  <div class="head">
    <el-row>
      <el-col :span="8">
        <el-row>
          <el-col :span="5">
            <router-link to="/recommend" class="head-link" active-class="head-actived">迷乐</router-link>
          </el-col>
          <el-col :span="5">
            <router-link to="/news" class="head-link" active-class="head-actived">趣闻</router-link>
          </el-col>
          <el-col :span="5">
            <router-link to="/show" class="head-link" active-class="head-actived">演出</router-link>
          </el-col>
          <!-- <el-col :span="5">
            <router-link to="/home" class="head-link" active-class="head-actived">云音乐</router-link>
          </el-col> -->
          <!-- <el-col :span="5" class="head-found">
            <router-link to="/found" class="head-link" active-class="head-actived">发现</router-link>
            <div class="foun-box">
              <router-link to="/found/ranklist">榜单</router-link>
              <router-link to="/found/singers">歌手</router-link>
              <router-link to="/found/songsheet">歌单</router-link>
            </div>
          </el-col>-->
        </el-row>
      </el-col>
      <el-col :span="8">
        <router-link to="/home" class="logo">
          <img src="../assets/img/logo.png" alt />
        </router-link>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="16">
            <el-input prefix-icon="el-icon-search" v-model="search" placeholder="搜索内容"></el-input>
          </el-col>
          <el-col :span="8">
            <div class="user-avator" v-if="LoginUser.email!=''" @click="gotoSelfPage()">
              <img :src="LoginUser.avator" alt="">
              </div>
            <p v-else class="sign-in" @click="centerDialogVisible = true">登录</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog title="请先登录" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="demo-userForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" class="login-input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" class="login-input"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click=" submit('userForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="dia-footer text-right">
        <a @click="gotoRegis('updatePass')">忘记密码？</a>
        <a @click="gotoRegis('register');centerDialogVisible=false">立即注册</a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as user from "api/user";
import { mapGetters } from "vuex";
import jwt_decode from "jwt-decode"
export default {
  name: "HelloWorld",
  data() {
    return {
      search: "",
      centerDialogVisible: false,
      userForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 9, message: "长度在 6 到 9 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    open() {},
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          user
            .login({
              email: this.userForm.email,
              password: this.userForm.password
            })
            .then(res => {
              if (res.code == 200) {
                this.centerDialogVisible = false;
              //   this.$store.commit("SET_USER", {
              //     email: this.userForm.email,
              //     password: this.userForm.password,
              //     avator:res.data.avator
              //   });
              //  storage.set('token',res.token)
              const token=res.token
              localStorage.setItem('user',token)
              const decode=jwt_decode(token)
              
              console.log(typeof(decode) )
              this.$store.dispatch('setUser',decode)
              } else {
                this.$message({ type: "warning", message: "账号或密码错误" });
              }
            });
        } else {
          this.$message({ type: "warning", message: "账号或密码错误" });
          return false;
        }
      });
    },
    //跳转注册
    gotoRegis(msg) {
      this.centerDialogVisible = false;
      this.$router.push({ path: "/register", query: { action: msg } });
    },
    //个人主页
    gotoSelfPage() {
      this.$router.push({ path: "/selfPage" });
    }
  },
  computed: {
    ...mapGetters({ LoginUser: "user" })
  },
  watch: {
    LoginUser: {
      handler: function(newValue, oldValue) {
        // console.log(JSON.parse(JSON.stringify(newValue)) )
        // console.log(newValue);
      },
      immediate: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "scss/index.scss";
.head {
  height: 80px;
  line-height: 80px;
  padding: 0 25px;
  .head-link {
    &:hover {
      color: $color-text-actived;
    }
  }
  .head-actived {
    border-bottom: 2px solid $color-text-actived;
    display: block;
    margin: 0 20px;
  }

  .logo {
    display: flex;
    height: 80px;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 130px;
    }
  }
  .el-input {
    max-width: 212px;
    .el-input__inner {
      border-radius: 16px;
      background: $color-input;
      font-size: $font-size-12;
      height: 32px;
      &:focus {
        border-color: $color-border;
      }
      &:hover {
        border-color: $color-border;
      }
    }
  }
  .sign-in {
    font-size: $font-size-16;
    color: $color-text-actived;
    cursor: pointer;
  }
  .user-avator{
    cursor: pointer;
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  .head-found {
    position: relative;

    .foun-box {
      position: absolute;
      bottom: 0;
      top: 82px;
      width: 100%;
      height: 0;
      z-index: 99;
      background: white;
      transition: all 0.3s ease-in-out;

      a {
        display: block;
        line-height: 48px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease-in-out;
        transition-delay: 0.2s;
        &:hover {
          color: $color-text-actived;
        }
      }
    }
    &:hover {
      .foun-box {
        height: 144px;
        a {
          opacity: 1;
          visibility: visible;
          // color: $color-text-normal;
        }
      }
    }
  }
  .el-dialog__header {
    padding: 0px 20px 0px;
    background: $color-del-nav-back;
    span {
      font-size: 20px;
      color: $color-span;
    }
    /* font-size: 20px; */
    .demo-userForm {
      .el-form-item__label {
        font-size: 18px;
      }
    }
  }
  .login-input {
    max-width: 240px;
    .el-input__inner {
      border-radius: 5px;
      height: 42px;
    }
  }
  .login-btn {
    // margin-left: 50%;
    .el-form-item__content {
      margin-left: 170px !important;
      .el-button--primary {
        background: $color-text-actived;
        border-color: $color-text-actived;
        span {
          color: white;
          letter-spacing: 5px;
          font-size: 18px;
        }
      }
    }
  }
  .dia-footer {
    width: 90%;
    line-height: 40px;
    margin: 0 auto;
    a {
      display: inline-block;
      opacity: 0.8;
      cursor: pointer;
    }
    a:hover {
      // text-decoration: underline;
      opacity: 1;
    }
    a:nth-child(1) {
      color: $color-span;
    }
    a:nth-child(2) {
      color: $color-text-actived;
    }
  }
}
</style>
