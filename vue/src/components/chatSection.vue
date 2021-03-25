<template>
    <div  id="messagesSection">
      <section class="chat-box">
        <div class="chat-box-list-container">
          <ul class="chat-box-list" >
            <li class="messageDisplayed" v-for="msg in msgInfo" :key="msg" v-bind:class="{user: msg.sender}" v-if="user === 'msg.sender'">{{msg.sender}}: {{msg.msg}}</li>
          </ul>
        </div>
      </section>
    </div>
</template>

<style scoped>
    #messagesSection {
        background-color: #FFFFFF;
        height: 31rem;
    }
    .messageDisplayed {
      background-color: aqua;
      text-align: left-; 
    }
</style>

<script>
  export default {
    name:"chatSection",
    props: ['msgInfo'],
    watch: { msgInfo: { inmediate: true, handler(val, oldVal){console.log(val);}}},
  }
</script>