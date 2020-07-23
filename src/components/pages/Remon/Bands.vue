<template>
  <div class="min-width">
    <div class="band-tags">
      <div class="band-tags-main">
        <div class="band-tags-box" v-for="(band,index) in bands" :key="index">
          <router-link :to="{path:'singer',query:{id:band._id}}">
            <div class="band-tags-imgs">
              <img :src="band.coverImg" alt />
            </div>
            <p>{{band.name}}</p>
          </router-link>
        </div>
      </div>
      <div class="band-pagi">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="CurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import * as Singer from "api/singer";
export default {
  data() {
    return {
      bands: [],
      pageSize: 12,
      pageNumber: 1,
      total: 0
    };
  },
  methods: {
    CurrentChange(currentPage) {
      this.pageNumber = currentPage;
      this.getSingers();
    },
    getSingers() {
      Singer.getAll({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then(res => {
        if (res.code == 200) {
          this.total = res.data.total;
          this.bands = res.data.bands;
        }
      });
    }
  },
  created() {
    this.$nextTick().then(() => {
      this.getSingers();
    });
  }
};
</script>
<style lang="scss">
@import "scss/index.scss";

.band-tags {
  background: white;
  padding: 20px;
  .el-pager li:hover {
    color: $color-text-actived;
  }
  .el-pager li.active {
    color: $color-text-actived;
  }
  .band-tags-main {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0 30px 0;
    .band-tags-box {
      margin: 15px 30px;

      a {
        .band-tags-imgs {
          padding: 8px 8px 6px 8px;
          box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.3);
          img {
            width: 204px;
            height: 204px;
          }
        }

        p {
          padding: 10px 0 0 0;
          &:hover {
            color: $color-text-actived;
          }
        }
      }
    }
  }
}
</style>