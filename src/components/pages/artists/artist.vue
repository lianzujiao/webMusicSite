<template>
  <div class="art min-width">
    <div class="art-top">
      <div class="art-img-box">
        <img :src="artist.picUrl" alt />
      </div>
      <div class="art-rig">
        <h1>{{artist.name}}</h1>
        <p class="art-rig-cat">身份</p>
        <p class="art-rig-address">
          <span>所在地区:</span>
          <span>地区名</span>
        </p>
      </div>
    </div>
    <div class="art-list"></div>
  </div>
</template>
<script>
import * as artist from "api/artist";

export default {
  data() {
    return {
      artist: {}
    };
  },
  methods: {
    getArtist() {
      artist.art({ id: 6452 }).then(res => {
          console.log(res.artist)
        if (res.code == 200) {
          this.artist = res.artist;
        }
      });
    }
  },
  mounted() {
    this.getArtist();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.art {
  background: white;
  .art-top {
    display: flex;
  }
}
</style>