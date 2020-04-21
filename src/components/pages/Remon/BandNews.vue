<template>
  <div class="band-news">
    <div class="ban-news-tit">
      <h2>乐队新闻</h2>
      <router-link to="##">查看更多</router-link>
    </div>
    <div class="ban-news-list">
      <div class="ban-news-left news-list">
        <div class="ban-news-box" v-for="(news,index) in newsList.slice(0,8)" :key="index">
          <a :href="news.href">{{news.name}}</a>
          <p>{{news.time}}</p>
        </div>
      </div>
      <div class="ban-news-right news-list">
        <div class="ban-news-box" v-for="(news,index) in newsList.slice(8,16)" :key="index">
          <a :href="news.href">{{news.name}}</a>
          <p>{{news.time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "bandNews",
  data() {
    return {
      newsList: [
        {
          name: "「摇滚乐普及计划」第九期 零点乐队",
          href:
            "https://baijiahao.baidu.com/s?id=1661065025250136435&wfr=spider&for=pc",
          time: "2020-03-18"
        },
        { name: "新裤子乐队：生活将你狠狠抛弃，我们还在原地等你", href: "https://baijiahao.baidu.com/s?id=1660032043757099153&wfr=spider&for=pc", time: "2020-03-18" },
        { name: "众志成城！痛仰乐队向武汉捐款100万", href: "https://new.qq.com/omn/20200124/20200124A0DVVA00.html", time: "2020-03-18" },
        { name: "蓝盾吉他X薄荷绿乐队：你守护校园青春，我守护你的音乐", href: "https://baijiahao.baidu.com/s?id=1615908910714100552&wfr=spider&for=pc", time: "2020-03-18" },
        { name: "跟着“房东的猫”的清新民谣风迈入全新十年", href: "www.baidu.com", time: "2020-03-18" },
        { name: "原力计划MLK 麋鹿王国：不拘风格的伯克利学院派", href: "www.baidu.com", time: "2020-03-18" },
        { name: "房东的猫：你是我最愚蠢的一次浪漫", href: "www.baidu.com", time: "2020-03-18" },
        { name: "VOGUE5新专辑上线 热血诠释梦想与青春", href: "www.baidu.com", time: "2020-03-18" },
        { name: "Click#15获2019网易娱乐盛典'年度最受欢迎乐队'", href: "www.baidu.com", time: "2020-03-18" },
        { name: "MrWooHoo，音乐由他们掌控", href: "www.baidu.com", time: "2020-03-18" },
        { name: "乐队的夏天8强诞生，喜欢哪个乐队呢？", href: "www.baidu.com", time: "2020-03-18" },
        { name: "没有什么是无与伦比的美丽，除了苏打绿", href: "www.baidu.com", time: "2020-03-18" },
        { name: "i草莓计划 让我们认识更多本土优质乐队", href: "www.baidu.com", time: "2020-03-18" },
        { name: "兰州草莓音乐节 32支摇滚乐队燃爆西固", href: "www.baidu.com", time: "2020-03-18" },
      ]
    };
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.band-news {
  .ban-news-tit {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 24px;
    }
    a {
      color: $color-text-actived;
    }
  }
  .ban-news-list {
    display: flex;
    justify-content: space-around;
    padding: 10px ;
    .news-list {
      padding: 5px 10px;
        box-shadow: 0px 0px 8px gray;
    //   border: 1px solid;
    width: 45%;
      .ban-news-box {
        display: flex;
        border-bottom: 1px solid #e7e7e7;
        padding: 15px 5px;
        justify-content: space-between;
        a {
          display: block;
        //   font-size: 18px;
          color:$color-text-normal;
          &:hover{
              color:$color-text-actived;
          }
        }
        p{
            font-size: 14px;
            color:$color-span
        }
      }
    }
  }
}
</style>