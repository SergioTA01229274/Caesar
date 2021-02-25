<template>
    <v-toolbar style="background-color: #79797D">
        <v-row>
            <v-col class="space-sender">
                <span id="senderv">Mr. Green</span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">
                <div id="buttonsCont">
                    <v-btn class="mx-2"
                    id="sender-btn"
                    fab>
                    <v-img src="@/assets/img/CaesarLogo.png" id="vimg"></v-img>
                </v-btn>
                <v-btn
                    class="justify-end mx-2"
                    id="logout-btn"
                    fab
                    dark>
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-toolbar>
</template>

<script>
export default {
    name: "TopbarUser"
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
    }
    #logout-btn {
        height: 3rem;
        width: 3rem;
        font-size: 2rem;
        color: #F2EEEE;
        background-color: #D50000;
        margin-top: 0.25rem;
        margin-left: 2rem;
    }
    #vimg {
        height: 3em;
        width: 3em;
    }
    .space-sender{
        padding: 1em;
        margin-right: 9em;
    }
    #sender-btn {
        background: none !important;
        margin-top: 0.25rem;
        height: 3rem;
        width: 3rem;
    }
</style>