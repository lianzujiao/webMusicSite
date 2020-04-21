<template>
  <div class="exp-head">
    <div class="left-hot-content">
      <router-link
        :to="{path:'/songlist',query:{id:item.id}}"
        tag="div"
        class="hot-cont"
        v-for="item in list"
        :key="item.id"
      >
        <!-- <div class="hot-cont" v-for="item in hotSongs" :key="item.id"> -->
        <div class="hot-cont-img">
          <el-image :src="item.coverImgUrl" lazy />
          <div class="hot-cont-span">
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <p>{{item.name}}</p>
        <!-- </div> -->
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
    name:"ExpHeader",
  data() {
    return {
      list: [
        {
          id: 0,
          coverImgUrl: require("../../../assets/img/cla/1.jpg"),
          name: "午后红茶"
        },
        {
          id: 1,
          coverImgUrl: require("../../../assets/img/cla/2.jpg"),
          name: "工作学习"
        },
        {
          id: 2,
          coverImgUrl: require("../../../assets/img/cla/3.jpg"),
          name: "深夜居酒屋"
        },
        {
          id: 3,
          coverImgUrl: require("../../../assets/img/cla/4.jpg"),
          name: "周末聚会"
        },
        {
          id: 4,
          coverImgUrl: require("../../../assets/img/cla/5.jpg"),
          name: "放松心情"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.exp-head {
  .left-hot-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .hot-cont {
    //   margin: 10px;
      cursor: pointer;
      margin-right: 1px;
      &:nth-child(5){
          margin-right: 0px;
      }
      .hot-cont-img {
        position: relative;
        width: 166px;
        overflow: hidden;
        img {
          width: 166px;
          height: 166px;
          transition: all 0.3s ease-in-out;
          &:hover {
            transform: scale(1.2);
          }
        }
        .hot-cont-span {
          display: none;
          i {
            font-size: 40px;
            color: #d5ebd5;
            line-height: 166px;
          }
        }
        &:hover {
          // transition: .3s ease-in-out;
          // overflow: hidden;
          // width: 140px;
          // height: 140px;
          img {
            transform: scale(1.2);
          }
          .hot-cont-span {
            background: rgba($color: #000000, $alpha: 0.5);
            width: 100%;
            height: 100%;
            position: absolute;
            display: block;
            bottom: 0;
          }
        }
      }
      p {
        width: 166px;
        text-align: center;
        line-height: 42px;
      }
      &:hover{
          p{
              color:$color-text-actived
          }
      }
    }
  }
}
</style>