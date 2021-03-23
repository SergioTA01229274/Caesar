<template>
    <v-container id="app">
        <form id="loginSection">
            <div id="container">
                <v-text-field class="inputField" label="Username" hide-details="auto" filled rounded dense>
            </v-text-field>
            <br><v-text-field class="inputField" label="Password" required type="password" filled rounded dense>
            </v-text-field>
            <v-btn id="loginButton" class="logButton" large @click="goToVerification()">
                <label for="loginButton" class="buttonLabel">Login</label>
            </v-btn>
            <br><br><v-btn id="signUpButton" class="logButton" large @click="goToSignUp()">
                <label for="signUpButton" class="buttonLabel">Create account</label>
            </v-btn>
            </div>
        </form>
    </v-container>
</template>

<style lang="scss">
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
  export default {
    name:"loginSection",
    methods: {
        goToVerification(){

        },
        goToSignUp(){
            
        }
    }
  }

</script>