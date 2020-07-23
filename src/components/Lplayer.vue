<template>
  <div class="z-player">
    <div class="panel-left" :class="{disable:!currentMusic._id}">
      <!-- <i class="iconprev"></i> -->
      <div class="control-prev">
        <Icon class="pointer" type="prev" title="上一曲 Ctrl + left" @click="prev"></Icon>
      </div>

      <div class="pointer control-play" title="播放暂停 Ctrl + Space" @click="play">
        <Icon :type="playing?'pause':'play'"></Icon>
      </div>
      <div class="control-next">
        <Icon class="pointer" type="next" title="下一曲 Ctrl + Right" @click="next" />
      </div>
    </div>
    <div class="panel-center" :class="{disable:!currentMusic._id}">
      <div class="cover-img">
        <router-link :to="{path:'songDetail',query:{id:currentMusic._id}}">
          <img :src="songImg" alt />
        </router-link>
      </div>
      <div class="song-msg text-left">
        <template v-if="currentMusic&&currentMusic._id">
          <span>{{currentMusic.name}}</span>
          <span>{{currentMusic.artist.name}}</span>
          <span class="progress-load" v-show="currentProgress==0||percentMusic==0">[ loading ]</span>
        </template>
        <template v-else>
          <span>SongTaste</span>
        </template>
        <div class="song-progress">
          <p v-show="currentMusic._id" class="song-current">{{currentTime|format}}</p>
          <v-progress
            :percent="percentMusic"
            :percent-progress="currentProgress"
            @percentChange="progressMusic"
          ></v-progress>

          <p
            v-show="currentMusic._id&&(!isNaN(currentMusic.duration))"
            class="song-last"
          >{{ currentMusic.duration % 3600 | format }}</p>
        </div>
      </div>
    </div>
    <div class="panel-right">
      <div class="right-mode" :class="{disable:!currentMusic._id}">
        <Icon
          :type="getModeIconType()"
          :title="getModeIconTitle()"
          class="pointer"
          @click="modeChange()"
        />
      </div>
      <div class="right-collect" :class="{disable:!currentMusic._id}">
        <Icon :type="getLikeIconType" class="pointer" @click="collectSong()" title="收藏歌曲" />
      </div>
      <div class="right-del" :class="{disable:!currentMusic._id}">
        <Icon type="delete" class="pointer" @click="delSong()" title="从播放列表移除" />
      </div>

      <!-- 音量控制 -->
      <div
        class="right-volume"
        title="音量加减 [Ctrl + Up / Down]"
        :class="{disable:!currentMusic._id}"
      >
        <v-volume :volume="volume" @volumeChange="volumeChange"></v-volume>
      </div>
      <!-- 播放列表按钮 -->
      <div class="right-list">
        <Icon type="list" class="pointer" @click="foldList=!foldList" title="播放列表" />
      </div>
    </div>
    <div class="playing-list" :class="{'dis-fold':foldList}">
      <v-playlist @select="selectItem"></v-playlist>
    </div>
  </div>
</template>
<script>
import { like, offLike, findSongs } from "api/colSong";
import * as ColSinger from "api/colSinger";
import { popularity } from "api/music";
import mmPlayer from "./pages/player/mmPlayer";
import playList from "./pages/player/PlayList";
import progress from "@/baseComponets/Progress";
import volume from "@/baseComponets/Volume";

import { getVolume, setVolume } from "@/util/storage";
import { playMode, defaultBG } from "@/config";
import {
  randomSortArray,
  parseLyric,
  format,
  silencePromise
} from "@/util/util";
// import { mapGetters } from "vuex";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Music",
  components: {
    "v-playlist": playList,
    "v-progress": progress,
    "v-volume": volume
  },
  filters: {
    // 歌曲时长格式化
    format
  },
  data() {
    const volume = getVolume();
    return {
      musicReady: false, // 是否可以使用播放器
      currentTime: 0, // 当前播放时间
      currentProgress: 0, // 当前缓冲进度
      lyric: [], // 歌词
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
      isMute: false, // 是否静音
      foldList: false,
      volume // 音量大小
    };
  },
  computed: {
    //歌曲图片
    songImg() {
      return this.currentMusic._id && this.currentMusic.album.coverImg
        ? this.currentMusic.album.coverImg
        : defaultBG;
    },
    //设置收藏图标
    getLikeIconType() {
      if (!this.user.email) {
        return "like";
      }
      let index;
      if (typeof this.collectList != "undefined") {
        index = this.FindIndex(this.collectList, this.currentMusic);
      }
      if (typeof this.collectList == "undefined" || index < 0) {
        return "like";
      } else {
        return "offLike";
      }
    },
    percentMusic() {
      const duration = this.currentMusic.duration;
      return this.currentTime && duration ? this.currentTime / duration : 0;
    },
    ...mapGetters([
      "audioEle",
      "mode",
      "playing",
      "playlist",
      "orderList",
      "currentIndex",
      "currentMusic",
      "historyList",
      "user",
      "collectList",
      "collectSingers",
    ])
  },
  watch: {
    currentMusic(newMusic, oldMusic) {
      //修改了播放列表但自动播放时前后列表的第一首歌的id相同时
      if (newMusic && newMusic._id === oldMusic._id) {
        this.currentMusic.duration = oldMusic.duration;
      }
      if (!newMusic) {
        return;
      }
      //不是新的列表但前后两首歌相同
      if (newMusic._id === oldMusic._id) {
        return;
      }
      // this.setHistory(newMusic);

      this.audioEle.src = newMusic.src;
      //切换歌曲后重新加载audio元素，确定duration
      this.audioEle.load();

      //重置当前时间和当前进度
      this.currentTime = this.currentProgress = 0;
      // console.log(123);
      silencePromise(this.audioEle.play());
      this.sendPopular(newMusic._id);
    },
    //播放状态
    playing(newPlaying) {
      const audio = this.audioEle;
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause();
        this.musicReady = true;
      });
    },
    //当前播放进度
    currentTime(newTime) {
      if (this.nolyric) {
        return;
      }
      let lyricIndex = 0;
      for (let i = 0; i < this.lyric.length; i++) {
        if (newTime > this.lyric[i].time) {
          lyricIndex = i;
        }
      }
      this.lyricIndex = lyricIndex;
    }
  },
  mounted() {
    this.$nextTick(() => {
      mmPlayer.initAudio(this);
      this.initKeyDown();
      this.volumeChange(this.volume);
      this.getCollectSinger();
    });
  },
  methods: {
     //获取所有收藏的歌手
    getCollectSinger() {
      ColSinger.findSingers({ userId: this.user.id }).then(res => {
        if (res.code == 200) {
          this.setCollectSingerList({ list: res.data });
        }
      });
    },
    FindIndex(list, ele) {
      return list.findIndex(item => {
        return item._id == ele._id;
      });
    },
    //收藏和取消收藏歌曲
    collectSong() {
      if (!this.user.email) {
        this.$message("当前未登录~");
        return;
      }
      let index;
      if (typeof this.collectList != "undefined") {
        index = this.FindIndex(this.collectList, this.currentMusic);
      }
      if (typeof this.collectList == "undefined" || index < 0) {
        this.setCollect({ music: this.currentMusic });
        this.$message({
          type: "success",
          message: "收藏成功"
        });
      } else {
        this.setNonCollect({ music: this.currentMusic });
        this.$message({
          type: "success",
          message: "已取消收藏"
        });
      }
    },

    //删除事件
    delSong() {
      let list = [...this.playlist];
      let index = list.findIndex(item => {
        return (item._id = this.currentMusic._id);
      });
      list.splice(index, 1);
      this.removePlayListItem({ list, index });
    },

    //每首歌播放一次添加一个播放量
    sendPopular(id) {
      popularity({ id: id }).then(res => {
        if (res.code == 200) {
        }
      });
    },

    //播放列表的某一首歌
    selectItem(song, index) {
      if (this.currentMusic._id && song._id == this.currentMusic._id) {
        this.setPlaying(!this.playing);
      }
    },

    // 按键事件
    initKeyDown() {
      document.onkeydown = e => {
        switch (e.ctrlKey && e.keyCode) {
          case 32: // 播放暂停Ctrl + Space
            this.play();
            break;
          case 37: // 上一曲Ctrl + Left
            this.prev();
            break;
          case 38: // 音量加Ctrl + Up
            let plus = Number((this.volume += 0.1).toFixed(1));
            if (plus > 1) {
              plus = 1;
            }
            this.volumeChange(plus);
            break;
          case 39: // 下一曲Ctrl + Right
            this.next();
            break;
          case 40: // 音量减Ctrl + Down
            let reduce = Number((this.volume -= 0.1).toFixed(1));
            if (reduce < 0) {
              reduce = 0;
            }
            this.volumeChange(reduce);
            break;
          case 79: // 切换播放模式Ctrl + O
            this.modeChange();
            break;
        }
      };
    },
    // 上一曲
    prev() {
      if (!this.musicReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index < 0) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing && this.musicReady) {
          this.setPlaying(true);
        }
        this.musicReady = false;
      }
    },
    // 播放暂停
    play() {
      if (!this.musicReady) {
        return;
      }
      this.setPlaying(!this.playing);
    },
    // 下一曲
    next() {
      if (!this.musicReady) {
        return;
      }
      if (
        this.playlist.length - 1 === this.currentIndex &&
        this.mode === playMode.order
      ) {
        this.setCurrentIndex(-1);
        this.setPlaying(false);
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        if (!this.playing && this.musicReady) {
          this.setPlaying(true);
        }
        this.setCurrentIndex(index);
        this.musicReady = false;
      }
    },
    // 循环
    loop() {
      this.audioEle.currentTime = 0;
      silencePromise(this.audioEle.play());
      this.setPlaying(true);
    },
    // 修改音乐进度
    progressMusic(percent) {
      this.audioEle.currentTime = this.currentMusic.duration * percent;
    },
    // 切换播放模式
    modeChange() {
      const mode = (this.mode + 1) % 4;
      this.setPlayMode(mode);
      if (mode === playMode.loop) {
        return;
      }
      let list = [];
      switch (mode) {
        case playMode.listLoop:
        case playMode.order:
          list = this.orderList;
          break;
        case playMode.random:
          list = randomSortArray(this.orderList);
          break;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    // 修改当前歌曲索引
    resetCurrentIndex(list) {
      const index = list.findIndex(item => {
        return item._id === this.currentMusic._id;
      });
      this.setCurrentIndex(index);
    },

    // 修改音量大小
    volumeChange(percent) {
      percent === 0 ? (this.isMute = true) : (this.isMute = false);
      this.volume = percent;
      this.audioEle.volume = percent;
      setVolume(percent);
    },
    // 获取播放模式 icon
    getModeIconType() {
      return {
        [playMode.listLoop]: "loop",
        [playMode.order]: "sequence",
        [playMode.random]: "random",
        [playMode.loop]: "loop-one"
      }[this.mode];
    },
    // 获取播放模式 title
    getModeIconTitle() {
      const key = "Ctrl + O";
      return {
        [playMode.listLoop]: `列表循环 ${key}`,
        [playMode.order]: `顺序播放 ${key}`,
        [playMode.random]: `随机播放 ${key}`,
        [playMode.loop]: `单曲循环 ${key}`
      }[this.mode];
    },

    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setPlayList: "SET_PLAYLIST",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions([
      "setHistory",
      "setPlayMode",
      "getSongDetail",
      "setCollectList",
      "removePlayListItem",
      "setCollect",
      "setNonCollect",
      "setCollectSingerList"
    ])
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.z-player {
  background: white;
  border-top: 2px $color-main solid;
  display: flex;
  position: relative;
  transition: all 0.3s ease-in-out;
  .disable {
    pointer-events: none;
    // opacity: 1;
    //  background: #eff3f4;
  }
  .pointer {
    cursor: pointer;
  }
  .panel-left {
    display: flex;
    // line-height: 80px;
    // justify-content: center;
    padding: 20px 0;
    width: 220px;
    i {
      font-size: 28px;
      // line-height: 80px;
      color: $color-text-actived;
    }
    .control-prev {
      margin: 5px 10px 0 50px;
    }
    .control-next {
      margin: 5px 0 0 10px;
    }
    .control-play {
      // margin: 0 auto;
      i {
        font-size: 42px;
      }
    }
  }
  .panel-center {
    width: 60%;
    display: flex;
    .cover-img {
      width: 80px;
      display: flex;
      justify-content: center;
      //  align-items: center;
      a {
        margin-top: 13px;
        display: block;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        width: 48px;
        height: 48px;
        padding: 2px;
        img {
          width: 48px;
          height: 48px;
        }
      }
    }
    .song-msg {
      width: 100%;
      padding: 15px 0 0 0;
      span {
        font-size: 15px;
      }
      .progress-load {
        width: 20px;
        height: 20px;
        font-size: 12px;
        color: #6ed56bd4;
      }
      .song-progress {
        display: flex;
        height: 100%;
        padding-top: 8px;
        .progress {
          width: 92%;
        }
        p {
          width: 4%;
          min-width: 35px;
        }
      }
    }
  }
  .panel-right {
    display: flex;
    i {
      font-size: 26px;
      color: $color-text-actived;
      line-height: 80px;
    }
    .right-mode {
      //   width: 60px;
      padding: 0 5px 0 20px;
    }
    .right-volume {
      padding: 0 20px 0 10px;
      i {
        width: 38px;
        font-size: 23px;
      }
    }
    .right-collect {
      //   width: 60px;
    }
    .right-del {
      //   width: 60px;
      padding: 0 20px 0 5px;
    }
    .right-list {
      i {
        font-size: 32px;
      }
      width: 60px;
    }
  }
  .playing-list {
    position: absolute;
    right: 0;
    bottom: 80px;
    background: white;
    height: 0px;
    width: 440px;
    box-shadow: -2px -2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .dis-fold {
    height: 540px;
    overflow: visible;
  }
}
</style>