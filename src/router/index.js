import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import list from '@/components/list'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
      base: '/mangalist/'
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      base: '/mangalist/'
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      base: '/list/'
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      base: '/test/'
    }
  ]
})
