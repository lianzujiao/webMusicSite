<template>
  <div class="min-width">
    <div class="band-tags">
      <div class="band-tags-top">
        <p class="band-tags-tit">乐队风格：</p>
        <p class="band-tags-tag" v-for="(tag,index) in tags" :key="index">{{tag}}</p>
      </div>
      <div class="band-tags-main">
        <div class="band-tags-box" v-for="(band,index) in bands" :key="index">
          <router-link to="##">
            <div class="band-tags-imgs">
              <img :src="band.img" alt />
            </div>
            <p>{{band.name}}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: [
        "全部",
        "舞曲",
        "R&B",
        "摇滚",
        "朋克",
        "rap",
        "爵士",
        "soul",
        "后摇"
      ],
      bands: [
        {
          name: "BongBong邦邦乐团",
          img: require("assets/img/bandlist/bongbong.jpg")
        },
        { name: "Click#15", img: require("assets/img/bandlist/click5.jpg") },
        { name: "Mr.Miss", img: require("assets/img/bandlist/mrmiss.jpg") },
        { name: "Mr.WooHoo", img: require("assets/img/bandlist/woohoo.jpg") },
        { name: "Mr.Miss", img: require("assets/img/bandlist/mrmiss.jpg") },
        { name: "vogue 5", img: require("assets/img/bandlist/vogue5.jpg") },
        { name: "薄荷绿", img: require("assets/img/bandlist/pohelv.jpg") },
        {
          name: "BongBong邦邦乐团",
          img: require("assets/img/bandlist/bongbong.jpg")
        },
        { name: "Click#15", img: require("assets/img/bandlist/click5.jpg") },
        { name: "Mr.Miss", img: require("assets/img/bandlist/mrmiss.jpg") },
        { name: "vogue 5", img: require("assets/img/bandlist/vogue5.jpg") },
        { name: "薄荷绿", img: require("assets/img/bandlist/pohelv.jpg") }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";

.band-tags {
  background: white;
  padding: 20px;
  .band-tags-top {
    display: flex;
    padding: 0 20px;
    .band-tags-tit {
      // color:$color-text-actived;
      padding: 0 15px 0 10px;
    }
    .band-tags-tag {
      padding: 0 15px;
      border-right: 1px solid $color-main;
      cursor: pointer;
      &:hover {
        color: $color-text-actived;
      }
      &:nth-last-child(1) {
        border-right: none;
      }
    }
  }
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
            width: 204px;
            height: 204px;
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
</style>