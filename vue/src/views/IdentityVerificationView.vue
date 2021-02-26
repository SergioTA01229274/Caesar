<template>
    <div>
        <v-row id="headerContainer" class="footer content">
                <v-col :cols="2">
                    <img src="@/assets/CaesarLogo.png" id="caesarLogo">
                </v-col>
                <v-col :cols="8" id="header">
                    <span>We want to make sure you are Mr. Green
                        Please upload your identity package
                    </span>
                </v-col>
        </v-row>
        <div><identity-verification id="fileSection"></identity-verification></div>
    </div>
</template>

<script>

import IdentityVerification from '../components/IdentityVerification.vue';

export default {
    name: "IdentityVerificationView",
    components: {
        IdentityVerification
    }
}
</script>

<style scoped>

    #fileSection {
        margin-left: 10rem;
    }

    #headerContainer {
        margin-top: 2.5rem;
        margin-left: 5rem;
    }
    #caesarLogo {
        width: 15rem;
        height: 15rem;
        float: left;
        margin-left: 5rem;
    }
    #header {
        font-family: Roboto;
        position: fixed;
        left: 20rem;
        font-size: 3rem;
        font-weight: 500;
        color: #000001;
        margin-top: 2.5rem;
    }
</style>