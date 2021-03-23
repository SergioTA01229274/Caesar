<template>
    <div class="GUIChat">
        <v-container fluid>
            <topbar-user id="userBar"></topbar-user>
            <br>
            <v-row>
                <v-col cols="3" offset-md="0">
                    <contacts-bar v-bind:contacts="contactsInStorage" v-bind:usersConnected="usersConnections" @changeRTag="notifyTag"></contacts-bar>
                </v-col>
                <v-col cols="9" class="ma-x pa-x">
                    <toolbar-user v-bind:tag="rTag"></toolbar-user>
                    <br><chat-section cols="9"></chat-section>
                    <br><input-message-bar cols="9" style="padding-top: 0.3rem" @sendMsg="sockSend"></input-message-bar>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>



<script>
import ChatSection from '../components/chatSection.vue';
import inputMessageBar from '../components/inputMessageBar.vue'
// @ is an alias to /src
import ContactsBar from '../components/ContactsBar.vue';
import ToolbarUser from '../components/ToolbarUser.vue';
import TopbarUser from '../components/TopbarUser.vue';
import io from 'socket.io-client';
import axios from 'axios';


export default {
  name: 'GUIChat',
  data() {
        return {
            socket: io(),
            receiver: this.$receiver,
            usernameInStorage: localStorage.username,
            contactsInStorage: [],
            usersConnections: {},
            rTag: 'Contact'
        }
  },
  mounted() {
      axios.get(this.$serverBaseURL + `/getUserContacts/${this.usernameInStorage}`).then((response) => {
            this.contactsInStorage = response.data.data.userContacts;
            for(var i = 0; i < this.contactsInStorage.length; i++){
                this.usersConnections[this.contactsInStorage[i]] = 'Offline';
            }
            let userConnObj = {contacts: this.contactsInStorage, username: this.usernameInStorage};
            this.socket.emit('addUserConn', userConnObj);
      });
  },
  created() {
      this.socket.connect();
      this.socket.on("clntMsg", (msgObj) => {
          console.log(msgObj.msg);
      });

        this.socket.on("connectionUpdate", (updateUser) => {
            console.log(`${updateUser} just arrive`);
          this.usersConnections[updateUser] = 'Online';
      });

      this.socket.on("disconnectionUpdate", (updateUser) => {
          console.log(`${updateUser} just left`);
          this.usersConnections[updateUser] = 'Offline';
      });

      this.socket.on("errMsg", (errObj) => {
          console.log(errObj.msg);
      });
  },
  methods: {
    sockSend(tmpMessage) {
        this.socket.emit("srvMsg", {receiver: this.receiver, msg: tmpMessage, sender: this.usernameInStorage});
    },
    notifyTag(tag){
        this.rTag = tag;
    }
  },
  components: {
    ContactsBar,
    TopbarUser,
    ToolbarUser,
    ChatSection,
    inputMessageBar
  }
}
</script>





<style scoped>

    .span {
        display: inline-block;
        height: 2em;
        text-align: center;
    }

    
</style>