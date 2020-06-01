<template>
  <div class="lazy-img" ref="imgFail">
    <el-image :src="src">
      <div slot="placeholder" class="image-slot">
        <span class ref="span">加载中...</span>
      </div>
      <div slot="error" class="image-slot" ></div>
    </el-image>
  </div>
</template>
<script>
export default {
  name: "LazyImg",
  props: {
    src: {
      type: String
    }
  },
  data() {
    return {
      colors: [
        "#cicbd7",
        "#afbob2",
        "#939391",
        "#bfbfbf",
        "#e0e5df",
        "#b5c4b1",
        "#8696a7",
        "#9ca8b8",
        "#96a48b",
        "#7b8b6f"
      ],
      bgActive: false
    };
  },
  methods: {
    RandomColor() {
      let end = this.colors.length;
      let randomIndex = Math.floor(Math.random() * end);
      
      this.$refs.imgFail.setAttribute("background",this.colors[randomIndex])
    //   console.log();
    }
  },
  mounted() {
    this.RandomColor();
  }
};
</script>
<style lang="scss" scoped>
.lazy-img {
  position: relative;
  width: 100%;
  height: 100%;
  .el-image {
    width: 100%;
    height: 100%;
  }
  span,
  .image-slot {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
