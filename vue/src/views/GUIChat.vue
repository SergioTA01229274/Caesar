<template>
    <div class="GUIChat">
        <v-container fluid>
            <topbar-user id="userBar"></topbar-user>
            <br>
            <v-row>
                <v-col cols="3" offset-md="0">
                    <contacts-bar></contacts-bar>
                </v-col>
                <v-col cols="9" class="ma-x pa-x">
                    <!--<toolbar-user></toolbar-user>-->
                    <public-menu></public-menu>
                    <br><chat-section cols="9"></chat-section>
                    <br><input-message-bar cols="9" style="padding-top: 0.3rem"></input-message-bar>
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
import publicMenu from '../components/publicMenu.vue';
import privateMenu from '../components/privateMenu.vue';

export default {
  name: 'GUIChat',
  components: {
    ContactsBar,
    TopbarUser,
    ToolbarUser,
    ChatSection,
    inputMessageBar,
    publicMenu,
    privateMenu
  },
}
</script>

<style scoped>

    .span {
        display: inline-block;
        height: 2em;
        text-align: center;
    }

    
</style>