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
          <div class="song-cont-box" v-for="(song,index) in songListCopy" :key="index">
            <div class="song-cont-box-img">
              <img :src="song.album.coverImg" />
            </div>
            <div class="song-cont-box-msg">
              <p class="song-msg-name" v-html="song.name"></p>
              <p class="song-msg-artist">{{song.artist.name}}</p>
            </div>
            <div class="song-cont-box-play">
              <i class="el-icon-video-play"></i>
            </div>
          </div>
        </div>
        <div class="sheets-content" v-show="btnIndex==1">
          <p v-if="sheetList.length==0">暂无相关歌单</p>
          <div class="sheet-cont-box" v-for="(sheet,index) in sheetListCopy">
            <div class="sheet-box-img">
              <img :src="sheet.coverImg" alt />
            </div>
            <div class="sheet-box-msg">
              <p class="sheet-msg-name" v-html="sheet.name"></p>
              <p class="sheet-msg-desc">{{sheet.desc}}</p>
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
export default {
  data() {
    return {
      btns: [{ name: "歌曲" }, { name: "歌单" }],
      btnIndex: 0,
      key: "", //搜索关键字
      songList: [],
      songTotal: 0,
      sheetList: [],
      checkKey: "" //用于保证高亮关键字在请求发生后才确定
    };
  },
  computed: {
    songListCopy: {
      get: function() {
        let songList = this.songList;
        let keyword = this.checkKey;
        let replaceReg = new RegExp(keyword, "i");
        let replaceWord = `<span class="highlight-text">${keyword}<span>`;

        let list = Array.from(songList).map(function(item) {
          item.name = item.name.replace(replaceReg, replaceWord);
          return item;
        });
        return list;
      }
    },
     sheetListCopy: {
      get: function() {
        let sheetList = this.sheetList;
        let keyword = this.checkKey;
        let replaceReg = new RegExp(keyword, "i");
        let replaceWord = `<span class="highlight-text">${keyword}<span>`;

        let list = Array.from(sheetList).map(function(item) {
          item.name = item.name.replace(replaceReg, replaceWord);
          return item;
        });
        return list;
      }
    }
  },
  methods: {
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
      Music.getByName({ name: this.key, pageSize: 2, pageNumber: 1 }).then(
        res => {
          this.checkKey = this.key;
          if (res.code == 200) {
            this.songList = res.data;
            this.songTotal = res.total;
          }
        }
      );
    }
  },
  mounted() {
    this.key = this.$route.query.key;
    this.getMusic();
  },
  watch:{
    $route:{
      handler:function(newRoute,old){
        if(newRoute){
          this.key=newRoute.query.key;
          this.btnIndex=0;
          this.search()
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
    height: 140px;
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
      &:nth-child(1) {
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
      .song-cont-box {
        display: flex;
        margin-bottom: 15px;
        .song-cont-box-img {
          img {
            width: 100px;
            height: 100px;
            cursor: pointer;
          }
        }
        .song-cont-box-msg {
          padding: 10px 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          width: 500px;
          .song-msg-name {
            font-size: 18px;
            cursor: pointer;
            span {
              font-size: 18px;
            }
            .highlight-text {
              color: $color-text-actived;
            }
          }
          .song-msg-artist {
            margin-bottom: 0;
            cursor: pointer;
          }
        }
        .song-cont-box-play {
          margin-right: 0px;
          i {
            font-size: 40px;
            line-height: 100px;
            cursor: pointer;
          }
        }
      }
    }
    .sheets-content {
      padding: 30px 45px;
      min-height: 600px;
      .sheet-cont-box {
        display: flex;
        margin-bottom: 20px;
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
            font-size: 18px;
             .highlight-text {
              color: $color-text-actived;
            }
          }
        }
      }
    }
  }
}
</style>