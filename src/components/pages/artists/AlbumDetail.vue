<template>
  <div class="min-width">
    <div class="album-de">
      <div class="album-de-top">
        <div class="top-bg" :style="topBG"></div>
      </div>
      <div class="album-mid">
        <div class="album-mid-left">
          <div class="album-mid-img">
            <img :src="album.coverImg" alt />
          </div>
          <div class="album-mid-singer">
            <div class="album-mid-time">
              <p>发表时间</p>
              <p>{{album.time|formatDate}}</p>
            </div>
            <div class="album-mid-art" v-if="album.artist">
              <router-link :to="{path:'singer',query:{id:album.artist._id}}">
                <img :src="album.artist.coverImg" alt />
              </router-link>
              <router-link :to="{path:'singer',query:{id:album.artist._id}}">{{album.artist.name}}</router-link>
            </div>
          </div>
        </div>
        <div class="album-mid-right">
          <p>{{album.name}}</p>
          <div class="album-mid-desc">
            <p ref="desc">{{album.desc}}</p>
            <p @click="foldChange()">{{foldMsg}}</p>
          </div>
        </div>
      </div>
      <div class="album-end">
        <p class="album-end-tit">
          <Icon type="circle" />曲目
        </p>
        <div class="album-end-songs">
          <div class="end-song-box" v-for="(song,index) in album.songs" :key="index">
            <p class="end-song-index">{{index+1}}</p>
            <p class="end-song-name">
              <router-link :to="{path:'songDetail',query:{id:song._id}}">{{song.name}}</router-link>
            </p>
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
import * as Album from "api/album";
import { mapMutations, mapActions } from "vuex";
import {deepCopy} from "@/util/util"
export default {
  data() {
    return {
      foldMsg: "",
      descHeight: "",
      album: { coverImg: "" },

      list: []
    };
  },
  computed: {
    topBG: function() {
      return { "background-image": `url(${this.album.coverImg})` };
    }
  },
  methods: {
    foldChange() {
      if (this.descHeight > 245 && this.foldMsg == "展开") {
        this.foldMsg = "收起";
        this.$refs.desc.style.height = this.descHeight + "px";
      } else if (this.foldMsg == "收起") {
        this.foldMsg = "展开";
        this.$refs.desc.style.height = "245px";
      }
    },
    getDetail() {
      Album.detail({ id: this.album._id }).then(res => {
        if (res.code == 200) {
          this.album = res.data;
          this.formatList();
        }
      });
    },
    formatList() {
      this.list=[];
      this.album.songs.forEach(item => {
        item["album"] = {
          _id: this.album._id,
          name: this.album.name,
          coverImg: this.album.coverImg
        };
        item["artist"] = {
          _id: this.album.artist._id,
          name: this.album.artist.name
        };
        this.list.push(item);
      });
    },
    playSong(id, index) {
      let playList=deepCopy(this.list)
      this.setPlaylist({ list: playList });
      this.setCurrentIndex(index), this.setPlaying(true);
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions(["setPlaylist", "selectPlay"])
  },
  watch: {
    $route: {
      handler: function(newVal, old) {
        if (newVal.path == "/albumdetail") {
          this.album["_id"] = newVal.query.id;
          this.getDetail();
        }
      },
      immediate: true,
      deep: true
    },
    album: {
      deep: true,
      handler: function(newValue, old) {
        this.$nextTick().then(() => {
          if (newValue.desc) {
            this.descHeight = this.$refs.desc.offsetHeight;
            if (this.descHeight > 245) {
              this.$refs.desc.style.height = "245px";
              this.foldMsg = "展开";
            }
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.album-de {
  background: white;
  .album-de-top {
    height: 250px;
    overflow: hidden;
    .top-bg {
      height: 250px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: 1300px 1200px;
      background-position: -50px -400px;
      filter: blur(20px);
    }
  }
  .album-mid {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    transform: translateY(-120px);
    .album-mid-img {
      padding: 12px;
      border: 1px solid $color-main;
      box-sizing: border-box;
      height: 276px;
      width: 276px;
      border-radius: 5px;
      background: $color-main;
      position: relative;
      box-shadow: 2px 2px 5px #00000070;
      &::after {
        position: absolute;
        width: 55px;
        height: 25px;
        content: "\4E13\8F91";
        top: 10px;
        right: 10px;
        background: #6ed56c;
        color: white;
        line-height: 25px;
        font-family: "幼圆";
      }
      img {
        border-radius: 5px;
        overflow: hidden;
        width: 250px;
        height: 250px;
      }
    }
    .album-mid-right {
      text-align: left;
      padding: 60px 0 0 45px;
      p:nth-child(1) {
        font-size: 28px;
        color: white;
      }
      .album-mid-desc {
        p:nth-child(1) {
          text-indent: 28px;
          font-size: 16px;
          line-height: 30px;
          padding-top: 25px;
          color: black;
          // height: 240px;
          overflow: hidden;
        }
        p:nth-child(2) {
          color: $color-text-actived;
          cursor: pointer;
        }
      }
    }
    .album-mid-singer {
      margin-top: 30px;
      display: flex;
      border: 2px solid;
      border-color: $color-main transparent $color-main transparent;
      padding: 5px 5px;
      justify-content: space-between;
      .album-mid-time {
        padding: 10px;
        p {
          line-height: 30px;
        }
      }
      .album-mid-art {
        a {
          display: block;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: inline-block;
            padding: 5px;
            border: 1px solid #6ed56c4f;
          }
          &:nth-child(2) {
            color: $color-text-actived;
          }
        }
      }
    }
  }
  .album-end {
    margin: -100px 30px 0px 0;
    padding: 0px 0px 20px 345px;
    .album-end-tit {
      text-align: left;
      font-size: 22px;
      letter-spacing: 8px;
      line-height: 45px;
      border-bottom: 1px solid $color-main;
      i {
        color: $color-text-actived;
        font-size: 22px;
      }
    }
    .album-end-songs {
      padding: 5px 0 10px 0;

      width: 100%;
      box-sizing: border-box;
      .end-song-box {
        border-bottom: 1px solid $color-main;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .end-song-index {
          width: 60px;
          font-size: 16px;
          line-height: 65px;
        }
        .end-song-name {
          padding: 0 0 0 25px;
          width: 300px;
          text-align: left;
          a {
            font-size: 16px;
            line-height: 65px;
          }
          a:hover {
            color: $color-text-actived;
          }
        }

        .end-song-like {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 25px;
          i {
            font-size: 26px;
            color: #d4d4d4;
          }
        }
        .end-song-play {
          padding: 0 0 0 60px;
          display: none;
          transition: all 0.3s ease-in-out;
          i {
            font-size: 25px;
            line-height: 65px;
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