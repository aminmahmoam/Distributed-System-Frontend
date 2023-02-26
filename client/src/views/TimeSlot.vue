<template>
    <div>
        <form>
        <input
        placeholder="userId"
        v-model="userId"
        />
        <input
        placeholder="requestId"
        v-model="requestId"
        />
        <input
        placeholder="dentistId"
        v-model="dentistId"
        />
        <input
        placeholder="issuance"
        v-model="issuance"
        />
        <input
        placeholder="date"
        v-model="date"
        />
        <input
        placeholder="clinic id"
        v-model="id"
        />
    </form>
    <button class="generateTime" @click="getTimeStops()">Generate Time</button>
    <button class="addClinic" @click="addClinic()">Add clinic</button>
    <div>
       {{newDate}}
    </div>
    <div>
      {{newBooking}}
    </div>
    <button class="book" @click="book">Book</button>
    </div>

</template>
<script>
import mqtt from '../MQTT'
import moment from 'moment'
export default {
  data() {
    return {
      id: '',
      date: '',
      newBooking: '',
      newDate: '',
      clinicInfo: '',
      openingHours: [],
      clinics: {},
      data: { message: 'Hello' },
      newClinic: ''
    }
  },
  methods: {
    addClinic: function () {
      this.newClinic = {
        id: '1',
        name: 'Your Dentist',
        owner: 'Dan Tist',
        dentists: 3,
        address: 'Spannmålsgatan 20',
        city: 'Gothenburg',
        coordinate: [
          { longitude: 11.969388 },
          { latitude: 57.707619 }
        ],
        openinghours: [
          { monday: '9:00-17:00' },
          { tuesday: '8:00-17:00' },
          { wednesday: '7:00-16:00' },
          { thursday: '9:00-17:00' },
          { friday: '9:00-15:00' }
        ]
      }
      const result = mqtt('postC', '/clinics', this.newClinic, true)
      console.log(result)
      if (result.status === 200) {
        console.log('succesfull')
      } else {
        console.log('unsuccsesfull')
      }
    },
    book: function () {
      this.newBooking = {
        userId: this.userId,
        requestId: this.requestId,
        dentistId: this.dentistId,
        issuance: this.issuance,
        date: this.newDate

      }
      const result = mqtt('book', '/bookings', this.newBooking, true)
      console.log(result)
      if (result.status === 200) {
        console.log('succesfull')
      } else {
        console.log('unsuccsesfull')
      }
    },
    getTimeStops: function () {
      var clinics = mqtt('getAllC', '/clinics', this.data)
      console.log(clinics)
      let start
      let end
      var timeStops = []
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j <= 4; j++) {
          if (j === 0) {
            const openingHours = clinics.dentists[i].openinghours.monday
            const array = openingHours.split('-')
            start = array[0]
            end = array[1]
            let startTime = moment(start, 'HH:mm')
            const endTime = moment(end, 'HH:mm')
            if (endTime.isBefore(startTime)) {
              endTime.add(1, 'day')
            }
            while (startTime <= endTime) {
              timeStops.push(new moment(startTime).format('HH:mm'))
              startTime = startTime.add(30, 'minutes')
            }
          } else
          if (j === 1) {
            const openingHours = clinics.dentists[i].openinghours.tuesday
            const array = openingHours.split('-')
            start = array[0]
            end = array[1]
            let startTime = moment(start, 'HH:mm')
            const endTime = moment(end, 'HH:mm')
            if (endTime.isBefore(startTime)) {
              endTime.add(1, 'day')
            }
            while (startTime <= endTime) {
              timeStops.push(new moment(startTime).format('HH:mm'))
              startTime = startTime.add(30, 'minutes')
            }
          } else
          if (j === 2) {
            const openingHours = clinics.dentists[i].openinghours.wednesday
            const array = openingHours.split('-')
            start = array[0]
            end = array[1]
            let startTime = moment(start, 'HH:mm')
            const endTime = moment(end, 'HH:mm')
            if (endTime.isBefore(startTime)) {
              endTime.add(1, 'day')
            }
            while (startTime <= endTime) {
              timeStops.push(new moment(startTime).format('HH:mm'))
              startTime = startTime.add(30, 'minutes')
            }
          } else
          if (j === 3) {
            const openingHours = clinics.dentists[i].openinghours.thursday
            const array = openingHours.split('-')
            start = array[0]
            end = array[1]
            let startTime = moment(start, 'HH:mm')
            const endTime = moment(end, 'HH:mm')
            if (endTime.isBefore(startTime)) {
              endTime.add(1, 'day')
            }
            while (startTime <= endTime) {
              timeStops.push(new moment(startTime).format('HH:mm'))
              startTime = startTime.add(30, 'minutes')
            }
          } else
          if (j === 4) {
            const openingHours = clinics.dentists[i].openinghours.friday
            const array = openingHours.split('-')
            start = array[0]
            end = array[1]
            let startTime = moment(start, 'HH:mm')
            const endTime = moment(end, 'HH:mm')
            if (endTime.isBefore(startTime)) {
              endTime.add(1, 'day')
            }
            while (startTime <= endTime) {
              timeStops.push(new moment(startTime).format('HH:mm'))
              startTime = startTime.add(30, 'minutes')
            }
          }
        }
      }
      console.log(timeStops)
      return timeStops
    },
    getClinics: function () {
      this.clinics = mqtt('getAllC', '/clinics', this.data)
    }
  }
}
</script>
