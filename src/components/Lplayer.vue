<template>
  <div class="z-player">
    <div class="panel-left">
      <!-- <i class="iconprev"></i> -->
      <div class="control-prev">
        <Icon class="pointer" type="prev" title="上一曲 Ctrl + left" @click="prev"></Icon>
      </div>

      <div class="pointer control-play" title="播放暂停 Ctrl + Space" @click="play">
        <Icon type="play"></Icon>
      </div>
      <div class="control-next">
        <Icon class="pointer" type="next" title="下一曲 Ctrl + Right" @click="next" />
      </div>
    </div>
    <div class="panel-center">
      <div class="cover-img">
        <router-link to="##">
          <img src="../assets/img/logo.png" alt />
        </router-link>
      </div>
      <div class="song-msg text-left">
        <span>歌曲名</span>
        <span>歌手名</span>
        <div class="song-progress">
          <p class="song-current">0.00</p>
          <v-progress @percentChange="progressMusic"></v-progress>

          <p class="song-last">03.15</p>
        </div>
      </div>
    </div>
    <div class="panel-right">
      <div class="right-mode">
        <Icon type="loop" class="pointer" @click="changeMode()" />
      </div>
      <div class="right-collect">
        <Icon type="like" class="pointer" @click="collectSong()" title="收藏歌曲" />
      </div>
      <div class="right-del">
        <Icon type="delete" class="pointer" @click="delSong()" title="从播放列表移除" />
      </div>

      <!-- 音量控制 -->
      <div class="right-volume" title="音量加减 [Ctrl + Up / Down]">
        <v-volume :volume="volume" @volumeChange="volumeChange"></v-volume>
      </div>
      <div class="right-list" >
        <Icon type="list" class="pointer" @click="setList()" title="播放列表" />
      </div>
    </div>
    <div class="playing-list" :class="{'dis-fold':foldList}">
        <v-playlist></v-playlist>
    </div>
  </div>
</template>
<script>
import { randomSortArray, parseLyric, format, silencePromise } from '@/util/util'
import { getVolume, setVolume } from '@/util/storage'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from '@/config'
import {mmplayer} from "./pages/player/mmPlayer"

import Progress from "../baseComponets/Progress";
import Volume from "../baseComponets/Volume";
import Playlist from "./pages/player/PlayList"
export default {
  components: {
    "v-progress": Progress,
    "v-volume": Volume,
    "v-playlist":Playlist,
  },
   filters: {
    // 时间格式化
    format
  },
  data() {
       const volume = getVolume()
    return {
     
       musicReady: false, // 是否可以使用播放器
      currentTime: 0, // 当前播放时间
      currentProgress: 0, // 当前缓冲进度
      lyric: [], // 歌词
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
      isMute: false, // 是否静音
      foldList:false,//歌曲列表折叠
      volume //音量大小
    };
  },
  computed:{
      picUrl() { //判断封面图片
      return this.currentMusic.id && this.currentMusic.image
        ? `url(${this.currentMusic.image}?param=300y300)`
        : `url(${defaultBG})`
    },

    percentMusic() {//当前播放进度
      const duration = this.currentMusic.duration
      return this.currentTime && duration ? this.currentTime / duration : 0
    },
    ...mapGetters([
      'audioEle',
      'mode',
      'playing',
      'playlist',
      'orderList',
      'currentIndex',
      'currentMusic',
      'historyList'
    ])
  },
  watch: {
    currentMusic(newMusic, oldMusic) {
      if (!newMusic.id) {
        this.lyric = []
        return
      }
      if (newMusic.id === oldMusic.id) {
        return
      }
      this.audioEle.src = newMusic.url
      // 重置相关参数
      this.lyricIndex = this.currentTime = this.currentProgress = 0
      silencePromise(this.audioEle.play())
      this.$nextTick(() => {
        this._getLyric(newMusic.id)
      })
    },
    playing(newPlaying) {
      const audio = this.audioEle
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause()
        this.musicReady = true
      })
    },
    currentTime(newTime) {
      if (this.nolyric) {
        return
      }
      let lyricIndex = 0
      for (let i = 0; i < this.lyric.length; i++) {
        if (newTime > this.lyric[i].time) {
          lyricIndex = i
        }
      }
      this.lyricIndex = lyricIndex
    }
  },
  methods: {
       // 按键事件
    initKeyDown() {
      document.onkeydown = e => {
        switch (e.ctrlKey && e.keyCode) {
          case 32: // 播放暂停Ctrl + Space
            this.play()
            break
          case 37: // 上一曲Ctrl + Left
            this.prev()
            break
          case 38: // 音量加Ctrl + Up
            let plus = Number((this.volume += 0.1).toFixed(1))
            if (plus > 1) {
              plus = 1
            }
            this.volumeChange(plus)
            break
          case 39: // 下一曲Ctrl + Right
            this.next()
            break
          case 40: // 音量减Ctrl + Down
            let reduce = Number((this.volume -= 0.1).toFixed(1))
            if (reduce < 0) {
              reduce = 0
            }
            this.volumeChange(reduce)
            break
          case 79: // 切换播放模式Ctrl + O
            this.modeChange()
            break
        }
      }
    },

    //上一曲
    prev() {
        if (!this.musicReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index < 0) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing && this.musicReady) {
          this.setPlaying(true)
        }
        this.musicReady = false
      }
    },

    //播放暂停
    play() {
         if (!this.musicReady) {
        return
      }
      this.setPlaying(!this.playing)
    },

    //下一曲
    next() {
          if (!this.musicReady) {
        return
      }
      if (
        this.playlist.length - 1 === this.currentIndex &&
        this.mode === playMode.order
      ) {
        this.setCurrentIndex(-1)
        this.setPlaying(false)
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        if (!this.playing && this.musicReady) {
          this.setPlaying(true)
        }
        this.setCurrentIndex(index)
        this.musicReady = false
      }
    },

    // 循环
    loop() {
      this.audioEle.currentTime = 0
      silencePromise(this.audioEle.play())
      this.setPlaying(true)
      if (this.lyric.length > 0) {
        this.lyricIndex = 0
      }
    },
    progressMusic() {
        this.audioEle.currentTime = this.currentMusic.duration * percent
    },
    changeMode() {},
    collectSong() {},

    //音量控制
    volumeChange(percent) {
         percent === 0 ? (this.isMute = true) : (this.isMute = false)
      this.volume = percent
      this.audioEle.volume = percent
      setVolume(percent)
    },

    // 获取播放模式 icon
    getModeIconType() {
      return {
        [playMode.listLoop]: 'loop',
        [playMode.order]: 'sequence',
        [playMode.random]: 'random',
        [playMode.loop]: 'loop-one'
      }[this.mode]
    },

       // 获取播放模式 title
    getModeIconTitle() {
      const key = 'Ctrl + O'
      return {
        [playMode.listLoop]: `列表循环 ${key}`,
        [playMode.order]: `顺序播放 ${key}`,
        [playMode.random]: `随机播放 ${key}`,
        [playMode.loop]: `单曲循环 ${key}`
      }[this.mode]
    },

    //设置播放列表
    setList() {
        this.foldList=!this.foldList
        // console.log(this.foldList)
    }
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
  .pointer {
    cursor: pointer;
  }
  .panel-left {
    display: flex;
    line-height: 80px;
    // justify-content: center;
    width: 220px;
    i {
      font-size: 28px;
      line-height: 80px;
      color: $color-text-actived;
    }
    .control-prev {
      margin: 0 10px 0 50px;
    }
    .control-next {
      margin: 0 0 0 10px;
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
    padding:0 5px 0 20px;
    }
    .right-volume {
        padding:0 20px 0 10px;
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
    padding:0 20px 0 5px;
    }
    .right-list {
        i{
            font-size: 32px;
        }
      width: 60px;
    }
  }
  .playing-list{
      position: absolute;
      right: 0;
      bottom: 90px;
       background: white;
        height: 0px;
        width: 440px;
        box-shadow: 0 0 2px #9b9a9a;
        transition: all .3s ease-in-out;
        overflow: hidden;
  }
  .dis-fold{
      height: 540px;
      overflow: visible;

  }

}
</style>