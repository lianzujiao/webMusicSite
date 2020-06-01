function filterSinger(singers) {
  let arr = []
  singers.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

export class Song {
  constructor({ id, name, singer, album, image, duration, url }) {
    this.id = id
    this.name = name
    this.artist = singer
    this.album = album
    this.image = image
    this.duration = duration
    this.url = url
  }
}

//播放列表
export function createPlayList(music) {
  return new Song({
    id: music._id,
    name: music.name,
    artist: music.artist,
    album: music.album,
    image: music.album.coverImg || null,
    duration: music.duration / 1000,
    url: music.src,
  })
}

export function createTopList(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.ar.length > 0 && filterSinger(music.ar),
    album: music.al.name,
    image: music.al.picUrl,
    duration: music.dt / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  })
}

// 歌曲列表数据格式化
const formatSongs = function formatPlayList(list) {
  let Songs = []
  list.forEach(item => {
    const musicData = item
    if (musicData.id) {
      Songs.push(createPlayList(musicData))
    }
  })
  return Songs
}

export const formatTopSongs = function formatTopList(list) {
  let Songs = []
  list.forEach(item => {
    const musicData = item
    if (musicData.id) {
      Songs.push(createTopList(musicData))
    }
  })
  return Songs
}

export default formatSongs
