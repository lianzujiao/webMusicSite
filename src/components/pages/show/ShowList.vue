<template>
  <div class="min-width">
    <div class="show-list-page">
      <div class="show-list-box">
        <div class="show-box" v-for="(item,index) in list" :key="index">
          <div class="show-box-img">
            <img :src="item.coverImg" alt />
          </div>
          <div class="show-box-msg text-left">
            <p class="show-tit">{{item.title}}</p>
            <p class="show-time">时间：{{item.startTime|formatDate}}~{{item.endTime|formatDate}}</p>
            <p class="show-address">地址：{{item.address}}</p>
            <p class="show-intro">介绍：{{item.intro}}</p>
            <p class="show-more">
              <router-link :to="{path:'showDetail',query:{id:item._id}}">查看详情</router-link>
            </p>
          </div>
        </div>
        <div class="load-more" v-if="this.list.length<this.total" @click="loadMore()">加载更多</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Show from "api/shows";
export default {
  data() {
    return {
      list: [],
      page: {
        pageSize: 3,
        pageNumber: 1
      },
      total: 0
    };
  },
  methods: {
    loadMore(){
      this.page.pageNumber+=1;
      this.getList()
    },
    getList() {
      Show.getList(this.page).then(res => {
        if (res.code == 200) {
          if (this.page.pageNumber == 1) {
            this.list = res.data;
          } else {
            this.list = this.list.concat(res.data);
          }
          this.total = res.total;
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function(newVal, old) {
        this.getList();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.show-list-page {
  padding: 20px;
  background: white;
  .show-list-box {
    border: 1px solid $color-main;
    padding: 0 20px;
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
        .show-intro {
          font-size: 16px;
          line-height: 28px;
          // height: 280px;
        }
        .show-more {
          margin-top: 15px;
          a {
            color: $color-text-actived;
          }
        }
      }
    }
    .load-more {
      line-height: 45px;
      color: $color-text-actived;
      cursor: pointer;
    }
  }
}
</style>