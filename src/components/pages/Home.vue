<template>
  <div class="home">
    <v-header></v-header>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <v-footer></v-footer>
    <div class="player">
    <v-player></v-player>
    </div>
  </div>
</template>
<script>
import header from "components/Header";
import Player from "components/Lplayer";
import footer from "components/pages/home/Footer";
export default {
  components: {
    "v-header": header,
    "v-player": Player,
    "v-footer": footer
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.home {
  .player {
    position: fixed;
    height: 80px;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }
}
.content {
  background: $color-main;
}
</style>