<template>
    <div class="registerDiv">
        <div id="mainContainer">
            <v-row>
                    <v-col :cols="2">
                        <img src="@/assets/CaesarLogo.png" id='ceasarLogo'>
                    </v-col>
                    <v-col :cols="6" id = 'header'>
                        <span>
                            Create an account and start communicating securely
                        </span>
                    </v-col>
            </v-row>
        </div>
        <signup id="registerForm"></signup>
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
    #registerForm {
        margin-left: 12.5rem;
        margin-top: 2rem;
    }
    #mainContainer {
        margin-top: 2rem;
        margin-left: 17.5rem;
    }
    #header{
        font-family: Roboto;
        position: fixed;
        font-size: 3rem;
        font-weight: 500;
        color: #000001;
        margin-top: 5rem;
        margin-left: 10rem;
    }
    #ceasarLogo{
        width:15rem;
        height:15rem;
        float:left;
        margin-left: 1em;
        margin-top: 1em;
    }
</style>