<template>
  <div>
    <!-- Title -->
    <div class="map-body">
     <p style="color: #748FC4;" class="map-text">FIND THE LOCATION OF YOUR CLINIC AND BOOK AN APPOINTMENT.</p>
    </div>
<div style="flex-direction: column;">

    <div style="display: flex;
    flex-direction: row;
    justify-content: center;" >
      <!-- Show Map -->
     <div style="position: absolute; margin-right: 50%">
      <mapField></mapField>
     </div>
     <div>
      <!-- Show Different Clinics -->
     <div style="flex-direction: column; margin-left: 60%; padding: 7.5px"  v-for="clinic in clinics" v-bind:key="clinic._id" >
        <clinicSlot style="width: 550px;" v-bind:clinic="clinic" v-on:book-slot="startBooking"/>
    </div>
  </div> 
    </div>

    <!-- Show booking slots -->
    <div id="booking" v-if="slotsDisplayed">
      <div class="tabs">
        <TabNav :tabs="this.tabs" :selected="selected" @selected="setSelected">
          <Tab :isSelected="selected === 'Dentist1'">
              <ul class="list-of-courses-ul">
                <li class="list-of-courses-li" v-for="slot in dL1" v-bind:key="slot">
                 <button class="slot"
                 @click="webcamSendRequestButton($event)"
                 :value="slot">
                 {{ slot }}</button>
                </li>
              </ul>
          </Tab>
          <Tab :isSelected="selected === 'Dentist2'">
              <ul class="list-of-courses-ul">
                <li class="list-of-courses-li" v-for="slot in dL2" v-bind:key="slot">
                 <button class="slot"
                 @click="webcamSendRequestButton($event)"
                 :value="slot">
                 {{ slot }}</button>
                </li>
              </ul>
          </Tab>
          <Tab :isSelected="selected === 'Dentist3'">
              <ul class="list-of-courses-ul">
                <li class="list-of-courses-li" v-for="slot in dL3" v-bind:key="slot">
                 <button class="slot"
                 @click="webcamSendRequestButton($event)"
                 :value="slot">
                 {{ slot }}</button>
                </li>
              </ul>
          </Tab>
        </TabNav>
      </div>

      <!-- Show Calendar -->
      <div class="calendarOutline">
        <div class="calendar">
        <DatePicker class="v-calendar"
        v-model="date"
        mode="date"
        is-inline
        title-position="left"
        :min-date='new Date()'
        :disabled-dates='{ weekdays: [1, 7] }'
        :is-expanded="$screens({ default: true, lg: false })"
        :attributes='attributes'
        @dayclick='dayClicked'
      />
      </div>

      </div>

    </div>
</div>

  </div>
</template>

<script>
import TabNav from '../components/TabNav.vue'
import Tab from '../components/Tab.vue'
import clinicSlot from '../components/ClinicSlots.vue'
import mapField from '../components/Map.vue'
import { Calendar, DatePicker } from 'v-calendar';
import mqtt from '../MQTT'
import router from '../router'

export default {
  name: 'home',
  props: ['home'],
  components: { TabNav, Tab, clinicSlot, mapField, Calendar, DatePicker},
  mounted() {
    this.getClinics();
  },
  data() {
    return {
      dL1: [],
      Dentist1: [],
      dL2: [],
      dL3: [],
      tabs: [],
      selected: "Dentist1",
      message: 'none',
      date: new Date(),
      selectedDay: new Date(),
      clinics: '',
      clinicName: '',
      slotsDisplayed: false,

      fulls: []
    }
  },
  computed: {
    attributes() {
      return this.fulls.map(f => ({
        key: `full.${f.id}`,
        highlight: "red",
        dates: f.date,
        customData: f,
        popover: {
          label: f.description,
          visibility: 'focus',
          hideIndicator: true,
        }
      }));
    }
  },
  watch: {
    selectedDay(newValue, oldValue) {
      this.startBooking(this.clinicName)
    }
  },
  methods: {
   addClinic: function () {
      this.newClinic = {
        id: '4',
        name: 'Lisebergs Dentists',
        owner: 'Glen Hysén',
        dentists: 3,
        address: 'Liseberg',
        city: 'Gothenburg',
        coordinate: [
          { longitude: 11.991153 },
          { latitude: 57.694723 }
        ],
        openinghours: [
          { monday: '10:00-18:00' },
          { tuesday: '10:00-18:00' },
          { wednesday: '10:00-18:00' },
          { thursday: '10:00-18:00' },
          { friday: '10:00-18:00' }
        ]
      }
      const result = mqtt('postC', '/clinics', this.newClinic, true)
      if (result.status === 200) {
        console.log('succesfull')
      } else {
        console.log('unsuccsesfull')
      }
    },
    
    webcamSendRequestButton(e) {
     if (!this.selectedDay.date) {
      let date = new Date(this.selectedDay)
      date = date.toISOString().replace('.000Z', '')
      router.push({ path: '/booking', query: { name: this.clinicName, date: date, time: e.target.textContent, dentist: this.selected} })
     } else {
      router.push({ path: '/booking', query: { name: this.clinicName, date: this.selectedDay.id, time: e.target.textContent, dentist: this.selected} })
     }

  },
    setSelected(Tab) {
      this.selected = Tab
    },
    startBooking(name) {
      this.slotsDisplayed = true
      setTimeout(() =>{
        let dateStr
      let date 
      let array
      let day
      if(this.selectedDay.isDisabled !== false && this.selectedDay.isDisabled) {
        this.dL1 = []
        this.dL2 = []
        this.dL3 = []
      } else {

      if (!this.selectedDay.date) {
        dateStr = this.selectedDay
        date = new Date(dateStr).toISOString()
        day = dateStr.getUTCDay() - 1

      } else {
        date = this.selectedDay.id
        array = this.selectedDay.ariaLabel.split(',')
        day = array[0]
      }
      document.getElementById('booking').scrollIntoView({
        behavior: "smooth"
      });
      this.clinicName = name
      let result = this.getTimeStops(day, name)
      setTimeout(() => {
        this.removeBooked(date, result, name)
      }, 50)
      }


      }, 100)
      
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

    //Get all available clinics
    getClinics() {
      let data = {
        token: localStorage.getItem('loginToken')
      }
      let response = mqtt('getAllC', '/clinics', data, true)
      setTimeout(() => {
        this.clinics = response[0].data.dentists
      }, 1000)
    },
    dayClicked(day) {
      this.selectedDay = day;
    },
    removeBooked: function (date, list, clinic) {
      const data = {}
      let result = mqtt('getAllBookingsOfClinic', '/bookings', data, true)
      setTimeout(() => {
        let bookings = result[0].data.bookings
        let size = bookings.length 
        
        for (let i = size - 1; i >= 0; i--) {
          if (bookings[i].date.substr(0,10) != date.substr(0,10) || bookings[i].clinicName !== clinic) {
            bookings.splice(i, 1)
          }
        }
        for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].dentistId === 1) {
          const index = this.dL1.indexOf(bookings[i].time)
          if(index !== -1) {
            this.dL1.splice(index, 1)
          }
        } else if (bookings[i].dentistId === 2) {
          const index = this.dL2.indexOf(bookings[i].time)
          if(index !== -1) {
            this.dL2.splice(index, 1)
          }
        } else if (bookings[i].dentistId === 3) {
          const index = this.dL3.indexOf(bookings[i].time)
          if(index !== -1) {
            this.dL3.splice(index, 1)
          }
        }
      }

      var today = new Date();
      console.log(today.getMonth()+1, today.getDate())
      var todayDay = today.getDate()
      var todayMonth = today.getMonth()+1
      var time = today.getHours() + ":" + today.getMinutes()
      if (todayDay < 10) {
        todayDay = '0' + todayDay;
      }
      if (todayMonth < 10) {
        todayMonth = `0${todayMonth}`;
      }
      var todayDate = today.getFullYear()+'-'+todayMonth+'-'+todayDay;
      console.log(date.substr(0,10), todayDate)
      if(date.substr(0,10) === todayDate) {
        for (let i = this.dL1.length; i >= 0; i--) {
          if (this.dL1[i] < time) {
            this.dL1.splice(i, 1)
          }
        }
        for (let i = this.dL2.length; i >= 0; i--) {
          if (this.dL2[i] < time) {
            this.dL2.splice(i, 1)
          }
        }
        for (let i = this.dL3.length; i >= 0; i--) {
          if (this.dL3[i] < time) {
            this.dL3.splice(i, 1)
          }
        }

      }
      }, 1000)
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
      setTimeout(() => {
        if (result.status === 201) {
          console.log('succesfull')
        } else {
          console.log('unsuccsesfull')
        }
      }, 1000)
    },

    getTimeStops: function (day, clinic) {
      const clinics = mqtt('getAllC', '/clinics', this.data, true)
      let start
      let end
      let openingHours
      this.clinicName = clinic
      const finalSlots = []
      setTimeout(() => {
        if(!clinics[0].data.dentists) {
          localStorage.removeItem('loginToken')
        } else {
        const resultClinic = clinics[0].data.dentists
        for (let i = 3; i >= 0; i--) {
          if (resultClinic[i].name !== clinic) {
            resultClinic.splice(i, 1)
          }
        }
        if (day === 'Monday' || day === 0) {
          openingHours = resultClinic[0].openinghours[0].monday
        } else
        if (day === 'Tuesday' || day === 1) {
          openingHours = resultClinic[0].openinghours[1].tuesday
        } else
        if (day === 'Wednesday' || day === 2) {
          openingHours = resultClinic[0].openinghours[2].wednesday
        } else
        if (day === 'Thursday' || day === 3) {
          openingHours = resultClinic[0].openinghours[3].thursday
        } else
        if (day === 'Friday' || day === 4) {
          openingHours = resultClinic[0].openinghours[4].friday
        }
        const timeStopsD1 = []
        const timeStopsD2 = []
        const timeStopsD3 = []
        const array = openingHours.split('-')
        start = array[0]
        end = array[1]
        let startTime = moment(start, 'HH:mm')
        const endTime = moment(end, 'HH:mm')
        const breakS = '12:00'
        const breakE = '13:30'
        let breakStart = moment(breakS, 'HH:mm')
        const breakEnd = moment(breakE, 'HH:mm')
        if (endTime.isBefore(startTime)) {
          endTime.add(1, 'day')
        }
        while (startTime <= endTime) {
          timeStopsD1.push((new moment(startTime).format('HH:mm')))
          timeStopsD2.push((new moment(startTime).format('HH:mm')))
          timeStopsD3.push((new moment(startTime).format('HH:mm')))
          startTime = startTime.add(30, 'minutes')
        }
        while (breakStart < breakEnd) {
          const index1 = timeStopsD1.indexOf((new moment(breakStart).format('HH:mm')))
          const index2 = timeStopsD2.indexOf((new moment(breakStart).format('HH:mm')))
          const index3 = timeStopsD3.indexOf((new moment(breakStart).format('HH:mm')))
          if (index1 > -1) {
            timeStopsD1.splice(index1, 1)
          }
          if (index2 > -1) {
            timeStopsD2.splice(index2, 1)
          }
          if (index3 > -1) {
            timeStopsD3.splice(index3, 1)
          }
          breakStart = breakStart.add(30, 'minutes')
        }
        this.tabs = []
        for (let j = 0; j < resultClinic[0].dentists; j++) {
          let tab = 'Dentist' + (j+1)
          this.tabs.push(tab)
          this.tab = timeStopsD1
          if(resultClinic[0].dentists === 1) {
            this.dL1 = timeStopsD1
            finalSlots.push(timeStopsD1)
          } else if(resultClinic[0].dentists === 2) {
            this.dL1 = timeStopsD1
            this.dL2 = timeStopsD2
            finalSlots.push(timeStopsD1)
            finalSlots.push(timeStopsD2)
          } else if(resultClinic[0].dentists === 3) {
            this.dL1 = timeStopsD1
            this.dL2 = timeStopsD2
            this.dL3 = timeStopsD3
            finalSlots.push(timeStopsD1)
            finalSlots.push(timeStopsD2)
            finalSlots.push(timeStopsD3)
          }
        }
        }
      }, 1000)
      return finalSlots
    }
  }
}
</script>

<style>


.calendarOutline {
  background-color: #748FC4;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
  padding: 15px;
  margin-left: 20px;
  margin-right: 20px;
  height: 400px;
  align-content: space-between;
}
.calendar {
  width: 600px;
  height: 00px;
  padding-left: 20px;
  padding-right: 20px;
}
.calendar tr>td:first-child + td{
   pointer-events: none;
   color: red;
}

.slot {
    margin-left: 5px;
     margin-bottom: 5px;
    display:inline-block;
    text-align: center;
    box-sizing: border-box;
    height: 30px;
    background-color: #748FC4;
    color: #ffffff;
    border-radius: 23px;
    cursor: pointer;
    border: 2px solid #748FC4;
    box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
  }
  .slot:hover {
    opacity: 0.9;
  }
.clinic-box {
    height: auto;
    margin-top: 15px;
    padding-top: 11px;
  width: 450px;
  color:#748FC4;
  background: #ffffff;
  
  border-radius: 10px 10px 10px 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
  padding-bottom: 3px;
}

.list-of-courses-li {
  display: inline-block;
  margin: 25px;

}
#booking {
  margin-top: 140px;
  display: flex;
  flex-direction: row;
  justify-content: center;

}
.tabs {
    background: #ffffff;
    border-radius: 10px 10px 10px 10px;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
    padding-right: 10px;
    margin-left: 40px;
}
.map{
    margin-top: 5%;
    margin-left: -50%;
}
.map-text{
    margin-top: 3%;
    font-size: 30px;
}
.middle-part {
    margin-left: 30%;
}
.empty-box {
  box-sizing: border-box; 
  width: 100%;
  margin-bottom: 150px;
  margin-top: 150px;
}
</style>
