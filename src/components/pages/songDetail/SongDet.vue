<template>
  <div class="min-width">
    <div class="song-det">
      <nav>
        <router-link to="##">
          <i class="iconfont icon-back"></i>
          <span>返回</span>
        </router-link>
      </nav>
      <section id="content">
        <div class="det-song-tit">
          <h2>歌曲名</h2>
          <div class="det-song-right">
            <p class="det-singer">
              <span class="det-span">歌手:</span>
              <router-link to="##">歌手名</router-link>
            </p>
            <p class="det-album">
              <span class="det-span">专辑:</span>
              <router-link to="##">专辑名</router-link>
            </p>
          </div>
        </div>
        <div class="det-song-main">
          <div class="det-song-imgbox">
            <img src="../../../assets/img/banner2.jpg" alt width="400" height="400" />
          </div>
          <div class="det-song-lyric"></div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import * as music from "api/music";
export default {
  data() {
    return {};
  },
  methods: {
    getSong() {
      music.lyric({ id: 1301416320 }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    this.getSong();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.song-det {
  //   margin: 20px;
  background: white;
  nav {
    background: $color-del-nav-back;
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.06);
    height: 80px;
    line-height: 80px;
    padding: 0 40px;
    display: flex;
    justify-content: flex-start;
    a {
      span,
      i {
        font-size: 25px;
        color: $color-span;
      }
    }
  }
  .det-song-tit {
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    h2 {
      font-size: 22px;
      font-weight: bold;
    }
    .det-song-right {
      display: flex;
      .det-singer {
        margin-right: 10px;
        a {
          color: $color-text-actived;
        }
      }
      .det-album {
        a {
          color: $color-text-actived;
        }
      }
    }
  }
  .det-song-main {
    display: flex;
    padding: 0 50px;
    //   height: 380px;
    background: #ababab;
    .det-song-imgbox {
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
      background: rgba(255, 255, 255, 0.85);
      border-radius: 4px;
      padding: 5px;
      padding: 15px;
      margin: 50px 0;
      img {
        width: 360px;
        height: 360px;
      }
    }
  }
}
</style>