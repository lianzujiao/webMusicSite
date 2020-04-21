<template>
  <div class="min-width">
    <div class="show">
      <div class="show-box" v-for="(item,index) in shows" :key="index">
        <div class="show-img-box">
          <img :src="item.src" alt />
        </div>
        <div class="show-msg-box text-left">
          <h1>{{item.name}}</h1>
          <p class="msg-time">时间：{{item.time}}</p>
          <p class="msg-address">场馆：{{item.address}}</p>
          <p class="msg-intro">演出介绍：{{item.intro}}</p>
        </div>
        <div class="back-mask">
          <img :src="item.src" alt />
          <div class="back-mask-bg"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shows: [
        {
          src: require("assets/img/show/yuexia.jpg"),
          name: " 【深圳】乐队的夏天HOT巡演—深圳站",
          time: "2020.03.07-12.31",
          address: "深圳市 | 华润深圳湾体育中心“春茧”体育馆  ",
          intro:
            "8月10日，刷屏朋友圈接近三个月的《乐队的夏天》终于在一场完美的夏日音乐派对中完美收官从1000到31，再到HOT 5伴随着12期节目的进行，越来越多的人开始了解乐队文化，爱上乐队演出。无论是成立20年以上的摇滚老将或是不足1年的'后生'在演播室里，都用他们最擅长的表演展示出乐队的魅力。只是……隔着屏幕，是不是总觉得不过瘾？就算去过现场录制，是不是也还没看够？既然爱乐队，当然应该看实实在在的现场有很多乐迷在节目播出期间就各种许愿。"
        },
        {
          src: require("assets/img/show/xinkuzi.jpg"),
          name: "【上海】新裤子「最后的乐队」巡回演唱会2020-上海站",
          time: "2020.03.07-12.31",
          address: "上海市 | 梅赛德斯-奔驰文化中心 "
        },
        {
          src: require("assets/img/show/quxin.jpg"),
          name: "【上海】新裤子「最后的乐队」巡回演唱会2020-上海站",
          time: "2020.03.07-12.31",
          address: "上海市 | 梅赛德斯-奔驰文化中心 "
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.show {
  background: white;
  padding: 20px;
  .show-box {
    display: flex;
    // background: url("../../assets/img/show/yuexia.jpg");
    position: relative;
    margin-bottom: 80px;
    &:nth-child(2){
        flex-direction: row-reverse;
        .show-msg-box{
            padding:50px 0 0 50px;
        }
    }
    .show-img-box {
      position: relative;
      z-index: 3;
      padding: 6px;
      box-shadow: 0 0 4px gray;
      background: #e6e6e6;
      margin: 50px;
      img {
        width: 250px;
        width: 350px;
        height: 350px;
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
}
</style>