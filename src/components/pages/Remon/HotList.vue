<template>
  <div class="hot-list">
    <div class="tit">
      <h2>音墙环绕</h2>
      <router-link to="/found/ranklist">查看全部</router-link>
    </div>
    <div class="list-content cont-save">
      <div class="cont-one">
        <div class="one-img">
          <img :src="songs[0].img" alt srcset />
        </div>
        <div class="one-msg cont-msg text-left">
          <p class="blue-pra one-msg-no text-left">Top1</p>
          <router-link to="##" class="cont-name one-name">{{songs[0].name}}</router-link>
          <router-link to="##" class="cont-artist one-artist">{{songs[0].artist}}</router-link>
        </div>
      </div>
      <div class="common-cont">
        <div
          class="common-cont-song"
          v-for="(item,index) in songs"
          :key="index"
          v-if="index>0&&index<3"
        >
          <div class="common-song-img">
            <img :src="item.img" alt />
          </div>
          <div class="common-song-msg cont-msg text-left">
            <router-link to="##" class="cont-name common-msg-name">
              <span>{{index+1}}</span>
              {{item.name}}
            </router-link>
            <router-link to="##" class="common-msg-artist">{{item.artist}}</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="song-bottom cont-save">
      <div class="common-cont left-50">
        <div
          class="common-cont-song"
          v-for="(item,index) in songs"
          :key="index"
          v-if="index>2&&index<5"
        >
          <div class="common-song-img">
            <img :src="item.img" alt />
          </div>
          <div class="common-song-msg cont-msg text-left">
            <router-link to="##" class="cont-name common-msg-name">
              <span>{{index+1}}</span>
              {{item.name}}
            </router-link>
            <router-link to="##" class="common-msg-artist">{{item.artist}}</router-link>
          </div>
        </div>
      </div>
      <div class="common-cont">
        <div
          class="common-cont-song"
          v-for="(item,index) in songs"
          :key="index"
          v-if="index>4&&index<7"
        >
          <div class="common-song-img">
            <img :src="item.img" alt />
          </div>
          <div class="common-song-msg cont-msg text-left">
            <router-link to="##" class="cont-name common-msg-name">
              <span>{{index+1}}</span>
              {{item.name}}
            </router-link>
            <router-link to="##" class="common-msg-artist">{{item.artist}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HotList",
  data() {
    return {
      songs: [
        {
          id: 0,
          img: require("../../../assets/img/cla/fir.jpg"),
          name: "Lydia 电视剧《斗鱼》主题曲",
          artist: "F.I.R"
        },
        {
          id: 1,
          img: require("../../../assets/img/cla/heibao.jpg"),
          name: "我们的爱",
          artist: "F.I.R"
        },
        {
          id: 2,
          img: require("../../../assets/img/cla/she.jpg"),
          name: "千年之恋",
          artist: "F.I.R"
        },
        {
          id: 3,
          img: require("../../../assets/img/cla/sudalv.jpg"),
          name: "你的微笑",
          artist: "F.I.R"
        },
        {
          id: 4,
          img: require("../../../assets/img/cla/wuyuetian.jpg"),
          name: "雨樱花",
          artist: "F.I.R"
        },
        {
          id: 5,
          img: require("../../../assets/img/cla/xin.jpg"),
          name: "星之火",
          artist: "F.I.R"
        },
        {
          id: 6,
          img: require("../../../assets/img/cla/fir.jpg"),
          name: "我要飞",
          artist: "F.I.R"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.hot-list {
  padding: 20px 30px;
  .tit {
    // padding: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    h2 {
      font-size: 24px;
      //   font-weight: bold;
    }
    a {
      display: block;
      color: $color-text-actived;
    }
  }

  .blue-pra {
    color: $color-light-purple;
  }
  .cont-msg {
    padding: 15px 0 15px 10px;
    height: 165px;
    box-sizing: border-box;
    border: 1px solid $color-main;
    border-left: 0;
    background: #f9f9f9;
  }
  .cont-name {
    font-size: 18px;
    color: $color-text-normal;
    line-height: 22px;
    height: 44px;
    overflow: hidden;
    margin: 10px 0 25px 0;
    letter-spacing: 2px;
  }
 
  .list-content,
  .cont-save {
    display: flex;
    justify-content: space-between;
    .cont-one {
      width: 50%;
      display: flex;
      .one-img {
        img {
          width: 166px;
          height: 166px;
        }
      }
      .one-msg {
        //   padding: 15px 0 15px 10px;
        //   height: 165px;
        //   box-sizing: border-box;
        //   border: 1px solid;
        .one-name {
          // padding: 10px 0 25px 0;
        }
        .one-msg-no {
          font-size: 24px;
        }
        a {
          display: block;
        }
      }
    }
    .common-cont {
      width: 48%;
      .common-cont-song {
        width: 100%;
        display: flex;
        .common-song-img {
          img {
            width: 81px;
            height: 81px;
          }
        }
        .common-song-msg {
          width: 100%;
          height: 81px;
          padding: 8px 0 0px 10px;
          a {
            display: block;
          }
          .common-msg-name {
            margin: 5px 0 5px 0;
            height: 44px;
            span {
              color: white;
              display: inline-block;
              padding: 1px 6px;
              background: $color-light-purple;
            }
          }
        }
      }
    }
    
  }
   .song-bottom {
      display: flex;
      margin-top: 15px;
      .left-50{
          width: 50%;
        //   .common-cont-song{
        //       &:nth-child(2){
        //           margin-top: 3px;
        //       }
        //   }
      }
    }
}
</style>