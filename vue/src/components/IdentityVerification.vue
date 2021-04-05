<template>
    <div id="identityVerification-app">
        <v-container id='container' fluid>
            <div id="subContainer">
                <v-row no-gutters>
                    <v-col cols="9">
                        <v-file-input 
                            prepend-icon=mdi-account-key 
                            v-model="key" 
                            accept=".json" 
                            label="Key.json" 
                            @change="previewFiles" 
                            @keyup.enter="verifyJSON" 
                            truncate-length="15"> 
                        </v-file-input>
                    </v-col>
                </v-row>
                <!--<v-row id="keysRow">
                    <v-col><v-textarea v-model="loginKeyToVerify" label="Login Key" id="loginKeyArea" no-resize></v-textarea></v-col>
                    <v-col> <v-textarea v-model="privateKeyToLoad" label="Private Key to load" id="privateKeyArea" no-resize></v-textarea></v-col>
                </v-row>-->
                <v-row id="btnRow">
                    <v-btn 
                        id = 'submitButton' 
                        class = 'buttonLabel' 
                        label="submitButtonFor" 
                        :disabled="!isFormValid"
                        @click="verifyKeys()"
                    >
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
            privateKeyToLoad: '',
            isFormValid: false,
            key: {
                public: {
                    n: ' ',
                    e: ' '
                },
                private: {
                    login: ' ', 
                    n: ' ',
                    d: ' '
                }
            },
        }
    },
    methods: {
        previewFiles: function(files) {
            if (files != null) {
                const reader = new FileReader();
                var result;
                reader.onload = (event) => {
                    this.parseKeys(event.target.result);
                }
                reader.readAsText(files);
            } else {
                this.keys();
            }
        },
        parseKeys(result){
            var keyObj = JSON.parse(result);
            try {
                Object.assign(this.key, keyObj);
            } catch (error) {
                this.isFormValid = false;
            }
            if(this.key.private.login != ''){
                this.loginKeyToVerify = this.key.private.login;
                this.isFormValid = true;
            } else {
                this.isFormValid = false;
            }
        },
        keys(){
            this.key = {
                public: {
                        n: '',
                        e: ''
                    },
                    private: {
                        login: '', 
                        n: '',
                        d: ''
                    }
            }
            this.isFormValid = false;
        },
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