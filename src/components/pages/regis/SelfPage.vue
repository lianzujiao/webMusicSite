<template>
  <div class="min-width-self">
    <div class="self-page">
      <div class="left-box">
        <div class="left-box-msg white-back">
          <div class="left-box-img">
            <img :src="user.avator" alt width="100" height="100" />
          </div>
          <p class="left-name">{{user.name}}</p>
        </div>
        <div class="left-box-btns">
          <div class="btn-selfMsg left-btn white-back">
            <router-link to="selfMsg" active-class="active-self">编辑个人资料</router-link>
          </div>
          <div class="btn-like left-btn white-back">
            <router-link to="selfLike" active-class="active-self">我喜欢的回声</router-link>
          </div>
        </div>
      </div>
      <div class="right-box white-back">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ user: "user" })
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.min-width-self {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}
.self-page {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .left-box {
    width: 200px;
    .left-box-msg {
      padding: 50px 0 35px 0;
      .left-box-img {
        img {
          border-radius: 50px;
        }
      }
      .left-name {
        font-size: 20px;
        line-height: 45px;
      }
    }
    .left-box-btns {
      .left-btn {
        margin-top: 20px;
        line-height: 50px;
        a {
          font-size: 18px;
          color: $color-span;
          display: block;
          width: 100%;
        }
        .active-self {
          background: url("../../../assets/img/e424322629ebb459adaa8a8d5bcc5965.png")
            no-repeat;
          background-size: 25px;
          background-position: 10px 12px;
        }
      }
    }
  }
  .right-box {
    width: 780px;
  }
  .white-back {
    background: white;
  }
}
</style>