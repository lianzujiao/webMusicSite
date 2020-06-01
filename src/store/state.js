import { playMode } from '@/config'
import { getHistoryList, getMode, getUserId } from '@/util/storage'

const state = {
  audioEle: null, // audio元素
  mode: Number(getMode()) || playMode.listLoop, // 播放模式，默认列表循环
  playing: false, // 播放状态
  playlist: [], // 播放列表
  orderList: [], // 顺序列表
  currentIndex: -1, // 当前音乐索引
  historyList: getHistoryList() || [], // 播放历史列表
  user:{email:'',password:''} ,//用户登录信息
  isLogin:null, //是否已经登录
  collectList:[],//收藏列表
  userToken:''
}

export default state
