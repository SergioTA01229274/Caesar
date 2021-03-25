<template>
        <v-row class="align-start justify-start">
                <v-col cols="2" id="logoCol"><img src="@/assets/CaesarLogo.png" id="caesarLogo"></v-col>
                <v-col cols="10" id="headerCol">
                    <div id="header">Welcome to Caesar
                    <br><div id="subHeader"> A fully encrypted, anonymous and secure online chat</div>
                    </div>
                </v-col>
        </v-row>
</template>

<style scoped>
    

    #header {
        font-family: Roboto;
        font-size: 4.5rem;
        font-weight: 500;
        margin-top: 1.5rem !important;
        margin-left: 2rem !important;
        color: black;
    }
    #subHeader {
        font-family: Roboto;
        font-size: 2.25rem;
        font-weight: 500;
        margin-top: 0.5rem;
        margin-left: 2rem !important;
        color: black;
    }
    #caesarLogo {
        height: 14.5rem;
        width: 14.5rem;
    }

</style>

<script>
  export default {
    name:"loginHeader"
  }
</script>