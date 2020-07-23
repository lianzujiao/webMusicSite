<template>
  <div class="hot-list">
    <div class="tit">
      <h2>音墙环绕</h2>
      <router-link to="/ranklist">查看全部</router-link>
    </div>
    <div class="list-content cont-save">
      <div class="cont-one">
        <div class="one-img">
          <el-image
            v-if="songs[0]"
            :src="songs[0].album.coverImg"
            alt
            @click="openSongDetail(songs[0]._id)"
          ></el-image>
        </div>
        <div class="one-msg cont-msg text-left">
          <p class="blue-pra one-msg-no text-left">Top1</p>
          <router-link
            :to="{path:'/songDetail',query:{id:songs[0]._id}}"
            class="cont-name one-name"
            v-if="songs[0]"
          >{{songs[0].name}}</router-link>
          <router-link
            to="##"
            class="cont-artist one-artist"
            v-if="songs[0]"
          >{{songs[0].artist.name}}</router-link>
        </div>
      </div>
      <div class="common-cont">
        <div
          class="common-cont-song"
          v-for="(item,index) in songs"
          :key="index"
          v-if="index>0&&index<3"
        >
          <div class="common-song-img">
            <img :src="item.album.coverImg" alt @click="openSongDetail(item._id)" />
          </div>
          <div class="common-song-msg cont-msg text-left">
            <router-link
              :to="{path:'/songDetail',query:{id:item._id}}"
              class="cont-name common-msg-name"
            >
              <span class="common-msg-name-index">{{index+1}}</span>
              <span class="common-msg-name-dea">{{item.name}}</span>
            </router-link>
            <router-link to="##" class="common-msg-artist">{{item.artist.name}}</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="song-bottom cont-save">
      <div class="common-cont left-50">
        <div
          class="common-cont-song"
          v-for="(item,index) in songs"
          :key="index"
          v-if="index>2&&index<5"
        >
          <div class="common-song-img">
            <img :src="item.album.coverImg" alt @click="openSongDetail(item._id)" />
          </div>
          <div class="common-song-msg cont-msg text-left">
            <router-link
              :to="{path:'/songDetail',query:{id:item._id}}"
              class="cont-name common-msg-name"
            >
              <span class="common-msg-name-index">{{index+1}}</span>
              <span class="common-msg-name-dea">{{item.name}}</span>
            </router-link>
            <router-link to="##" class="common-msg-artist">{{item.artist.name}}</router-link>
          </div>
        </div>
      </div>
      <div class="common-cont">
        <div
          class="common-cont-song"
          v-for="(item,index) in songs"
          :key="index"
          v-if="index>4&&index<7"
        >
          <div class="common-song-img">
            <img :src="item.album.coverImg" alt @click="openSongDetail(item._id)" />
          </div>
          <div class="common-song-msg cont-msg text-left">
            <router-link
              :to="{path:'/songDetail',query:{id:item._id}}"
              class="cont-name common-msg-name"
            >
              <span class="common-msg-name-index">{{index+1}}</span>
              <span class="common-msg-name-dea">{{item.name}}</span>
            </router-link>
            <router-link :to="{path:'singer',query:{id:item.artist._id}}" class="common-msg-artist">{{item.artist.name}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getByType, hot } from "api/rank";
export default {
  name: "HotList",
  data() {
    return {
      songs: []
    };
  },
  methods: {
    // 音强环绕 type:1
    getList() {
      hot().then(res => {
        if (res.code == 200) {
          this.songs = res.data;
        }
      });
    },
    openSongDetail(id) {
      this.$router.push({ path: "/songDetail", query: { id: id } });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.hot-list {
  padding: 20px 30px;
  .tit {
    // padding: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    h2 {
      font-size: 24px;
      //   font-weight: bold;
    }
    a {
      display: block;
      color: $color-text-actived;
    }
  }

  .blue-pra {
    color: $color-light-purple;
  }
  .cont-msg {
    padding: 15px 0 15px 10px;
    height: 165px;
    box-sizing: border-box;
    border: 1px solid $color-main;
    border-left: 0;
    background: #f9f9f9;
    width: 100%;
  }
  .cont-name {
    font-size: 15px;
    color: $color-text-normal;
    line-height: 22px;
    height: 44px;
    overflow: hidden;
    margin: 10px 0 25px 0;
    letter-spacing: 2px;
  }

  .list-content,
  .cont-save {
    display: flex;
    justify-content: space-between;
    .cont-one {
      width: 50%;
      display: flex;
      .one-img {
        width: 166px;
        img {
          cursor: pointer;
          width: 166px;
          height: 166px;
        }
      }
      .one-msg {
        //   padding: 15px 0 15px 10px;
        //   height: 165px;
        //   box-sizing: border-box;
        //   border: 1px solid;
        .one-name {
          // padding: 10px 0 25px 0;
        }
        .one-msg-no {
          font-size: 24px;
        }
        a {
          display: block;
        }
      }
    }
    .common-cont {
      width: 48%;
      .common-cont-song {
        width: 100%;
        display: flex;
        .common-song-img {
          img {
            cursor: pointer;
            width: 81px;
            height: 81px;
          }
        }
        .common-song-msg {
          width: 100%;
          height: 81px;
          padding: 8px 0 0px 10px;
          a {
            display: block;
          }
          .common-msg-name {
            margin: 5px 0 5px 0;
            height: 40px;
            display: flex;
            span {
              display: inline-block;
            }
            .common-msg-name-index {
              color: white;
              display: inline-block;
              padding: 1px 6px;
              background: $color-light-purple;
              height: 20px;
              margin-right: 5px;
            }
            .common-msg-name-dea {
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
  .song-bottom {
    display: flex;
    margin-top: 15px;
    .left-50 {
      width: 50%;
      //   .common-cont-song{
      //       &:nth-child(2){
      //           margin-top: 3px;
      //       }
      //   }
    }
  }
}
</style>