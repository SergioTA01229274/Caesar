<template>
    <div class="GUIChat">
        <v-container fluid>
            <topbar-user id="userBar" v-bind:userInfo="privMenuData"></topbar-user>
            <br>
            <v-row>
                <v-col cols="3" offset-md="0">
                    <contacts-bar v-bind:contacts="contactsInStorage" @changeRTag="notifyTag"></contacts-bar>
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
            receiver: '',
            usernameInStorage: localStorage.username,
            contactsInStorage: [],
            privMenuData: {},
            rTag: 'Receiver'
        }
  },
  mounted() {
        axios.get(this.$serverBaseURL + `/getUserContacts/${this.usernameInStorage}`).then((response) => {
                this.contactsInStorage = response.data.data.userContacts;
                let userConnObj = {contacts: this.contactsInStorage, username: this.usernameInStorage};
                this.socket.emit('addUserConn', userConnObj);
        });

        axios.get('https://api.ipify.org?format=json').then((response) => {
          this.privMenuData.ipAddress = response.data.ip;
          let body = {username: this.usernameInStorage, ipAddress: this.ipInStorage};
            axios.post(this.$serverBaseURL + '/updateIP', body).then((response) => {
                console.log(response);
            });
        });

        axios.get(this.$serverBaseURL + `/getUserInfo/${this.usernameInStorage}`).then((response) => {
                this.privMenuData.publicKey = response.data.data.publicKey.slice(0,10);
                let tmpLastDate = response.data.data.lastLoginDate.split(" ");
                this.privMenuData.lastLoginDate = tmpLastDate[2] + '/' + tmpLastDate[1] + '/' + tmpLastDate[3] + ' ' + tmpLastDate[4];
                let tmpRegDate = response.data.data.registerDate.split(" ");
                this.privMenuData.registerDate = tmpRegDate[2] + '/' + tmpRegDate[1] + '/' + tmpRegDate[3] + ' ' + tmpRegDate[4];
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
        this.receiver = tag;
        this.rTag = tag;
    }
  },
  components: {
    ContactsBar,
    TopbarUser,
    ToolbarUser,
    ChatSection,
    inputMessageBar
  },
}
</script>

<style scoped>

    .span {
        display: inline-block;
        height: 2em;
        text-align: center;
    }
    #userBar {
        z-index: 10;
    }
    
</style>