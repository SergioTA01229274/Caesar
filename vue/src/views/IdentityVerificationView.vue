<template>
    <div class="IdentVer">
        <v-container fluid>
            <v-row>
                <div class="footer content">
                    <v-col>
                        <img src="@/assets/CaesarLogo.png" id="caesarLogo">
                    </v-col>
                    <v-col>
                        <span id="header">We want to make sure you are Mr. Green
                            Please upload your identity package
                        </span>
                    </v-col>
                </div>
            </v-row>
        </v-container>
        <identity-verification></identity-verification>
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

    #caesarLogo {
        width: 15rem;
        height: 15rem;
        float: left;
        margin-left: 1em;
        margin-top: 1em;
    }
    #header {
        font-family: Roboto;
        font-size: 3rem;
        font-weight: 500;
        position: absolute;
        color: #000001;
        margin-top: 1em;
    }
    #subHeader {
        font-family: Roboto;
        font-size: 2.5rem;
        font-weight: 500;
        position: absolute;
        text-align: center;
        color: #000001;
        margin-left: 8em;
    }
</style>