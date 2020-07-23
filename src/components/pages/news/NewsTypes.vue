<template>
  <div class="min-width">
    <div class="news-subjects">
      <div class="left-tags">
        <div
          class="tag-box"
          v-for="(tag,index) in tags"
          :class="{'active-tag':index==activeIndex}"
          @click="selectTag(tag,index)"
        >{{tag.name}}</div>
      </div>
      <div class="right-list">
        <div class="top-news-list" v-if="list.length>0">
          <div class="top-news-list-box" v-for="(news,index) in list" :key="index">
            <div class="news-img-box">
              <img :src="news.coverImg" alt @click="openDetail(news._id)" />
            </div>
            <div class="news-msg text-left">
              <p class="news-time">{{news.time|formatDate}}</p>
              <p class="news-title" @click="openDetail(news._id)">{{news.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as News from "api/news";
export default {
  data() {
    return {
      activeIndex: 0,
      tags: [{ name: "专访" }, { name: "专辑" }, { name: "live记" }],
      total: 0,
      pageSize: 3,
      pageNumber: 1,
      list: []
    };
  },
  methods: {
    openDetail(id) {
      this.$router.push({ path: "newsDetail", query: { id: id } });
    },
    selectTag(tag, index) {
      this.activeIndex = index;
      this.getList(tag.name);
    },
    getList(type) {
      News.types({
        tag: type
      }).then(res => {
        if (res.code == 200) {
          this.total = res.data.length;
          this.list = res.data;
        }
      });
    },
   
  },
   watch: {
      $route: {
        handler: function(newVal, old) {
          this.getList(newVal.query.type);
          switch (newVal.query.type){
            case "专访":this.activeIndex=0;break;
            case "专辑":this.activeIndex=1;break;
            case "live记":this.activeIndex=2;break;
          }
        },
        immediate: true,
        deep:true
      }
    }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.news-subjects {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left-tags {
    width: 16%;
    .tag-box {
      background: white;
      line-height: 50px;
      cursor: pointer;
      margin-bottom: 20px;
      font-size: 18px;
      color: #999;
      letter-spacing: 4px;
    }
    .active-tag {
      background-image: url("../../../assets/img/e424322629ebb459adaa8a8d5bcc5965.png");
      background-repeat: no-repeat;
      background-size: 25px;
      background-position: 10px 12px;
    }
  }
  .right-list {
    width: 82%;
    background: white;
    padding: 25px 0;
    min-height: 550px;
    .top-news-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 15px 45px;
      .top-news-list-box {
        //   background: white;
        box-sizing: border-box;
        margin-right: 55px;
        &:nth-child(3n) {
          margin-right: 0px;
        }
        .news-img-box {
          position: relative;
          padding: 10px;
          box-shadow: 0 0 4px #a6aca6;
          width: 230px;
          img {
            width: 230px;
            border: 1px solid $color-main;
            cursor: pointer;
          }
          .span-tag {
            position: absolute;
            color: white;
            background: #6ed56c;
            padding: 5px 12px;

            top: 10px;
            left: 10px;
            letter-spacing: 3px;
          }
        }
        .news-msg {
          width: 230px;
          padding: 10px 0 25px;
          .news-time {
            color: gray;
          }
          .news-title {
            cursor: pointer;
            font-size: 18px;
            line-height: 28px;
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