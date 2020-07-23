<template>
  <div class="album-list">
    <div class="album-box" v-for="(item,index) in albums" :key="index">
      <div class="album-box-img">
        <router-link :to="{path:'albumdetail',query:{id:item._id}}">
          <img :src="item.coverImg" alt />
        </router-link>
      </div>
      <div class="album-box-name">
        <router-link :to="{path:'albumdetail',query:{id:item._id}}">{{item.name}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    albums: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.album-list {
  box-sizing: border-box;
  width: 100%;
  padding: 40px 25px 20px;
  display: flex;
  flex-wrap: wrap;
  .album-box {
    margin-right: 25px;
    margin-bottom: 40px;
    border: 1px solid $color-main;
    border-radius: 5px;
    width: 218px;
    padding: 8px;
    box-sizing: border-box;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .album-box-img {
      border: 1px solid $color-main;
      border-radius: 5px;
      width: 200px;
      height: 200px;
      img {
        width: 200px;
        height: 200px;
      }
    }
    .album-box-name {
      margin: 10px 0;
      height: 45px;
      a {
        text-align: left;
        font-size: 16px;
      }
      a:hover {
        color: $color-text-actived;
      }
    }
  }
}
</style>