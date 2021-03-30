<template>
    <div  id="messagesSection">
      <section class="chat-box">
        <div class="chat-box-list-container">
          <ul class="chat-box-list">
            <li class="messageDisplayed"  v-for="msg in msgInfo" :key="msg">
                <v-row class="receiverMsg" v-if="msg.rFlag"><div class="rcMsgBox"><p class="insideMsg normalText">{{msg.msg}}</p></div></v-row>                
                <v-row class="userMsg" v-else-if="msg.sender != msg.receiver"><div class="sndMsgBox"><p class="insideMsg normalText">{{msg.msg}}</p></div></v-row>
                <v-row class="userMsg" v-else>
                  <v-icon id="alertIcon">mdi-alert</v-icon><div class="errMsgBox"><p class="insideMsg errText">{{msg.msg}}</p></div>
                </v-row>
            </li>
          </ul>
        </div>
      </section>
    </div>
</template>

<style scoped>
    #messagesSection {
        background-color: #FFFFFF;
        height: 31rem;
        overflow: auto;
    }
    .messageDisplayed {
      text-align: left;
      font-size: 1.5rem;
      color: #555050; 
      margin-top: 2rem;
      list-style-type: none;
      font-family: Roboto;
    }
    .userMsg {
      justify-content: end;
      margin-right: 1rem;
    }
    .receiverMsg {
      justify-content: start;
      margin-left: 1rem;
    }
    .sndMsgBox {
      word-wrap: break-word;
      text-align: right;
      width: 20rem;
      border: 0.1rem solid #66CDAA;
      background-color: #20B2AA;
      border-radius: 10px;
      overflow: hidden;
      --line-height: 1em;
    }
    .errMsgBox {
      word-wrap: break-word;
      text-align: right;
      width: 20rem;
      border: 0.1rem solid #66CDAA;
      background-color: #DC143C;
      border-radius: 10px;
      overflow: hidden;
      --line-height: 1em;
    }
    .rcMsgBox {
      word-wrap: break-word;
      text-align: left;
      width: 20rem;
      border: 0.1rem solid #1E90FF;
      background-color: #6495ED;
      border-radius: 10px;
      overflow: hidden;
      --line-height: 1em;
    }
    .insideMsg {
      padding: 0.5em;
    }
    .errText {
      color: black;
    }
    .normalText{
      color: black;
    }
    #alertIcon{
      color: #DC143C;
    }
    
</style>

<script>
  export default {
    name:"chatSection",
    props: ['msgInfo'],
    data() {
      return {
        username: localStorage.username
      }
    },
    watch: { msgInfo: { inmediate: true, handler(val, oldVal){console.log(val);}}},
  }
</script>