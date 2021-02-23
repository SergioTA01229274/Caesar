<template>
    <div class="GUIChat">
        <v-container fluid>
            <v-row>
                <v-col cols="5">
                    <left-message-bar></left-message-bar>
                </v-col>
                <v-col cols="7">
                    <topbar-user></topbar-user>
                    <toolbar-user></toolbar-user>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
// @ is an alias to /src
import LeftMessageBar from '../components/LeftMessageBar.vue';
import ToolbarUser from '../components/ToolbarUser.vue';
import TopbarUser from '../components/TopbarUser.vue';

export default {
  name: 'GUIChat',
  components: {
    LeftMessageBar,
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