<template>

<!-- Check if user is signed in and authenticated-->
<div v-if=!authenticated>

   <!-- Require sign up or log in -->
   <div v-if=!signup>
       <div class="map-body">
         <p style="color: #748FC4; font-style: bold;" class="map-text">LOG IN</p>
       </div>
       <div class="login-box">
                        <div class="form-group">
                            <input v-model="email" type="text" style="background: #DEE9FF; box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);" class="form-control" placeholder="Email"/>
                        </div>
                        <div class="form-group">
                            <input v-model="password" type="password" style="background: #DEE9FF; box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);" class="form-control" placeholder="Password"/>
                        </div>
                        <div class="form-group">
                            <!--<div class="edit-button" style="color: #748FC4"><h class="edit-text">Log In</h></div> -->
                            <button class="edit-button" @click="login()" style="color: #748FC4"><h class="edit-text">Log In</h></button>
                        </div>
                        <div class="form-group">
                            <p>Don't have an account? <button  class="LSButton" @click="signupPushed">Sign Up</button> </p>
                        </div>
         </div>
   </div>

 <div v-else-if=signup>
     
  
       <p style="color: #748FC4; font-style: bold;" class="map-text">SIGN UP</p>
       <div class="login-box">
                            <div class="form-group">
                                <input v-model="firstName" type="text" style="background: #DEE9FF; box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);" class="form-control" placeholder="First Name" value="" />
                            </div>
                            <div class="form-group">
                                <input v-model="lastName" type="text" style="background: #DEE9FF; box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);" class="form-control" placeholder="Last Name" value="" />
                            </div>
                            <div class="form-group">
                                <input v-model="emailAddress" type="text" style="background: #DEE9FF; box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);" class="form-control" placeholder="Email" value="" />
                            </div>
                            <div class="form-group">
                                <input v-model="password" type="password" style="background: #DEE9FF; box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);" class="form-control" placeholder="Password" value="" />
                            </div>
                            <div class="form-group">
                                <div href="/" class="edit-button" style="color: #748FC4"><h class="edit-text" @click="createAccount()">Sign Up</h></div>
                            </div>
                            <div class="form-group">
                                <p>Already have an account? <button class="LSButton" @click="signupPushed">Log in </button> </p>
                            </div>
                
        </div>

  </div>
</div>

  <div id="body" v-else-if=authenticated>

    <!-- Navigation bar -->
    <div>
        <div id = "app">
        <div id="nav">
            <b-navbar >
        <a class="navbar-brand" href="/">
      </a>
      <div class="logo">
          <router-link to="/">
            <img style="width: 220px; margin-top: -10px;" src="/dentistimo.png"/>
          </router-link>
      </div>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em> <img style="height: 40px; margin-top: 10px;" src="user.png" alt=""></em>
          </template>
          <b-dropdown-item href="/account">Account</b-dropdown-item>
          <b-dropdown-item href="/bookings">Bookings</b-dropdown-item>
          <b-dropdown-item-button @click="logout()">Log Out</b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

<!-- Other views appear here -->
<div class="content">
  <router-view/>
</div>
<div class="space"></div>

<!-- Footer -->
<div class="footer-basic">
        <footer>
            <div class="social"><a href="https://git.chalmers.se/courses/dit355/dit356-2022/t-8"><i class="icon ion-social-github"></i></a></div>
            <p class="copyright">Email: info@dentist.mo</p>
            <p class="copyright">Dentistimo © 2022</p>
        </footer>
    </div>

</div>
</div>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Untitled</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
    <!-- CHAT BAR BLOCK -->
    <div class="chat-bar-collapsible">
        <button id="chat-button" type="button" class="collapsible" @click = "openForm" >Chat with us!
            <i id="chat-icon" style="color: #fff;" class="fa fa-fw fa-comments-o"></i>
        </button>

        <div :class="{ contentChat: !isActive }">
            <div class="full-chat-block">
                <!-- Message Container -->
                <div class="outer-container">
                    <div class="chat-container">
                        <!-- Messages -->
                        <div id="chatbox">
                            <h5 id="chat-timestamp"></h5>
                            <p id="botStarterMessage" class="botText">
                            <span>Sorry, I am not that smart for now 😊 If you have any questions, my colleagues will gladly help you with them. </span>
                            <span>Here is the email: dentistimo.dit356@gmail.com </span>
                          </p>
                        </div>

                        <!-- User input box -->
                        <div class="chat-bar-input-block">
                            <div id="userInput">
                                <input id="textInput" class="input-box" type="text" name="msg"
                                    placeholder=" ">
                                <p></p>
                            </div>

                            <div class="chat-bar-icons">
                                <i id="chat-icon" style="color: #333;" class="fa fa-fw fa-send"
                                    onclick="sendButton()"></i>
                            </div>
                        </div>

                        <div id="chat-bar-bottom">
                            <p></p>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>

</body>

</div>

</template>




<script>
import mqtt from './MQTT'
export default {
  mounted() {
    this.alwaysCheckToken()
    this.checkAuthentication()
  },
  data() {
    return {
      authenticated: Boolean,
      signup: false,
      isActive: false,
      message: 'none',
      time: null,
      repeatPassword: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      bookings: []
    }
  },
  methods:{
    //Open chat
    openForm : function (){
    this.isActive = !this.isActive
    },

    //Confirm sign-up
    signupPushed() {
    this.signup = !this.signup
    },

    //Create a new account
    createAccount() {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAddress: this.emailAddress,
        password: this.password,
        bookings: this.bookings
      }
      const result = mqtt('postU', '/users', user, true)
      console.log(result)
      setTimeout(() => {
        console.log(result)
        if (result[0].data.error) {
          alert('Something went wrong! Please try again later.')
          console.log('unsuccesfull')
        } else {
          console.log('succsesfull')
          alert('Your account is created!')
          this.firstName = '',
          this.lastName = '',
          this.emailAddress = '',
          this.password = ''
          this.signup = false
        }
      }, 1000)
    },

    //Log out
    logout() {
      localStorage.removeItem('loginToken')
      this.authenticated = !this.authenticated 
    },

    //authenticate user
    checkAuthentication() {
      if (localStorage.getItem('loginToken') === null) {
        this.authenticated = false
      } else {
        this.authenticated = true
      }
    },
    alwaysCheckToken() {
      this.time = setInterval(() => {
        this.checkAuthentication()
      }, 1000)
    },

    //Log in
    login(){
        let account = {
            email: this.email,
            password: this.password
        }
        let result = mqtt('login', '/login', account, true)
        setTimeout(() => {
            console.log(result[0].data.message)
        if(result[0].data.message === "Authentication succussful") {
          this.authenticated = true
            console.log('here')
            localStorage.loginToken = result[0].data.token
            console.log(localStorage.loginToken)
        } else {
          alert('Incorrect credentials! Try again.')
          this.authenticated = false
            console.log('not authenticated')
        }

        }, 1000)
    }
  },
}
</script>

<style>
.chat-bar-collapsible {
    position: fixed;
    bottom: 0;
    right: 50px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.collapsible {
    background-color: rgb(82, 151, 255);
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 350px;
    text-align: left;
    outline: none;
    font-size: 18px;
    border-radius: 10px 10px 0px 0px;
    border: 3px solid white;
    border-bottom: none;
}

.contentChat {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #f1f1f1;
}

.full-chat-block {
    width: 350px;
    background: white;
    text-align: center;
    overflow: auto;
    scrollbar-width: none;
    height: max-content;
    transition: max-height 0.2s ease-out;
}

.outer-container {
    min-height: 500px;
    bottom: 0%;
    position: relative;
}

.chat-container {
    max-height: 500px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    scroll-behavior: smooth;
    hyphens: auto;
}

.chat-container::-webkit-scrollbar {
    display: none;
}

.chat-bar-input-block {
    display: flex;
    float: left;
    box-sizing: border-box;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    background-color: rgb(235, 235, 235);
    border-radius: 10px 10px 0px 0px;
    padding: 10px 0px 10px 10px;
}

.chat-bar-icons {
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
    width: 25%;
    float: right;
    font-size: 20px;
}

#chat-icon:hover {
    opacity: .7;
}

/* Chat bubbles */

#userInput {
    width: 75%;
}

.input-box {
    float: left;
    border: none;
    box-sizing: border-box;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    font-size: 16px;
    color: #000;
    background-color: white;
    outline: none
}

.userText {
    color: white;
    font-family: Helvetica;
    font-size: 16px;
    font-weight: normal;
    text-align: right;
    clear: both;
}

.userText span {
    line-height: 1.5em;
    display: inline-block;
    background: #5ca6fa;
    padding: 10px;
    border-radius: 8px;
    border-bottom-right-radius: 2px;
    max-width: 80%;
    margin-right: 10px;
    animation: floatup .5s forwards
}

.botText {
    color: #000;
    font-family: Helvetica;
    font-weight: normal;
    font-size: 16px;
    text-align: left;
}

.botText span {
    line-height: 1.5em;
    display: inline-block;
    background: #e0e0e0;
    padding: 10px;
    border-radius: 8px;
    border-bottom-left-radius: 2px;
    max-width: 80%;
    margin-left: 10px;
    animation: floatup .5s forwards
}

/* For low resolution */
@keyframes floatup {
    from {
        transform: translateY(14px);
        opacity: .0;
    }
    to {
        transform: translateY(0px);
        opacity: 1;
    }
}

.LSButton {
  text-align: center;
    box-sizing: border-box;
    height: 30px;
    
    color: #748FC4;
    border-radius: 23px;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
}
.login-box{
      margin: auto;
      margin-top: 3rem;
        box-sizing: border-box;
        height: auto;
        border-radius: 25px;
        text-align: center;
        margin-left: 30%;
        margin-right: 30%;
        background: #ffffff;
        padding: 40px;
        color: #748FC4;
        box-shadow: 4px 10px 10px rgba(143, 145, 190, 0.25);
    }
   
.form-control {
    color: #DEE9FF;
}
.content {
  margin: 0%;
}
#app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #DEE9FF;

}
#nav{
    box-sizing: border-box;
  position: relative;
  background: #ffffff;
  border-bottom: 1px solid 748FC4;
  height: 100px;
  box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
}
.logo{
    height: 20px;
    margin: auto;
    display: block;
}
html {
  background-color: #DEE9FF
}
.footer-basic {
  background-color:#ffffff;
  color:#4b4c4d;
  margin-bottom: 0%;  
  margin-top: 50px;
  
  position: absolute;
  width: 100%;
  height: 25%;
}

.footer-basic ul {
  list-style:none;
  text-align:center;
  font-size:18px;
  line-height:1.6;
}

.footer-basic li {
  padding:0 10px;
}

.footer-basic ul a {
  color:inherit;
  text-decoration:none;
  opacity:0.8;
}

.footer-basic ul a:hover {
  opacity:1;
}

.footer-basic .social {
  text-align:center;
  padding-bottom:25px;
}

.footer-basic .social > a {
  font-size:24px;
  width:40px;
  height:40px;
  line-height:40px;
  display:inline-block;
  text-align:center;
  border-radius:50%;
  border:1px solid #ccc;
  margin:0 8px;
  color:inherit;
  opacity:0.75;
}

.footer-basic .social > a:hover {
  opacity:0.9;
}

.footer-basic .copyright {
  margin-top:15px;
  text-align:center;
  font-size:13px;
  color:#aaa;
  margin-bottom:0;
}

.space {
  box-sizing: border-box;
  height: 100px;

}
</style>
