<template>
  <div >
    <div class="tit">
      <h2>榜单推荐</h2>
      <router-link to="/found/ranklist">查看更多</router-link>
    </div>
    <div class="top-list">
      <div class="left-list">
        <div class="title">
          <p>{{playlist.name}}</p>
          <span>
            <i class="el-icon-caret-right"></i>
          </span>
        </div>
        <div class="content">
          <div class="cont-box" v-for="(song,index) in playlist.tracks" :key="index">
            <p :class="{'pink-no':index<3}">{{index+1}}</p>
            <!-- <el-image src="##"></el-image> -->
            <div class="song text-left">
              <p class="song-tit">{{song.name}}</p>
              <p class="song-singer">
                <span v-for="art in song.ar" :key="art.id">{{art.name}}&nbsp;</span>
              </p>
            </div>
            <span class="play">
              <i class="el-icon-caret-right"></i>
            </span>
            <span class="marked">
              <i class="el-icon-star-on"></i>
            </span>
          </div>
          <div class="cont-more">
            <router-link :to="{path:'/found/ranklist',query:{id:3}}">查看完整榜单>></router-link>
          </div>
        </div>
      </div>
      <div class="right-list">
        <div class="title">
          <p>{{orilist.name}}</p>
          <span>
            <i class="el-icon-caret-right"></i>
          </span>
        </div>
        <div class="content">
          <div class="cont-box" v-for="(song,index) in orilist.tracks" :key="index">
            <p :class="{'pink-no':index<3}">{{index+1}}</p>
            <!-- <el-image src="##"></el-image> -->
            <div class="song text-left">
              <p class="song-tit">{{song.name}}</p>
              <p class="song-singer">
                <span v-for="art in song.ar" :key="art.id">{{art.name}} &nbsp;</span>
              </p>
            </div>
            <span class="play">
              <i class="el-icon-caret-right"></i>
            </span>
            <span class="marked">
              <i class="el-icon-star-on"></i>
            </span>
          </div>
          <div class="cont-more">
            <router-link :to="{path:'/found/ranklist',query:{id:2}}">查看完整榜单>></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Toplist from "api/topList";
export default {
  data() {
    return {
      playlist: {},
      orilist: {}
    };
  },
  methods: {
    getTopList() {
      //idx:3 云音乐飙升榜
      Toplist.list({ idx: 3 }).then(res => {
        if (res.code == 200) {
          this.playlist = res.playlist;
          
          this.playlist.tracks = this.playlist.tracks.filter((item, index) => {
            if (index < 8) {
              return item;
            }
          });
        }
      });
    },
    getOriList() {
      //idx:2网易原创新歌榜单
      Toplist.list({ idx: 2 }).then(res => {
        if (res.code == 200) {
          this.orilist = res.playlist;
          this.orilist.tracks = this.orilist.tracks.filter((item, index) => {
            if (index < 8) {
              return item;
            }
          });
        }
      });
    }
  },
  mounted() {
    this.getTopList();
    this.getOriList();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.tit{
  padding: 20px;
  display: flex;
  justify-content: space-between;
  h2{
    font-size: 20px;
    font-weight: bold;
  }
  a{
    display: block;
    color: $color-text-actived;
  }
}
.top-list {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  .left-list,
  .right-list {
    width: 48%;
    .title {
      box-sizing: border-box;
      width: 100%;
      height: 72px;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      // line-height: 75px;
      p {
        color: white;
        font-size: 20px;
        line-height: 72px;
      }
      span {
        display: block;
        border: 2px solid white;
        border-radius: 50%;
        height: 32px;
        margin-top: 20px;
        transition: all 0.4s ease-in;
        &:hover {
          background: #eb7979;
        }
        i {
          font-size: 32px;
          color: white;
          line-height: 33px;
        }
      }
    }
    .content {
      background: #f5f3f3;

      .cont-box {
        display: flex;
        padding: 15px 10px;
        // justify-content: space-between;
        transition: all 0.3s ease-in-out;
        .pink-no {
          color: $color-light-pink;
        }
        p {
          width: 19%;
          font-size: 20px;
        }
        .song {
          width: 70%;
          .song-tit {
            font-size: 14px;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .song-singer {
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            span {
              width: 100%;
              font-size: 12px;
              color: $color-span;
            }
          }
        }
        .play {
          display: none;
          width: 24px;
          height: 24px;
          border: 2px solid $color-span;
          border-radius: 50%;
          cursor: pointer;
          i {
            font-size: 23px;
            line-height: 24px;
            color: $color-span;
          }
        }
        .marked {
          display: none;
          width: 38px;
          padding: 0 5px;
          i {
            font-size: 24px;
            line-height: 28px;
            color: $color-span;
          }
        }
        &:hover {
          cursor: pointer;
          box-shadow: 2px 2px 6px #ef9393;
          .song-tit {
            color: black;
            // font-weight: bold;
            transition: all 0.2s ease-in-out;
          }
          .play,
          .marked {
            display: block;
            transition: display 0.3s linear;
            &:hover {
              i {
                color: $color-text-normal;
              }
            }
          }
        }
      }
    }
    .cont-more {
      padding: 5px 15px 15px;
      text-align: right;
      a {
        color: $color-text-actived;
      }
    }
  }
  .left-list {
    .title {
      background: $color-light-pink;
    }
  }
  .right-list {
    .title {
      background: $color-light-blue;
      span {
        &:hover {
          background: #43a9e1;
        }
      }
    }
    .content {
      .cont-box {
        .pink-no {
          color: $color-light-blue;
        }
        &:hover {
          cursor: pointer;
          box-shadow: 2px 2px 6px $color-light-blue;
        }
      }
    }
  }
}
</style>