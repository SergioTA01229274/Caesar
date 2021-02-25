<template>
    <div id="mainContainer">
                <div class="footer content" id="headerContainer">
                    <v-container>
                        <v-row>
                            <v-col cols="10"><login-header class="pa-2"></login-header></v-col>
                            <v-col cols="2"><login-section class="pa-2"></login-section></v-col>
                        </v-row>
                    </v-container>
                    
                </div>
    </div>
</template>

<style lang="scss">
    #headerContainer {
        position: fixed;
        top: 7.5rem;
        left: 2.5rem;
    }
</style>


<script>
import LoginHeader from '../components/loginHeader.vue'
import LoginSection from '../components/loginSection.vue'



// @ is an alias to /src

export default { // When we export our view, we have to specify the components and the name
  name: 'Login',
  components: {
    LoginHeader,
    LoginSection
    },
}
</script>
