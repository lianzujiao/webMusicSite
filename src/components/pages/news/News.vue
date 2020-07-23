<template>
  <div class="min-width">
    <div class="fun-news">
      <div class="top-news-list" v-if="list.length>0">
        <div
          class="top-news-list-box"
          v-for="(news,index) in list"
          :key="index"
          
        >
          <div class="news-img-box">
            <img :src="news.coverImg" alt  />
            <div class="span-tag" @click="openTypes(news.tag)">{{news.tag}}</div>
          </div>
          <div class="news-msg text-left">
            <p class="news-time">{{news.time|formatDate}}</p>
            <p class="news-title" @click="openDetail(news._id)">{{news.title}}</p>
          </div>
        </div>
      </div>

      <el-pagination layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
import * as News from "api/news";
export default {
  data() {
    return {
      list: [],
      page: {
        pageSize: 15,
        pageNumber: 1
      },
      total: 0
    };
  },
  methods: {
    openTypes(type){
      this.$router.push({path:"newsTypes",query:{type:type}})
    },
    openDetail(id) {
      this.$router.push({
        path: "newsDetail",
        query: { id: id }
      });
    },
    getList() {
      News.getList(this.page).then(res => {
        if (res.code == 200) {
          this.total = res.data.total;
          this.list = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.fun-news {
  background: white;
  padding: 20px 0;
  .top-news-list {
    display: flex;
    flex-wrap: wrap;
    width:100%;
    padding: 15px 45px;
    .top-news-list-box {
      //   background: white;
      box-sizing: border-box;
    margin-right: 55px;
    &:nth-child(3n){
      margin-right: 0px;
    }
      .news-img-box {
        position: relative;
        padding: 10px;
        box-shadow: 0 0 4px #a6aca6;
        width: 300px;
        img {
          width: 300px;
          border: 1px solid $color-main;
        }
        .span-tag {
          position: absolute;
          color: white;
          background: #6ed56c;
          padding: 5px 12px;
          cursor: pointer;
          top: 10px;
          left: 10px;
          letter-spacing: 3px;
        }
      }
      .news-msg {
        width: 300px;
        padding: 10px 0 25px;
        .news-time {
          color: gray;
        }
        .news-title {
          cursor: pointer;
          font-size: 18px;
          line-height: 28px;
          &:hover{
            color:$color-text-actived;
          }
        }
      }
    }
  }
  .center-list {
    margin-top: 45px;
    .span-tag {
      background: $color-light-pink !important;
    }
  }
  .bottom-list {
    .span-tag {
      background: $color-light-blue !important;
      letter-spacing: 0px !important;
    }
  }
}
</style>