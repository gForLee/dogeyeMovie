import Vue from 'vue'
import Router from 'vue-router'
import listMovie from '@/components/listMovie/listMovie'
import detailMovie from '@/components/detailMovie/detailMovie'
import castsDetail from '@/components/castsDetail/castsDetail'
import smallComment from '@/components/smallComment/smallComment'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'listMovie',
      component: listMovie
    },
    {
      path: '/detailMovie',
      name: 'detailMovie',
      component: detailMovie
    },
    {
      path: '/castsDetail/:id',
      name: 'castsDetail',
      component: castsDetail
    },
    {
      path: '/smallComment/:id',
      name: 'smallComment',
      component: smallComment
    }
  ]
})
