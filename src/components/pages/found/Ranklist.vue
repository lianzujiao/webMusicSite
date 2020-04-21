<template>
  <div class="rank-list">
    <div class="left-list-title text-left">
      <h3>云音乐特色榜</h3>
      <div class="tit-box">
        <div class="tit-box-img">
          <!-- <img src="" alt=""> -->
        </div>
        <div class="tit-box-msg" v-for="item in listName.slice(0,4)" :key="item.idx">
          <p
            @click="getListDetail(item.idx,item)"
            :class="{'is-actived':item.isActived}"
          >{{item.name}}</p>
          <!-- <p>每天更新</p> -->
        </div>
      </div>
      <h3>全球媒体榜</h3>
      <div class="tit-box">
        <div class="tit-box-img">
          <!-- <img src="" alt=""> -->
        </div>
        <div class="tit-box-msg" v-for="item in listName.slice(5,23)" :key="item.idx">
          <p
            @click="getListDetail(item.idx,item)"
            :class="{'is-actived':item.isActived}"
          >{{item.name}}</p>
          <!-- <p>每天更新</p> -->
        </div>
      </div>
    </div>
    <div class="right-deltail">
      <div class="right-del-tit">
        <img :src="toplist.coverImgUrl" alt />

        <div class="rig-icon">
          <h2>{{toplist.name}}</h2>
          <div class="btn-play">
            <i class="iconfont iconplay"></i>
            <span>播放全部</span>
          </div>
          <div class="btn-add" title="添加到播放队列">添加</div>
        </div>
      </div>

      <div class="song-msg text-left">
        <span class="song-msg-name">音乐标题</span>
        <span class="song-msg-singer">歌手</span>
        <span class="song-msg-album">专辑</span>
      </div>
      <div class="song-msg-box text-left" v-for="(song,index) in toplist.tracks" :key="index">
        <div class="song-msg-img-cont">
          <div class="img-box">
            <el-image :src="song.al.picUrl" v-if="index<5"></el-image>
          </div>
          <div class="box-name">
            <i class="iconfont iconplay"></i>
            <router-link to="##" tag="span">{{song.name}}</router-link>
          </div>
        </div>

        <p class="box-arts">
          <router-link v-for="(art,index) in song.ar" to="##" :key="index">{{art.name}}&nbsp;</router-link>
        </p>
        <p class="box-album">
          <router-link to="##">{{song.al.name}}</router-link>
        </p>
        <!-- <p></p> -->
      </div>
    </div>
  </div>
</template>
<script>
import * as top from "api/topList";
export default {
  data() {
    return {
      toplist: {},
      listName: [
        { idx: 0, name: "云音乐新歌榜", isActived: true },
        { idx: 1, name: "云音乐热歌榜", isActived: false },
        { idx: 2, name: "网易原创歌曲榜", isActived: false },
        { idx: 3, name: "云音乐飙升榜", isActived: false },
        { idx: 4, name: "云音乐电音榜", isActived: false },
        { idx: 5, name: "UK排行榜周榜", isActived: false },
        { idx: 6, name: "美国Billboard周榜", isActived: false },
        { idx: 7, name: "KTV嗨榜", isActived: false },
        { idx: 8, name: "iTunes榜", isActived: false },
        { idx: 9, name: "Hit FM Top榜", isActived: false },
        { idx: 10, name: "Hit FM Top榜", isActived: false },
        { idx: 11, name: "韩国Melon排行榜周榜", isActived: false },
        { idx: 12, name: "韩国Mnet排行榜周榜", isActived: false },
        { idx: 13, name: "韩国Melon原声周榜", isActived: false },
        { idx: 14, name: "中国TOP排行榜(港台榜)", isActived: false },
        { idx: 15, name: "中国TOP排行榜(内地榜)", isActived: false },
        { idx: 16, name: "香港电台中文歌曲龙虎榜", isActived: false },
        { idx: 17, name: "华语金曲榜", isActived: false },
        { idx: 18, name: "中国嘻哈榜", isActived: false },
        { idx: 19, name: "法国 NRJ EuroHot 30周榜", isActived: false },
        { idx: 20, name: "台湾Hito排行榜", isActived: false },
        { idx: 21, name: "Beatport全球电子舞曲榜", isActived: false },
        { idx: 22, name: "云音乐ACG音乐榜", isActived: false },
        { idx: 23, name: "云音乐嘻哈榜", isActived: false }
      ],
      params: {
        idx: 0
      }
    };
  },
  methods: {
    getTopList() {
      top.list(this.params).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.toplist = res.playlist;
        }
      });
    },
    getListDetail(id, li) {
      this.listName.forEach(item => {
        item.isActived = false;
      });
      li.isActived = true;
      // console.log(this.$route)
      // this.$route.query={id:id};
      this.params.idx = id;
      this.getTopList();
    }
  },
  mounted() {
    console.log("mounted");
    (this.params.idx = this.$route.query.id ? this.$route.query.id : 0),
      this.listName.forEach(item => {
        item.isActived = false;
      });
    this.listName.some(item => {
      if (item.idx == this.params.idx) {
        item.isActived = true;
        return;
      }
    });

    this.getTopList();
  },
  watch: {
    $route() {
        console.log("触发路由状态")
      if (this.$route) {
        (this.params.idx = this.$route.query.id ? this.$route.query.id : 0),
          this.listName.forEach(item => {
            item.isActived = false;
          });
        this.listName.some(item => {
          if (item.idx == this.params.idx) {
            item.isActived = true;
            return;
          }
        });

        this.getTopList();
      }
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";

.rank-list {
  background: white;
  display: flex;
  padding: 20px;
  .left-list-title {
    border: 1px solid $color-main;
    height: 960px;
    padding: 10px 0;
    font-size: 20px;
    h3 {
      line-height: 36px;
      font-size: 18px;
      padding: 0 10px;
      &:nth-of-type(2) {
        margin-top: 10px;
      }
    }
    .tit-box {
      p {
        line-height: 40px;
        font-size: 16px;
        width: 190px;
        &:hover {
          color: $color-text-actived;
          cursor: pointer;
        }
      }
      .tit-box-msg {
        .is-actived {
          background: $color-text-actived;
          color: white;
        }
        p {
          transition: all 0.2s ease-in-out;
          padding: 0 10px;
        }
      }
    }
  }
  .right-deltail {
    padding: 10px;
    .right-del-tit {
      display: flex;
      img {
        width: 100px;
      }
      h2 {
        font-weight: bold;
        font-size: 20px;
        color: grey;
        padding: 15px 0 10px 0;
      }
      .rig-icon {
        padding: 0 15px;
        h2 {
          //   width: 100%;
          text-align: left;
        }
        //   span{
        //       background: $color-text-actived;
        //       color: white;
        //       padding: 10px 0;
        //     //   padding: 5px 10px;
        //     display: inline-block;
        //     width: 130px;

        //   }
        .btn-play {
          display: inline-block;
          background: $color-text-actived;
          color: white;
          line-height: 40px;
          padding: 0 15px;
          i {
            color: white;
            font-size: 24px;
            transform: translateY(3px);
          }
          span {
            color: white;
            line-height: 40px;
          }
        }
        .btn-add {
          background: $color-text-actived;
          display: inline-block;
          line-height: 40px;
          color: white;
          width: 70px;
          letter-spacing: 3px;
          padding: 0 20px;
          margin-left: 20px;
        }
      }
    }
    .song-msg {
      // padding: 15px 15px 5px 15px;
      // display: flex;
      border-bottom: 1px solid $color-main;
      border-top: 1px solid $color-main;
      line-height: 40px;
      margin-top: 20px;
      span {
        display: inline-block;
        // width: 300px;
        box-sizing: border-box;
      }
      .song-msg-name {
        width: 300px;
        padding-left: 100px;
        border-right: 1px solid $color-main;
      }
      .song-msg-singer {
        width: 300px;
        padding-left: 10px;
        border-right: 1px solid $color-main;
      }
      .song-msg-album {
        padding-left: 25px;
      }
    }
    .song-msg-box {
      padding: 10px 20px;
      display: flex;
      .song-msg-img-cont {
        display: flex;
        width: 280px;
        .img-box {
          img {
            width: 75px;
          }
        }
        .box-name {
          width: 190px;
          padding: 15px 0 0 15px;
          i {
            font-size: 18px;
            color: #ababab;
            &:hover {
              color: $color-text-actived;
              cursor: pointer;
            }
          }
          span {
            &:hover {
              color: black;
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }

      .box-arts {
        width: 300px;
        padding: 15px 0 0 15px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        a {
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .box-album {
        padding: 15px 0 0 15px;
        a {
          &:hover {
            text-decoration: underline;
          }
        }
        width: 300px;
      }
    }
  }
}
</style>