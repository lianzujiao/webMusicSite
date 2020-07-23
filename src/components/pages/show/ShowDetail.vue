<template>
  <div class="min-width">
    <div class="show-dea">
      <div class="show-box">
        <div class="show-box-img">
          <img :src="show.coverImg" alt />
        </div>
        <div class="show-box-msg text-left">
          <p class="show-tit">{{show.title}}</p>
          <p class="show-time">时间：{{show.startTime|formatDate}}~{{show.endTime|formatDate}}</p>
          <p class="show-address">地址：{{show.address}}</p>
        </div>
      </div>
      <h2 class="text-left">演出介绍</h2>
      <div class="show-content" v-html="show.content"></div>
    </div>
  </div>
</template>
<script>
import * as Show from "api/shows";
export default {
  data() {
    return {
      show: {
        _id: ""
      }
    };
  },
  methods: {
    getDetail() {
      Show.getOne({ id: this.show._id }).then(res => {
        if (res.code == 200) {
          this.show = res.data;
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function(newVal, old) {
        this.show._id = newVal.query.id;
        this.getDetail();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss">
@import "scss/index.scss";
.show-dea {
  background: white;
  padding: 20px;
  .show-content {
    padding: 0 75px;
    div {
      text-align: left;
    }
    p {
      text-align: left;
      font-size: 16px;
      line-height: 30x;
      letter-spacing: 3px;

      // strong {
      //   text-align: center;
      //   display: block;
      // }
    }
    h3 {
      font-size: 18px;
      line-height: 28px;
    }
  }
  .show-box {
    display: flex;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid $color-main;
    &:nth-last-child(1) {
      border: 0px;
    }
    .show-box-img {
      img {
        height: 250px;
      }
    }
    .show-box-msg {
      padding: 0 0 0 25px;
      .show-tit {
        font-size: 20px;
        font-weight: bold;
      }
      .show-time {
        font-size: 16px;
        margin: 15px 0;
      }
      .show-address {
        font-size: 16px;
        margin-bottom: 15px;
      }
    }
  }
  h2{
    font-size: 18px;
    line-height: 45px;
  }
}
</style>