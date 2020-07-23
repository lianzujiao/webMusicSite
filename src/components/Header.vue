<template>
  <div class="head">
    <el-row>
      <el-col :span="8">
        <el-row class="head-nav">
          <el-col :span="5">
            <router-link to="/recommend" class="head-link" active-class="head-actived">迷乐</router-link>
          </el-col>
          <el-col :span="5">
            <router-link to="/news" class="head-link" active-class="head-actived">趣闻</router-link>
          </el-col>
          <el-col :span="5">
            <router-link to="/show" class="head-link" active-class="head-actived">演出</router-link>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <router-link to="/home" class="logo">
          <img src="../assets/img/logo.png" alt />
        </router-link>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="16" class="head-search">
            <el-input
              prefix-icon="el-icon-search"
              v-model.trim="search"
              placeholder="搜索内容"
              @keyup.enter.native="find($event)"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <div class="user-avator" v-if="Object.keys(LoginUser).length!==0">
              <div class="login-img">
                <img :src="LoginUser.avator" alt @click="gotoSelfPage()" />
                <router-link class="login-out" to="selfPage">{{LoginUser.name}}</router-link>
              </div>
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
          <el-input type="password" v-model="userForm.password" class="login-input"></el-input>
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
import { findSongs } from "api/colSong";
import { mapGetters, mapMutations, mapActions } from "vuex";
import jwt_decode from "jwt-decode";
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
        email: [
          {
            type: "email",
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 9, message: "长度在 6 到 9 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["clearUser"]),
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
                const token = res.token;
                localStorage.setItem("user", token);
                const decode = jwt_decode(token);
                this.$store.dispatch("setUser", decode);
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
    },
    //搜索回车
    find(event) {
      if (this.search == "") {
        return false;
      }
      this.$router.push({ path: "/search", query: { key: this.search } });
    },
    //退出登录
    loginOut() {
      this.clearUser();
    },
    //获取用户收藏的歌曲
    //获取用户收藏列表
    async getColSongs(user) {
      if (user.id == "") {
        return;
      }
      return await findSongs({ userId: user.id });
    },
    ...mapMutations({ setCollectList: "SET_COLLECTLIST" })
  },
  computed: {
    ...mapGetters({ LoginUser: "user" })
  },
  watch: {
    LoginUser: {
      handler: function(newUser, oldUser) {
        if (typeof(newUser.id)!="undefined") {
          this.getColSongs(newUser).then(res => {
            if (res.code == 200) {
              this.setCollectList(res.data);
            }
          });
        }
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
  // line-height: 80px;
  padding: 0 25px;
  .head-nav{
    line-height: 80px;
  }
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
  .head-search{
    line-height: 80px;
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
    line-height: 80px;
  }
  .user-avator {
    // cursor: pointer;
    .login-img {
      width: 60px;
      margin: 0 auto;
      padding: 5px 0;
      
      img {
        display: inline-block;
        width: 45px;
        height: 45px;
        border: 1px solid $color-text-actived;
        border-radius: 50%;
        cursor: pointer;
        
      }
    }
    .login-out {
      // line-height: 25px;
      color: $color-text-actived;
      font-size: 16px;
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
    padding: 10px 20px 10px;
    background: $color-del-nav-back;
    span {
      font-size: 20px;
      color: $color-span;
    }
  }
  .login-input {
    max-width: 80%;
    .el-input__inner {
      border-radius: 5px;
      height: 55px;
    }
  }
  .demo-userForm {
    .el-form-item__label {
      line-height: 55px;
      font-size: 18px;
    }
  }
  .login-btn {
    // margin-left: 50%;
    .el-form-item__content {
      display: flex;
      justify-content: center;
      margin: 0 !important;
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
