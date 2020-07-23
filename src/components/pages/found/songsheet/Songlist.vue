<template>
  <div class="min-width">
    <div class="song-list">
      <div class="list-top">
        <div class="list-top-img">
          <img :src="sheet.coverImg" alt />
        </div>
        <div class="list-top-msg text-left">
          <div class="top-msg-name">
            <span>歌单</span>
            {{sheet.name}}
          </div>

          <div class="msg-btn">
            <p class="btn-play" @click="playSheet()">
              <i class="iconfont iconplay"></i>播放
            </p>
          </div>

          <p class="msg-intro">
            简介:
            <span>{{sheet.desc}}</span>
          </p>
        </div>
      </div>
      <div class="list-center">
        <p class="center-list-tit text-left">曲目</p>
        <div class="end-songs" v-if="sheet.songs">
          <div class="end-song-box" v-for="(song,index) in sheet.songs" :key="index">
            <p class="end-song-index">{{index+1}}</p>
            <div class="end-song-img">
              <img :src="song.album.coverImg" />
            </div>
            <div class="end-song-name">
              <div class="end-song-name-item">
                <router-link :to="{path:'songDetail',query:{id:song._id}}">{{song.name}}</router-link>
              </div>
              <div class="end-song-name-item">
                <router-link :to="{path:'singer',query:{id:song.artist._id}}">{{song.artist.name}}</router-link>
              </div>
            </div>
            <div class="end-song-popular">
              <Icon type="bofangliang" title="播放量" />
              <span>{{song.popularity}}</span>
            </div>
            <div class="end-song-play">
              <Icon type="bofang" @click="playSong(song._id,index)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as SongSheet from "api/SongSheet";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      sheet: {},
      id: ""
    };
  },
  methods: {
    getListDetail() {
      SongSheet.getById({ id: this.sheet._id }).then(res => {
        if (res.code == 200) {
          this.sheet = res.data;
        }
      });
    },
    playSheet() {
      this.setPlaylist({ list: this.sheet.songs });
      this.setCurrentIndex(0);
      this.setPlaying(true);
    },
    playSong(id, index) {
      this.setPlaylist({ list: this.sheet.songs });
      this.setCurrentIndex(index);
      this.setPlaying(true);
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions(["setPlaylist"])
  },
  mounted() {
    // this.sheet._id = this.$route.query.id;
    // // console.log(this.id)
    // this.getListDetail();
  },
  watch: {
    $route: {
      handler: function(newRoute, oldRoute) {
        this.sheet._id = newRoute.query.id;
        this.getListDetail();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.song-list {
  background: white;
  padding: 20px 40px;
  margin: 0px auto;
  box-sizing: border-box;
  .list-top {
    display: flex;
    padding: 20px;
    .list-top-img {
      border: 1px solid $color-main;
      padding: 8px;
      img {
        width: 250px;
      }
    }
    .list-top-msg {
      padding: 0 10px 0 20px;
      .top-msg-name {
        font-weight: bold;
        font-size: 22px;
        span {
          font-size: 16px;
          border: 1px solid $color-text-actived;
          border-radius: 8px;
          color: $color-text-actived;
          padding: 5px 8px;
          margin-right: 15px;
        }
        .top-msg-span {
          color: $color-span;
          font-weight: lighter;
          font-size: 12px;
          border: 0;
        }
      }
      .msg-btn {
        display: flex;
        padding: 20px 0;
        .btn-play {
          background: $color-text-actived;
          padding: 0px 25px;
          color: white;
          line-height: 40px;
          font-size: 18px;
          letter-spacing: 3px;
          cursor: pointer;
          i {
            color: white;
            font-size: 28px;
            transform: translate(-10px, 5px);
          }
        }
        .btn-add {
          line-height: 40px;
          background: #6ed56c;
          margin: 0 10px;
          padding: 0 36px;
          color: white;
          font-size: 18px;
          letter-spacing: 3px;
        }
      }
      .msg-tags {
        line-height: 40px;
        a {
          color: $color-text-actived;
        }
      }
      .msg-intro {
        line-height: 25px;
        letter-spacing: 2px;
      }
    }
  }
  .list-center {
    padding: 40px 10px;
    .center-list-tit {
      font-size: 20px;
      border-bottom: 2px solid $color-main;
      line-height: 35px;
    }

    .end-songs {
      padding-top: 15px;
      min-height: 500px;
      .end-song-box {
        display: flex;
        padding: 8px 0 8px 0;
        border-bottom: 1px solid #ebebeb;
        .end-song-index {
          width: 60px;
          font-size: 16px;
          line-height: 65px;
        }
        .end-song-img {
          width: 80px;
          img {
            width: 65px;
            border-radius: 8px;
          }
        }
        .no-index-img {
          margin-left: 60px;
        }
        .end-song-name {
          padding: 8px 0 8px 25px;
          width: 300px;
          text-align: left;
          .end-song-name-item {
            a {
              font-size: 16px;
              line-height: 25px;
            }

            a:hover {
              color: $color-text-actived;
            }
          }
          .end-song-name-item:nth-child(2) {
            a {
              font-size: 14px;
            }
          }
        }

        .end-song-popular {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 25px;
          i {
            font-size: 23px;
            color: #d4d4d4;
          }
          span {
            font-size: 16px;
          }
        }
        .end-song-like {
          padding: 14px 25px;
          // line-height: 68px;
          i {
            font-size: 28px;
            color: #d4d4d4;
          }
        }
        .end-song-play {
          padding: 16px 25px;
          display: none;
          i {
            font-size: 24px;
            // line-height: 68px;
            color: #b3b3b3;
          }
          i:hover {
            color: $color-text-actived;
          }
        }
        &:hover {
          background: #ebebeb47;
          .end-song-play {
            display: block;
          }
        }
      }
    }
  }
}
</style>