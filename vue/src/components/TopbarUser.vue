<template>
    <v-toolbar style="background-color: #79797D">
        <v-row>
            <v-col class="space-sender" cols="6">
                <span id="senderv"> Welcome back {{username}} ! </span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
                <div id="buttonsCont">
                    <v-row>
                        <v-col cols="3"><private-menu v-bind:privInfo="userInfo"></private-menu></v-col>
                        <v-col cols="3">
                            <v-btn
                        class="mx-2"
                        id="logout-btn"
                        fab
                        dark
                        @click="logOut()"
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
    props: ['userInfo'],
    data() {
        return {
            username: localStorage.username
        }
    },
    methods: {
            logOut(){
                this.$emit('closeConn');
                this.$router.push({ path: '/'});
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
        text-transform: capitalize;
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