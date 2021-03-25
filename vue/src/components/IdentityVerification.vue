<template>
    <div id="identityVerification-app">
        <v-container id='container' fluid>
            <div id="subContainer">
                <v-row id="keysRow">
                    <v-col><v-textarea v-model="loginKeyToVerify" label="Login Key" id="loginKeyArea" no-resize></v-textarea></v-col>
                    <v-col> <v-textarea v-model="privateKeyToLoad" label="Private Key to load" id="privateKeyArea" no-resize></v-textarea></v-col>
                </v-row>
            <v-row id="btnRow">
                <v-btn id = 'submitButton' @click="verifyKeys()">
                    <label for="submitButtonFor" class = 'buttonLabel'>
                        Submit
                    </label>
                </v-btn>
            </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "IdentityVerification",
    data() {
        return {
            loginKeyToVerify: '',
            privateKeyToLoad: ''
        }
    },
    methods: {
        verifyKeys(){
            let body = {username: localStorage.username, loginKey: this.loginKeyToVerify};
            console.log(body);
            axios.post(this.$serverBaseURL + 'loginIden', body).then(response => {
                if(response.status == 200){
                    localStorage.privKey = String(this.privateKeyToLoad);
                    this.loginKeyToVerify = '';
                    this.privateKeyToLoad = '';
                    this.$router.push({ path: '/chat'});
                }
            }).catch((error) => {
                this.loginKeyToVerify = '';
                this.privateKeyToLoad = '';
                this.$router.push({ path: '/'});
            });
        },
    }
}
</script>

<style scoped>
    #btnRow{
        justify-content: center;
    }
    #keysRow{
        justify-content: center;
        margin-right: 5rem;
    }
    
    #submitButton{
        width:10em;
        height: 5rem;
        font-family: Roboto;
        font-size: 2rem;
        font-weight: 500;
        margin-right: 5rem;
        background-color:#7983A6;
        color: #F2EEEE;
    }

    #container{
        background-color:#555050;
        height:22rem;
        width:80rem;
    }
    #subContainer {
        margin-top: 2rem;
        justify-content: center;
    }
</style>