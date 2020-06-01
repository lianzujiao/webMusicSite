<template>
  <div class="recom-min-width">
    <div class="recom">
      <div class="recom-left">
        <!-- 顶部歌单 -->
        <v-expheader></v-expheader>
           <!-- 即时热门 -->
        <v-hotlist></v-hotlist>
        <!-- 歌单推荐 -->
        <v-expsheets></v-expsheets>
        <!-- 音乐人 -->
        <v-bandList></v-bandList>
     
      </div>
      <div class="recom-right">
        <v-explist></v-explist>
      </div>

      <!-- 经典乐队 -->
      <!-- <v-classic></v-classic> -->

      <!-- 乐队新闻 -->
      <!-- <v-bandNews></v-bandNews> -->
    </div>
  </div>
</template>
<script>
import Classic from "components/pages/Remon/Classic";
import BandList from "components/pages/Remon/BandList";
import BandNews from "components/pages/Remon/BandNews";
import ExpList from "components/pages/Remon/ExpectList";
import ExpHeader from "components/pages/Remon/ExpectHeader";
import HotList from "components/pages/Remon/HotList";
import ExpSheets from "components/pages/Remon/ExpSheets";

export default {
  components: {
    "v-classic": Classic,
    "v-bandList": BandList,
    "v-bandNews": BandNews,
    "v-explist": ExpList,
    "v-expheader": ExpHeader,
    "v-hotlist": HotList,
    "v-expsheets": ExpSheets,
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.recom-min-width {
  width: 1100px;
  // background: white;
  margin: 0 auto;
  padding: 20px 0;
}
.recom {
  // background: white;
  // margin-top: 20px;
  // padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .recom-left {
    width: 835px;
    background: white;
  }
  .recom-right {
    width: 245px;
  }
}
</style>