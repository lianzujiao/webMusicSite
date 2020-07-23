<template>
  <div class="play-list-box">
    <div class="play-list">
      <div class="list-tit">
        <div
          class="list-tit-left list-tit-item"
          @click="changeList(1)"
          :class="{'item-active':listType==1}"
        >
          <Icon type="playingList"></Icon>
          <span>当前列表</span>
        </div>
        <div
          class="list-tit-right list-tit-item"
          @click="changeList(2)"
          :class="{'item-active':listType==2}"
        >
          <Icon type="historyList"></Icon>
          <span>播放历史</span>
        </div>
      </div>
      <div class="list-del text-right pointer" v-if="showBtn()" @click="removeAll()">清空</div>
      <div class="list-box">
        <template v-if="[...playlist].length!==0&&listType==1">
          <div class="playing-songs">
            <div class="song-box" v-for="(song,index) in playlist" :key="song._id">
              <Icon
                title="播放/暂停歌曲"
                :type="getPlayIconType(song)"
                class="pointer"
                @click.self="selectItem(song,index)"
              />

              <p class="song-name text-left">
                <router-link :to="{path:'songDetail',query:{id:song._id}}">{{song.name}}</router-link>
              </p>
              <Icon type="delete" title="从播放列表删除" @click="delSong(index)" />
            </div>
          </div>
        </template>
        <template v-if="[...historyList].length!==0&&listType==2">
          <div class="playing-songs">
            <div class="song-box" v-for="(song,index) in historyList" :key="song._id+'2'">
              <Icon
                title="播放/暂停歌曲"
                :type="getPlayIconType(song)"
                class="pointer"
                @click.self="selectHisIitem(song,index)"
              />

              <p class="song-name text-left">
                <router-link :to="{path:'songDetail',query:{id:song._id}}">{{song.name}}</router-link>
              </p>
              <Icon type="delete" title="从列表删除" @click="delSongFromHis(song,index)" />
            </div>
          </div>
        </template>
        <template v-if="[...playlist].length==0&&listType==1">
          <img src="../../../assets/img/noSongsDefault.png" />
          <p>啊哦~~什么都没有T T</p>
        </template>
        <template v-if="[...historyList].length==0&&listType==2">
          <img src="../../../assets/img/noSongsDefault.png" />
          <p>什么都没有听过~~</p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import * as ColSong from "api/colSong";
export default {
  name: "playList",
  data() {
    return {
      list: [],
      listType: 1
    };
  },
  computed: {
    ...mapGetters([
      "playing",
      "currentMusic",
      "playlist",
      "currentIndex",
      "user",
      "collectList",
      "historyList"
    ])
  },
  watch: {},
  methods: {
    selectHisIitem(song,index){
      this.setPlaylist({list:this.historyList});
      this.setCurrentIndex(index);
      this.setPlaying(true)
    },
    delSongFromHis(music) {
      this.removeHistory(music);
    },
    //歌曲详情
    openSong(id) {
      this.$router.push({ path: "songDetail", query: { id: id } });
    },
    showBtn() {
      if (this.listType == 2 && [...this.historyList].length == 0) {
        return false;
      }
      if (this.listType == 1 && [...this.playlist].length == 0) {
        return false;
      }
      return true;
    },
    //切换列表
    changeList(type) {
      this.listType = type;
    },
    //清空事件
    removeAll() {
      switch (this.listType) {
        case 1:
          this.clearPlayList();
          break;
        case 2:
          this.clearHistory();
          break;
      }
    },
    //删除事件
    delSong(index) {
      let list = [...this.playlist];
      list.splice(index, 1);
      this.removePlayListItem({ list, index });
    },
    //播放列表中的某一首歌
    selectItem(song, index) {
      if (this.currentMusic._id && song._id == this.currentMusic._id) {
        this.setPlaying(!this.playing);
        return;
      }
      if (song._id != this.currentMusic._id) {
        this.setCurrentIndex(index);
        this.setPlaying(true);
      }
    },
    // 获取播放状态 type
    getPlayIconType({ _id: itemId }) {
      const {
        playing,
        currentMusic: { _id }
      } = this;
      return playing && _id === itemId ? "pause" : "play";
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions([
      "removePlayListItem",
      "clearPlayList",
      "setIsLike",
      "setPlaylist",
      "clearHistory",
      "removeHistory"
    ])
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.setPlaylist({ list: this.list });
    // });
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.play-list-box {
  // position: relative;
  // width: 440px;
}
.play-list {
  position: absolute;
  // right: -17px;
  width: 440px;
  overflow: hidden;
  height: 540px;
  box-sizing: border-box;
  padding: 0 15px;
  .list-tit {
    display: flex;
    justify-content: space-between;
    width: 80%;
    .list-tit-item {
      width: 40%;
      cursor: pointer;
    }
    .item-active {
      border-bottom: 1px solid $color-text-actived;
      i,
      span {
        color: $color-text-actived;
      }
    }
    i {
      font-size: 24px;
      transform: translateY(3px);
    }
    font-size: 16px;
    border-bottom: 1px solid $color-main;
    line-height: 45px;
    margin: 0 auto;
  }
  .list-del {
    color: $color-text-actived;
    line-height: 35px;
    padding: 0 20px;
    font-size: 16px;
  }
  .list-box {
    // line-height: 40px;
    .playing-songs {
      width: 440px;
      overflow-x: hidden;
      overflow-y: scroll;
      height: 460px;
    }
    .song-box {
      width: 457px;
      line-height: 42px;
      display: flex;
      position: relative;
      // justify-content: space-around;
      i {
        font-size: 26px;
        color: $color-text-actived;
        width: 30px;
        transform: translateY(5px);
        &:nth-last-child(1) {
          margin-left: 45px;
        }
      }
      .song-name {
        width: 280px;
        padding: 0 5px;
        a {
          &:hover {
            color: $color-text-actived;
          }
        }
      }
      p {
      }
      &::after {
        content: "";
        width: 90%;
        position: absolute;
        height: 1px;
        background: $color-main;
        bottom: 0;
      }
    }
  }
}
</style>