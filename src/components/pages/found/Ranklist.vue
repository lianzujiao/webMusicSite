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
            <img :src="item.album.coverImg" @click="openSongdea(item._id)" alt />
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
                <div class="msg-artist">
                  <router-link to>{{item.artist.name}}</router-link>
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
    openSongDea(id) {
      this.$router.push({ path: "songDetail", query: { id: id } });
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions(["setPlaylist"])
  },
  mounted() {
    this.getList();
  },
  watch: {}
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
      padding: 0px 20px;
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
      width: 250px;
      padding: 10px 33px 20px 0px;
      &:nth-child(4n) {
        padding-right: 0px;
      }
      .rank-box-img {
        border: 1px solid $color-main;
        img {
          width: 250px;
          height: 255px;
          cursor: pointer;
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
          }
          .msg-top-name {
            width: 215px;
            padding-top: 10px;
            .song-name {
              display: inline-block;
              width: 180px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            a,
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
              }
            }
          }
        }
      }
    }
  }
}
</style>