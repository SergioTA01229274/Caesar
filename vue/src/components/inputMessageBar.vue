<template>
    <div>
        <v-row>
            <v-col cols="11"><v-text-field id="textInput" color="custom" label="Type a message" v-model="tmpMessage" @keyup.enter="sendMsgEvent()" solo></v-text-field></v-col>
            <v-col cols="1" id="buttons">
                <v-btn large id="sendButton" class="inputButton"  @click="sendMsgEvent()"><v-icon id="sendIcon">mdi-send</v-icon></v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
    
    #sendButton {
        background-color: #00796B !important;
    }
    #sendIcon {
        color: #E5E5E5;
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
    data (){
        return {
            tmpMessage: ''
        }
    },
    methods: {
        sendMsgEvent() {
            this.$emit("sendMsg", this.tmpMessage);
            this.tmpMessage = '';
        }
    }
  }
</script>