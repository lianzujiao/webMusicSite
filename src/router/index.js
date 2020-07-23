import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Alert from "element-ui"
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
          path: '/songsheet',
          meta: {
            title: "歌单列表"
          },
          component: resolve => require(['components/pages/found/Songsheet'], resolve),
        },
        {
          path: '/songDetail',
          component: resolve => require(['components/pages/songDetail/SongDet'], resolve),
          meta: {
            title: '歌曲详情'
          }

        },
        {
          path: '/ranklist',
          component: resolve => require(['components/pages/found/Ranklist'], resolve),
          meta: {
            title: "榜单详情"
          }
        },

        {
          path: '/bands',
          component: resolve => require(['components/pages/Remon/Bands'], resolve),
          meta: {
            title: "乐队列表"
          }
        },
        {
          path: '/singer',
          component: resolve => require(['components/pages/artists/Singer'], resolve),
          meta: {
            title: "乐队详情"
          }
        },
        {
          path: '/albumDetail',
          component: resolve => require(['components/pages/artists/AlbumDetail'], resolve),
          meta: {
            title: "专辑详情"
          }
        },
        {
          path: '/recommend',
          component: resolve => require(['components/pages/Recommend'], resolve),
          meta:{
            title: 'SongTaste'

          }
        },
        {
          path: '/songlist',
          meta:{
          title: '歌单详情',

          },
          component: resolve => require(['components/pages/found/songsheet/Songlist'], resolve),
        },
        {
          path: '/news',
          component: resolve => require(['components/pages/news/News'], resolve),
          meta:{
            title: '趣闻'

          }
        },
        {
          path: '/newsTypes',
          component: resolve => require(['components/pages/news/NewsTypes'], resolve),
          meta: {
            title: "新闻分类"
          }
        },
        {
          path: '/newsDetail',
          component: resolve => require(['components/pages/news/NewsDetail'], resolve),
          meta:{
            title: '趣闻'

          }
        },
        {
          path: '/show',
          component: resolve => require(['components/pages/show/Show'], resolve),
          meta: {
            title: '演出'

          }
        },
        {
          path: '/showDetail',
          component: resolve => require(['components/pages/show/ShowDetail'], resolve),
          meta: {
            title: "演出详情"
          }
        },
        {
          path: '/showList',
          component: resolve => require(['components/pages/show/ShowList'], resolve),
          meta: {
            title: "演出列表"
          }
        },
        {
          path: '/register',
          component: resolve => require(['components/pages/regis/register'], resolve),
          meta: {
            title: "搜索"
          },
        },
        {
          path: '/search',
          component: resolve => require(['components/pages/Search'], resolve),
          meta: {
            title: "搜索"
          }
        },
        {
          path: '/selfPage',
          name: "self",
          component: resolve => require(['components/pages/regis/SelfPage'], resolve),
          meta: {
            title: '个人主页',
          },
          redirect: '/selfMsg',
          children: [{
              path: '/selfMsg',
              name: "self",
              component: resolve => require(['components/pages/regis/SelfMsg'], resolve),
              meta: {
                title: "个人信息"
              }
            },
            {
              path: '/selfLike',
              name: "self",
              component: resolve => require(['components/pages/regis/SelfLike'], resolve),
              meta: {
                title: "我的收藏"
              }
            },

          ]
        }

      ]
    },
    {
      path: '/recommend',
      component: resolve => require(['components/pages/Recommend'], resolve)
    },



    // {
    //   path:'/songlist',
    //   component:resolve=>require(['components/pages/found/songsheet/Songlist'],resolve),
    // }

  ],
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

//路由守卫
router.beforeEach((to, from, next) => {
  // 添加页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
  // token判定
  // const isLogin = localStorage.eleToken;
  // if (to.path == '/login' || to.path == '/register') {
  //     next()
  // } else {
  //     if (isLogin) {
  //         next()
  //     } else {
  //         next('/login')
  //     }
  // }
})
export default router
