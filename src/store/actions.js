import {
  clearHistoryList,
  setHistoryList,
  removeHistoryList,
  setMode,
  set_User
} from '@/util/storage'
import * as types from './mutation-types'
import * as Music from "api/music"
import {
  like,
  offLike,
  findSongs
} from "api/colSong"

function findIndex(list, music) {
  return list.findIndex(item => {
    return item._id === music._id
  })
}

//对照播放列表中与收藏表是否有相同歌曲
function checkColList(colList, playList) {
  let [collist, playlist] = [colList, playList]
  if (collist.length <= 0) {
    return false;
  }
  playlist.forEach((item, index) => {
    collist.some((li, number, array) => {
      if (item._id == li.song._id) {
        item["like"] = true;
        // array.splice(number, 1);
        return;
      }
    });
  });
  // console.log(playlist)
  return playlist
}



/**
 * 收藏与取消收藏的数据操作
 * @param {*} param0 
 * @param {*} state like?offlike 
 */
async function requestLike({
  userId,
  songId
}, state) {
  let params = {
    userId: userId,
    songId: songId
  }
  if (state == "like") {
    return await like(params)

  }
  if (state == "offLike") {
    return await offLike(params)
  }
}

//setIsLike 是否收藏
export const setIsLike = function ({
  commit,
  state,
  dispatch
}, {
  userId,
  songId,
  operation
}) {
  let result, isLike;
  switch (operation) {
    case "like":
      result = requestLike({
        userId,
        songId
      }, "like");
      isLike = true;
      break;
    case "offLike":
      result = requestLike({
        userId,
        songId
      }, "offLike");
      isLike = false;
      break;
  }
  result.then(res => {
    if (res.code == 200) {
      let list = [...state.playlist];
      // console.log(list)
      let collist = [...state.collectList]
      let colListSongs = collist.map(item => {
        return item.song
      })

      switch (operation) {
        case "like":
          let obj = {
            song: {},
            users: []
          };
          obj.users.push({
            _id: state.user.id,
            name: state.user.name
          });
          obj.song["_id"] = songId
          collist.push(obj);
          break;
        case "offLike":
          let colIndex = findIndex(colListSongs, {
            _id: songId
          });
          if (colIndex > -1) {
            collist.splice(colIndex, 1)

          };
          break;

      }
      commit(types.SET_COLLECTLIST, collist)

    
      let index = findIndex(list, {
        _id: songId
      })

      if (index > -1) {
        list[index]['like'] = isLike;

        // dispatch("setPlaylist",{list})
        commit(types.SET_PLAYLIST, list)
        commit(types.SET_ORDERLIST, list)
      }
    }
  })
}

// 设置播放列表
export const setPlaylist = function ({
  commit,
  state,
  getters
}, {
  list
}) {
  let listCheck = checkColList(getters.collectList, list)
  // console.log(listCheck)
  if (listCheck) {
    commit(types.SET_PLAYLIST, listCheck)
    commit(types.SET_ORDERLIST, listCheck)
  } else {
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_ORDERLIST, list)
  }



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
  commit
}, music) {
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
