<template>
  <div class="rank-list">
    <div class="purple-bg">
      <section class="top">
        <div class="top-left">
          <img v-if="list[0]" :src="list[0].album.coverImg" alt @click="openSongDea(list[0]._id)" />
        </div>
        <div class="top-right" v-if="list[0]">
          <p class="top-1">TOP1</p>
          <div class="top-name">
            <router-link :to="{path:'/songDetail',query:{id:list[0].artist._id}}">{{list[0].name}}</router-link>
            <p class="top-popu">
              <Icon type="bofangliang" />
              <span>{{list[0].popularity}}</span>
            </p>
          </div>
          <p class="top-artist">
            <router-link
              :to="{path:'/singerDetail',query:{id:list[0].artist._id}}"
            >{{list[0].artist.name}}</router-link>
          </p>
          <div class="top-btn" @click="playSongs()">一键播放</div>
        </div>
      </section>
    </div>
    <div class="rank-content">
      <div class="rank-box-content">
        <div class="rank-box" v-for="(item,index) in list" v-if="index>0&&index!=1">
          <div class="rank-box-img">
            <img v-if="item.album.coverImg" :src="item.album.coverImg" alt />
            <span>
              <Icon type="bofang" @click="selectOne(item)"></Icon>
            </span>
          </div>
          <div class="rank-box-msg">
            <div class="msg-top">
              <p class="msg-top-index" v-if="index<10">{{index+1}}</p>
              <div class="msg-top-name">
                <router-link
                  class="song-name"
                  :to="{path:'songDetail',query:{id:item._id}}"
                >{{item.name}}</router-link>

                <Icon type="bofangliang" />
                <span>{{item.popularity}}</span>
                <div class="msg-artist" v-if="item.artist">
                  <router-link :to="{path:'singer',query:{id:item.artist._id}}">{{item.artist.name}}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { hot } from "api/rank";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    playSongs() {
      if (this.list.length <= 0) {
        return false;
      }
      this.setPlaylist({ list: this.list });
      this.setCurrentIndex(0);
      this.setPlaying(true);
    },
    getList() {
      hot().then(res => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
    selectOne(music) {
      this.selectAddPlay(music);
    },

    openSongDea(id) {
      this.$router.push({ path: "songDetail", query: { id: id } });
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions(["setPlaylist", "selectAddPlay"])
  },
  watch: {
    $route: {
      handler: function(newVal, old) {
        this.getList();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";

.rank-list {
  background: white;
  width: 100%;
  height: 100%;
  .purple-bg {
    width: 100%;
    height: 300px;
    background: $color-light-purple;
    .top {
      display: flex;
      box-sizing: border-box;
      width: 1100px;
      padding: 20px 20px 0;
      margin: 0 auto;
      justify-content: space-between;
      // padding-top: 90px;
      .top-left {
        background: url("../../../assets/img/album-bg.png") no-repeat;
        width: 450px;
        background-size: 100%;
        height: 300px;
        img {
          width: 252px;
          height: 253px;
          transform: translate(-8px);
          cursor: pointer;
        }
      }
      .top-right {
        width: 610px;
        padding-left: 40px;
        box-sizing: border-box;
        text-align: left;
        padding-top: 50px;
        p,
        a {
          color: white;
        }
        .top-1 {
          font-size: 30px;
          line-height: 50px;
        }
        .top-name {
          display: flex;

          a {
            display: block;
            font-size: 26px;
            line-height: 45px;
            &:hover {
              color: $color-text-actived;
            }
          }
          .top-popu {
            display: flex;
            // flex-direction: column;
            width: 35px;
            margin-left: 20px;
            justify-content: space-between;
            i,
            span {
              color: white;
              display: block;
              line-height: 45px;
            }
            i {
              font-size: 16px;
            }
            span {
              font-size: 16px;
            }
          }
        }
        .top-artist {
          a {
            font-size: 18px;
            line-height: 45px;
            &:hover {
              color: $color-text-actived;
            }
          }
        }
        .top-btn {
          color: white;
          width: 150px;
          height: 45px;
          background: $color-text-actived;
          cursor: pointer;
          box-sizing: border-box;
          border-radius: 20px;
          font-size: 18px;
          text-align: center;
          line-height: 45px;
          position: relative;
          &::before {
            content: "";
            width: 0;
            height: 0;
            border: 8px solid;
            border-color: transparent transparent transparent white;
            position: absolute;
            top: 15px;
            left: 18px;
          }
        }
      }
    }
  }
  .rank-content {
    width: 1100px;
    margin: 0 auto;
    padding: 0;
    margin-top: 40px;
  }
  .rank-box-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .rank-box {
      width: 180px;
      padding: 10px 35px 20px 0px;
      &:nth-child(5n) {
        padding-right: 0px;
      }
      .rank-box-img {
        position: relative;
        border: 1px solid $color-main;
        padding: 5px;
        img {
          width: 170px;
          height: 170px;
          border: 1px solid $color-main;
          width: 166px;
          height: 168px;
        }
        span {
          display: none;
          position: absolute;
          top: 45%;
          left: 42%;
          background: $color-text-actived;
          border-radius: 50%;
          i {
            font-size: 25px;
            color: white;
          }
        }
        &:hover {
          span {
            display: block;
          }
        }
      }
      .rank-box-msg {
        text-align: left;
        .msg-top {
          display: flex;
          .msg-top-index {
            color: $color-light-purple;
            font-size: 32px;
            width: 35px;
            padding-top: 10px;
            margin-right: 8px;
          }
          .msg-top-name {
            width: 215px;
            padding-top: 10px;
            .song-name {
              font-size: 16px;
              display: block;
              width: 155px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:hover {
                color: $color-text-actived;
              }
            }

            span {
              font-size: 18px;
            }
            i {
              transform: translateY(-5px);
            }
            span {
              transform: translateY(-4px);
              display: inline-block;
            }
            .msg-artist {
              a {
                width: 215px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                // margin-left: 15px;
                font-size: 14px;
                color: #999;
                &:hover {
                  color: $color-text-actived;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>