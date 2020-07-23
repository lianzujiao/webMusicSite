<template>
  <div class="min-width">
    <div class="song-det">
      <div class="back">
        <div class="back-btn" @click="back()">
          <i class="iconfont icon-back"></i>
          <span>返回</span>
        </div>
      </div>
      <section id="content">
        <div class="det-song-tit">
          <h2>{{song.name}}</h2>
          <div class="det-song-right">
            <p class="det-singer">
              <span class="det-span">歌手:</span>
              <router-link
                :to="{path:'singer',query:{id:song.artist._id}}"
                v-if="song.artist"
              >{{song.artist.name}}</router-link>
            </p>
            <p class="det-album">
              <span class="det-span">专辑:</span>
              <router-link
                :to="{path:'albumDetail',query:{id:song.album._id}}"
                v-if="song.artist"
              >{{song.album.name}}</router-link>
            </p>
          </div>
        </div>
        <div class="det-song-main">
          <div class="det-main-left">
            <div class="det-song-imgbox">
              <img :src="song.album.coverImg" alt v-if="song.album" />
            </div>
            <div class="det-song-play-btn">
              <div class="pointer control-play" title="播放暂停 Ctrl + Space" @click="play()">
                <Icon :type="currentPlaying?'pause':'play'"></Icon><span>{{currentPlaying?'暂停':'播放'}}</span>
              </div>
              <div class="pointer control-like" :title="isLike?'取消收藏':'收藏'" @click="collect()">
                <Icon :type="isLike?'offLike':'like'"></Icon>
              </div>
            </div>
          </div>

          <div class="det-song-lyric">
            <p v-if="song.lyric" :class="{'lyric-fold':isFolded}">{{song.lyric}}</p>
            <p class="fold-btn" v-if="isFolded" @click="isFolded=false">展开</p>
            <p class="fold-btn" v-else @click="isFolded=true">收起</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import * as Music from "api/music";
import progress from "@/baseComponets/Progress";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  filters: {
    "v-progress": progress
  },
  data() {
    return {
      song: {
        _id: ""
      },
      isFolded: true
    };
  },
  computed: {
    currentPlaying: function() {
      if (this.song._id == this.currentMusic._id) {
        return this.playing;
      } else {
        return false;
      }
    },
    isLike: function() {
      let list = [...this.collectList];
      let index = list.findIndex(item => {
        return item._id == this.song._id;
      });
      return index >= 0 ? true : false;
    },
    ...mapGetters(["playing", "currentMusic", "collectList"])
  },
  methods: {
    ...mapMutations({
      setPlaying: "SET_PLAYING"
    }),
    ...mapActions(["selectAddPlay","setCollect","setNonCollect"]),
    collect(){
      if(this.isLike){
        this.setNonCollect({music:this.song})
        this.$message({type:'success',message:"已取消收藏"})
      }else{
        this.setCollect({music:this.song})
        this.$message({type:'success',message:"收藏成功"})
      }
    },
    play() {
      if (this.currentPlaying == true) {
        this.setPlaying(false);
      } else {
        this.selectAddPlay(this.song);
      }
    },
    getSong() {
      Music.getOne({ id: this.song._id }).then(res => {
        if (res.code == 200) {
          // console.log(res);
          this.song = res.data;
        }
      });
    },
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getSong();
  },
  watch: {
    $route: {
      handler: function(newRoute, oldRoute) {
        this.song._id = newRoute.query.id;
        this.getSong();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.song-det {
  //   margin: 20px;
  background: white;
  .back {
    background: $color-del-nav-back;
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.06);
    // height: 80px;
    // line-height: 80px;
    padding: 20px 40px;
    display: flex;
    justify-content: flex-start;
    .back-btn {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      span,
      i {
        font-size: 25px;
        color: $color-span;
      }
    }
  }
  .det-song-tit {
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    h2 {
      font-size: 22px;
      font-weight: bold;
    }
    .det-song-right {
      display: flex;
      .det-singer {
        margin-right: 10px;
        a {
          color: $color-text-actived;
        }
      }
      .det-album {
        a {
          color: $color-text-actived;
        }
      }
    }
  }
  .det-song-main {
    display: flex;
    padding: 0 50px 30px 50px;
    .det-main-left {
      .det-song-imgbox {
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
        background: rgba(255, 255, 255, 0.85);
        border-radius: 4px;
        padding: 15px;
        box-sizing: border-box;
        width: 390px;
        height: 390px;
        img {
          display: inline-block;
          width: 360px;
          height: 360px;
        }
      }
      .det-song-play-btn {
        display: flex;
        margin-top: 20px;
        // flex-direction: row-reverse;
        .control-play {
          background: $color-text-actived;
          border-radius: 20px;
          padding: 0 10px 0 0;
          i {
            font-size: 42px;
            color: white;;
          }
          span{
            // line-height: 42px;
            display: inline-block;
            color: white;
            font-size: 16px;
                transform: translateY(-10px);

          }
        }
        .control-like{
          margin-left: 15px;
          i{
            font-size: 42px;
            color: $color-text-actived;
          }
        }
      }
    }

    .det-song-lyric {
      width: 100%;
      p {
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre-line;
        font-size: 16px;
        line-height: 24px;
      }
      .lyric-fold {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 18;
        overflow: hidden;
      }
      .fold-btn {
        color: $color-text-actived;
        cursor: pointer;
      }
    }
  }
}
</style>