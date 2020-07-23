<template>
  <div class="min-width">
    <div class="show">
      <div class="show-box" v-for="(item,index) in shows" :key="index">
        <div class="show-img-box">
          <img :src="item.coverImg" alt />
        </div>
        <div class="show-msg-box text-left">
          <h1>{{item.title}}</h1>
          <p class="msg-time">时间：{{item.startTime|formatDate}}~{{item.endTime|formatDate}}</p>
          <p class="msg-address">场馆：{{item.address}}</p>
          <p class="msg-intro">演出介绍：{{item.intro}}</p>
          <p class="msg-more"><router-link :to="{path:'showDetail',query:{id:item._id}} ">查看详情</router-link> </p>
        </div>
        <div class="back-mask">
          <img :src="item.coverImg" alt />
          <div class="back-mask-bg"></div>
        </div>
      </div>
      <div class="load-more"><router-link to="showList">查看更多</router-link> </div>
    </div>
  </div>
</template>
<script>
import * as Show from "api/shows";
export default {
  data() {
    return {
      pageSize: 4,
      shows: []
    };
  },
  methods: {
    getList() {
      Show.newList({ pageSize: this.pageSize }).then(res => {
        if (res.code == 200) {
          this.shows = res.data;
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.getList();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.show {
  background: white;
  padding: 35px;
  .show-box {
    display: flex;
    // background: url("../../assets/img/show/yuexia.jpg");
    position: relative;
    margin-bottom: 45px;
    &:nth-child(2n) {
      flex-direction: row-reverse;
      .show-msg-box {
        padding: 50px 0 0 50px;
      }
    }
    &:nth-last-child(1){
      margin-bottom: 20px;
    }
    .show-img-box {
      position: relative;
      z-index: 3;
      padding: 14px;
      box-shadow: 0 0 4px gray;
      background: #e6e6e6;
      margin: 50px;
      height:323px;
      img {
        height: 320px;
      }
    }
    .show-msg-box {
      position: relative;
      z-index: 3;
      padding: 50px 50px 0 0;
      h1 {
        font-size: 24px;
      }
      .msg-time {
        margin: 15px 0;
      }
      .msg-address {
        margin: 15px 0;
        font-size: 18px;
      }
      .msg-intro {
        font-size: 16px;
        line-height: 28px;
      }
      .msg-more {
        margin-top: 10px;
        a {
          color: $color-text-actived;
        }
      }
    }
    .back-mask {
      position: absolute;
      z-index: 1;
      background-color: #fff;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        width: 100%;
        left: 0;
        position: absolute;
        filter: blur(18px);
      }
      .back-mask-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.6);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.06);
      }
    }
  }
  .load-more{
    background: $color-main;
    line-height: 45px;
    a{
      color: $color-text-actived;
      font-size: 16px;
      letter-spacing: 2px;
    }
  }
}
</style>