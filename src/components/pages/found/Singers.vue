<template>
  <div class="singers">
    <div class="top-cats">
      <div class="lans cats-box">
        <p class="lans-tit cats-box-tit text-left">语种:</p>
        <p
          class="lans-cont cont"
          v-for="(lan,index) in lans"
          :class="{'contActive':index==lansActiveIndex}"
          :key="index"
          @click="selectLan(index,lan)"
        >{{lan.name}}</p>
      </div>
      <div class="sexs cats-box">
        <p class="sexs-tit cats-box-tit text-left">类别:</p>
        <p
          class="sexs-cont cont"
          v-for="(sex,index) in sexs"
          :class="{'contActive':sexActiveIndex==index}"
          :key="index"
          @click="selectSexs(index,sex)"
        >{{sex.name}}</p>
      </div>
      <div class="codes cats-box">
        <p class="codes-tit cats-box-tit text-left">筛选:</p>
        <div class="codes-cont-box">
          <p
            class="codes-cont cont"
            v-for="(code,index) in 26"
            :class="{'contActive':index==codesActiveIndex}"
            :key="index"
            @click="selectCode(index,String.fromCharCode(code+64))"
          >{{String.fromCharCode(code+64)}}</p>
        </div>
      </div>
    </div>
    <div class="bot-list">
      <div class="bot-singer-box" v-for="(art,index) in artists" :key="index">
        <router-link to="##">
          <div class="img-box">
            <el-image :src="art.picUrl" lazy style="width:200px"></el-image>
          </div>
          <p class>{{art.name}}</p>
        </router-link>
      </div>
    </div>
    <div class="page-list">
      <div class="prev-btn page-btn" @click="prevPage()" :class="{'dis-click':params.offset<30}">
        <i class="iconfont iconprev-page-copy"></i>
      </div>
      <div class="next-btn page-btn" @click="nextPage()">
        <i class="iconfont iconnext-page"></i>
      </div>
    </div>
  </div>
</template>
<script>
import * as topList from "api/topList";
export default {
  data() {
    return {
      lans: [
        { name: "华语", cat: "10" },
        { name: "欧美", cat: "20" },
        { name: "日本", cat: "60" },
        { name: "韩国", cat: "70" },
        { name: "其他", cat: "40" }
      ],
      sexs: [
        { name: "男歌手", cat: "01" },
        { name: "女歌手", cat: "02" },
      
      ],
      lansActiveIndex: 0,
      sexActiveIndex: 0,
      codesActiveIndex: -1,
      artists: [], //歌手列表
      isMore: true,
      params: {
        offset: 0,
        limit: 30,
        initial: null,
        cat: "1001"
      } //查询参数
    };
  },
  methods: {
    //选择语种
    selectLan(index, lan) {
      this.lansActiveIndex = index;

      //vue.$set 因为使用replace替换对象中属性的值不会触发双向绑定，
      //本质是这个属性并没有getter和setter属性，vue无法检测到它的改变
      let newCat = this.params.cat.replace(/\d{2}/, lan.cat);
      this.$set(this.params, "cat", newCat);
    },

    //选择类别
    selectSexs(index, sex) {
      this.sexActiveIndex = index;
      let newCat = this.params.cat.replace(/\d{2}$/, sex.cat);
      this.$set(this.params, "cat", newCat);
    },

    //改变字母筛选
    selectCode(index, code) {
      this.codesActiveIndex = index;
      this.params.initial = code;
    },

    //获取歌手数据
    getArts() {
      topList.artistCat(this.params).then(res => {
        if (res.code == 200) {
          this.artists = res.artists;
          this.isMore = res.more;
        }
      });
    },
    prevPage() {
      if (this.params.offset >= 30) {
        this.params.offset -= this.params.limit;
      }
    },
    nextPage() {
      if (this.params.offset >= 0) {
        this.params.offset += this.params.limit;
      }
    }
  },
  mounted() {
    this.getArts();
  },
  computed: {
    newParams() {
      return JSON.parse(JSON.stringify(this.params));
    }
  },
  watch: {
    newParams: {
      handler: function(newVal, old) {
        if (newVal.cat != old.cat || newVal.initial != old.initial) {
          this.params.offset = 0;
        }
        this.getArts();
      },
      deep: true
    },
    isMore: function(val, old) {
      if (val == false) {
        this.params.offset = 0;
      }
    }
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";
.singers {
  background: white;
  width: 1200px;
  box-sizing: border-box;
  padding: 20px;
  margin: 0 auto;
  .top-cats {
    .cats-box {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0 5px 0;
      p {
        height: 30px;
        line-height: 25px;
      }
      .cats-box-tit {
        padding: 5px 0;
      }
      .codes-cont-box {
        display: flex;
        flex-wrap: wrap;
        width: 1074px;
        .cont {
          padding: 5px 25px;
          border-right: 2px solid $color-main;
          margin-bottom: 10px;
          cursor: pointer;
          box-sizing: border-box;
          &:hover {
            color: $color-text-actived;
          }
          &:last-child {
            border-right: none;
          }
        }
        .contActive {
          color: $color-text-actived;
        }
      }
      .contActive {
        color: $color-text-actived;
      }
      .cont {
        padding: 5px 25px;
        border-right: 2px solid $color-main;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          color: $color-text-actived;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .bot-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 30px 0;
    height: 1320px;
    .bot-singer-box {
      padding: 0 20px 20px;
      a {
        .img-box {
          width: 160px;
          height: 160px;
          overflow: hidden;
          img {
            // transform: translateX(-20px);
            transition: all 0.3s ease-in-out;
          }
        }
        p {
          line-height: 40px;
        }
        &:hover {
          img {
            transform: scale(1.2);
          }
          p {
            color: $color-text-actived;
          }
        }
      }
    }
  }
  .page-list {
    padding-right: 0;
    // margin: 0 auto;

    .page-btn {
      display: inline-block;
      width: 35px;
      line-height: 35px;
      margin: 0 10px;
      cursor: pointer;
      background: $color-text-actived;
      color: white;
      transition: all 0.2s ease-in-out;
      i {
        color: white;
        font-size: 20px;
        transform: translateY(3px);
      }
      &:hover {
        background: #3ec43c;
      }
    }
    .dis-click {
      background: gray;
      cursor: default;
      &:hover {
        background: gray;
      }
    }
  }
}
</style>