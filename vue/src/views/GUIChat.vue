<template>
    <div class="GUIChat">
        <v-app>
            
                <v-system-bar dark color="indigo lighten-2" height="60">
                    <v-spacer></v-spacer>
                    <span class="span">Mr. Blue</span>
                    <v-spacer></v-spacer>
                    <v-icon>mdi-wifi-strength-4</v-icon>
                    <v-icon>mdi-signal-cellular-outline</v-icon>
                    <v-icon>mdi-battery</v-icon>
                    <span>12:30</span>
                </v-system-bar>
            
            <v-container>
                <v-navigation-drawer  v-model="drawer" absolute width="40%" permanent>
                    <left-message-bar></left-message-bar>
                </v-navigation-drawer>
            </v-container>
        </v-app>
    </div>
</template>

<script>
// @ is an alias to /src
import LeftMessageBar from '../components/LeftMessageBar.vue';
//import ToolbarUser from '../components/ToolbarUser.vue';

export default {
  name: 'GUIChat',
  components: {
    LeftMessageBar,
  //  ToolbarUser
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