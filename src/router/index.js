import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        // {
        //   path: '/home',
        //   component: resolve => require(['components/pages/home/Main'], resolve)
        // },
        {
          path: '/found',
          component: resolve => require(['components/pages/Found'], resolve),
          redirect: "/found/ranklist",
          children: [
           
            {
              path: '/found/singers',
              component: resolve => require(['components/pages/found/Singers'], resolve),
            },
            

          ]
        },
        {
          path: '/songsheet',
          meta:{
            title:"歌单列表"
          },
          component: resolve => require(['components/pages/found/Songsheet'], resolve),
        },
        {
          path: '/songDetail',
          component: resolve => require(['components/pages/songDetail/SongDet'], resolve),
          title: '歌曲详情'
        },
        {
          path: '/ranklist',
          component: resolve => require(['components/pages/found/Ranklist'], resolve),
        },
        {
          path: '/recommend/band',
          component: resolve => require(['components/pages/Remon/BandDetail'], resolve),
          title: '乐队详情'
        },
        {
          path: '/recommend/bandtag',
          component: resolve => require(['components/pages/Remon/BandTag'], resolve),
          title: '乐队风格'
        },
        {
          path: '/recommend',
          component: resolve => require(['components/pages/Recommend'], resolve),
          title: '推荐'
        },
        {
          path: '/songlist',
          title: '歌单详情',
          component: resolve => require(['components/pages/found/songsheet/Songlist'], resolve),
        },
        {
          path: '/news',
          component: resolve => require(['components/pages/News'], resolve),
          title: '趣闻'
        },
        {
          path: '/newsDetail',
          component: resolve => require(['components/pages/news/NewsDetail'], resolve),
          title: '趣闻'
        },
        {
          path: '/show',
          component: resolve => require(['components/pages/Show'], resolve),
          title: '演出'
        },
        {
          path: '/register',
          component: resolve => require(['components/pages/regis/register'], resolve),
          title: "注册"
        },
        {
          path: '/search',
          component: resolve => require(['components/pages/Search'], resolve)
        },
        {
          path: '/selfPage',
          component: resolve => require(['components/pages/regis/SelfPage'], resolve),
          title: '个人主页',
          redirect:'/selfMsg',
          children: [{
            path: '/selfMsg',
            component: resolve => require(['components/pages/regis/SelfMsg'], resolve),
            meta: {
              title: "个人信息"

            }
          }]
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

  ]
})
