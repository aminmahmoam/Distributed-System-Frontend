<template>
<div>
  <!-- Title -->
    <div class="map-body">
    <p style="color: #748FC4; font-style: bold;" class="map-text">ACCOUNT DETAILS</p>
  </div>
    <!-- Accoutn details box -->
    <div class="box">
        <b-row style="font-size: 17px;">
            <b-col style="text-align: left">
            <div style="margin-bottom: 12px;">
                <h>First name</h>
            </div>
            <div style="margin-bottom: 12px;">
                <h>Last Name</h>
            </div>
            <div style="margin-bottom: 12px;">
                <h>Email</h>
            </div>
            <div style="margin-bottom: 12px;">
                <h>Password</h>
            </div>
            </b-col>
            <b-col style="text-align: center;">
                <div style="margin-bottom: 12px;">
                    <h>:</h>
                </div>
                <div style="margin-bottom: 12px;">
                    <h>:</h>
                </div>
                <div style="margin-bottom: 12px;">
                    <h>:</h>
                </div>
                <div style="margin-bottom: 12px;">
                    <h>:</h>
                </div>
            </b-col>
            <b-col style="text-align: left" v-if="editDetails === false">
                <div style="margin-bottom: 12px;">
                    <h>{{firstName}}</h>
                </div>
                <div style="margin-bottom: 12px;">
                    <h>{{lastName}}</h>
                </div>
                <div style="margin-bottom: 12px;">
                    <h>
                        {{emailAddress}}
                    </h>
                </div>
                <div style="margin-bottom: 12px;">
                    <h>******</h>
                </div>
            </b-col>

            <!-- Edit account details -->
            <b-col style="text-align: left;  font-size: 17px;" v-if="editDetails === true">
                <div style="margin-bottom: 5px;">
                    <input style="width: 300px;" placeholder="First Name" v-model="firstName">
                </div>
                <div style="margin-bottom: 5px;">
                    <input style="width: 300px;" placeholder="Last Name" v-model="lastName">
                </div>
                <div style="margin-bottom: 5px;">
                    <input style="width: 300px;" placeholder="Email" v-model="emailAddress">
                </div>
                <div style="margin-bottom: 5px;">
                    <input style="width: 300px;" placeholder="Password" >
                </div>
                <div style="margin-bottom: 5px;">
                    <input style="width: 300px;" placeholder="Repeat password">
                </div>
            </b-col>
        </b-row>
        <!-- Buttons -->
        <div v-if="editDetails === false" class="edit-button" style="color: #748FC4" v-on:click="editDetails = true"><h class="edit-text">Edit Details</h></div>
        <div v-if="editDetails === true" class="cancel-button" style="color: #748FC4; margin-right: 5px;" v-on:click="editDetails = false"><h class="edit-text">Cancel</h></div>
        <div v-if="editDetails === true" class="edit-button" style="color: #748FC4" v-on:click="editDetails = false"><h class="edit-text" @click="save()">Save</h></div>
    </div>
</div>
</template>

<script>
import mqtt from '../MQTT'
export default {
  name: 'Account',
  props: ['Account'],
  data() {
    return {
      editedUser: '',
      editDetails: false,
      hasAccount: false,
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: ''
    }
  },
  mounted() {
    this.getInfo()

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
    save() {

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAddress:  this.emailAddress,
        password: this.password,
        token: localStorage.getItem('loginToken')
      }
      let user = this.parseJwt(localStorage.loginToken)
      let result = mqtt('patchU', `/users/${user._id}`, data, false)
      setTimeout(() => {
        if (result[0].data === '401 unauthorized') {
        localStorage.removeItem('loginToken')
      } else if (result[0].data.firstName){
         console.log(result)
      } else {
        alert('Something went wrong! Plaese try again later.')
      }
       
      }, 1000)
    },

    getInfo() {
        let data = {
            token: localStorage.getItem('loginToken')
        }
        let user = this.parseJwt(localStorage.loginToken)
        let result = mqtt('getU', `/users/${user._id}`, data, false)
      setTimeout(() => {
        if (result[0].data === '401 unauthorized') {
        localStorage.removeItem('loginToken')
        
      } else if (result[0].data.user){
        this.firstName = result[0].data.user.firstName
        this.lastName = result[0].data.user.lastName
        this.emailAddress = result[0].data.user.emailAddress
        this.password = result[0].data.user.password
      } else {
        alert('Something went wrong! Plaese try again later.')
      }
      }, 1000)
    }
  }
}

</script>

<style>
.box {
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
    box-shadow: 4px 10px 10px rgba(143, 145, 190, 0.25);
}
.edit-button {
    padding: 10px;
    display:inline-block;
    text-align: center;
    margin-top: 1rem;
    box-sizing: border-box;
    height: auto;
    background-color: #748FC4;
    color: #ffffff;
    border-radius: 25px;
    cursor: pointer;
    border: 2px solid #748FC4;
    box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
}
.edit-text {
    color: #ffffff;
}
.edit-button:hover {
    background-color: #4E6289;
    border: 2px solid #4E6289;
}
.cancel-button {
    padding: 10px;
    display:inline-block;
    text-align: center;
    margin-top: 1rem;
    box-sizing: border-box;
    height: auto;
    background-color: #748FC4;
    color: #ffffff;
    border-radius: 25px;
    cursor: pointer;
    border: 2px solid #748FC4;
    box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
}
.cancel-button:hover {
    background-color: #DD7676;
    border: 2px solid #DD7676;
}
</style>
