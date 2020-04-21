<template>
  <div class="min-width">
    <div class="fun-news">
      <div class="top-news-list">
        <div class="top-news-list-box" v-for="(news,index) in topNews" :key="index">
          <div class="news-img-box">
            <img :src="news.img" alt />
            <div class="span-tag">专访</div>
          </div>
          <div class="news-msg text-left">
            <p class="news-time">{{news.time}}</p>
            <p class="news-title">{{news.title}}</p>
          </div>
        </div>
      </div>

      <div class="top-news-list center-list">
        <div class="top-news-list-box" v-for="(news,index) in centerNews" :key="index">
          <div class="news-img-box">
            <img :src="news.img" alt />
            <div class="span-tag">专辑</div>
          </div>
          <div class="news-msg text-left">
            <p class="news-time">{{news.time}}</p>
            <p class="news-title">{{news.title}}</p>
          </div>
        </div>
      </div>

      <div class="top-news-list center-list bottom-list">
        <div class="top-news-list-box" v-for="(news,index) in botNews" :key="index">
          <div class="news-img-box">
            <img :src="news.img" alt />
            <div class="span-tag">Live记</div>
          </div>
          <div class="news-msg text-left">
            <p class="news-time">{{news.time}}</p>
            <p class="news-title">{{news.title}}</p>
          </div>
        </div>
      </div>

      <el-pagination background layout="prev, pager, next" :total="90"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topNews: [
        {
          img: require("assets/img/news/daian360.jpg"),
          time: "2020-01-10",
          title: "大连摇滚：看上去很美"
        },
        {
          img: require("assets/img/news/xinxiang360.png"),
          time: "2020-01-10",
          title: "我们在河南新乡住了一周，这个摇滚之乡到底什么样？"
        },
        {
          img: require("assets/img/news/wuhan360.jpg"),
          time: "2020-01-10",
          title: "武汉：一座朋克城市的多种可能性"
        },
        {
          img: require("assets/img/news/xinxiang360.png"),
          time: "2020-01-10",
          title: "我们在河南新乡住了一周，这个摇滚之乡到底什么样？"
        },
        {
          img: require("assets/img/news/daian360.jpg"),
          time: "2020-01-10",
          title: "大连摇滚：看上去很美"
        },
        {
          img: require("assets/img/news/xinxiang360.png"),
          time: "2020-01-10",
          title: "我们在河南新乡住了一周，这个摇滚之乡到底什么样？"
        }
      ],
      centerNews: [
        {
          img: require("assets/img/news/xinkuzi360.jpg"),
          time: "2020-01-10",
          title: "彭磊X大张伟：致我们羞于表达的感情"
        },
        {
          img: require("assets/img/news/tongyang360.jpg"),
          time: "2020-01-10",
          title: "《再见杰克》不要停止我的音乐——痛仰"
        },
        {
          img: require("assets/img/news/wanneng360.jpg"),
          time: "2020-01-10",
          title: "等了8年，万能青年旅店的第二张专辑终于要来了...."
        },
        {
          img: require("assets/img/news/xinxiang360.png"),
          time: "2020-01-10",
          title: "我们在河南新乡住了一周，这个摇滚之乡到底什么样？"
        },
        {
          img: require("assets/img/news/daian360.jpg"),
          time: "2020-01-10",
          title: "大连摇滚：看上去很美"
        },
        {
          img: require("assets/img/news/xinxiang360.png"),
          time: "2020-01-10",
          title: "我们在河南新乡住了一周，这个摇滚之乡到底什么样？"
        }
      ],
      botNews: [
        {
          img: require("assets/img/news/laowang360.jpg"),
          time: "2020-01-10",
          title: "老王乐队：那个30度的北京冬夜与难以忘怀的烤鸭烤串"
        },
        {
          img: require("assets/img/news/yuexia360.jpg"),
          time: "2020-01-10",
          title: "玩不了乐队，可以画乐队"
        },
        {
          img: require("assets/img/news/wanneng360.jpg"),
          time: "2020-01-10",
          title: "等了8年，万能青年旅店的第二张专辑终于要来了...."
        },
        {
          img: require("assets/img/news/xinxiang360.png"),
          time: "2020-01-10",
          title: "我们在河南新乡住了一周，这个摇滚之乡到底什么样？"
        },
        {
          img: require("assets/img/news/daian360.jpg"),
          time: "2020-01-10",
          title: "大连摇滚：看上去很美"
        },
        {
          img: require("assets/img/news/xinxiang360.png"),
          time: "2020-01-10",
          title: "我们在河南新乡住了一周，这个摇滚之乡到底什么样？"
        }
      ]
    };
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
    justify-content: space-evenly;
    .top-news-list-box {
      //   background: white;
      .news-img-box {
        position: relative;
        padding: 10px;
        box-shadow: 0 0 4px #a6aca6;
        width: 300px;
        img {
          width: 300px;
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
        width: 300px;
        padding: 10px 0 25px;
        .news-time {
          color: gray;
        }
        .news-title {
          font-size: 18px;
          line-height: 28px;
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