<template>
  <div class="band-list">
    <div class="band-list-tit">
      <h2>音乐人</h2>
      <router-link to="/recommend/bandtag">查看更多</router-link>
    </div>
    <div class="bands-box">
      <router-link to="/recommend/band" v-for="(band,index) in bands" :key="index">
        <div class="ban-img-box">
          <img :src="band.img" alt srcset />
        </div>
        <p>{{band.name}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "bandList",
  data() {
    return {
      bands: [
        {
          name: "BongBong邦邦乐团",
          img: require("assets/img/bandlist/bongbong.jpg")
        },
        { name: "Click#15", img: require("assets/img/bandlist/click5.jpg") },
        { name: "MLK麋鹿王国", img: require("assets/img/bandlist/mlk.jpg") },
        { name: "Mr.WooHoo", img: require("assets/img/bandlist/woohoo.jpg") },
        { name: "Mr.Miss", img: require("assets/img/bandlist/mrmiss.jpg") }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.band-list {
  padding: 20px 30px;
  .band-list-tit {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    // padding: 30px 12px 0 12px;
    h2 {
      font-size: 24px;
    }
    a {
      color: $color-text-actived;
    }
  }
  .bands-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 5px 0 10px 0;
    a {
      display: block;
      margin: 0 30px 0 0;
      &:nth-child(5),
      &:nth-child(10) {
        margin-right: 0;
      }
      .ban-img-box {
        //   padding: 5px;
        // border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
        img {
          width: 130px;
          height: 130px;
        }
      }
      p {
        line-height: 20px;
        padding-top: 5px;
      }
    }
  }
}
</style>