<template>
    <div class="GUIChat">
        <v-container fluid>
            <topbar-user id="userBar" v-bind:userInfo="privMeduDataFormated" @closeConn="closeConnection"></topbar-user>
            <br>
            <v-row>
                <v-col cols="3" offset-md="0">
                    <contacts-bar v-bind:contacts="contactsInStorage" @changeRTag="notifyTag"></contacts-bar>
                </v-col>
                <v-col cols="9" class="ma-x pa-x">
                    <toolbar-user v-bind:tag="[rTag, publicContactInfo]"></toolbar-user>
                    <br><chat-section cols="9" v-bind:msgInfo="tmpMessageList"></chat-section>
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
            privMeduDataFormated: [],
            publicContactInfo: [],
            rTag: '',
            messageList: {},
            tmpMessageList: []
        }
  },
  mounted() {
        axios.get(this.$serverBaseURL + `/getUserContacts/${this.usernameInStorage}`).then((response) => {
                this.contactsInStorage = response.data.data.userContacts;
                this.rTag = response.data.data.userContacts[0];
                axios.get(this.$serverBaseURL + `/getContactPublicInfo/${this.rTag}`).then((response) => {
                    let tmpLastConnDate = response.data.data.lastLoginDate.split(' ');
                    let formatedDate = tmpLastConnDate[2] + '/' + tmpLastConnDate[1] + '/' + tmpLastConnDate[3] + ' ' + tmpLastConnDate[4]; 
                    let publicKeyFormated = response.data.data.publicKey.slice(0, 15);
                    let tmpDataFormated = {ipAddress: response.data.data.ipAddress, lastLoginDate: formatedDate, publicKey: publicKeyFormated};
                    let publicDataLabels = {ipAddress: 'IP Address', lastLoginDate: 'Last connection', publicKey: 'Public key'};
                    for(var key in publicDataLabels){
                        this.publicContactInfo.push({title: publicDataLabels[key], value: tmpDataFormated[key]});
                    }
                });
                let userConnObj = {contacts: this.contactsInStorage, username: this.usernameInStorage};
                this.socket.emit('addUserConn', userConnObj);
        });
        

        axios.get('https://api.ipify.org?format=json').then((response) => {
          this.privMenuData.ipAddress = response.data.ip;
            axios.post(this.$serverBaseURL + `/updateIP/${this.usernameInStorage}/${this.privMenuData.ipAddress}`).then((response) => {
                console.log(response);
            });
        });

        axios.get(this.$serverBaseURL + `/getUserInfo/${this.usernameInStorage}`).then((response) => {
                this.privMenuData.publicKey = response.data.data.publicKey.slice(0,10);
                let tmpLastDate = response.data.data.lastLoginDate.split(" ");
                this.privMenuData.lastLoginDate = tmpLastDate[2] + '/' + tmpLastDate[1] + '/' + tmpLastDate[3] + ' ' + tmpLastDate[4];
                let tmpRegDate = response.data.data.registerDate.split(" ");
                this.privMenuData.registerDate = tmpRegDate[2] + '/' + tmpRegDate[1] + '/' + tmpRegDate[3] + ' ' + tmpRegDate[4];
                let privLabels = {publicKey: 'Public key', registerDate: 'Registration date', lastLoginDate: 'Last connection', ipAddress: 'IP address'};
                for(var key in this.privMenuData){
                    this.privMeduDataFormated.push({title: privLabels[key], value: this.privMenuData[key]});
                }
        });
  },
  created() {

      this.socket.connect();
      this.socket.on("clntMsg", (msgObj) => {
        this.messageList[this.rTag].push({sender: msgObj.sender, msg: msgObj.msg});
        console.log(this.messageList[this.rTag]);
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
          this.messageList[this.rTag].push({sender: errObj.sender, msg: errObj.msg});
          console.log(errObj.msg);
      });
  },
  methods: {
    closeConnection() {
        this.socket.disconnect();
    },
    sockSend(tmpMessage) {
        if(this.messageList[this.rTag]){
            this.messageList[this.rTag].push({sender: this.usernameInStorage, msg: tmpMessage});
        }else{
            this.messageList[this.rTag] = [];
            this.messageList[this.rTag].push({sender: this.usernameInStorage, msg: tmpMessage});
        }
        this.tmpMessageList = this.messageList[this.rTag];
        console.log(this.messageList);
        this.socket.emit("srvMsg", {receiver: this.rTag, msg: tmpMessage, sender: this.usernameInStorage});
    },
    notifyTag(tag){
        this.receiver = tag;
        this.rTag = tag;
        this.tmpMessageList = this.messageList[this.rTag];
        axios.get(this.$serverBaseURL + `/getContactPublicInfo/${this.rTag}`).then((response) => {
            const tmpArr = [];
            let publicDataLabels = {ipAddress: 'IP Address', lastLoginDate: 'Last connection', publicKey: 'Public key'};
            let tmpLastConnDate = response.data.data.lastLoginDate.split(' ');
            let formatedDate = tmpLastConnDate[2] + '/' + tmpLastConnDate[1] + '/' + tmpLastConnDate[3] + ' ' + tmpLastConnDate[4]; 
            let publicKeyFormated = response.data.data.publicKey.slice(0, 15);
            let tmpDataFormated = {ipAddress: response.data.data.ipAddress, lastLoginDate: formatedDate, publicKey: publicKeyFormated};
            for(var key in publicDataLabels){
                tmpArr.push({title: publicDataLabels[key], value: tmpDataFormated[key]});
            }
            this.publicContactInfo = tmpArr;
        });
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