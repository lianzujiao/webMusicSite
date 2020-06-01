<template>
  <div class="exp-head">
    <div class="left-hot-content">
      <router-link
        :to="{path:'/songlist',query:{id:item._id}}"
        tag="div"
        class="hot-cont"
        v-for="item in list"
        :key="item._id"
      >
        <!-- <div class="hot-cont" v-for="item in hotSongs" :key="item.id"> -->
        <div class="hot-cont-img">
          <el-image :src="item.coverImg" lazy />
          <div class="hot-cont-span">
            <i class="el-icon-video-play" @click="playSong(item._id)"></i>
          </div>
        </div>
        <p>{{item.name}}</p>
        <!-- </div> -->
      </router-link>
    </div>
  </div>
</template>
<script>
import * as Sheet from "api/SongSheet";
import * as Music from "api/music";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "ExpHeader",
  data() {
    return {
      list: [],
      sheetId: ""
    };
  },
  methods: {
    getList() {
      Sheet.getByType({ type: 1 }).then(res => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
    //播放时将歌单列表添加到播放列表
    async playSong(id) {
      const sheetRes = await Sheet.getById({ id: id });
      let list = [];
      if (sheetRes.code == 200) {
        list = sheetRes.data.songs;
        this.setPlaylist({list:list});
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
    this.getList();
  },
  watch: {}
};
</script>
<style lang="scss">
@import "scss/index.scss";
.exp-head {
  .left-hot-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .hot-cont {
      //   margin: 10px;
      cursor: pointer;
      margin-right: 1px;
      &:nth-child(5) {
        margin-right: 0px;
      }
      .hot-cont-img {
        position: relative;
        width: 166px;
        overflow: hidden;
        img {
          width: 166px;
          height: 166px;
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
            line-height: 166px;
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
        width: 166px;
        text-align: center;
        line-height: 42px;
      }
      &:hover {
        p {
          color: $color-text-actived;
        }
      }
    }
  }
}
</style>