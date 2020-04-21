<template>
  <div class="main-content">
    <el-row class="top-content">
      <el-col :span="17">
        <el-row class="left">
          <el-col :span="24">
            <el-carousel height="283px" class="carousel">
              <el-carousel-item v-for="item in banner" :key="item.id">
                <img :src="item.src" height="283" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="24">
            <div class="left-hot">
              <div class="left-hot-tit">
                <h2>热门推荐</h2>
                <router-link to="/found/songsheet">查看更多</router-link>
              </div>
              <div class="left-hot-content">
                <router-link
                  :to="{path:'/songlist',query:{id:item.id}}"
                  tag="div"
                  class="hot-cont"
                  v-for="item in hotSongs"
                  :key="item.id"
                >
                  <!-- <div class="hot-cont" v-for="item in hotSongs" :key="item.id"> -->
                  <div class="hot-cont-img">
                    <el-image :src="item.coverImgUrl" lazy />
                    <div class="hot-cont-span">
                      <i class="el-icon-video-play"></i>
                    </div>
                  </div>
                  <p>{{item.name}}</p>
                  <!-- </div> -->
                </router-link>
              </div>
            </div>
          </el-col>
          <!-- 音乐榜单部分 -->
          <el-col :span="24">
            <div class="center">
              <v-topList></v-topList>
            </div>
          </el-col>
          <!--  -->
          <!-- 热门歌手部分 -->
          <el-col :span="24">
            <v-topSinger></v-topSinger>
          </el-col>
          <!--  -->
        </el-row>
      </el-col>
      <el-col :span="5" class="right">
        <el-row type="flex" justify="space-between" class="right-top">
          <p class="right-top-tit">新歌榜单</p>
          <p class="right-top-play">播放全部</p>
        </el-row>
        <el-row v-for="item in newSongs" :key="item.id" class="right-bot text-left">
          <el-col :span="8">
            <div class="right-bot-songPic">
              <el-image :src="item.picUrl" style="width:68px" lazy />
            </div>
          </el-col>
          <el-col :span="16" class="right-bot-name">
            <p>{{item.name}}</p>
            <p v-for="art in item.song.artists">{{art.name}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as SongSheet from "api/SongSheet";
import * as newSong from "api/newSong";
import TopList from "./TopList";
import TopSinger from "./TopSinger";
export default {
  components: {
    "v-topList": TopList,
    "v-topSinger": TopSinger
  },
  data() {
    return {
      banner: [
        {
          id: 0,
          src: require("../../../assets/img/banner1.jpg")
        },
        {
          id: 2,
          src: require("../../../assets/img/banner1.jpg")
        }
      ],
      newSongs: [
        // {
        //   id:0,
        //   type:0,
        //   name:123,
        //   picUrl:123,
        //   canDislike:true,
        //   song:{
        //     artists:[{
        //       name:"小鬼"
        //     }]
        //   }
        // }
      ],
      hotSongs: []
    };
  },
  methods: {
    getHotList() {
      SongSheet.playlist({ limit: 8, order: "hot" }).then(res => {
        if (res.code == 200) {
          // console.log(res)
          this.hotSongs = res.playlists;
          // console.log(this.hotSongs);
        }
      });
    },
    getNewList() {
      SongSheet.playlist({ limit: 10, order: "new" }).then(res => {
        // console.log(res);
      });
    },
    getNewSong() {
      newSong.newSong().then(res => {
        if (res.code == 200) {
          this.newSongs = res.result;
          // console.log(this.newSongs);
        }
      });
    }
  },
  mounted() {
    this.getHotList();
    // this.getNewList();
    this.getNewSong();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.main-content {
  color: red;
  width: 1100px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 0;
  .top-content {
    // width: 1200px;
    // margin: 0 auto;
    .left {
      background: white;
      .left-hot {
        padding: 20px;
        .left-hot-tit {
          display: flex;
          justify-content: space-between;
          padding: 10px 10px;
          h2 {
            font-size: 20px;
          }
          a {
            display: block;
            color: $color-text-actived;
          }
        }
        .left-hot-content {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .hot-cont {
            margin: 10px;
            cursor: pointer;
            .hot-cont-img {
              position: relative;
              width: 140px;
              overflow: hidden;
              img {
                width: 140px;
                transition: all 0.3s ease-in-out;
                &:hover {
                  transform: scale(1.2);
                }
              }
              .hot-cont-span {
                display: none;
                i {
                  font-size: 40px;
                  color: #d5ebd5;
                  line-height: 140px;
                }
              }
              &:hover {
                // transition: .3s ease-in-out;
                // overflow: hidden;
                // width: 140px;
                // height: 140px;
                img {
                  transform: scale(1.2);
                }
                .hot-cont-span {
                  background: rgba($color: #000000, $alpha: 0.5);
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  display: block;
                  bottom: 0;
                }
              }
            }
            p {
              width: 140px;
              text-align: left;
            }
          }
        }
      }
    }

    .carousel {
      width: 750px;
      margin: 0 auto;
      padding: 20px 0 0;
    }
    .right {
      padding-left: 20px;
    }
  }
  .home-main {
    display: flex;
    justify-content: flex-start;
    .left {
      width: auto;
    }
    .right {
      width: 300px;
    }
  }
  .right {
    .right-top {
      height: 30px;
      margin: 20px 0 0;
      .right-top-tit {
        font-size: 20px;
      }
      .right-top-play {
        margin: 0 15px 0 0;
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
      p {
        font-size: $font-size-12;
      }
      .right-bot-name {
        display: flex;
        height: 68px;
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
}
</style>