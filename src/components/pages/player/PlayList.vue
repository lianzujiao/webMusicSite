<template>
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
        <div class="song-box" v-for="(song,index) in playlist" :key="song._id">
          <Icon
            title="播放/暂停歌曲"
            :type="getPlayIconType(song)"
            class="pointer"
            @click.self="selectItem(song,index)"
          />

          <p class="song-name text-left">{{song.name}}</p>
          <Icon type="delete" title="从播放列表删除" @click="delSong(index)" />
        </div>
      </template>
      <template v-if="listType==2">
        <div class="song-box" v-for="(song,index) in historyList" :key="song._id+'1'">
          <Icon
            title="播放/暂停歌曲"
            :type="getPlayIconType(song)"
            class="pointer"
            @click.self="selectItem(song,index)"
          />

          <p class="song-name text-left">{{song.name}}</p>
        </div>
      </template>
      <template v-if="[...playlist].length==0">
        <img src="../../../assets/img/noSongsDefault.png" />
        <p>啊哦~~什么都没有T T</p>
      </template>
    
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
      list: [
        {
          name: "温柔故事",
          src:
            "http://songtaste.oss-cn-beijing.aliyuncs.com/test1587703788464-%E9%B9%BF%E5%85%88%E6%A3%AE%E4%B9%90%E9%98%9F%20-%20%E6%B8%A9%E6%9F%94%E6%95%85%E4%BA%8B.mp3",
          _id: "5ea2702d5191f919f4e0296c",
          album: {
            _id: "5ea26fbb5191f919f4e0296b",
            name: "温柔故事",
            coverImg:
              "http://songtaste.oss-cn-beijing.aliyuncs.com/test1587703717883-%E6%B8%A9%E6%9F%94%E6%95%85%E4%BA%8B.jpg"
          },
          artist: {
            _id: "5ea16c4b947d6729a056399b",
            name: "鹿先森乐队"
          }
        },
        {
          name: "温柔故事2",
          src:
            "https://songtaste.oss-cn-beijing.aliyuncs.com/test1587434788162-8801c4c85c4e3c0d16e4450d6e4064eb4a8fd828a0bca20f513944602cd82be20947097d.mp3",
          _id: "5ea2702d5191f919f4e0297c",
          album: {
            _id: "5ea26fbb5191f919f4e0296b",
            name: "温柔故事",
            coverImg:
              "http://songtaste.oss-cn-beijing.aliyuncs.com/test1587703717883-%E6%B8%A9%E6%9F%94%E6%95%85%E4%BA%8B.jpg"
          },
          artist: {
            _id: "5ea16c4b947d6729a056399b",
            name: "鹿先森乐队"
          }
        }
      ],
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
  watch: {
    collectList: {
      handler: function(newlist, oldlist) {
        if (newlist.length <= 0) {
          return false;
        }
        let playList = [...this.playlist];
        let newList = [...newlist];

        playList.forEach((item, index) => {
          newList.some((li, number, array) => {
            if (item._id == li.song._id) {
              item["like"] = true;
              return;
            }
          });
        });
        this.setPlaylist({ list: playList });
      }
    }
  },
  methods: {
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
      "removeHistory",
      "clearHistory"
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.setPlaylist({ list: this.list });
    });
  }
};
</script>
<style lang="scss">
// .iconfont {
//   font-family: "iconfont" !important;
//   font-size: 16px;
//   font-style: normal;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }
@import "scss/index.scss";
.play-list {
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
      // line-height: px;
      // padding: 0 5px;
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
    .song-box {
      line-height: 42px;
      display: flex;
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
      }
      p {
      }
    }
  }
}
</style>