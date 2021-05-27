<template>
    <v-container id="app">
        <form id="loginSection">
            <div id="container">
                <v-text-field required class="inputField" label="Username" hide-details="auto" v-model="usernameInput" filled rounded dense @keyup.enter="loginReq">
                <span v-if="isValidUser">{{msg.usernameInput}}</span>
            </v-text-field>
            <br><v-text-field class="inputField" label="Password" required type="password" v-model="passwordInput" filled rounded dense @keyup.enter="loginReq">
                <span v-if="msg.passwordInput">{{msg.passwordInput}}</span>
            </v-text-field>
            <v-btn id="loginButton" class="logButton" large @click="loginReq">
                <label for="loginButton" class="buttonLabel">Login</label>
            </v-btn>
            <br><br><v-btn id="signUpButton" class="logButton" @click="signUpReq" large>
                <label for="signUpButton" class="buttonLabel">Create account</label>
            </v-btn>
            </div>
        </form>
    </v-container>
</template>

<style scoped>
    #app {
        width: 24rem;
    }
    .inputField {
        width: 20rem;
        font-size: 1.45rem;
        font-family: Roboto;
        margin-left: 1.75rem !important;
    }
    #container {
        padding-top: 1.75rem !important;
    }
    .logButton {
        width: 22em;
        margin-left: 0.5em;
    }
    #loginSection {
        background-color: #E5E5E5;
        height: 20rem;
        width: 23.5rem;
        box-shadow: 3px 5px #888888;
    }
    #loginButton {
        background-color: #555050;
    }
    .buttonLabel {
        text-transform: capitalize;
        font-family: Roboto;
        font-style: normal;
        font-weight: 400;
        font-size: 1.25rem;
        text-align: center;
        color: #F2EEEE;
    }
    #signUpButton {
        background-color: #7983A6;
    }
</style>

<script>
import axios from 'axios';
import router from '../router/router'

  export default {
    name:"loginSection",
    created() {
        localStorage.clear();
    },
    data(){
        return{
            usernameInput: '',
            passwordInput: '',
            isValidUser: false,

            msg:{
                usernameInput: '',
                passwordInput: ''
            }
        }
    },
    computed: {
        username: function(value){
            console.log("Hello");
            this.usernameInput = value;
            this.validateEmail(value);
            return this.msg.usernameInput;
        },
        password: function(value){
            this.passwordInput = value;
            this.validatePassword(value);
        }
    },
    methods: {
        loginReq() {
            let body = {username: this.usernameInput, password: this.passwordInput};
            axios.post(this.$serverBaseURL + 'loginPass', body).then(response => {
                if(response.status == 200){
                    if(!localStorage.username || localStorage.username != this.usernameInput){
                        localStorage.username = this.usernameInput;
                    }
                    this.$router.push({ path: '/verification'});
                }
            }).catch((error) => {
                this.$emit('invalidCredentials', error.response.data.msg);
            });
        },
        signUpReq() {
            router.push({path: '/signUp'});
        },
        validateEmail(value){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {
                this.msg.usernameInput = '';
                this.isValidUser = true;
            } else{
                this.msg.usernameInput = 'Invalid Username';
            } 
        },
        validatePassword(value){
            let difference = 5 - value.length;
            if (value.length<5) {
                this.msg.passwordInput = 'Must be 5 characters! '+ difference + ' characters left' ;
            } else {
                this.msg.passwordInput = '';
            }
        }
    }
  }
</script>