<template>
  <div class="singer">
    <div class="singer-top">
      <div class="top-bg" v-bind:style="TopBG"></div>
    </div>
    <div class="singer-mid">
      <div class="singer-mid-left">
        <img :src="singer.coverImg" alt />
      </div>
      <div class="singer-mid-right">
        <p>
          {{singer.name}}
          <span v-if="isCollect" @click="collectSinger(singer)">+关注</span>
          <span v-if="!isCollect" @click="nonCollectSinger(singer)">取消关注</span>
        </p>
        <p>{{singer.desc}}</p>
      </div>
    </div>
    <div class="singer-end">
      <div class="end-nav">
        <p
          @click="changeTab(index)"
          :class="{'active-tab':index==activeIndex}"
          v-for="(item,index) in tabs"
          :key="index"
        >{{item}}</p>
      </div>
      <div class="end-songs" v-if="activeIndex==0">
        <div class="end-song-box" v-for="(song,index) in songs" :key="index">
          <p class="end-song-index" v-show="index<10" :class="{'firs-index':index==0}">{{index+1}}</p>
          <div class="end-song-img" :class="{'firs-img':index==0,'no-index-img':index>=10}">
            <img :src="song.album.coverImg" />
          </div>
          <p class="end-song-name" :class="{'first-name':index==0}">
            <router-link :to="{path:'songDetail',query:{id:song._id}}">{{song.name}}</router-link>
          </p>
          <div class="end-song-popular">
            <Icon type="bofangliang" title="播放量" />
            <span>{{song.popularity}}</span>
          </div>
          <div class="end-song-play" :class="{'first-play':index==0}">
            <Icon type="play" @click="playSong(song._id,index)" />
          </div>
        </div>
        <div class="songs-more" v-if="songs.length<total" @click="loadMore()">加载更多</div>
      </div>
      <div class="end-albums" v-if="activeIndex==1">
        <sin-albums :albums="singer.albums"></sin-albums>
      </div>
    </div>
  </div>
</template>
<script>
import * as Singer from "api/singer";
import * as ColSinger from "api/colSinger";
import Albums from "./Sin-Albums";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    "sin-albums": Albums
  },
  data() {
    return {
      tabs: ["单曲", "专辑"],
      activeIndex: 0,
      singer: {},
      TopBG: {
        backgroundImage: ""
      },
      pageSize: 10,
      pageNumber: 1,
      songs: [],
      total: 0
    };
  },
  computed: {
    isCollect: function() {
      let list =
        this.collectSingers !== undefined ? [...this.collectSingers] : [];
      if (list) {
        let index = list.findIndex(item => {
          return item._id == this.singer._id;
        });
        return index < 0 ? true : false;
      } else {
        return true;
      }
    },
    ...mapGetters(["collectSingers", "user"])
  },
  methods: {
    //收藏歌手
    collectSinger(singer) {
      this.setCollectSinger({ singer });
      this.$message({
        type: "success",
        message: "关注成功"
      });
    },
    //取消关注
    nonCollectSinger(singer) {
      this.setNonCollectSinger({ singer });
      this.$message({
        type: "success",
        message: "取消关注成功"
      });
    },
    //播放歌曲
    playSong(id, index) {
      this.setPlaylist({ list: this.songs });
      this.setCurrentIndex(index);
      this.setPlaying(true);
    },
    changeTab(index) {
      this.activeIndex = index;
    },
    getDetail() {
      Singer.detail({ id: this.singer._id }).then(res => {
        if (res.code == 200) {
          this.singer = res.data;
          this.TopBG.backgroundImage = `url(${this.singer.coverImg})`;
        }
      });
    },
    getHotSongs() {
      Singer.hotSongs({
        id: this.singer._id,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then(res => {
        if (res.code == 200) {
          this.total = res.data.total;
          if (this.pageNumber == 1) {
            this.songs = res.data.songs;
          } else {
            this.songs = this.songs.concat(res.data.songs);
          }
        }
      });
    },
   
    //加载更多歌曲
    loadMore() {
      this.pageNumber += 1;
      this.getHotSongs();
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions([
      "setPlaylist",
      "setNonCollectSinger",
      "setCollectSinger",
      "setCollectSingerList"
    ])
  },

  watch: {
    $route: {
      handler: function(newVal, old) {
        if (newVal.path == "/singer") {
          this.singer._id = newVal.query.id;
          this.getDetail();
          this.getHotSongs();
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
   
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.singer {
  background: white;
  .singer-top {
    overflow: hidden;
    height: 250px;
    width: 100%;
    .top-bg {
      height: 300px;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
      filter: blur(30px);
    }
  }
  .singer-mid {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    transform: translateY(-100px);
    .singer-mid-left {
      img {
        overflow: hidden;
        width: 250px;
        height: 250px;
        border-radius: 50%;
      }
    }
    .singer-mid-right {
      text-align: left;
      padding: 50px 0 0 30px;
      p:nth-child(1) {
        font-size: 28px;
        color: white;
        span {
          background: $color-text-actived;
          display: inline-block;
          color: white;
          font-size: 16px;
          padding: 4px 10px;
          border-radius: 8px;
          cursor: pointer;
          margin: -5px 20px;
          i {
            color: inherit;
          }
        }
      }
      p:nth-child(2) {
        font-size: 16px;
        line-height: 30px;
        padding-top: 25px;
      }
    }
  }
  .singer-end {
    margin: -50px auto 25px auto;
    width: 1000px;
    .end-nav {
      display: flex;
      border-bottom: 2px solid $color-main;
      padding-bottom: 8px;
      p {
        width: 70px;
        line-height: 35px;
        font-size: 16px;
        cursor: pointer;
      }
      .active-tab {
        background: $color-text-actived;
        border-radius: 16px;
        color: white;
      }
    }
    .end-songs {
      padding-top: 15px;
      .end-song-box {
        display: flex;
        padding: 5px 0 10px 0;
        // border-bottom: 1px solid $color-main;

        .end-song-index {
          width: 60px;
          font-size: 16px;
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
        .end-song-play {
          padding: 0 0 0 60px;
          i {
            font-size: 25px;
            line-height: 60px;
            color: #b3b3b3;
          }
          i:hover {
            color: $color-text-actived;
          }
        }

        .firs-index {
          color: $color-text-actived;
          line-height: 80px;
          font-size: 20px;
        }
        .firs-img {
          img {
            width: 80px;
          }
        }
        .first-name {
          a {
            line-height: 80px;
          }
        }
        .first-play {
          i {
            font-size: 28px;
          }

          line-height: 80px;
        }
      }
      .songs-more {
        width: 600px;
        cursor: pointer;
        color: $color-text-actived;
      }
    }
  }
}
</style>