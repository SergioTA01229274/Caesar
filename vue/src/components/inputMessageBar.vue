<template>
    <div>
        <v-row>
            <v-col cols="10"><v-text-field id="textInput" color="custom" label="Type a message" solo></v-text-field></v-col>
            <v-col cols="2" id="buttons"><v-btn large class="inputButton" id="fileButton"><v-icon>mdi-paperclip</v-icon>
            </v-btn> <v-btn large id="sendButton" class="inputButton"><v-icon id="sendIcon">mdi-send</v-icon></v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<style lang="scss">
    
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
    name:"inputMessageBar"
  }
</script>