<template>
  <!--进度条拖动-->
  <div ref="progress" class="progress" @click="barClick">
    <div class="progress-bar"></div>
    <div ref="percentProgress" class="progress-outer"></div>
    <div ref="progressInner" class="progress-inner">
      <div class="progress-dot" @mousedown="barDown" @touchstart.prevent="barDown"></div>
    </div>
  </div>
</template>

<script>
const dotWidth = 10; //拖动点的宽度
export default {
  name: "lprogress",
  props: {
    // 进度值一
    percent: {
      type: [Number],
      default: 0
    },
    // 进度值二（歌曲缓冲进度用）
    percentProgress: {
      type: [Number],
      default: 0
    }
  },
  data() {
    return {
      move: {
        status: false, // 是否可拖动
        startX: 0, // 记录最开始点击的X坐标
        left: 0 // 记录当前已经移动的距离
      }
    };
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.move.status) {
        const barWidth = this.$refs.progress.clientWidth - dotWidth;
        const offsetWidth = newPercent * barWidth;
        this.moveSilde(offsetWidth);
      }
    },
    percentProgress(newValue) {
      let offsetWidth = this.$refs.progress.clientWidth * newValue;
      this.$refs.percentProgress.style.width = `${offsetWidth}px`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.bindEvents();
      const barWidth = this.$refs.progress.clientWidth - dotWidth;
      const offsetWidth = this.percent * barWidth;
      this.moveSilde(offsetWidth);
    });
  },
  beforeDestroy() {
    this.unbindEvents();
  },
  methods: {
    // 添加绑定事件
    bindEvents() {
      document.addEventListener("mousemove", this.barMove);
      document.addEventListener("mouseup", this.barUp);

      document.addEventListener("touchmove", this.barMove);
      document.addEventListener("touchend", this.barUp);
    },
    // 移除绑定事件
    unbindEvents() {
      document.removeEventListener("mousemove", this.barMove);
      document.removeEventListener("mouseup", this.barUp);

      document.removeEventListener("touchmove", this.barMove);
      document.removeEventListener("touchend", this.barUp);
    },
    // 点击事件
    barClick(e) {
      let rect = this.$refs.progress.getBoundingClientRect();
      let offsetWidth = Math.min(
        this.$refs.progress.clientWidth - dotWidth,
        Math.max(0, e.clientX - rect.left)
      );
      this.moveSilde(offsetWidth);
      this.commitPercent();
    },
    // 鼠标按下事件
    barDown(e) {
      this.move.status = true;
      this.move.startX = e.clientX || e.touches[0].pageX;
      this.move.left = this.$refs.progressInner.clientWidth;
    },
    // 鼠标/触摸移动事件
    barMove(e) {
      if (!this.move.status) {
        return false;
      }
      e.preventDefault();
      let endX = e.clientX || e.touches[0].pageX;
      let dist = endX - this.move.startX;
      let offsetWidth = Math.min(
        this.$refs.progress.clientWidth - dotWidth,
        Math.max(0, this.move.left + dist)
      );
      this.moveSilde(offsetWidth);
      this.commitPercent();
    },
    // 鼠标/触摸释放事件
    barUp(e) {
      this.move.status = false;
      // this.commitPercent()
    },
    // 移动滑块
    moveSilde(offsetWidth) {
      this.$refs.progressInner.style.width = `${offsetWidth}px`;
    },
    // 修改percent
    commitPercent() {
      let lineWidth = this.$refs.progress.clientWidth - dotWidth;
      let percent = this.$refs.progressInner.clientWidth / lineWidth;
      this.$emit("percentChange", percent);
    }
  }
};
</script>

<style lang="scss">
@import "scss/index.scss";
.progress {
  position: relative;
  padding: 5px;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  .progress-bar {
    height: 2px;
    width: 100%;
    background: #dfeee8;
  }
  .progress-outer {
    position: absolute;
    top: 9%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: #88d28673;
  }
  .progress-inner {
    position: absolute;
    // top: 0px;
    background: #2fd22c;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 1px;
    margin-top: -1px;
    // background: @line_color;
    .progress-dot {
      position: absolute;
      top: 50%;
      right: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $color-text-actived;
      transform: translateY(-50%);
    }
  }
}
</style>
