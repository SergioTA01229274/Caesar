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
            key: {
                n:"dd8b93d951a27ae332c63cc345efdfbd9b9e01d39b92f134cc0c9c7f79afa852b886feb6fd4e0ab2448cd12f4eebbc966629114bab812ffe7ec1343a2906837caacb0e3779348540a739cd34cf2f5362fee4ab16f408c82c04dc9ea8b213600b5828e7c1901e0d3da11b157160b815390af9a84ca1feedb6327c001271a2ccd78f92124c4510dc14d998272adc991630bfacdf26ad78a1c094ea8498353453f6e534ec6c678f4ee7a83aa019f1c6bc01e3088dfa674ff76ae8b6798fcdf836cf7d4e489e33c3de62ccb1ec0022982b7932e2442e09ea68f05cdb4af5685f5f8bae770eb24b125f50f6f6c9099255f1ceebc4ad65a1f537994fe4620b1643c1f9",
                e:"a484c7e6e0730188cbc48de7e3cdf821a8def7dca935b6f85075b3dacc0713faaefa748a7129055f123b15fe6b45de6a9e92c6453c2b38fa11261b6fde89da96386caeec100a8cbc18acde805a8b44336e9344417914bdcef5237c41e9eff5b8aa8cec7a49915f32721f337371f93c215f5597abce81482e16a4ae40405d68ec4a54befdd19d41fd2ae49f716bd979cf5e65a028cf5ee4da3f9baf8ce3539c2848141ab11234f5aeabd8ea7717010447fb5b1c3a8ad5b160779c747b32169fb46b14f9c4a47a84361ac89e882a83b411335cd4d911c40674576a7113ca868063467b33e65cfb97d52156755f68257f1bf0255fa52c47cd410f33c547954649f7",
                d:"c4a582821945679255090e4586156d284bc07f281d7eebcffaca95d972fd5597b1d5c4b2ca3733511022b9e230fc80af3b310e2abf02d9cbd3aacdaf8b64ea4a52a05c04752153fb13ebba620c841b22f61f30a8a5e437833d187a42489e42148b6db8cd3cd02a1cdb291bf48ea5953ec348d2e508050d8516d0ed043fa4baf6c940112b22fa63091e34329408787d24dca8f0251b74a5928220ff8c8a2581e704458253cf4b9e4127fe0fb9ab673f05de355116cdf4086d56ecfb0aee3e963b3b3401175b8001ab9d38a4d0192eec629e9dd5b7af82e18f28ac6aeb58b283501e715d5e0402216d86f6471956c7ae869ec3ca96a33f9f2cbebc0533cbc027eb"
            },
            socket: io(),
            receiver: '',
            usernameInStorage: localStorage.username,
            contactsInStorage: [],
            privMenuData: {},
            privMeduDataFormated: [],
            publicContactInfo: [],
            rTag: '',
            messageList: {},
            tmpMessageList: [],
            encryptedMessage: '',
            msgToSend: ''
        }
  },
  mounted() {
        const cipherPlugin = document.createElement("script");
        cipherPlugin.setAttribute(
        "src",
        `${window.location.origin}/rsa.js`
        );
        cipherPlugin.async = true;
        document.head.appendChild(cipherPlugin);

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
      console.log();
      this.socket.connect();
      this.socket.on("clntMsg", (msgObj) => {
        this.callDecryption(msgObj.msg);
        this.messageList[this.rTag].push({sender: msgObj.sender, msg: this.encryptedMessage.slice(0, msgObj.length), receiver: msgObj.receiver, rFlag: true});
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
          this.messageList[this.rTag].push({sender: errObj.sender, msg: errObj.msg, receiver: errObj.receiver});
          console.log(errObj.msg);
      });
  },
  methods: {
    callDecryption(msgTodecrypt){
        const decrypt = Module.cwrap("decryption", "string", ["string", "string", "string"]);
        this.encryptedMessage = decrypt(msgTodecrypt, this.key.n, this.key.d);
    },
    callEncrytption(msgToEncrypt){
        this.msgToSend = '';
        const encrypt = Module.cwrap("encryption", "string", ["string", "string", "string"]);
        this.msgToSend = encrypt(msgToEncrypt, this.key.n, this.key.e);
    },
    closeConnection() {
        this.socket.disconnect();
    },
    sockSend(tmpMessage) {
        console.log(this.messageList[this.rTag]);
        if(this.messageList[this.rTag] != undefined){
            this.messageList[this.rTag].push({sender: this.usernameInStorage, msg: tmpMessage, receiver: this.rTag});
        }else{
            this.messageList[this.rTag] = [];
            this.messageList[this.rTag].push({sender: this.usernameInStorage, msg: tmpMessage, receiver: this.rTag});
        }
        let tmpCharArr = tmpMessage.split("");
        var tmpStr = '';
        for(var i = 0; i < tmpCharArr.length; i++){
            this.callEncrytption(tmpCharArr[i]);
            tmpStr += this.msgToSend;
        }
        this.tmpMessageList = this.messageList[this.rTag];
        this.socket.emit("srvMsg", {receiver: this.rTag, msg: tmpStr, sender: this.usernameInStorage, length: tmpCharArr.length});
        this.msgToSend = '';
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