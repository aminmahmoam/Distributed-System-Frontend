<template>
    <!-- Booking history -->
    <div>
        <div class="map-body">
    <p style="color: #748FC4; font-style: bold;" class="map-text">MY BOOKINGS</p>
  </div>
    <div id="bookings-box">
        <div style="text-align: center; width: 100%;" v-for="booking in bookings" v-bind:key="booking">
          <div class="book-box">
          <b-row>
            <b-col>
                <h>Date: {{booking.date.substr(0,10)}}</h>
            </b-col>
            <b-col>
                <h>Time: {{booking.time}}</h>
            </b-col>
            <b-col>
                <h>Clinic: {{booking.clinicName}}</h>
            </b-col>
            <b-col>
                <h>Dentist: Dentist{{booking.dentistId}}</h>
            </b-col>
        </b-row>
          </div>

        </div>
    </div>
</div>
</template>

<script>
import book from '../components/Book.vue'
import mqtt from '../MQTT'
export default {
  components: { book },
  data() {
    return {
      message: 'none',
      bookings: [],
      newBooking: ''
    }
  },
  mounted() {
    this.getAllBookings()
  },
  methods: {
    parseJwt(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      let user = JSON.parse(jsonPayload)
      return user

    },
    getAllBookings() {
      let user = this.parseJwt(localStorage.loginToken)
      let data = {
        token: localStorage.getItem('loginToken')
      }
      let result = mqtt('get', `/users/${user._id}/bookings`, data, false)
      setTimeout(() => {
        if (result[0].data === '401 unauthorized') {
        localStorage.removeItem('loginToken')
      } else if (result[0].data.bookings) {
        this.bookings = result[0].data.bookings
      } else {
        alert('Something went wrong! Plaese try again later.')
      }
        
      }, 1000)
    },
    // This method is only for the sake of saving a booking for a user and test if it is stored in the database
    // This method should propably be in the Bookins.vue pages
    addBooking() {
      setTimeout(() => {
        this.newBooking = {
          userId: 12,
          reuestId: 1,
          dentistId: 1,
          issuance: 1,
          date: '2022-10-11'
        }
      }, 1000)
      const result = mqtt('postBookingForUser', '/users/6391edbcdce1167c194f2e35/bookings', this.newBooking, true)
      if (result.status === 201) {
        console.log('succesfull')
      } else {
        console.log('unsuccsesfull')
      }
    }
    
  }
}
</script>

<style>
#bookings-box {
    margin-top: 3rem;
    box-sizing: border-box;
    height: auto;
    border-radius: 25px;
    text-align: center;
    margin-left: 18%;
    margin-right: 18%;
    background: #ffffff;
    padding: 40px;
    color: #748FC4;
    box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
    padding: 20px;
}
.book-box {
    height: auto;
    margin-top: 15px;
    padding-top: 11px;
    color:#748FC4;
    background: #F0F5FF;
    border-radius: 10px 10px 10px 10px;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
    padding-bottom: 3px;
    margin-left: 1%;
    margin-right: 1%;
}
</style>
