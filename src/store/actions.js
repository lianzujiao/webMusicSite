import {
  clearHistoryList,
  setHistoryList,
  removeHistoryList,
  setMode,
  set_User,
  clearUserMsg,

} from '@/util/storage'

import {
  collectSong,
  nonCollect,
  collectSinger,
  nonCollectSinger,
} from "@/util/request"

import * as types from './mutation-types'

function findIndex(list, music) {
  return list.findIndex(item => {
    return item._id === music._id
  })
}

//设置收藏列表
export const setCollectList = function ({
  commit
}, {
  list
}) {
  commit(types.SET_COLLECTLIST, list)
}
//设置歌手关注列表
export const setCollectSingerList = function ({
  commit
}, {
  list
}) {
  commit(types.SET_COLLECTSINGERS, list)
}

//收藏歌曲
export const setCollect = async function ({
  commit,
  state
}, {
  music
}) {
  let list = [...state.collectList],
    user = JSON.parse(JSON.stringify(state.user));

  let newList = await collectSong(music, {
    list: list,
    user: user
  });
  commit(types.SET_COLLECTLIST, newList)
}
//取消收藏
export const setNonCollect = async function ({
  commit,
  state
}, {
  music
}) {
  let list = [...state.collectList],
    user = JSON.parse(JSON.stringify(state.user))
  let newList = await nonCollect(music, {
    list: list,
    user: user
  })
  commit(types.SET_COLLECTLIST, newList)
}
//取消关注歌手
export const setNonCollectSinger = async function ({
  commit,
  state
}, {
  singer
}) {
  let list = [...state.collectSingers],
    user = JSON.parse(JSON.stringify(state.user))
    
  let newList = await nonCollectSinger(singer, {
    list: list,
    user: user
  })
  commit(types.SET_COLLECTSINGERS, newList)
}
//关注歌手
export const setCollectSinger = async function ({
  commit,
  state
}, {
  singer
}) {
  let list = [...state.collectSingers],
    user = JSON.parse(JSON.stringify(state.user));

  let newList = await collectSinger(singer, {
    list: list,
    user: user
  });
  commit(types.SET_COLLECTSINGERS, newList)
}




// 设置播放列表
export const setPlaylist = function ({
  commit,
  state,
  getters
}, {
  list
}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ORDERLIST, list)
}

// 选择播放（会更新整个播放列表）
export const selectPlay = function ({
  commit
}, {
  list,
  index
}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ORDERLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_PLAYING, true)
}
// 选择播放（会插入一条到播放列表）
export const selectAddPlay = function ({
  commit,
  state
}, music) {
  let list = [...state.playlist]
  // 查询当前播放列表是否有代插入的音乐，并返回其索引值
  let index = findIndex(list, music)
  // 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引值
  if (index > -1) {
    commit(types.SET_CURRENTINDEX, index)
  } else {
    list.unshift(music)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_ORDERLIST, list)
    commit(types.SET_CURRENTINDEX, 0)
  }
  commit(types.SET_PLAYING, true)
}

// 清空播放列表
export const clearPlayList = function ({
  commit
}) {
  commit(types.SET_PLAYING, false)
  commit(types.SET_CURRENTINDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_ORDERLIST, [])
}

//退出登录
export const clearUser = function ({
  commit
}) {
  commit(types.SET_USER, clearUserMsg())
}

// 删除正在播放列表中的歌曲
export const removePlayListItem = function ({
  commit,
  state
}, {
  list,
  index
}) {
  let currentIndex = state.currentIndex
  if (index < state.currentIndex || list.length === state.currentIndex) {
    currentIndex--
    commit(types.SET_CURRENTINDEX, currentIndex)
  }
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ORDERLIST, list)
  if (!list.length) {
    commit(types.SET_PLAYING, false)
  } else {
    commit(types.SET_PLAYING, true)
  }
}
// 设置播放历史
export const setHistory = function ({
  commit
}, music) {
  commit(types.SET_HISTORYLIST, setHistoryList(music))
}
// 删除播放历史
export const removeHistory = function ({
  commit,state
}, music) {
  // let list=[...state.historyList]
  commit(types.SET_HISTORYLIST, removeHistoryList(music))
}
// 清空播放历史
export const clearHistory = function ({
  commit
}) {
  commit(types.SET_HISTORYLIST, clearHistoryList())
}
// 设置播放模式
export const setPlayMode = function ({
  commit
}, mode) {
  commit(types.SET_PLAYMODE, setMode(mode))
}

//设置登录token
export const setUser = function ({
  commit
}, user) {
  commit(types.SET_USER, user)
}
