<template>
  <div class="min-width">
    <div class="band-detail">
      <div class="band-del-top">
        <div class="top-caul">
          <el-carousel height="300px">
            <el-carousel-item v-for="(img,index) in bandImgs" :key="index">
              <el-image :src="img.src" style="height:300px; width:500px"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="top-ban-msg text-left">
          <p class="band-msg-tit">新裤子 pants</p>
          <p class="band-msg-tag">
            <span>摇滚乐</span>
          </p>
          <p class="band-msg-intro">新裤子（New Pants），中国内地摇滚乐队，由主唱兼吉他手彭磊、主唱兼键盘手庞宽、贝斯手赵梦、鼓手Hayato组成</p>
        </div>
      </div>
      <div class="band-del-bot">
        <el-tabs type="border-card">
          <el-tab-pane label="乐队介绍">乐队介绍</el-tab-pane>

          <el-tab-pane label="专辑列表">
            <div class="band-albums">
              <div class="band-al-tabs">
                <p>专辑名称</p>
                <p>发行时间</p>
              </div>
              <div class="bnd-al-li" v-for="(album,index) in albums" :key="index">
                <img :src="album.img" width="100" height="100" alt />
                <p>{{album.name}}</p>
                <p>{{album.time}}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="热门单曲">热门单曲列表</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bandImgs: [
        { src: require("assets/img/bandDel/xinkuzi-1.jpg") },
        { src: require("assets/img/bandDel/xinkuzi-2.jpg") }
      ],
      albums: [
        {
          name: "生命因你而火热",
          time: "2016-04-17",
          img: require("assets/img/bandDel/xinkuzi-1.jpg")
        },
        {
          name: "Sex Drugs Internet",
          time: "2016-04-17",
          img: require("assets/img/bandDel/xinkuzi-1.jpg")
        },
        {
          name: "Go East",
          time: "2016-04-17",
          img: require("assets/img/bandDel/xinkuzi-1.jpg")
        },
        {
          name: "野人也有爱",
          time: "2016-04-17",
          img: require("assets/img/bandDel/xinkuzi-1.jpg")
        },
        {
          name: "龙虎人丹",
          time: "2016-04-17",
          img: require("assets/img/bandDel/xinkuzi-1.jpg")
        },
        {
          name: "我们是自动的",
          time: "2016-04-17",
          img: require("assets/img/bandDel/xinkuzi-1.jpg")
        },
        {
          name: "Disco Girl",
          time: "2016-04-17",
          img: require("assets/img/bandDel/xinkuzi-1.jpg")
        },
        {
          name: "新裤子 (同名专辑)",
          time: "2016-04-17",
          img: require("assets/img/bandDel/xinkuzi-1.jpg")
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";

.band-detail {
  background: white;
  padding: 30px;

  .band-del-top {
    display: flex;
    //   justify-content: space-between;
    .top-caul {
      width: 45%;
    }
    .top-ban-msg {
      padding: 10px 20px 0 20px;
      width: 45%;
      .band-msg-tit {
        font-size: 20px;
        font-weight: bold;
      }
      .band-msg-tag {
        margin: 20px 0;
        span {
          padding: 5px;
          border: 1px solid $color-text-actived;
          border-radius: 8px;
          color: $color-text-actived;
          font-size: 12px;
        }
      }
      .band-msg-intro {
        font-size: 16px;
        line-height: 25px;
      }
    }
  }
  .band-del-bot {
    padding: 40px 0;
    .is-active {
      color: $color-text-actived !important;
    }
    .el-tabs__item:not(.is-disabled):hover {
      color: $color-text-actived !important;
    }
    .band-albums {
      padding: 0 20px;
      .band-al-tabs {
        display: flex;
        line-height: 40px;
        padding: 0 20px 0 20px;
        border-bottom: 1px solid #e1e1e1;
        width: 500px;
        margin-left: 120px;
        border-top: 1px solid #e1e1e1;
        justify-content: space-between;
        p {
          font-size: 16px;
          width: 50%;
          &:nth-child(1) {
            border-right: 1px solid #e1e1e1;
            // margin-left: 300px;
          }
        }
      }
      .bnd-al-li {
        display: flex;
        margin: 0 0 20px 0;
        p {
          line-height: 80px;
          &:nth-child(2) {
            padding: 0 0 0 120px;
            width: 170px;
            text-align: left;
          }
          &:nth-child(3) {
          width: 260px;
          }
        }
      }
    }
  }
}
</style>
