import * as ColSong from "api/colSong";
import * as ColSinger from "api/colSinger";


function FindIndex(music, list) {
  return list.findIndex(li => {
    return li._id === music._id
  })
}

//收藏
export function collectSong(music, {
  list,
  user
}) {

  let index = FindIndex(music, list)
  if (index < 0) {
    return new Promise((resolve, reject) => {
      ColSong.like({
        songId: music._id,
        userId: user.id
      }).then(res => {
        if (res.code == 200) {
          list.unshift(music)
          resolve(list)
        }
      })
    })


  }

}

//取消收藏
export function nonCollect(music, {
  list,
  user
}) {
  let index = FindIndex(music, list)
  if (index >= 0) {
    return new Promise((resolve, reject) => {
      ColSong.offLike({
        songId: music._id,
        userId: user.id
      }).then(res => {
        if (res.code == 200) {
          list.splice(index, 1)
          resolve(list)
        }
      })
    })
  }
}
//关注
export function collectSinger(singer, {
  list,
  user
}) {

  let index = FindIndex(singer, list)
  if (index < 0) {
    return new Promise((resolve, reject) => {
      ColSinger.like({
        singerId: singer._id,
        userId: user.id
      }).then(res => {
        if (res.code == 200) {
          list.unshift(singer)
          resolve(list)
        }
      })
    })

  }

}

//取消关注
export function nonCollectSinger(singer, {
  list,
  user
}) {
  let index = FindIndex(singer, list)
  if (index >= 0) {
    return new Promise((resolve, reject) => {
      ColSinger.offLike({
        singerId: singer._id,
        userId: user.id
      }).then(res => {
        if (res.code == 200) {
          list.splice(index, 1)
          resolve(list)
        }
      })
    })
  }
}
