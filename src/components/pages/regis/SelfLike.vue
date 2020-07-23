<template>
  <div class="self-collect">
    <div class="songs-box common-box">
      <div class="song-tit text-left">
        <h2>收藏歌曲</h2>
      </div>
      <div class="song-list">
        <div class="end-song-box" v-for="(item,index) in collectList" :key="index">
          <div class="end-song-img">
            <img :src="item.album.coverImg" />
          </div>
          <div class="end-song-name">
            <div class="end-song-name-item">
              <router-link :to="{path:'songDetail',query:{id:item._id}}">{{item.name}}</router-link>
            </div>
            <div class="end-song-name-item">
              <router-link :to="{path:'singer',query:{id:item.artist._id}}">{{item.artist.name}}</router-link>
            </div>
          </div>

          <div class="end-song-like">
            <Icon type="offLike" title="取消收藏" @click="offLike(item)" />
          </div>
          <div class="end-song-play">
            <Icon type="bofang" @click="playSong(item)" />
          </div>
        </div>
        <div class="non-list" v-if="[...collectList].length<=0">
          <img src="../../../assets/img/noSongsDefault.png" />
          <p>没有收藏任何歌曲</p>
        </div>
      </div>
    </div>
    <div class="singer-box common-box">
      <div class="song-tit text-left">
        <h2>收藏乐队</h2>
      </div>
      <div class="singer-list">
          <div class="band-tags-main">
        <div class="band-tags-box" v-for="(band,index) in collectSingers" :key="index">
          <router-link :to="{path:'singer',query:{id:band._id}}">
            <div class="band-tags-imgs">
              <img :src="band.coverImg" alt />
            </div>
            <p>{{band.name}}</p>
          </router-link>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as ColSong from "api/colSong";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapGetters(["user", "collectList","collectSingers"])
  },
  methods: {
    playSong(music){
      this.selectAddPlay(music)
    },
    getLikeSongs() {
      ColSong.findSongs({ userId: this.user.id }).then(res => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
    offLike(music) {
      this.setNonCollect({ music });
    },
    ...mapActions(["setNonCollect","selectAddPlay"])
  },
  mounted() {
    this.getLikeSongs();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.self-collect {
  min-height: 500px;
  padding: 25px;
  .common-box {
    .song-tit {
      h2 {
        font-size: 18px;
      }
    }
  }
  .song-list {
    min-height: 250px;
    margin: 10px 0 30px;
    .end-song-box {
      display: flex;
      padding: 8px 0 8px 0;
      border-bottom: 1px solid #ebebeb;
      .end-song-index {
        width: 60px;
        font-size: 16px;
        line-height: 65px;
      }
      .end-song-img {
        width: 80px;
        img {
          width: 65px;
          border-radius: 8px;
        }
      }
      .no-index-img {
        margin-left: 60px;
      }
      .end-song-name {
        padding: 8px 0 8px 25px;
        width: 300px;
        text-align: left;
        .end-song-name-item {
          a {
            font-size: 16px;
            line-height: 25px;
          }

          a:hover {
            color: $color-text-actived;
          }
        }
        .end-song-name-item:nth-child(2) {
          a {
            font-size: 14px;
          }
        }
      }

      .end-song-popular {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 25px;
        i {
          font-size: 23px;
          color: #d4d4d4;
        }
        span {
          font-size: 16px;
        }
      }
      .end-song-like {
        padding: 14px 25px;
        // line-height: 68px;
        i {
          font-size: 28px;
          color: $color-text-actived;
        }
      }
      .end-song-play {
        padding: 16px 25px;
        display: none;
        i {
          font-size: 24px;
          // line-height: 68px;
          color: #b3b3b3;
        }
        i:hover {
          color: $color-text-actived;
        }
      }
      &:hover {
        background: #ebebeb47;
        .end-song-play {
          display: block;
        }
      }
    }
  }
  .singer-list{
    .band-tags-main {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0 30px 0;
    .band-tags-box {
      margin: 15px 30px;

      a {
        .band-tags-imgs {
          padding: 8px 8px 6px 8px;
          box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.3);
          img {
            width: 165px;
            height: 165px;
          }
        }

        p {
          padding: 10px 0 0 0;
          &:hover {
            color: $color-text-actived;
          }
        }
      }
    }
  }
  }
}
</style>