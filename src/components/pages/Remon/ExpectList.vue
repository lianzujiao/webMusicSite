<template>
  <div class="exp-list">
    <el-row type="flex"  class="right-top">
      <p class="right-top-tit">编辑推荐</p>
      <p class="right-top-play" @click="playList()">播放</p>
    </el-row>
    <el-row v-for="item in newSongs" :key="item.id" class="right-bot text-left" @click="openSong()">
      <el-col :span="9">
        <div class="right-bot-songPic">
          <el-image :src="item.picUrl" style="width:80px ;height:80px" lazy />
        </div>
      </el-col>
      <el-col :span="15" class="right-bot-name">
        <p>{{item.name}}</p>
        <p v-for="art in item.artists" @click="toArtist()">{{art.name}}</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ExpList",
  data() {
    return {
      newSongs: [
        {
          id: 10,
          picUrl: require("../../../assets/img/cla/sudalv.jpg"),
          name: "小宇宙",
          artists: [{ id: 122, name: "苏打绿" }]
        },
        {
          id: 11,
          picUrl: require("../../../assets/img/cla/sudalv.jpg"),
          name: "小宇宙",
          artists: [{ id: 122, name: "苏打绿" }]
        },
      ]
    };
  },
  method: {
      //播放全部
      playList(){

      },
      //歌曲详情
      openSong(){

      },
      //歌手详情页
        toArtist(){

        }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.exp-list {
  .right-top {
    height: 30px;
    // margin: 20px 0 0;
    .right-top-tit {
      font-size: 18px;
    }
    .right-top-play {
        cursor: pointer;
      margin-left:30px;
      background-color: $color-text-actived;
      background-image: url("../../../assets/img/play-logo.png");
      background-repeat: no-repeat;
      padding: 1px 10px 0px 22px;
      color: white;
      font-size: 12px;
      border-radius: 14px;
      line-height: 24px;
      height: 23px;
      background-position: 2px;
    }
  }
  .right-bot {
    padding: 7px 0;
    cursor: pointer;
    p {
      font-size: $font-size-15;
    }
    .right-bot-name {
      display: flex;
      height: 80px;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 2px 0 10px 8px;
      p:nth-child(2) {
        color: $color-span;
      }
    }
  }
}
</style>