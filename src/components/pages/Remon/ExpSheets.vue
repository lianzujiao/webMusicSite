<template>
  <div class="exp-sheets">
    <div class="tit">
      <h2>云想歌单</h2>
      <router-link to="/songsheet">查看全部</router-link>
    </div>
    <div class="sheet-cont" >

      <div class="left-hot-content">
        <div class="hot-cont" v-for="item in list" :key="item._id">
          <!-- <div class="hot-cont" v-for="item in hotSongs" :key="item.id"> -->
          <div class="hot-cont-img">
            <el-image :src="item.coverImg" title="歌单详情" lazy @click="openSheet(item._id)"></el-image>
          </div>

          <div class="hot-cont-msg text-left">
            <div class="hot-cont-span">
              <p class="icon-pra">
                <i class="el-icon-video-play" @click="playSheet(item._id)" title="播放"></i>
              </p>
              <p class="icon-pra">
                <Icon type="bofangliang" title="播放次数"></Icon>
                <span>10</span>
              </p>
              <p class="icon-pra">
                <Icon type="music" title="总歌曲数"></Icon>
                <span>10</span>
              </p>
            </div>
            <p class="sheet-name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as SongSheet from "api/SongSheet";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "ExpSheets",
  data() {
    return {
      list: []
    };
  },
  methods: {
    getHotSheet() {
      SongSheet.hotSheet().then(res => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
    openSheet(id) {
      this.$router.push({ path: "songlist", query: { id: id } });
    },
    async playSheet(id) {
      const sheetRes = await SongSheet.getById({ id: id });
      let list = [];
      if (sheetRes.code == 200) {
        list = sheetRes.data.songs;
        this.setPlaylist({ list: list });
        this.setCurrentIndex(0);
        this.setPlaying(true);
      }
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions(["setPlaylist"])
  },
  mounted() {
    this.getHotSheet();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.exp-sheets {
  padding: 20px 30px 0px 30px;
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
  .sheet-cont {
    .left-hot-content {
      display: flex;
      //   justify-content: space-between;
      flex-wrap: wrap;
      .hot-cont {
        margin-bottom: 30px;
        margin-right: 30px;
        &:nth-child(4n) {
          margin-right: 0;
        }
        .hot-cont-img {
          position: relative;
          width: 170px;
          overflow: hidden;
          //   box-shadow: 5px -5px 5px #c5c2c2;
          img {
            width: 170px;
            height: 170px;
            transition: all 0.3s ease-in-out;
            &:hover {
              transform: scale(1.2);
              cursor: pointer;
            }
          }
        }
        .hot-cont-msg {
          .hot-cont-span {
            display: flex;
            justify-content: space-between;
            width: 100%;
            .icon-pra {
              i {
                font-size: 16px;
                color: $color-text-actived;
                cursor: default;
              }
              .el-icon-video-play {
                cursor: pointer;
              }
            }
          }
          width: 170px;
          height: 45px;
          background: #f1f1f1;
          overflow: hidden;
          .sheet-name {
              width: 170px;
            line-height: 31px;
            height: 30px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
         
        }
      }
    }
  }
}
</style>
