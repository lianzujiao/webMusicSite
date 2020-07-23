<template>
  <div class="exp-list">
    <el-row type="flex" class="right-top">
      <p class="right-top-tit">编辑精选</p>
      <p class="right-top-play" @click="playList()">播放</p>
    </el-row>
    <el-row v-for="item in list" :key="item._id" class="right-bot text-left">
      <el-col :span="9">
        <div class="right-bot-songPic">
          <el-image :src="item.album.coverImg" style="width:80px ;height:80px" lazy />
        </div>
      </el-col>
      <el-col :span="15" class="right-bot-name">
        <p @click="openSong(item._id)">{{item.name}}</p>
        <p @click="openSinger(item.artist._id)">{{item.artist.name}}</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as Rank from "api/rank";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ExpList",
  data() {
    return {
      list: []
    };
  },
  methods: {
    //播放全部
    playList() {
      if (this.list.length <= 0) {
        return false;
      }
      this.setPlaylist({ list: this.list });
      this.setCurrentIndex(0);
      this.setPlaying(true);
    },
    //歌曲详情
    openSong(id) {
      this.$router.push({ path: "songDetail", query: { id: id } });
    },
    openSinger(id){
      this.$router.push({path:"singer",query:{id:id}})
    },

    getList() {
      Rank.getById({ id: "5ee62d195309ef3850997a1d" }).then(res => {
        if (res.code == 200) {
          this.list = res.data.songs;
        }
      });
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions(["setPlaylist"])
  },
  mounted() {
    this.getList();
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
      margin-left: 30px;
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
    .right-bot-songPic{
      img{
        border-radius: 5px;
      }
    }
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
      p {
        cursor: pointer;
      }

      p:nth-child(2) {
        color: $color-span;
      }
    }
  }
}
</style>