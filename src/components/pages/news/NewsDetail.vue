<template>
  <div class="news-dea">
    <div class="top-img">
      <img :src="news.bigImg" alt />
    </div>
    <div class="news-dea-content">
      <h3>{{news.title}}</h3>
      <div class="news-dea-pra" v-html="news.content"></div>
      <div class="news-cont-author">
           <p>撰稿人：{{news.author}}</p>
           <p>来源：<span>{{news.region}}</span> </p>
      </div>
     
    </div>
  </div>
</template>
<script>
import * as News from "api/news";
export default {
  data() {
    return {
      news: {}
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
          
        this.getNews(val.query.id);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getNews(id) {
      News.getOne({ id: id }).then(res => {
        if (res.code == 200) {
          this.news = res.data;
        }
      });
    }
  },
  mounted(){
      this.getNews(this.$route.query.id)
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.news-dea {
  width: 1100px;
  margin: 0 auto;
  background: white;
  .top-img {
    font-size: 0;
    vertical-align: top;
    img {
      width: 1100px;
    }
  }
  .news-dea-content {
    padding: 30px 10px 15px 10px;
    h3 {
      font-size: 22px;
    }
    .news-dea-pra {
      margin: 10px 50px;
      p {
        text-align: left;
        font-size: 16px;
        line-height: 30x;
        letter-spacing: 3px;
      }
     
    }
     .news-cont-author{
          p{
              span{
                  color: $color-text-actived;
                  cursor: pointer;
              }
          }
      }
  }
}
</style>