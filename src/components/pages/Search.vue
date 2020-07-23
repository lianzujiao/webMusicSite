<template>
  <div class="min-width">
    <div class="search-page">
      <div class="search-left">
        <div
          class="left-btn"
          v-for="(item,index) in btns"
          :key="index"
          @click="changeSearch(index)"
          :class="{'active-btn':btnIndex==index}"
        >{{item.name}}</div>
      </div>
      <div class="search-right">
        <div class="search-box">
          <el-input
            v-model.trim="key"
            placeholder="搜索内容"
            @keyup.enter.native="search($event)"
            class="search-box-input"
          ></el-input>
          <span class="search-logo" @click="search()">搜索</span>
        </div>
        <div class="songs-content" v-show="btnIndex==0">
          <p v-if="songListCopy.length==0">暂无相关歌曲</p>
          <div class="end-song-box" v-for="(item,index) in songListCopy" :key="index">
            <div class="end-song-img">
              <img :src="item.album.coverImg" />
            </div>
            <div class="end-song-name">
              <div class="end-song-name-item">
                <router-link :to="{path:'songDetail',query:{id:item._id}}" v-html="item.name"></router-link>
              </div>
              <div class="end-song-name-item">
                <router-link :to="{path:'singer',query:{id:item.artist._id}}">{{item.artist.name}}</router-link>
              </div>
            </div>
            <div class="end-song-play">
              <Icon type="bofang" @click="playSong(item)" />
            </div>
          </div>
          <p v-if="songList.length<songTotal" class="load-more" @click="loadMoreSongs">加载更多</p>
        </div>
        <div class="sheets-content" v-show="btnIndex==1">
          <p v-if="sheetList.length==0">暂无相关歌单</p>
          <div class="sheet-cont-box" v-for="(sheet,index) in sheetListCopy">
            <div class="sheet-box-img">
              <img :src="sheet.coverImg" alt />
            </div>
            <div class="sheet-box-msg">
              <p class="sheet-msg-name" v-html="sheet.name" @click="openSheet(sheet._id)"></p>
              <div class="hot-cont-span">
                <p class="icon-pra">
                  <i class="el-icon-video-play" @click="playSheet(sheet)" title="播放"></i>
                </p>
                <p class="icon-pra">
                  <Icon type="clickSum" title="点击量"></Icon>
                  <span>{{sheet.popularity}}</span>
                </p>
                <p class="icon-pra">
                  <Icon type="music" title="总歌曲数"></Icon>
                  <span>{{sheet.songs.length}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="singer-content" v-show="btnIndex==2">
          <p v-if="singerList.length==0">暂无相关歌手</p>
          <div class="band-tags-main">
            <div class="band-tags-box text-left" v-for="(band,index) in singerListCopy" :key="index">
              <div class="band-tags-imgs">
                <img :src="band.coverImg" alt />
              </div>
              <div class="band-msg">
                <router-link :to="{path:'singer',query:{id:band._id}}" v-html="band.name"></router-link>
                <p>专辑数量:{{band.albums.length}}</p>
                <p>简介:{{band.desc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Music from "api/music";
import * as SongSheet from "api/SongSheet";
import * as Singer from "api/singer";
import { mapActions } from "vuex";

import { deepCopy } from "@/util/util";
export default {
  data() {
    return {
      btns: [{ name: "歌曲" }, { name: "歌单" }, { name: "歌手" }],
      btnIndex: 0,
      key: "", //搜索关键字
      songList: [],
      songTotal: 0,
      sheetList: [],
      checkKey: "", //用于保证高亮关键字在请求发生后才确定
      pageSize: 10,
      pageNumber: 1,
      singerList: []
    };
  },
  computed: {
    songListCopy: {
      get: function() {
        let songList = deepCopy(this.songList);
        let keyword = this.checkKey;
        let replaceReg = new RegExp(keyword, "i");
        let replaceWord = `<span class="highlight-text">${keyword}<span>`;

        let list = songList.map(function(item) {
          item.name = item.name.replace(replaceReg, replaceWord);
          return item;
        });
        return list;
      }
    },
    sheetListCopy: {
      get: function() {
        let sheetList = deepCopy(this.sheetList);
        let keyword = this.checkKey;
        let replaceReg = new RegExp(keyword, "i");
        let replaceWord = `<span class="highlight-text">${keyword}<span>`;

        let list = Array.from(sheetList).map(function(item) {
          item.name = item.name.replace(replaceReg, replaceWord);
          return item;
        });
        return list;
      }
    },
    singerListCopy: {
      get: function() {
        let singerList = deepCopy(this.singerList);
        let keyword = this.checkKey;
        let replaceReg = new RegExp(keyword, "i");
        let replaceWord = `<span class="highlight-text">${keyword}<span>`;

        let list = singerList.map(function(item) {
          item.name = item.name.replace(replaceReg, replaceWord);
          return item;
        });
        return list;
      }
    }
  },
  methods: {
    playSheet(sheet) {
      SongSheet.getById({ id: sheet._id }).then(res => {
        if (res.code == 200) {
          // console.log(res.data)
          let list = res.data.songs;
          this.selectPlay({ list: list, index: 0 });
        }
      });
    },
    openSheet(id) {
      this.$router.push({ path: "/songlist", query: { id: id } });
    },
    ...mapActions(["selectAddPlay", "selectPlay"]),
    playSong(music) {
      let song = this.songList.find(item => {
        return item._id == music._id;
      });
      this.selectAddPlay(song);
    },
    loadMoreSongs() {
      this.pageNumber += 1;
      this.getMusic();
    },
    changeSearch(index) {
      this.btnIndex = index;
      this.search();
    },
    search() {
      switch (this.btnIndex) {
        case 0:
          this.getMusic();
          break;
        case 1:
          this.getSheets();
          break;
        case 2:
          this.getSinger();
          break;
      }
    },
    getSheets() {
      SongSheet.getByName({ name: this.key }).then(res => {
        this.checkKey = this.key;
        if (res.code == 200) {
          this.sheetList = res.data;
        }
      });
    },
    getMusic() {
      Music.getByName({
        name: this.key,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then(res => {
        this.checkKey = this.key;
        if (res.code == 200) {
          if (this.pageNumber == 1) {
            this.songList = res.data;
          } else {
            this.songList = this.songList.concat(res.data);
          }
          this.songTotal = res.total;
        }
      });
    },
    getSinger() {
      Singer.getByName({ name: this.key }).then(res => {
        if (res.code == 200) {
          this.singerList = res.data;
        }
      });
    }
  },
  mounted() {
    this.key = this.$route.query.key;
    this.getMusic();
  },
  watch: {
    $route: {
      handler: function(newRoute, old) {
        if (newRoute) {
          this.key = newRoute.query.key;
          this.btnIndex = 0;
          this.search();
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.search-page {
  display: flex;
  justify-content: space-between;
  //   padding: 0 30px;
  width: 100%;
  .search-left {
    width: 220px;
    background: white;
    margin-left: 30px;
    height: 210px;
    .active-btn {
      background: url("../../assets/img/e424322629ebb459adaa8a8d5bcc5965.png")
        no-repeat;
      background-size: 30px;
      background-position: 25px 20px;
    }
    .left-btn {
      width: 100%;
      line-height: 70px;
      cursor: pointer;
      height: 70px;
      color: $color-span;
      font-size: 18px;
      &:nth-child(n) {
        border-bottom: 1px solid $color-main;
      }
    }
  }
  .search-right {
    margin-right: 30px;
    width: 850px;
    background: white;
    .search-box {
      background: $color-del-nav-back;
      padding: 15px 10px;
      .search-logo {
        display: inline-block;
        background: #6ed56c;
        line-height: 45px;
        height: 45px;
        border-radius: 20px;
        color: white;
        cursor: pointer;
        font-size: 18px;
        width: 90px;
      }
      .search-box-input {
        width: 50%;
        border-radius: 20px;
        .el-input__inner {
          height: 50px;
          border-radius: 25px;
          line-height: 50px;
          &:focus {
            border-color: $color-border;
          }
        }
      }
    }
    .songs-content {
      padding: 30px 45px;
      min-height: 600px;
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
          .highlight-text {
            color: $color-text-actived;
          }
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
      .load-more {
        margin: 10px;
        color: $color-text-actived;
        cursor: pointer;
      }
    }
    .sheets-content {
      padding: 30px 45px;
      min-height: 600px;
      .sheet-cont-box {
        display: flex;
        margin-bottom: 20px;
        border-bottom: 1px solid $color-main;
        padding-bottom: 20px;
        .sheet-box-img {
          width: 150px;
          height: 150px;
          img {
            width: 150px;
            height: 150px;
            cursor: pointer;
          }
        }
        .sheet-box-msg {
          padding: 10px 0 0 15px;
          width: 600px;
          text-align: left;
          p {
            cursor: pointer;
          }
          .sheet-msg-name {
            margin-bottom: 15px;
            font-size: 16px;
            span {
              font-size: inherit;
              &:hover {
                color: $color-text-actived;
              }
            }
            .highlight-text {
              color: $color-text-actived;
            }
            &:hover {
              color: $color-text-actived;
            }
          }
          .hot-cont-span {
            display: flex;
            justify-content: space-between;
            width: 30%;
            .icon-pra {
              i {
                font-size: 23px;
                color: $color-text-actived;
                cursor: default;
              }
              .el-icon-video-play {
                cursor: pointer;
              }
              span {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    .singer-content {
      .band-tags-main {
        margin: 15px 0 30px 0;
        .band-tags-box {
          padding: 15px 30px;
          display: flex;
          border-bottom: 1px solid $color-main;
          .band-tags-imgs {
            width: 150px;
            padding: 8px 8px 6px 8px;
            box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.3);
            img {
              width: 150px;
              height: 150px;
            }
          }
          .band-msg {
            font-size: 16px;
            padding: 10px 20px;
            a {
              font-size: inherit;
             
              span{
                font-size: inherit;
                 &:hover {
                color: $color-text-actived;
              }
              }
              .highlight-text{
                color: $color-text-actived;
              }
            }
            p{
              margin-top: 15px;
              &:nth-of-type(2){
                height: 77px;
                overflow: hidden;
              }
            }
            
          }
        }
      }
    }
  }
}
</style>