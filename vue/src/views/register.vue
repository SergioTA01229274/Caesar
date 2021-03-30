<template>
    <div class="registerDiv">
        <v-row id="headerContainer" cols="12">
            <v-row>
                <v-col cols="2">
                    <img src="@/assets/CaesarLogo.png" id='ceasarLogo'>
                </v-col>
                <v-col cols="6" id ='header'>
                    <span>
                        Create an account and start communicating securely
                    </span>
                </v-col>
            </v-row>
        </v-row>
        <v-row id="registerContainer">
            <div>
                <signup id="registerForm"></signup>
            </div>
        </v-row>
    </div>
</template>

<script>
import signup from '../components/signup.vue'

export default {
    name:'register',
    components: {
        signup
    }
}
</script>

<style scoped>
    #registerContainer{
        justify-content: center;
    }
    #headerContainer{
        margin-left: 15rem;
        margin-top: 2rem;
    }
    #registerForm {
        margin-top: 1rem;
    }
    #mainContainer {
        margin-top: 2rem;
    }
    #header{
        font-family: Roboto;
        position: relative;
        font-size: 3rem;
        font-weight: 500;
        color: #000001;
        margin-top: 5rem;
        margin-left: 2.5rem;
    }
    #ceasarLogo{
        width:15rem;
        height:15rem;
        float:left;
        margin-left: 1rem;
        margin-top: 1rem;
    }
</style>