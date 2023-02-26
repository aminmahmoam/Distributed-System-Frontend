<template>
  <!-- Clinic information component -->
    <div class="clinic-box">
        <b-row style="height: 35px;">
            <b-col>
               <h5> {{clinic.name}}</h5>
            </b-col>
            <!-- Toggle more information -->
            <b-col style="text-align: right; margin-right: 20px;">
                <img style="height: 25px" v-if="click === false" v-on:click="click = true" src="/plus.png">
                <img style="height: 25px" v-if="click === true" v-on:click="click = false" src="/minus.png">
            </b-col>
        </b-row>
        <div style="text-align: left; font-size: 15px; margin-left: 20px" v-if="click === true">
          <h6>Address:</h6>
          <p>{{clinic.address}}</p>
            <h6>Opening hours:</h6>
            <p v-for="hour in clinic.openinghours" v-bind:key="hour">{{JSON.stringify(hour).substr(1,(JSON.stringify(hour).length - 2))}}</p>
            <button class="clinicB" v-on:click="$emit('book-slot', clinic.name)">Make a booking</button>
            <button class="clinicB" v-on:click="talk()">Show me on map</button>
            
        </div>
    </div>
</template>
<script>

export default {
  name: 'ClinicSlots',
  props: ['clinic'],
  data() {
    return {
      click: false
    }
  }, 
  methods: {
    talk: function(){
      this.$root.$emit('ClinicSlots', this.clinic.name)
    }
    
  }
}
</script>
<style>
.clinic-box {
    height: auto;
    margin-top: 15px;
    padding-top: 11px;
  width: 500px;
  color:#748FC4;
  background: #ffffff;
  margin-left: 70px;
  border-radius: 10px 10px 10px 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
  padding-bottom: 3px;
}

button.clinicB {
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
  .clinicB:hover {
    opacity: 0.9;
  }
</style>
