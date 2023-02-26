<template>
    <!-- Booking history component -->
    <div class="book-box">
        <b-row>
            <b-col>
                <h>Date: {{this.date}}</h>
            </b-col>
            <b-col>
                <h>Time: {{this.time}}</h>
            </b-col>
            
            <b-col>
                <h>Dentist: Dentist{{this.dentistId}}</h>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['book']
}

</script>

<style>
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
