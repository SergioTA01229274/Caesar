<template>
    <v-toolbar style="background-color: #79797D">
        <v-row>
            <v-col class="space-sender">
                <span id="senderv">Mr. Green</span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">
                <v-btn class="mx-2"
                    id="sender-btn"
                    fab>
                    <v-img src="../assets/CaesarLogo.png" id="vimg"></v-img>
                </v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn
                    class="justify-end"
                    dark
                    id="logout-btn">
                    <v-icon>mdi-account-circle</v-icon>
                </v-btn>
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
        font-size: 2rem;
        color: #F2EEEE;
        padding: 0em;
    }
    #logout-btn {
        font-size: 2rem;
        color: #F2EEEE;
        background-color: #D50000;
        margin-top: 0.3em;
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
        background-color: #79797D;
    }
</style>