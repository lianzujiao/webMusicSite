<template>
  <div class="classic">
    <div class="cla-top">
      <div class="cla-tit">
        <h1>经典之声</h1>
        <div class="cla-btn">
          <i class="iconfont icon-back" @click="backCard()"></i>
          <i class="iconfont icon-next-card" @click="nextCard()"></i>
        </div>
      </div>

      <div class="cla-cards" >
        <div class="cards-box" ref="cards">
          <div class="cla-card-box" v-for="(band,index) in bands" :key="index">
            <router-link to="/recommend/band">
              <div class="cla-img-box">
                <img :src="band.img" alt />
              </div>
              <p>{{band.name}}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "classic",
  data() {
    return {
      bands: [
        { name: "黑豹乐队", img: require("assets/img/cla/heibao.jpg") },
        { name: "Beyond", img: require("assets/img/cla/beyond.jpg") },
        { name: "五月天", img: require("assets/img/cla/wuyuetian.jpg") },
        { name: "苏打绿", img: require("assets/img/cla/sudalv.jpg") },
        { name: "信乐团", img: require("assets/img/cla/xin.jpg") },
        { name: "S.H.E", img: require("assets/img/cla/she.jpg") }
      ],
      index: 0
    };
  },
  methods: {
    backCard() {
      let cards = this.$refs.cards;
      let vol = (this.index + 1) * 750;
      cards.style.cssText = `left:0px`;
    },
    nextCard() {
      let cards = this.$refs.cards;
      let vol = (this.index - 1) * 1150;
      cards.style.cssText = `left:-1150px`;
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.classic {
  .cla-tit {
    display: flex;
    justify-content: space-between;
    line-height: 35px;
    padding-top: 10px;
    h1 {
      font-size: 24px;
      padding-left: 10px;
    }
    .cla-btn {
      padding-right: 50px;
      i {
        font-size: 30px;
        color: $color-text-actived;
        cursor: pointer;
      }
      .icon-back {
      }
      .icon-next-card {
        font-size: 36px;
        transform: translate(15px, 2px);
      }
    }
  }
  .cla-cards {
    // justify-content: space-between;
    overflow: hidden;
    padding: 5px 0 0 0;

    .cards-box {
      display: flex;
      transition: all 0.5s ease-in-out;
      position: relative;
      left:0;
      .cla-card-box {
        margin: 0 18px;
        &:nth-child(1) {
          margin-left: 5px;
        }
        a {
          .cla-img-box {
            width: 243px;
            height: 238px;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
            background: rgba(255, 255, 255, 0.85);
            border-radius: 4px;
            padding: 10px 4px 4px 4px;
            img {
              width: 230px;
            }
          }
          p {
            line-height: 34px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>