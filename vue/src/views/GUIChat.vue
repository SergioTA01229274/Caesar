<template>
    <div class="GUIChat">
        <v-container fluid>
            <topbar-user></topbar-user>
            <br>
            <v-row>
                <v-col cols="4">
                    <contacts-bar></contacts-bar>
                </v-col>
                <v-col cols="8">
                    <toolbar-user></toolbar-user>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
// @ is an alias to /src
import ContactsBar from '../components/ContactsBar.vue';
import ToolbarUser from '../components/ToolbarUser.vue';
import TopbarUser from '../components/TopbarUser.vue';

export default {
  name: 'GUIChat',
  components: {
    ContactsBar,
    TopbarUser,
    ToolbarUser
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