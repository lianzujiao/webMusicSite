<template>
  <div class="top-singer">
    <div class="title">
      <h2>热门歌手</h2>
      <p>
        <router-link to="/found/singers">查看更多</router-link>
      </p>
    </div>
    <div class="singer-content">
      <router-link to="##" class="singer-box" v-for="(art,index) in artists " :key="index">
        <div class="img-box">
          <el-image :src="art.picUrl" lazy></el-image>
        </div>
        <p>{{art.name}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
import * as topList from "api/topList";
export default {
  data() {
    return {
      artists: []
    };
  },
  methods: {
    getArts() {
      topList.topSinger({ offet: 0, limit: 4 }).then(res => {
        if (res.code == 200) {
          this.artists = res.artists;
        }
      });
    }
  },
  mounted() {
    this.getArts();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.top-singer {
  padding: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    h2 {
      font-size: 20px;
      font-weight: bold;
    }
    p {
      a {
        color: $color-text-actived;
      }
    }
  }
  .singer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .singer-box {
      display: block;
    //   margin: 0 20px;
      .img-box {
          width: 150px;
          height: 150px;
          overflow: hidden;
          border-radius: 50%;
        img {
            width: 200px;
            padding:0 0 0 -25px;
            transition: all .3s;
            &:hover{
                transform: scale(1.2);
            }
// object-fit: scale-down;
}
      }
      p {
        color: $color-span;
        line-height: 25px;
        padding: 5px 0;
        transition: all .2s ease-in;
      }
      &:hover{
          p{
              color:$color-text-normal
          }
      }
    }
  }
}
</style>