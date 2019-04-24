import Vue from 'vue'
import Router from 'vue-router'
import loginScreen from '@/components/login-screen'
import roomsScreen from '@/components/rooms-screen'
import chatScreen from '@/components/chat-screen'
import userService from '@/service/users-service'


Vue.use(Router)

const
  LOGIN = 'login',
  ROOMS = 'rooms',
  CHAT = 'chat'

export const ROUTE = {LOGIN, ROOMS, CHAT}

const router = new Router({
  beforeEach (to, from, next) {

  },
  routes: [
    {
      path: '/',
      name: LOGIN,
      component: loginScreen,
    },
    {
      path: '/rooms',
      name: ROOMS,
      component: roomsScreen,
    },
    {
      path: '/rooms/:id',
      name: CHAT,
      component: chatScreen,
    },

  ],
})

router.beforeEach(async (to, from, next) => {
  // `to` and `from` are both route objects
  if (to.name !== LOGIN) {
    const isLogin = await userService.isUserLogin();
    return isLogin ? next() : next({name: LOGIN});
  }
  next()

})
export default router
