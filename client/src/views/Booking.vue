<template>
    <!-- Booking confirmation box -->
    <div class="booking-box">
    <p style="margin-bottom: 60px; font-size: 18px; color: #748FC4 ">Please confirm the following details below</p>
        <h1 style="margin-top: 20px; margin-bottom: -1px;">{{this.clinicName}}</h1>
        <h style="font-size: 24px;">{{this.dentist}}</h>
        <h2>{{this.date}}</h2>
        <h1>{{this.time}}</h1>
        <div class="book-button" style="margin-top: 50px; color: #748FC4" @click="bookNow"><h class="edit-text">Book Now</h></div>
        <button class="btn" @click="test">Test</button> 
    </div>
</template>

<script>
import Home from './Home.vue'
import mqtt from '../MQTT'
import Swal from 'sweetalert2'
import router from '../router'

export default {
  components: { Home },
  data() {
    return {
      id: '',

      date: '',
      clinicName: '',
      time: '',
      dentist: '',

      newBooking: '',
      newDate: '',
      clinics: '',
      name: '',
      address: '',

      bookResult: Boolean,
      testTime: null
    }
  },
  mounted() {
    // this.getNames()
    this.showData()
  },
  methods: {
    test() {
      let newBooking = {
        // userId: this.userId,
        requestId: this.generateId(30),
        dentistId: +this.dentist.substr(7, 7),
        issuance: this.generateId(30),
        date: this.date,
        time: this.time.substr(1, 5),
        clinicName: this.clinicName,

        token: localStorage.getItem('loginToken')

      }
      let user = this.parseJwt(localStorage.loginToken)

        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
        mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
      
    },
    
    // Get clinic data
    getNames() {
      this.clinics = mqtt('getAllC', '/clinics', this.data)
      setTimeout(() => {
        this.name = this.clinics[0].data.dentists[0].name
        this.address = this.clinics[0].data.dentists[0].address
      }, 1000)
    },
    showData() {
      console.log(this.$route.query)
      let result = this.$route.query.date
      this.date = result.substr(0, 10)
      this.clinicName = this.$route.query.name
      this.time = this.$route.query.time
      this.dentist = this.$route.query.dentist
    },

    // Initiate booking
    bookNow() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-cancel'
        },
        buttonsStyling: true
      })
      swalWithBootstrapButtons.fire({
        text: 'Are you sure you want to book this timeslot?',
        showCancelButton: true,
        confirmButtonText: 'Book',
        cancelButtonText: 'Cancel',
        cancelButtonColor: 'Red',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.book()
          setTimeout(() => {
            if (this.bookResult === true) {
              swalWithBootstrapButtons.fire({
                title: 'Booked',
                text: 'The time has been booked!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.assign("/")
                }
              })
            } else {
              swalWithBootstrapButtons.fire({
                title: 'Unsuccessful',
                text: 'Something went wrong!',
                icon:'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.assign("/")
                }
              })
            }
          }, 1000)
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Booking is canceled!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.assign("/")
            }
          })
        }
      })
    },
    // Create booking ID
    generateId(length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    parseJwt(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      let user = JSON.parse(jsonPayload)
      return user

    },
    book() {
      let newBooking = {
        // userId: this.userId,
        requestId: this.generateId(30),
        dentistId: +this.dentist.substr(7,7),
        issuance:  this.generateId(30),
        date: this.date,
        time: this.time.substr(1,5),
        clinicName: this.clinicName,

        token: localStorage.getItem('loginToken')

      }
      let user = this.parseJwt(localStorage.loginToken)
      const result = mqtt('postBookingForUser', `/users/${user._id}/bookings`, newBooking, false)
      setTimeout(() => {
        if (result[0].data.bookings) {
          console.log('succesfull')
          this.bookResult = true
        } else if (result[0].data === '401 unauthorized') {
          localStorage.removeItem('loginToken')
          setTimeout(() => {
            console.log('unsuccsesfull')
            this.bookResult = false
          }, 1000)
        } else if (result[0].data.message === "Sorry, out of service right now") {
          alert('Sorry, out of service right now. Please try again in a short while!')
        }
         else {
          console.log('unsuccsesfull')
          this.bookResult = false
        }
        console.log(this.bookResult)
        // return finalResult

      }, 1000)
    }
  }
}

</script>

<style>
    .booking-box {
    margin-top: 3rem;
    box-sizing: border-box;
    height: auto;
    border-radius: 25px;
    text-align: center;
    margin-left: 30%;
    margin-right: 30%;
    background: #ffffff;
    padding: 40px;
    color: #4B6AA7;
    box-shadow: 4px 10px 10px rgba(143, 145, 190, 0.25);
    }
    .book-button {
    padding: 14px;
    display:inline-block;
    text-align: center;
    margin-top: 1rem;
    box-sizing: border-box;
    height: auto;
    background-color: #748FC4;
    color: #ffffff;
    border-radius: 23px;
    cursor: pointer;
    border: 2px solid #748FC4;
    box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
    }
    .edit-text {
    color: #ffffff;
    }
    .book-button:hover {
    background-color: #71C68A;
    border: 2px solid #71C68A;
    }
</style>
