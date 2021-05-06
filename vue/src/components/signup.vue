<template>
    <div>
        <v-container id='container'>
            <div id="subContainer">
                <v-row>
                <v-text-field v-model="newUsername" class = 'inputField' label='Username' hide-details = 'auto' filled rounded dense></v-text-field>
            </v-row>
            <v-row>
                <v-text-field v-model="newPass" class = 'inputField' label = 'Password' required type = 'password' filled rounded dense></v-text-field>
            </v-row>
            <v-row>
                <v-text-field v-model="confirmNewPass" class = 'inputField' label = 'Confirm Password' required type = 'password' filled rounded dense></v-text-field>
            </v-row>
            <v-row>
                <v-btn id = 'submitButton' @click="createUser()">
                    <label for="submitButtonFor" class = 'buttonLabel'>
                        Submit
                    </label>
                </v-btn>
            </v-row>
            </div>
        </v-container>
    </div>
</template>

<style scoped>
    .inputField {
        width:25rem;
        height: 4rem;
        font-size: 1.45rem;
        font-family: Roboto;
        margin-left: 1.5em;
        margin-right: 1.5rem;
        margin-bottom: 1rem;
    }
    #submitButton{
        width:7em;
        height: 3rem;
        font-family: Roboto;
        font-size: 1.45rem;
        font-weight: 500;
        background-color:#7983A6;
        color: #F2EEEE;
        margin-left:7.5em;
    }

    #container{
        background-color:#E5E5E5;
        height:22rem;
        width:30rem;
        box-shadow: 3px 5px #888888;
        justify-content: center;
    }
    #subContainer {
        margin-top: 2rem;
        justify-content: center;
    }
</style>

<script>
import axios from 'axios';
    export default {
        name:'signup',
        data(){
            return{
                newUsername: '',
                newPass: '',
                confirmNewPass: ''
            }
        },
        mounted(){
            const cipherPlugin = document.createElement("script");
            cipherPlugin.setAttribute(
            "src",
            `${window.location.origin}/rsa.js`
            );
            cipherPlugin.async = true;
            document.head.appendChild(cipherPlugin);
        },
        methods: {
            createUser(){
                const genKey = Module.cwrap("generateKey", "string");
                const keyToAdd = genKey();
                const keyArr = keyToAdd.split(",");
                if(String(this.newPass) == String(this.confirmNewPass)){
                    let body = {username: this.newUsername, password: this.newPass, rsaObj: {e: keyArr[1], n: keyArr[0], d: keyArr[2]}};
                    axios.post(this.$serverBaseURL + 'signUp', body).then(response => {
                        var fileObj = {"public":{"n":body.rsaObj.n, "e":body.rsaObj.e}, "private":{"n":body.rsaObj.n, "d":body.rsaObj.d}, "login":response.data.data.loginKey}
                        var blob = new Blob([JSON.stringify(fileObj, null, 2)], {type: 'application/json'})
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'Identity Package.json';
                        a.click();
                    }).catch((error) => {
                        console.log(error.response.data.msg);
                    });
                }else{
                    console.log("Credentials doesn't match");
                }
                this.$router.push({path: '/'});
            }
        }
    }
</script>