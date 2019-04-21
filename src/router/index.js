import Vue from 'vue'
import Router from 'vue-router'
import loginScreen from '@/components/login-screen'
import roomsScreen from '@/components/rooms-screen'
import chatScreen from '@/components/chat-screen'

Vue.use(Router)

const
  LOGIN = 'login',
  ROOMS = 'rooms',
  CHAT = 'chat'

export const ROUTE = {LOGIN, ROOMS, CHAT};

;export default new Router({
  routes: [
    {
      path: '/',
      name: LOGIN,
      component: loginScreen
    },
    {
      path: '/rooms',
      name: ROOMS,
      component: roomsScreen
    },
    {
      path: '/rooms/:id',
      name: CHAT,
      component: chatScreen
    }
  ]
})
