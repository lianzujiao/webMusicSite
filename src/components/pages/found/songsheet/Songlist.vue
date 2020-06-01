<template>
  <div class="song-list">
    <div class="list-top">
      <div class="list-top-img">
        <img :src="sheet.coverImg" alt=""/>
      </div>
      <div class="list-top-msg text-left">
        <div class="top-msg-name">
          <span>歌单</span>
          {{sheet.name}}
          <!-- <span class="top-msg-span">歌曲数:{{sheet.songs.length}}</span> -->
        </div>

        <div class="msg-btn">
          <p class="btn-play">
            <i class="iconfont iconplay"></i>播放
          </p>
          <!-- <p class="btn-add">添加</p> -->
        </div>
     
        <p class="msg-intro">
          简介:
          <span>{{sheet.desc}}</span>
        </p>
      </div>
    </div>
    <div class="list-center">
      <p class="center-list-tit text-left">歌曲列表</p>
      <div class="list-column text-left">
        <p class="column-two">音乐标题</p>
        <p class="column-three">歌手</p>
        <p class="column-four">专辑</p>
      </div>
      <div class="song-msg-box" v-for="(song,index) in sheet.songs" :key="index">
        <p class="msg-box-index">{{index+1}}</p>

        <p class="msg-box-name text-left">{{song.name}}</p>
        <p class="msg-box-art text-left">
          <span>{{song.artist.name}}</span>
        </p>
        <p class="msg-box-album text-left">{{song.album.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import * as SongSheet from "api/SongSheet";
export default {
  data() {
    return {
      sheet: {},
      id: "",
      sheet: {}
    };
  },
  methods: {
    getListDetail() {
      SongSheet.getById({ id: this.sheet._id }).then(res => {
        if (res.code == 200) {
          //   console.log(res);
          console.log(res.data);
          this.sheet = res.data;
        }
      });
    }
  },
  mounted() {
    this.sheet._id = this.$route.query.id;
    // console.log(this.id)
    this.getListDetail();
  },
  watch: {
    $route: {
      handler: function(newRoute, oldRoute) {
        this.sheet._id = newRoute.query.id;
        this.getListDetail();
      }
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.song-list {
  background: white;
  padding: 40px;
  width: 1100px;
  margin: 0px auto;
  box-sizing: border-box;
  // box-sizing: content-box;
  transform: translateY(20px);
  .list-top {
    display: flex;
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
      font-size: 18px;
    }
    .list-column {
      display: flex;
      padding: 0 5px;
      //   line-height:;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      margin: 10px 0 0 0;
      border-color: $color-main;
      p {
        line-height: 30px;
        border-left: 1px solid;
        // border-right: 1px solid;
        border-color: $color-main;
        padding-left: 5px;
      }
      .column-one {
        width: 50px;
        // border-left: 1px solid;
        border-right: 1px solid $color-main;
        margin-left: 50px;
        // border-color: $color-main;;
      }
      .column-two {
        width: 385px;
      }
      .column-three {
        width: 300px;
      }
      .column-four {
        width: 170px;
      }
      .column-last {
      }
    }
    .song-msg-box {
      display: flex;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      p {
        //   padding-left: 5px;
        cursor: pointer;
      }
      &:nth-child(2n + 1) {
        background: #efefef;
      }
      &:nth-child(2n) {
        background: #fbfbfb;
      }
      &:hover {
        cursor: pointer;
        .msg-box-art span,
        .msg-box-album,
        .msg-box-time {
          color: black;
        }
        .msg-box-name {
          color: $color-text-actived;
        }
      }
      .msg-box-index {
        width: 50px;
      }
      .msg-box-icon {
        width: 65px;
      }
      .msg-box-name {
        width: 350px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .msg-box-art {
        width: 300px;
        span {
          color: $color-span;
          &:nth-child(2n) {
            padding-left: 10px;
          }
        }
      }
      .msg-box-album {
        width: 170px;
        color: $color-span;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .msg-box-time {
        color: $color-span;
      }
    }
  }
}
</style>