<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
     <!--播放器-->
    <audio ref="mmPlayer"></audio>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import { mapMutations, mapActions } from 'vuex';
import * as user from "api/user"
export default {
  name: 'App',
  created(){
    // 设置audio元素
    this.$nextTick(() => {
      this.setAudioele(this.$refs.mmPlayer)
    })
    // console.log(localStorage.user)
  if(localStorage.user){
    const decode=jwt_decode(localStorage.user);
    // console.log(localStorage.user)
    this.$store.dispatch("setUser",decode)
  }

  },
  methods:{
    ...mapMutations({
      setAudioele: 'SET_AUDIOELE',

    }),
  },
  mounted(){
   
  }
}
</script>

<style lang="scss">
@import 'scss/index.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
*,html,body{
  margin: 0;
  padding: 0;
}
  audio {
    position: fixed;
  }
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
