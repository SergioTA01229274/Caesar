<template>
    <v-toolbar style="background-color: #79797D">
        <v-row>
            <v-col class="space-sender">
                <span id="senderv"> {{username}} </span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
                <div id="buttonsCont">
                    <v-row>
                        <v-col cols="3"><private-menu></private-menu></v-col>
                        <v-col cols="3">
                            <v-btn
                        class="mx-2"
                        id="logout-btn"
                        fab
                        dark
                    >
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-toolbar>
</template>

<script>
import privateMenu from '../components/privateMenu.vue';

export default {
    name: "TopbarUser",
    data() {
        return {
            username: localStorage.username
        }
    },
  components: { privateMenu },
}
</script>

<style scoped>
    #senderv {
        font-size: 2.5rem;
        color: #F2EEEE;
        font-weight: 500;
        float: left;
    }
    #buttonsCont {
        float: right;
        display: flex;
        justify-content: flex-end;
    }
    #logout-btn {
        height: 3rem;
        width: 3rem;
        color: #F2EEEE;
        background-color: #D50000;
        margin-left: 2.5rem;
    }
    #vimg {
        height: 3em;
        width: 3em;
    }
    .space-sender{
        padding: 1em;
        margin-right: 9em;
    }
    
</style>