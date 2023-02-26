import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TimeSlot from './views/TimeSlot.vue'
import Account from './views/Account.vue'
import Booking from './views/Booking.vue'
import Bookings from './views/Bookings.vue'


Vue.use(Router)

//Address routes of different views
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/timeSlot',
      name: 'TimeSlot',
      component: TimeSlot
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: Bookings
    }

  ]
})
