import * as types from './mutation-types'
// import storage from "./storage"
const mutations = {
  // 修改audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  },
  // 修改播放模式
  [types.SET_PLAYMODE](state, mode) {
    state.mode = mode
  },
  // 修改播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },
  // 修改播放列表
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist
  },
  // 修改顺序列表
  [types.SET_ORDERLIST](state, orderList) {
    state.orderList = orderList
  },
  // 修改当前音乐索引
  [types.SET_CURRENTINDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },
  //修改收藏列表
  [types.SET_COLLECTLIST](state,collectList){
    state.collectList=collectList
  },
  // 修改播放历史列表
  [types.SET_HISTORYLIST](state, historyList) {
    state.historyList = historyList
  },
  //设置当前用户
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user;
    } else {
      state.user = {
        email: '',
        password: ''
      }
    }

  },
  //判断是否已经登录
  [types.SET_ISlOGIN](state, isLogin) {
    if (isLogin == true) {
      state.isLogin = true
    } else {
      state.isLogin = false
    }
  }

  //
}

export default mutations
