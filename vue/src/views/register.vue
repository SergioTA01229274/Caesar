<template>
    <div class="registerDiv">
        <v-container fluid>
            <v-row>
                <div class = 'footer content'>
                    <v-col>
                        <img src="../assets/CaesarLogo.png" id='ceasarLogo'>
                    </v-col>
                    <v-col>
                        <span id = 'header'>
                            Create an account and start communicating securely
                        </span>
                    </v-col>
                </div>
            </v-row>
        </v-container>
        <signup></signup>
    </div>
</template>

<script>
export default {

    name:'register',
    components: {
        signup
    }
}
import signup from '../components/signup.vue'
</script>

<style scoped>
    .registerDiv{

    }
    #header{
        font-family: Roboto;
        font-size: 3rem;
        font-weight: 500;
        position: absolute;
        color: #000001;
        margin-top:1em;
    }
    #ceasarLogo{
        width:15rem;
        height:15rem;
        float:left;
        opacity:75%;
        margin-left: 1em;
        margin-top: 1em;
    }
</style>