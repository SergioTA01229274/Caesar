<template>
    <div>
        <v-row>
            <v-col cols="10"><v-text-field id="textInput" color="custom" label="Type a message" v-model="tmpMessage" solo></v-text-field></v-col>
            <v-col cols="2" id="buttons"><v-btn large class="inputButton" id="fileButton" @click="showReq()"><v-icon>mdi-paperclip</v-icon>
            </v-btn> <v-btn large id="sendButton" class="inputButton" @click="sendMsgEvent()"><v-icon id="sendIcon">mdi-send</v-icon></v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
    
    #sendButton {
        margin-left: 0rem;
        background-color: #00796B !important;
    }
    #sendIcon {
        color: #E5E5E5;
    }
    #fileButton {
        background-color: #7983A6;
    }
    .custom {
        background-color: #E5E5E5;
    }

    .inputButton {
        margin-top: 0.25rem;
        margin-right: 0.1rem;
    }
</style>

<script>
export default {

    name:"inputMessageBar",
    mounted() {
        const cipherPlugin = document.createElement("script");
        cipherPlugin.setAttribute(
        "src",
        "http://localhost:8080/hello.js"
        );
        cipherPlugin.async = true;
        document.head.appendChild(cipherPlugin);
    },
    data: () => {
        return {
            tmpMessage: ''
        }
    },
    methods: {
        sendFileEvent() {
            /*
            let d= Module.cwrap("sumar", "number");
            console.log(d());
            */
        },
        sendMsgEvent() {
            /* 
            let cipherFunc = Module.cwrap("cipher", "string", "string");
            let computeMAC = Module.cwrap("getMac", "string", "string");
            let cipherText = cipherFunc(this.tmpMessage);
            let MAC = computeMAC(cipherText);
            let DMObj = {msg: cipherText, integrityCode: MAC, reeiver: this.receiver};
            this.socket.emit("privateMessage", DMObj);
            */
            this.$emit("sendMsg", this.tmpMessage);
            this.tmpMessage = '';
        }
    }
  }
</script>