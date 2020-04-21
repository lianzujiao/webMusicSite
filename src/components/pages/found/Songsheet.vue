<template>
  <div class="song-sheet">
    <el-row>
      <el-col :span="5">
        <p class="left-tit" @click="selectedAllCat()">全部</p>
        <div class="left-box" v-for="(item,index) in list" :key="index">
          <div class="left-box-tit text-left">
            <p>{{item.catName}}</p>
          </div>
          <div class="left-box-tags">
            <span
              class="left-box-tag"
              v-for="tag in item.tags"
              @click="selectegTag(tag.name,tag)"
              :class="{'activedTag':tag.isActived}"
            >{{tag.name}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="right-list">
          <div class="right-tit">
            <!-- <p>最新</p>
            <p>最热</p> -->
          </div>
          <div class="right-subs">
            <router-link :to="{path:'/songlist',query:{id:sub.id}}" v-for="(sub,index) in songs" :key="index">
              <div class="subs-box text-left">
                <div class="subs-box-img">
                  <el-image :src="sub.coverImgUrl" lazy>
                    <div slot="placeholder" class="image-slot">
                      加载中
                      <span class="dot">...</span>
                    </div>
                  </el-image>
                  <div class="sub-span text-center">
                    <i class="el-icon-video-play"></i>
                  </div>
                </div>
                <p>{{sub.name}}</p>
              </div>
            </router-link>
          </div>
          <div class="page-list">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="PageTotal"
              :page-size="20"
              :current-page.sync="currentPage"
              @current-change="handlePage"
            ></el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as SongSheet from "api/SongSheet";
export default {
  data() {
    return {
      list: [],
      songs: [],
      cat: "",
      listParams: {
        limit: 20,
        offset: 0,
        cat: ""
      },
      currentPage: 1,
      PageTotal: 0
    };
  },
  methods: {
    getCatlist() {
      SongSheet.catlist().then(res => {
        if (res.code == 200) {
          let cate = [];
          for (let key in res.categories) {
            cate.push({ catType: key, catName: res.categories[key], tags: [] });
          }
          for (let i = 0; i < res.sub.length; i++) {
            for (let j = 0; j < cate.length; j++) {
              if (res.sub[i].category == Number(cate[j].catType)) {
                res.sub[i].isActived = false; //添加一个是否激活属性用于绑定clas
                cate[j].tags.push(res.sub[i]);
                break;
              }
            }
          }
          // console.log(res.sub);
          this.list = cate;
        }
      });
    },
    getSongs() {
      SongSheet.playlist(this.listParams).then(res => {
        if (res.code == 200) {
          this.PageTotal = res.total;
          this.songs = res.playlists;
        }
      });
    },

    //切换页码
    handlePage(val) {
      this.listParams = {
        limit: 20,
        offset: 20 * (val - 1),
        cat: this.cat
      };
      this.getSongs();
    },

    //不选中任何一个标签
    selectedAllCat(){
       this.list.forEach(li => {
        li.tags.forEach(item => {
          item.isActived = false;
        });
      });
      this.currentPage=1;
       this.listParams = {
        limit: 20,
        offset: 0,
        
      };
      this.getSongs();
    },

    //选中某个标签时
    selectegTag(tag, item) {
      this.list.forEach(li => {
        li.tags.forEach(item => {
          item.isActived = false;
        });
      });
      this.currentPage=1;
      item.isActived = true;
      this.cat=tag;
      this.listParams = {
        limit: 20,
        offset: 0,
        cat: tag
      };
      this.getSongs();
    }
  },
  mounted() {
    this.getCatlist();
    this.getSongs();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.song-sheet {
  background: white;
  padding: 10px 20px;
  .left-tit {
    font-size: 18px;
    color: white;
    background: $color-text-actived;
    width: 50px;
    line-height: 30px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .left-box {
    padding: 12px 0 0 0;
    .left-box-tit {
      p {
        font-size: 18px;
        color: $color-span;
      }
    }
    .left-box-tags {
      display: flex;
      flex-wrap: wrap;
      .left-box-tag {
        display: block;
        // margin: 10px 10px 10px 0;
        padding: 3px 4px;
        transition: all 0.3s ease-in-out;
        font-size: 12px;
        margin: 6px 10px 5px 0;
        cursor: pointer;
        background: #edf7ec;
        color: #648a63;
        &:hover {
          text-decoration: underline;
          // click时候的效果
        }
      }
      .activedTag {
        background: $color-text-actived;
        color: white;
      }
    }
  }
  .right-list {
    .right-tit {
      display: flex;
      justify-content: flex-end;
    }
    .right-subs {
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      height: 892px;
      a {
        margin: 10px 15px 15px 12px;
        .subs-box {
          .subs-box-img {
            position: relative;
            overflow: hidden;
            box-shadow: 0 -1px 5px #b9beb9;
            img {
              width: 150px;
              height: 150px;

              transition: all 0.3s ease-in-out;
            }
            &:hover {
              img {
                transform: scale(1.2);
              }
              .sub-span {
                display: block;
              }
            }
            .sub-span {
              display: none;
              position: absolute;
              top: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              i {
                font-size: 40px;
                color: #d5ebd5;
                line-height: 150px;
              }
            }
          }
          p {
            width: 150px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
    }
  }
  .el-pagination,
  .is-background {
    .el-pager {
      li {
        &:hover {
          color: $color-text-actived !important;
        }
      }
      .active {
        background-color: $color-text-actived !important;
        &:hover{
          color:white !important;
        }
      }
    }
  }
}
</style>