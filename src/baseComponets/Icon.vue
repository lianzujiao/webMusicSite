<!-- icon 组件 -->
<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
    },
  
  },
  methods: {
    getIconCls() {
      return `icon${this.type}`
    },
  
    onClick(e) {
      this.$emit('click', e)
    }
  },
  render() {
    const Icon = (
      <i
        onClick={this.onClick}
        class={`iconfont ${this.getIconCls()}`}
       
      />
    )
    return Icon
  }
}
</script>

<style lang="scss">
.iconfont {
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  line-height: 1;
  vertical-align: baseline;
  text-transform: none;
  speak: none;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
