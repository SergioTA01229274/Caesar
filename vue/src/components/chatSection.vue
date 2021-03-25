<template>
    <div  id="messagesSection">
      <section class="chat-box">
        <div class="chat-box-list-container">
          <ul class="chat-box-list" >
            <li class="messageDisplayed" v-for="msg in msgInfo" :key="msg" v-bind:class="{user: msg.sender==username}">
              <v-row>
                <span>{{msg.sender}}: {{msg.msg}}</span>
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
      margin-left: 3rem;
      margin-top: 2rem;
      list-style-type: none;
      font-family: Roboto;
    }
    .messageReceived {

    }
</style>

<script>
  export default {
    name:"chatSection",
    props: ['msgInfo'],
    watch: { msgInfo: { inmediate: true, handler(val, oldVal){console.log(val);}}},
  }
</script>