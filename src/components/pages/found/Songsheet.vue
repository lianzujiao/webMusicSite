<template>
  <div class="songs-sheet">
    <div class="songs-sheet-content">
      <div class="sheet-left-cont">
        <div
          class="tag-box"
          v-for="(tag,index) in tags"
          @click="selectTag(tag)"
          :class="{'active-tag':tag.active}"
        >{{tag.name}}</div>
      </div>
      <div class="sheet-right-cont">
        <div class="sheet-right-tags">
          <div
            class="sheet-right-tag"
            @click="selectNew(item,index)"
            v-for="(item,index) in ['全部','最新']"
            :class="{'tag-active':activeIndex==index}"
          >{{item}}</div>
        </div>
        <div class="sheet-right-content">
          <div class="hot-cont" v-for="item in list" :key="item._id">
            <!-- <div class="hot-cont" v-for="item in hotSongs" :key="item.id"> -->
            <div class="hot-cont-img">
              <el-image :src="item.coverImg" title="歌单详情" lazy @click="openSheet(item._id,item)"></el-image>
            </div>

            <div class="hot-cont-msg text-left">
              <div class="hot-cont-span">
                <p class="icon-pra">
                  <i class="el-icon-video-play" @click="playSheet(item._id)" title="播放"></i>
                </p>
                <p class="icon-pra">
                  <Icon type="clickSum" title="播放次数"></Icon>
                  <span>{{item.popularity}}</span>
                </p>
                <p class="icon-pra">
                  <Icon type="music" title="总歌曲数"></Icon>
                  <span>{{item.songs.length}}</span>
                </p>
              </div>
              <p class="sheet-name" @click="openSheet(item._id,item)" >{{item.name}}</p>
            </div>
          </div>
        </div>
        <div class="sheet-load" @click="loadMore()" v-show="isMore">加载更多</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as SongSheet from "api/SongSheet";

export default {
  data() {
    return {
      list: [],

      tags: [
        { name: "民谣", active: false },
        { name: "摇滚", active: false },
        { name: "器乐", active: false },
        { name: "流行", active: false },
        { name: "节日", active: false },
        { name: "风格", active: false },
        { name: "心情", active: false }
      ],
      total: 0,
      pageSize: 9,
      pageNumber: 1,
      selectTags: [], //数组为空时表示搜索全部
      range: "all",
      isMore: true,
      activeIndex:0,
    };
  },
  computed: {
    // songs:function(){
    //   this.list.slice(0,this.pageSize)
    // }
  },
  watch: {
    selectTags: {
      handler: function(newValue, oldValue) {
        this.pageNumber = 1;
        this.getSheets();
      },
      deep: true
    }
  },
  methods: {
    openSheet(id, item) {
      item.popularity += 1;
      SongSheet.popularity({ id: id }).then();
      this.$router.push({ path: "songlist", query: { id: id } });
    },
    loadMore() {
      this.pageNumber += 1;
      this.getSheets();
    },
    //选择tags

    selectTag(tag) {
      tag.active = !tag.active;
      if (tag.active) {
        this.$set(this.selectTags, this.selectTags.length, tag.name);
      } else {
        let index = Array.from(this.selectTags).findIndex((item, index) => {
          return item == tag.name;
        });
        if (index >= 0) {
          this.$delete(this.selectTags, index);
        }
      }
    },
    selectNew(item, index) {
      this.range = index == 0 && item == "全部" ? "all" : "new";
      this.pageNumber = 1;
      this.getSheets();
      this.activeIndex=index
    },
    getSheets() {
      SongSheet.getByTag({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        tags: Array.from(this.selectTags),
        range: this.range
      }).then(res => {
        if (res.code == 200) {
          this.total = res.data.total;

          if (this.pageNumber == 1) {
            this.list = res.data.sheets;
          } else {
            this.list = this.list.concat(res.data.sheets);
          }
          this.isMore = this.list.length >= this.total ? false : true;
        }
      });
    }
  },
  mounted() {
    this.getSheets();
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.songs-sheet {
  width: 1000px;
  margin: 0 auto;
  .songs-sheet-content {
    display: flex;
    width: inherit;
    height: 100%;
    padding-bottom: 20px;
    padding-top: 15px;
    justify-content: space-between;
    .sheet-left-cont {
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
    .sheet-right-cont {
      background: white;
      min-height: 720px;
      width: 82%;
      box-sizing: border-box;
      padding: 15px 20px;
      .sheet-right-tags {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 15px;
        .tag-active{
          color: $color-text-actived;
        }
        .sheet-right-tag {
          width: 50px;
          cursor: pointer;
        }
      }
      .sheet-right-content {
        display: flex;
        flex-wrap: wrap;
        .hot-cont {
          margin-bottom: 30px;
          margin-right: 30px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .hot-cont-img {
            position: relative;
            width: 240px;
            overflow: hidden;
            //   box-shadow: 5px -5px 5px #c5c2c2;
            img {
              width: 240px;
              height: 240px;
              transition: all 0.3s ease-in-out;
              &:hover {
                transform: scale(1.2);
                cursor: pointer;
              }
            }
          }
          .hot-cont-msg {
            .hot-cont-span {
              display: flex;
              justify-content: space-between;
              width: 100%;
              .icon-pra {
                i {
                  font-size: 16px;
                  color: $color-text-actived;
                  cursor: default;
                }
                .el-icon-video-play {
                  cursor: pointer;
                }
              }
            }
            width: 240px;
            height: 65px;
            background: #f1f1f1;
            overflow: hidden;
            .sheet-name {
              width: 240px;
              line-height: 23px;
              padding: 2px 5px 0 5px;
              box-sizing: border-box;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              cursor: pointer;
              &:hover{
                color:$color-text-actived;
              }
            }
          }
        }
      }
    }
    .sheet-load {
      cursor: pointer;
      color: $color-text-actived;
    }
  }
}
</style>